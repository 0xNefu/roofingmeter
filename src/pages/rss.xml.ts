// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// This runs at build time — totally fine
const posts = await getCollection("blog");

// RSS Feed → https://txchyon.com/rss.xml
export async function get(context) {
  return rss({
    title: "Txchyon Capital – On-chain Alpha",
    description: "DeFi research, airdrops, and alpha from Txchyon",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.excerpt ?? "",
      link: `/posts/${post.slug}/`,
      pubDate: post.data.date || new Date(),
      enclosure: post.data.image
        ? {
            url: `https://txchyon.com${post.data.image.startsWith("/") ? "" : "/"}${post.data.image}`,
            type: "image/jpeg",
          }
        : undefined,
    })),
    customData: `<language>en</language>`,
  });
}

// JSON Feed → https://txchyon.com/feed.json
export async function get_feed_json(context) {
  const items = posts.map((post) => ({
    id: `${context.site}posts/${post.slug}/`,
    url: `${context.site}posts/${post.slug}/`,
    title: post.data.title,
    summary: post.data.description ?? post.data.excerpt ?? "",
    date_published: (post.data.date || new Date()).toISOString(),
    image: post.data.image
      ? `https://txchyon.com${post.data.image.startsWith("/") ? "" : "/"}${post.data.image}`
      : undefined,
  }));

  return new Response(
    JSON.stringify({
      version: "https://jsonfeed.org/version/1.1",
      title: "Txchyon Capital",
      home_page_url: context.site,
      feed_url: `${context.site}rss.xml`,
      items,
    }),
    {
      headers: { "content-type": "application/feed+json" },
    }
  );
}