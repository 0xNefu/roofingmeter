// src/pages/sitemap.xml.ts  (or wherever you have it)

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Sitemap generation failed: Site URL not set', { status: 500 });
  }

  // 1. Fetch all posts from the 'posts' collection
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  // 2. Map posts to correct nested URLs using post.id
  const postsMap = posts
    .map((post) => {
      const lastModDate = post.data.updatedDate ?? post.data.date;
      const lastMod = lastModDate ? new Date(lastModDate).toISOString() : new Date().toISOString();

      return `
        <url>
          <loc>${new URL(`/blog/${post.id}`, site).href}</loc>
          <lastmod>${lastMod}</lastmod>
          <priority>0.8</priority>
          <changefreq>weekly</changefreq>
        </url>
      `;
    })
    .join('\n');

  // 3. Your 10 pillar category pages
  const pillarCategories = [
    "airdrop-farming",
    "defi-yield",
    "getting-started",
    "infrastructure-tech",
    "portfolio-management",
    "regulatory-tax",
    "research-analysis",
    "security-privacy",
    "tools-automation",
    "trading-investing"
  ];

  const categoryMap = pillarCategories
    .map((category) => `
      <url>
        <loc>${new URL(`/categories/${category}`, site).href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
        <changefreq>daily</changefreq>
      </url>
    `)
    .join('\n');

  // 4. Static pages
  const staticPages = [
    { loc: site.href, priority: 1.0, changefreq: 'daily' },
    { loc: '/about', priority: 0.7, changefreq: 'monthly' },
    { loc: '/tools', priority: 0.8, changefreq: 'weekly' },
    { loc: '/contact', priority: 0.6, changefreq: 'yearly' },
  ];

  const staticMap = staticPages
    .map((page) => `
      <url>
        <loc>${new URL(page.loc, site).href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${page.priority}</priority>
        <changefreq>${page.changefreq}</changefreq>
      </url>
    `)
    .join('\n');

  // 5. Final XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticMap}
  ${categoryMap}
  ${postsMap}
</urlset>`.trim();

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};