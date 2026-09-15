import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: `${site.name}: guides for parents`,
    description: 'Plain-English guides on speech, sensory processing, occupational therapy, behaviour and school readiness from a child-development centre in Dhaka.',
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/resources/${p.id}/`,
      categories: [...p.data.tags],
    })),
    customData: '<language>en-gb</language>',
  });
}
