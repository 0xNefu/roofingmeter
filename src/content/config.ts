import { defineCollection, z } from 'astro:content';

// Define all categories with their metadata (kept for type safety & validation)
export const blogCategories = [
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

export type BlogCategory = typeof blogCategories[number];

// Define exact subcategory keys
const subcategoryKeys = {
  'getting-started': ['basics', 'first-purchase', 'wallet-setup', 'psychology', 'common-mistakes'],
  'security-privacy': ['hardware-wallets', 'software-wallets', 'seed-phrase', 'transaction-security', 'privacy-tools', 'scam-prevention', 'multi-sig'],
  'trading-investing': ['spot-trading', 'derivatives', 'technical-analysis', 'on-chain-analysis', 'memecoins-nfts', 'venture-investing', 'exit-strategies'],
  'defi-yield': ['dexs-swapping', 'liquidity-providing', 'lending-borrowing', 'yield-aggregators', 'restaking-lsts', 'structured-products', 'cross-chain-yield'],
  'airdrop-farming': ['wallet-strategy', 'points-systems', 'eligibility-optimization', 'gas-optimization', 'multi-chain-farming', 'retroactive-analysis', 'tool-bot-setup'],
  'infrastructure-tech': ['layer-1s', 'layer-2s-rollups', 'oracles', 'bridges', 'zk-technology', 'ai-x-crypto', 'depin-rwas'],
  'tools-automation': ['trading-bots', 'analytics-platforms', 'portfolio-trackers', 'alert-systems', 'automation-scripts', 'api-integration', 'custom-dashboard-builds'],
  'research-analysis': ['due-diligence-framework', 'tokenomics-analysis', 'team-backer-analysis', 'competitor-analysis', 'market-fit-assessment', 'risk-assessment-templates'],
  'regulatory-tax': ['global-regulations', 'tax-reporting', 'entity-formation', 'banking-solutions', 'compliance-tools', 'legal-structures', 'audit-accounting'],
  'portfolio-management': ['allocation-strategies', 'rebalancing-methods', 'risk-management', 'performance-tracking', 'tax-loss-harvesting', 'estate-planning'],
  'prediction-markets': ['platform-guides', 'event-strategies', 'liquidity-providing', 'arbitrage-opportunities', 'on-chain-protocols', 'resolution-mechanisms', 'bankroll-management', 'market-analysis', 'regulatory-updates'],
} as const;

// Flatten all subcategory keys into a union type for validation
const allSubcategoryKeys = Object.values(subcategoryKeys).flat() as [string, ...string[]];

// Main blog collection
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Required fields
    title: z.string(),
    description: z.string(),

    // YOUR PREFERRED DATE FORMAT — keep using "date:" and "updatedDate:" in posts
    date: z.coerce.date(),                     // Accepts strings like "2025-11-28" → converts to Date
    updatedDate: z.coerce.date().optional(),   // Optional, same conversion

    // Hierarchical category system
    category: z.enum(blogCategories),
    subcategory: z.enum(allSubcategoryKeys).optional(),

    // SEO & organization
    tags: z.array(z.string()).min(1).max(10).default([]),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),

    // Content features
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    author: z.string().default('NefuTrades'),

    // Visuals
    coverImage: image().optional(),
    coverAlt: z.string().optional(),

    // Advanced
    readingTime: z.number().optional(),
    externalLink: z.string().url().optional(),

    // Series support
    series: z.object({
      name: z.string(),
      part: z.number(),
      total: z.number().optional(),
    }).optional(),
  }),
});

// Export all collections
export const collections = {
  'posts': blogCollection,
  'pages': defineCollection({ type: 'content' }),
  'authors': defineCollection({ type: 'data' }),
  'about': defineCollection({ type: 'content' }),
  'contact': defineCollection({ type: 'content' }),
};

// Keep metadata for display purposes (icons, colors, etc.)
export const categoryMetadata: Record<BlogCategory, { title: string; description: string; color: string }> = {
  'getting-started': { title: 'Getting Started', description: 'Beginner guides and first steps in crypto', color: '#3B82F6' },
  'security-privacy': { title: 'Security & Privacy', description: 'Protect your assets and maintain privacy', color: '#10B981' },
  'trading-investing': { title: 'Trading & Investing', description: 'Markets, strategies, and investment analysis', color: '#F59E0B' },
  'defi-yield': { title: 'DeFi & Yield', description: 'Decentralized finance and passive income strategies', color: '#8B5CF6' },
  'airdrop-farming': { title: 'Airdrop Farming', description: 'Maximize airdrop eligibility and rewards', color: '#EC4899' },
  'infrastructure-tech': { title: 'Infrastructure & Tech', description: 'Blockchain technology and infrastructure deep dives', color: '#06B6D4' },
  'tools-automation': { title: 'Tools & Automation', description: 'Productivity tools and automation strategies', color: '#84CC16' },
  'research-analysis': { title: 'Research & Analysis', description: 'Due diligence frameworks and analytical methodologies', color: '#EF4444' },
  'regulatory-tax': { title: 'Regulatory & Tax', description: 'Legal compliance and tax optimization', color: '#6366F1' },
  'portfolio-management': { title: 'Portfolio Management', description: 'Wealth building and portfolio optimization', color: '#14B8A6' },
  'prediction-markets': { title: 'Prediction Markets', description: 'Betting on real-world outcomes — platforms, strategies, and edge in on-chain prediction markets', color: '#FF6B6B' },
};