// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response("Site URL not configured", { status: 500 });
  }

  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return rss({
    title: "Txchyon – On-Chain Alpha",
    description: "High-conviction DeFi research, trading strategies, airdrops, and on-chain insights from a full-time trader.",
    site: site,
    stylesheet: false, // Optional: keeps it simple
    customData: `<language>en-us</language>`,
    items: posts.map((post) => {
      // Correct nested URL with /blog/
      const link = new URL(`/blog/${post.id}/`, site).href;

      return {
        title: String(post.data.title || "Untitled Post"),
        description: String(post.data.description || "New on-chain alpha from Txchyon Capital"),
        link: link,
        pubDate: new Date(post.data.date).toISOString(),
        // Optional: enclosure for images if you want richer feeds
        // enclosure: post.data.image ? { url: new URL(post.data.image, site).href, type: "image/jpeg" } : undefined,
      };
    }),
  });
};