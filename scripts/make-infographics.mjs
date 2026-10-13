// Builds the social infographics in public/infographics/ as 1080x1350 JPEG, one
// per entry in src/lib/infographics.json, and the posting sheet in
// docs/social-posts.md. The illustration comes from scripts/gen-images.py
// (src/assets/infographic/<id>.png, text-free); every word is set here.
//   node scripts/make-infographics.mjs            # all, or pass ids
//   node scripts/make-infographics.mjs --check    # only test that the words fit
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const W = 1080, H = 1350, FOOT = 110, PAD = 72;
const ART_H = H - FOOT;
const SITE = 'https://www.bloomridgesprings.com';
const CHECK = process.argv.includes('--check');
const IMG = 'src/assets/infographic';
const OUT = 'public/infographics';
const C = { pine: '#0f3a32', cream: '#fbf8f1', amber: '#de9a3c', amberDeep: '#b5761f', gold: '#f2b75f', tint: '#fbf1e1', teal: '#2e7d6e', tealTint: '#e6f1ee', muted: '#435a52' };
const SERIF = 'Lora, Palatino, Georgia, serif';
const SANS = 'Poppins, Helvetica, Arial, sans-serif';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// librsvg does not wrap text, so lines are broken here on an estimated width.
// The estimate runs wide on purpose; a line that fits here fits when drawn.
const WIDE = /[mwMW@%]/g, NARROW = /[iljtfr.,:;'! ]/g;
const width = (s, size, k = 0.6) =>
  (s.length + 0.35 * (s.match(WIDE)?.length ?? 0) - 0.4 * (s.match(NARROW)?.length ?? 0)) * size * k;

function wrap(text, size, max, maxLines, what) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (width(next, size) <= max || !line) line = next;
    else { lines.push(line); line = word; }
  }
  lines.push(line);
  if (lines.length > maxLines || lines.some((l) => width(l, size) > max)) {
    throw new Error(`${what}: "${text}" does not fit in ${maxLines} line(s). Shorten it.`);
  }
  return lines;
}

const text = (lines, x, y, size, lh, attrs) =>
  lines.map((l, i) => `<text x="${x}" y="${y + i * lh}" font-size="${size}" ${attrs}>${esc(l)}</text>`).join('');

// Each template returns [svg, yBelow] for the block starting at y.
const templates = {
  checklist(e, y) {
    const pill = 214, gap = 26, size = 30, lh = 38;
    let out = '';
    e.points.forEach(([label, point], i) => {
      const lines = wrap(point, size, W - 2 * PAD - pill - gap, 2, `${e.id} point ${i + 1}`);
      const h = Math.max(58, lines.length * lh + 14);
      out += `<rect x="${PAD}" y="${y}" width="${pill}" height="58" rx="29" fill="${C.pine}"/>`
        + `<text x="${PAD + pill / 2}" y="${y + 39}" font-size="26" font-weight="600" text-anchor="middle" font-family="${SANS}" fill="${C.cream}">${esc(label)}</text>`
        + text(lines, PAD + pill + gap, y + (lines.length === 1 ? 40 : 28), size, lh, `font-family="${SANS}" fill="${C.pine}"`);
      y += h + 20;
    });
    return [out, y];
  },
  steps(e, y) {
    const d = 58, gap = 26, size = 30, lh = 38;
    let out = '';
    e.points.forEach((point, i) => {
      const lines = wrap(point, size, W - 2 * PAD - d - gap, 2, `${e.id} step ${i + 1}`);
      const h = Math.max(d, lines.length * lh + 14);
      out += `<circle cx="${PAD + d / 2}" cy="${y + d / 2}" r="${d / 2}" fill="${C.amber}"/>`
        + `<text x="${PAD + d / 2}" y="${y + 41}" font-size="32" font-weight="600" text-anchor="middle" font-family="${SERIF}" fill="${C.pine}">${i + 1}</text>`
        + text(lines, PAD + d + gap, y + (lines.length === 1 ? 40 : 28), size, lh, `font-family="${SANS}" fill="${C.pine}"`);
      y += h + 20;
    });
    return [out, y];
  },
  // Ticked list: what it is, what is included, what to look for.
  card(e, y) {
    const d = 46, gap = 24, size = 30, lh = 38;
    let out = '';
    e.points.forEach((point, i) => {
      const lines = wrap(point, size, W - 2 * PAD - d - gap, 2, `${e.id} point ${i + 1}`);
      const h = Math.max(d, lines.length * lh + 8);
      out += `<circle cx="${PAD + d / 2}" cy="${y + d / 2}" r="${d / 2}" fill="${C.teal}"/>`
        + `<path d="M${PAD + 13} ${y + 24}l7 7 13-14" fill="none" stroke="${C.cream}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`
        + text(lines, PAD + d + gap, y + (lines.length === 1 ? 34 : 24), size, lh, `font-family="${SANS}" fill="${C.pine}"`);
      y += h + 20;
    });
    return [out, y];
  },
  // Pairs: what parents are told, then what the page says.
  'myth-fact'(e, y) {
    const pill = 104, gap = 22, size = 27, lh = 34, max = W - 2 * PAD - pill - gap - 28;
    let out = '';
    e.points.forEach(([myth, fact], i) => {
      const m = wrap(myth, size, max, 2, `${e.id} myth ${i + 1}`);
      const f = wrap(fact, size, max, 2, `${e.id} fact ${i + 1}`);
      const mh = Math.max(44, m.length * lh) + 6, fh = Math.max(44, f.length * lh) + 6, h = mh + fh + 22;
      out += `<rect x="${PAD}" y="${y}" width="${W - 2 * PAD}" height="${h}" rx="20" fill="${C.tint}"/>`;
      [['Myth', C.amber, C.pine, m, y + 12, 'font-style="italic"', C.muted], ['Fact', C.teal, C.cream, f, y + 12 + mh, 'font-weight="500"', C.pine]]
        .forEach(([label, bg, ink, lines, ry, style, fill]) => {
          out += `<rect x="${PAD + 16}" y="${ry}" width="${pill}" height="44" rx="22" fill="${bg}"/>`
            + `<text x="${PAD + 16 + pill / 2}" y="${ry + 31}" font-size="23" font-weight="600" text-anchor="middle" font-family="${SANS}" fill="${ink}">${label}</text>`
            + text(lines, PAD + 16 + pill + gap, ry + (lines.length === 1 ? 32 : 22), size, lh, `${style} font-family="${SANS}" fill="${fill}"`);
        });
      y += h + 12;
    });
    return [out, y + 4];
  },
  versus(e, y) {
    const gap = 24, colW = (W - 2 * PAD - gap) / 2, inner = colW - 48, size = 27, lh = 34;
    const rows = e.points.map(([a, b], i) => [
      wrap(a, size, inner, 2, `${e.id} row ${i + 1} left`),
      wrap(b, size, inner, 2, `${e.id} row ${i + 1} right`),
    ]);
    const rowH = rows.map(([a, b]) => Math.max(a.length, b.length) * lh + 26);
    const bodyH = rowH.reduce((n, h) => n + h, 0) + 12;
    let out = '';
    [[C.amber, C.tint, C.pine], [C.teal, C.tealTint, C.cream]].forEach(([head, body, ink], c) => {
      const x = PAD + c * (colW + gap);
      out += `<rect x="${x}" y="${y}" width="${colW}" height="${64 + bodyH}" rx="22" fill="${body}"/>`
        + `<path d="M${x} ${y + 64}V${y + 22}a22 22 0 0 1 22-22h${colW - 44}a22 22 0 0 1 22 22v42z" fill="${head}"/>`
        + `<text x="${x + colW / 2}" y="${y + 44}" font-size="34" font-weight="600" text-anchor="middle" font-family="${SERIF}" fill="${ink}">${esc(e.columns[c])}</text>`;
      let ry = y + 64 + 12;
      rows.forEach((row, i) => {
        if (i) out += `<line x1="${x + 24}" x2="${x + colW - 24}" y1="${ry}" y2="${ry}" stroke="${C.pine}" stroke-opacity="0.14" stroke-width="2"/>`;
        out += text(row[c], x + 24, ry + 13 + size, size, lh, `font-family="${SANS}" fill="${C.pine}"`);
        ry += rowH[i];
      });
    });
    return [out, y + 64 + bodyH + 20];
  },
};

// Finds the group of figures in a text-free illustration (everything that is not
// the plain ground), scales it to fit maxW x maxH and feathers its edges so it can
// sit on a canvas of the same ground colour without a seam.
async function figures(src, maxW, maxH) {
  const SW = 256;
  const { data, info } = await sharp(src).resize({ width: SW }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const SH = info.height;
  const px = (x, y) => data.subarray((y * SW + x) * 3, (y * SW + x) * 3 + 3);
  const ground = { r: 0, g: 0, b: 0 };
  for (let x = 8; x < SW - 8; x++) { const p = px(x, 8); ground.r += p[0]; ground.g += p[1]; ground.b += p[2]; }
  for (const k of ['r', 'g', 'b']) ground[k] = Math.round(ground[k] / (SW - 16));
  let x0 = SW, x1 = 0, y0 = SH, y1 = 0;
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
    const p = px(x, y);
    if (Math.abs(p[0] - ground.r) + Math.abs(p[1] - ground.g) + Math.abs(p[2] - ground.b) > 60) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
  if (x1 <= x0 || y1 <= y0) throw new Error(`${src}: could not find the figures against the background`);
  const full = await sharp(src).metadata();
  const k = full.width / SW, m = 0.07 * (x1 - x0);
  // The ground is rarely one flat colour; match the canvas to it where the cut-out's edge will be.
  const edge = { r: 0, g: 0, b: 0, n: 0 };
  const ex0 = Math.max(0, Math.round(x0 - m)), ex1 = Math.min(SW - 1, Math.round(x1 + m));
  const ey0 = Math.max(0, Math.round(y0 - m)), ey1 = Math.min(SH - 1, Math.round(y1 + m));
  for (let x = ex0; x <= ex1; x++) for (const y of [ey0, ey1]) { const p = px(x, y); edge.r += p[0]; edge.g += p[1]; edge.b += p[2]; edge.n++; }
  for (let y = ey0; y <= ey1; y++) for (const x of [ex0, ex1]) { const p = px(x, y); edge.r += p[0]; edge.g += p[1]; edge.b += p[2]; edge.n++; }
  for (const c of ['r', 'g', 'b']) ground[c] = Math.round(edge[c] / edge.n);
  const left = Math.max(0, Math.round((x0 - m) * k)), top = Math.max(0, Math.round((y0 - m) * k));
  const right = Math.min(full.width, Math.round((x1 + m) * k)), bottom = Math.min(full.height, Math.round((y1 + m) * k));
  const cut = await sharp(src).extract({ left, top, width: right - left, height: bottom - top })
    .resize({ width: maxW, height: maxH, fit: 'inside' }).ensureAlpha().toBuffer();
  const { width: w, height: h } = await sharp(cut).metadata();
  const f = Math.round(0.07 * w);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${f / 2.4}"/></filter></defs>
    <rect x="${f}" y="${f}" width="${w - 2 * f}" height="${h - 2 * f}" fill="#fff" filter="url(#b)"/></svg>`);
  const art = await sharp(cut).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  return { art, ground };
}

async function render(e) {
  const src = `${IMG}/${e.id}.png`;
  if (!templates[e.template]) throw new Error(`${e.id}: unknown template "${e.template}"`);

  // Words stay inside the central square (y 135 to 1215) so a square crop keeps them.
  let y = 166;
  let svg = `<text x="${PAD}" y="${y}" font-size="22" font-weight="600" letter-spacing="3" font-family="${SANS}" fill="${C.amberDeep}">BLOOMRIDGE SPRINGS · BANASREE, DHAKA</text>`;
  const head = wrap(e.headline, 70, W - 2 * PAD, 2, `${e.id} headline`);
  y += 86;
  svg += text(head, PAD, y, 70, 80, `font-weight="500" font-family="${SERIF}" fill="${C.pine}"`);
  y += (head.length - 1) * 80 + 52;
  svg += text(wrap(e.sub, 29, W - 2 * PAD, 1, `${e.id} sub`), PAD, y, 29, 36, `font-style="italic" font-family="${SERIF}" fill="${C.amberDeep}"`);
  y += 44;
  const [block, below] = templates[e.template](e, y);
  svg += block;
  y = below;
  if (e.note) {
    svg += text(wrap(e.note, 24, W - 2 * PAD, 1, `${e.id} note`), PAD, y + 26, 24, 30, `font-family="${SANS}" fill="${C.muted}"`);
    y += 44;
  }

  if (ART_H - y < 380) throw new Error(`${e.id}: the words run to y=${y} and leave too little room for the picture. Cut a point or shorten the text.`);
  if (CHECK) return console.log('fits', e.id, `words end at y=${y}`);
  if (!existsSync(src)) throw new Error(`${e.id}: no illustration at ${src}. Run scripts/gen-images.py ${e.id}`);
  const { art, ground } = await figures(src, W - 2 * 36, ART_H - y - 4);
  const artMeta = await sharp(art).metadata();

  // Exact brand cream behind the words, easing into the illustration's own ground.
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.cream}"/><stop offset="1" stop-color="${C.cream}" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="${W}" height="${y}" fill="${C.cream}"/>
    <rect y="${y}" width="${W}" height="120" fill="url(#f)"/>
    ${svg}
    <rect y="${ART_H}" width="${W}" height="${FOOT}" fill="${C.pine}"/>
    <text x="${PAD + 84}" y="${ART_H + 68}" font-size="34" font-family="${SERIF}" fill="${C.cream}">Bloomridge Springs</text>
    <text x="${W - PAD}" y="${ART_H + 66}" font-size="27" font-weight="500" text-anchor="end" font-family="${SANS}" fill="${C.gold}">bloomridgesprings.com</text>
  </svg>`;
  const mark = await sharp('public/brand/logo-cream.png').resize({ height: 76 }).toBuffer();

  await sharp({ create: { width: W, height: H, channels: 3, background: ground } })
    .composite([
      { input: Buffer.from(overlay), left: 0, top: 0 },
      { input: art, left: Math.round((W - artMeta.width) / 2), top: ART_H - 12 - artMeta.height },
      { input: mark, left: PAD, top: ART_H + 17 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`${OUT}/${e.id}.jpg`);
  console.log('infographic', e.id, `words end at y=${y}`);
}

const entries = JSON.parse(readFileSync('src/lib/infographics.json', 'utf8'));
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
mkdirSync(OUT, { recursive: true });
let failed = 0;
for (const e of entries) {
  if (only.length && !only.includes(e.id)) continue;
  try { await render(e); } catch (err) { failed++; console.error('FAIL', err.message); }
}
if (failed) process.exit(1);
if (CHECK) process.exit(0);

const link = (e, source) => `${SITE}${e.page}?utm_source=${source}&utm_medium=social&utm_campaign=infographic`;
writeFileSync('docs/social-posts.md', `# Social posts

Written by \`scripts/make-infographics.mjs\`; edit \`src/lib/infographics.json\`, not this file.
One image per post. Instagram captions cannot carry a clickable link, so put the Instagram
link in the bio or a story link sticker.

${entries.map((e) => `## ${e.headline}

- Image: \`public/infographics/${e.id}.jpg\`
- Facebook link: ${link(e, 'facebook')}
- Instagram link: ${link(e, 'instagram')}

> ${e.caption}
>
> ${e.hashtags.join(' ')}
`).join('\n')}`);
console.log('docs/social-posts.md');
