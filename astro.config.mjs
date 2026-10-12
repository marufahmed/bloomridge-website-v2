// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Guides carry their real date in the sitemap. A build-time stamp on every URL
// tells Google nothing, and it stops trusting lastmod when it never matches.
const guideDates = new Map();
for (const [dir, prefix] of [['articles', '/resources/'], ['articles-bn', '/bn/resources/']]) {
  for (const file of readdirSync(`./src/content/${dir}`).filter((f) => f.endsWith('.md'))) {
    const head = readFileSync(`./src/content/${dir}/${file}`, 'utf8').split('---')[1] ?? '';
    const date = (head.match(/^updatedDate:\s*(\S+)/m) ?? head.match(/^pubDate:\s*(\S+)/m))?.[1];
    if (date) guideDates.set(`${prefix}${file.replace(/\.md$/, '')}/`, new Date(date).toISOString());
  }
}

export default defineConfig({
  site: 'https://www.bloomridgesprings.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = guideDates.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  image: {
    // Illustrations are generated once at 1536x1024; Astro emits responsive
    // WebP/AVIF at build time from src/assets/img.
    responsiveStyles: true,
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
