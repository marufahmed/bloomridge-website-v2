import type { ImageMetadata } from 'astro';

// Every illustration in src/assets/img, keyed by file stem. Astro optimises
// them at build time; pages import from here so a renamed file fails loudly.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{png,jpg,webp}', { eager: true });

export const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.(png|jpg|webp)$/, ''), mod.default]),
);

export function cover(name: string): ImageMetadata {
  return images[name] ?? images['hero-classroom'];
}

export const alt: Record<string, string> = {
  'hero-classroom': 'A therapist kneels beside a young boy at a low table, showing him a picture card, in a bright classroom with baskets of wooden toys.',
  'early-intervention': 'A small girl laughs in a fabric sensory swing while a therapist kneels beside it, one hand steadying the swing.',
  'school-readiness': 'A boy of about six writes carefully at a desk while a teacher points at his page; two children draw at a table behind them.',
  'speech-therapy': 'A speech therapist holds up a picture card of an apple across a small table while a boy points at it, mid-word.',
  'occupational-therapy': 'A girl threads a large wooden bead onto a string with both hands while an adult holds the string steady.',
  'special-education': 'A girl and a teacher share one open picture book on a cushioned bench in a quiet reading corner.',
  'group-session': 'Five children sit in a circle on a rug with a psychologist, passing a soft yellow ball from one to the next.',
  'parent-review': 'Two parents listen across a small table as a therapist points to a simple progress chart in an open folder.',
  'home-practice': 'A father sits beside his daughter at a dining table as she traces a wavy line with a chunky crayon.',
  'centre-exterior': 'The entrance of a tidy residential building on a quiet tree-lined lane, with a bougainvillea in bloom and an open gate.',
};
