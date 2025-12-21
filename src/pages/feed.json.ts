// src/pages/feed.json.ts
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Site URL not configured', { status: 500 });
  }

  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const items = posts
    .map((post) => {
      // Use post.slug for correct nested URL: getting-started/how-to-buy-crypto
      const path = post.slug; // FIXED: Changed from post.id to post.slug
      const url = new URL(`/blog/${path}/`, site).href;

      const imageUrl = post.data.image
        ? new URL(
            post.data.image.startsWith('/') ? post.data.image.slice(1) : post.data.image,
            site
          ).href
        : undefined;

      return {
        id: url,
        url,
        title: String(post.data.title || 'Untitled Post'),
        summary: String(post.data.description || 'New on-chain alpha from Txchyon Capital'),
        date_published: new Date(post.data.date).toISOString(),
        image: imageUrl,
      };
    })
    .sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime());

  return new Response(
    JSON.stringify(
      {
        version: 'https://jsonfeed.org/version/1.1',
        title: 'Txchyon Capital – On-Chain Research',
        description: 'High-conviction crypto research, trading strategies, and DeFi insights.',
        home_page_url: site.href,
        feed_url: new URL('/feed.json', site).href,
        icon: new URL('/favicon.ico', site).href,
        favicon: new URL('/favicon.ico', site).href,
        items,
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
};