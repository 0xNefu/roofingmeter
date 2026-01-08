import { defineCollection, z } from 'astro:content';

// Your 6 roofing pillar categories
const blogCategories = [
  'roof-installation',
  'roof-repair',
  'roof-maintenance',
  'roof-inspection',
  'roof-replacement',
  'roofing-materials'
] as const;

// Define subcategories for each main category
const subcategoryOptions = {
  'roofing-materials': ['asphalt-shingles', 'metal-roofing', 'tile-roofing', 'wood-shakes', 'slate', 'rubber', 'green-roofs', 'solar-tiles', 'synthetic'] as const,
  'roof-installation': ['new-construction', 're-roofing', 'commercial', 'residential', 'diy-basics', 'professional'] as const,
  'roof-repair': ['emergency', 'leak-repair', 'shingle-repair', 'flashing-repair', 'vent-repair', 'valley-repair', 'skylight-repair'] as const,
  'roof-maintenance': ['seasonal', 'gutter-cleaning', 'snow-removal', 'moss-prevention', 'cleaning', 'inspection-checklist', 'drainage'] as const,
  'roof-inspection': ['diy', 'professional', 'pre-purchase', 'insurance-claim', 'storm-damage', 'routine', 'roof-age'] as const,
  'roof-replacement': ['complete-replacement', 'partial-replacement', 'tear-off', 'overlay', 'material-upgrade', 'code-compliance'] as const
} as const;

// Create a union type of all possible subcategories
type SubcategoryType = typeof subcategoryOptions;
type AllSubcategories = SubcategoryType[keyof SubcategoryType][number];

const blogCollection = defineCollection({
  type: 'content',
  
  schema: ({ image }) => z.object({
    // KEEP ALL EXISTING FIELDS FROM BEFORE
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    
    // Enhanced category system - UPDATED CATEGORIES ONLY
    category: z.enum(blogCategories),
    
    // Dynamic subcategory based on main category
    subcategory: z.string().optional()
      .refine((val, ctx) => {
        if (!val) return true; // Optional, so empty is OK
        
        const category = ctx.parent.category;
        const validSubs = subcategoryOptions[category as keyof typeof subcategoryOptions];
        
        if (validSubs && !validSubs.includes(val as any)) {
          console.warn(`Warning: Subcategory "${val}" not in valid list for category "${category}". Valid options: ${validSubs.join(', ')}`);
          // We'll allow it but warn - this gives flexibility for new subcategories
        }
        return true;
      }),
    
    // Tags system - roofing specific suggestions
    tags: z.array(z.string()).default([])
      .refine(tags => tags.length <= 10, {
        message: "Tags should not exceed 10 items"
      }),
    
    draft: z.boolean().default(false),
    
    // KEEP BOTH GATING FIELDS - your components might use both
    hasGatedContent: z.boolean().default(false),
    isFullyGated: z.boolean().default(false),
    gateType: z.enum(['full', 'partial', 'summary']).optional().default('full'), // ADDED NEW FIELD
    
    // Enhanced image support - KEEP ALL
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    heroImage: image().optional(), // If you want to use Astro's image optimization
    heroImageAlt: z.string().optional(),
    
    // Author system - KEEP ALL
    author: z.string().optional(),
    authors: z.array(z.string()).optional(),
    authorTwitter: z.string().optional(),
    authorCredentials: z.string().optional(), // e.g., "Certified Roofing Contractor"
    
    // Dates - KEEP ALL
    updatedDate: z.coerce.date().optional(),
    
    // SEO and metadata - KEEP ALL
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    
    // Content features - KEEP ALL
    featured: z.boolean().default(false),
    readingTime: z.number().optional(), // in minutes
    
    // Roofing-specific metadata - KEEP ALL (optional fields won't break anything)
    difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'professional']).optional(),
    costRange: z.enum(['$', '$$', '$$$', '$$$$']).optional(),
    timeEstimate: z.string().optional(), // e.g., "2-4 hours", "1-2 days"
    
    // Related to calculators/tools - KEEP ALL
    hasCalculator: z.boolean().default(false),
    calculatorSlug: z.string().optional(), // Link to specific calculator tool
    
    // Location-specific content - KEEP ALL
    climateZone: z.array(z.string()).optional(), // ["cold", "hot", "humid", "coastal"]
    regionSpecific: z.boolean().default(false),
    
  }).passthrough(),
});

export const collections = {
  posts: blogCollection,
  pages: defineCollection({ type: 'content' }),
  authors: defineCollection({ 
    type: 'content',
    schema: z.object({ 
      title: z.string(),
      image: z.string().optional(),
      description: z.string().optional(),
      meta_title: z.string().optional(),
      credentials: z.string().optional(),
      location: z.string().optional(),
      specialty: z.array(z.string()).optional(),
      yearsExperience: z.number().optional(),
      certifications: z.array(z.string()).optional(),
      social: z.object({
        website: z.string().url().optional(),
        x: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
        instagram: z.string().url().optional(),
        youtube: z.string().url().optional(),
      }).optional(),
    }).passthrough(),
  }),
  about: defineCollection({ type: 'content' }),
  contact: defineCollection({ type: 'content' }),
  blog: defineCollection({ type: 'content' }),
  // Optional: Add a collection for roofing calculators/tools
  calculators: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(['cost-estimator', 'material-calculator', 'roof-pitch', 'snow-load', 'ventilation']),
      featured: z.boolean().default(false),
      requiresEmail: z.boolean().default(false),
    })
  }),
};