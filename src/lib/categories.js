// src/lib/categories.js - ROOFINGMETER CATEGORY HIERARCHY (6 PILLARS)
export const CATEGORY_HIERARCHY = {
  "roof-cost-estimates": {
    name: "Roof Cost Estimates",
    description: "Accurate cost calculators, pricing guides, and budget planning for all roofing projects",
    icon: "💰",
    subcategories: {
      "new-roof-costs": "New Roof Costs",
      "roof-replacement-costs": "Roof Replacement Costs",
      "repair-costs": "Repair Costs",
      "material-cost-breakdowns": "Material Cost Breakdowns",
      "labor-costs": "Labor Costs",
      "regional-pricing": "Regional Pricing Guides",
      "insurance-estimates": "Insurance Estimates",
      "financing-options": "Financing Options"
    }
  },
  
  "material-comparisons": {
    name: "Material Comparisons",
    description: "Complete guides to roofing materials, pros/cons, and longevity comparisons",
    icon: "🏠",
    subcategories: {
      "asphalt-shingles": "Asphalt Shingles",
      "metal-roofing": "Metal Roofing",
      "tile-roofing": "Tile Roofing",
      "slate-roofing": "Slate Roofing",
      "wood-shakes-shingles": "Wood Shakes & Shingles",
      "rubber-roofing": "Rubber/EPDM Roofing",
      "green-roofs": "Green/Living Roofs",
      "solar-roofs": "Solar Roofs"
    }
  },
  
  "contractor-guides": {
    name: "Contractor Guides",
    description: "How to find, vet, and work with roofing contractors",
    icon: "👷",
    subcategories: {
      "finding-contractors": "Finding Local Contractors",
      "vetting-contractors": "Vetting & Background Checks",
      "getting-quotes": "Getting & Comparing Quotes",
      "contracts-agreements": "Contracts & Agreements",
      "payment-schedules": "Payment Schedules",
      "warranties-guarantees": "Warranties & Guarantees",
      "project-management": "Project Management Tips",
      "dispute-resolution": "Dispute Resolution"
    }
  },
  
  "repair-vs-replace": {
    name: "Repair vs Replace",
    description: "Decision guides for when to repair or replace your roof",
    icon: "⚖️",
    subcategories: {
      "damage-assessment": "Damage Assessment",
      "age-considerations": "Age Considerations",
      "cost-analysis": "Cost Analysis",
      "long-term-value": "Long-term Value",
      "insurance-claims": "Insurance Claims",
      "diy-vs-pro": "DIY vs Professional",
      "timing-decisions": "Timing Decisions",
      "emergency-repairs": "Emergency Repairs"
    }
  },
  
  "maintenance-tips": {
    name: "Maintenance Tips",
    description: "Seasonal maintenance, inspection checklists, and preventative care",
    icon: "🔧",
    subcategories: {
      "seasonal-maintenance": "Seasonal Maintenance",
      "inspection-checklists": "Inspection Checklists",
      "gutter-cleaning": "Gutter Cleaning & Maintenance",
      "leak-detection": "Leak Detection",
      "ventilation-systems": "Ventilation Systems",
      "insulation-guides": "Insulation Guides",
      "weather-protection": "Weather Protection",
      "safety-tips": "Safety Tips"
    }
  },
  
  "local-contractors": {
    name: "Local Contractors",
    description: "Directory of verified local roofing contractors by region",
    icon: "📍",
    subcategories: {
      "by-state": "By State/Province",
      "by-city": "By City",
      "verified-contractors": "Verified Contractors",
      "customer-reviews": "Customer Reviews",
      "specialty-contractors": "Specialty Contractors",
      "emergency-services": "Emergency Services",
      "free-estimates": "Free Estimate Providers"
    }
  }
};

// Helper: Get display name
export function getCategoryDisplay(categoryPath) {
  if (!categoryPath) return '';
  
  const [pillar, sub] = categoryPath.split('/');
  const pillarData = CATEGORY_HIERARCHY[pillar];
  
  if (!pillarData) return categoryPath;
  
  if (sub && pillarData.subcategories[sub]) {
    return pillarData.name + " > " + pillarData.subcategories[sub];
  }
  
  return pillarData.name;
}

// Helper: Get all main categories
export function getMainCategories() {
  return Object.entries(CATEGORY_HIERARCHY).map(([slug, data]) => ({
    slug,
    name: data.name,
    description: data.description,
    icon: data.icon,
    subcategories: Object.entries(data.subcategories).map(([subSlug, subName]) => ({
      slug: `${slug}/${subSlug}`,
      name: subName
    }))
  }));
}

// Helper: Get category by slug
export function getCategoryBySlug(slug) {
  return CATEGORY_HIERARCHY[slug];
}

// Helper: Get subcategory by path
export function getSubcategoryByPath(path) {
  const [pillar, sub] = path.split('/');
  const pillarData = CATEGORY_HIERARCHY[pillar];
  
  if (!pillarData || !sub) return null;
  
  return {
    pillar: pillarData.name,
    subcategory: pillarData.subcategories[sub],
    fullPath: path
  };
}