import { defineCollection, z } from 'astro:content';

// Your 11 pillar categories
const blogCategories = [
  'getting-started',
  'security-privacy', 
  'trading-investing',
  'defi-yield',
  'airdrop-farming',
  'infrastructure-tech',
  'tools-automation',
  'research-analysis',
  'regulatory-tax',
  'portfolio-management',
  'prediction-markets'
] as const;

const blogCollection = defineCollection({
  type: 'content',
  
  // This filter EXCLUDES drafts from final output — but validation still runs on all files
  filter: ({ data }) => !data.draft,
  
  // REMOVE ({ image }) parameter since we're not using image() helper
  schema: z.object({
    // Previously "required" — now safe for drafts
    title: z.string().catch('Draft Post'),                    // fallback if missing/invalid
    description: z.string().catch('No description yet'),      // fallback
    date: z.coerce.date().catch(new Date()),                  // fallback to today if invalid
    
    // Category system — keep enforcement but with fallback
    category: z.enum(blogCategories).catch('getting-started'),
    subcategory: z.string().optional(),
    
    // Tags & draft
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    
    // 🔥 REVERT: Back to string paths (what was working on live site)
    image: z.string().optional(),
    heroImageAlt: z.string().optional(),
    
    // Authors
    author: z.string().optional(),
    authors: z.array(z.string()).optional(),
    authorTwitter: z.string().optional(),
    
    updatedDate: z.coerce.date().optional(),
    
    // Total freedom for anything else (comments, extras, etc.)
  }).passthrough(),
});

export const collections = {
  posts: blogCollection,
  pages: defineCollection({ type: 'content' }),
  authors: defineCollection({ 
    type: 'data',
    schema: z.object({ 
      name: z.string(),
      bio: z.string().optional(),
    })
  }),
  about: defineCollection({ type: 'content' }),
  contact: defineCollection({ type: 'content' }),
  blog: defineCollection({ type: 'content' }),
  'posts-backup': defineCollection({ type: 'content' }),
};