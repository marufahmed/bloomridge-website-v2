// Builds the Open Graph cards in public/og/: one per illustration plus a
// default. Each is 1200x630, illustration on the right, pine panel with the
// mark and wordmark on the left. Run after scripts/gen-images.py:
//   node scripts/make-og.mjs
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const W = 1200, H = 630, PANEL = 520;
const IMG = 'src/assets/img';
const OUT = 'public/og';
mkdirSync(OUT, { recursive: true });

const panel = (title, sub) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#0f3a32"/>
  <text x="70" y="330" font-family="Lora, Palatino, Georgia, serif" font-size="58" fill="#fbf8f1">${title}</text>
  <text x="70" y="392" font-family="Lora, Palatino, Georgia, serif" font-size="30" font-style="italic" fill="#f2b75f">${sub}</text>
  <text x="70" y="560" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="22" fill="#fbf8f1" opacity="0.8">Child-development centre · Banasree, Dhaka</text>
</svg>`);

const mark = await sharp('public/brand/logo-cream.png').resize({ height: 120 }).toBuffer();

async function card(name, imagePath) {
  const layers = [
    { input: await sharp(panel('Bloomridge Springs', 'Every child belongs, every child blooms')).png().toBuffer(), left: 0, top: 0 },
    { input: mark, left: 70, top: 120 },
  ];
  if (imagePath) {
    const pic = await sharp(imagePath).resize(W - PANEL, H, { fit: 'cover', position: 'attention' }).toBuffer();
    // Arched left edge on the picture, echoing the site frames.
    const mask = Buffer.from(`<svg width="${W - PANEL}" height="${H}"><rect x="0" y="0" width="${W - PANEL}" height="${H}" rx="48" ry="48" fill="#fff"/><rect x="${W - PANEL - 60}" y="0" width="60" height="${H}" fill="#fff"/></svg>`);
    const rounded = await sharp(pic).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
    layers.push({ input: rounded, left: PANEL, top: 0 });
  }
  await sharp({ create: { width: W, height: H, channels: 4, background: '#0f3a32' } })
    .composite(layers).png({ compressionLevel: 9 }).toFile(join(OUT, `${name}.png`));
  console.log('og', name);
}

const files = readdirSync(IMG).filter((f) => /\.(png|jpg|webp)$/.test(f));
for (const f of files) await card(basename(f).replace(/\.\w+$/, ''), join(IMG, f));
await card('default', files.includes('hero-classroom.png') ? join(IMG, 'hero-classroom.png') : null);
