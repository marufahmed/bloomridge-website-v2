import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const COVERS = [
  'hero-classroom',
  'early-intervention',
  'school-readiness',
  'speech-therapy',
  'occupational-therapy',
  'special-education',
  'group-session',
  'parent-review',
  'home-practice',
  'centre-exterior',
] as const;

const articleSchema = z.object({
  title: z.string().min(10).max(120),
  description: z.string().min(60).max(200),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).min(1).max(4),
  cover: z.enum(COVERS).default('hero-classroom'),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/articles' }),
  schema: articleSchema,
});

// Bangla guides, served under /bn/resources/. Same frontmatter as English.
const articlesBn = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/articles-bn' }),
  schema: articleSchema,
});

export const collections = { articles, articlesBn };
