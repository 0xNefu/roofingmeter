// Roofing-specific article generator
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const categories = [
  'roof-cost-calculators',
  'material-comparisons', 
  'contractor-guides',
  'repair-vs-replace',
  'maintenance-tips',
  'local-contractors'
];

function createArticle({ title, category = 'general', tags = [] }) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  
  const date = new Date().toISOString().split('T')[0];
  const categoryDir = join(process.cwd(), 'src', 'content', category);
  
  // Create category directory if it doesn't exist
  if (!existsSync(categoryDir)) {
    mkdirSync(categoryDir, { recursive: true });
  }
  
  const filePath = join(categoryDir, `${slug}.md`);
  
  const content = `---
title: "${title}"
description: "Learn about ${title} for your roofing project. Get expert tips and cost estimates."
date: "${date}"
category: "${category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
roofingType: "residential"
difficulty: "beginner"
estimatedCost: ""
timeRequired: ""
---

# ${title}

## Why ${title} Matters for Your Roof

[Start with importance and benefits]

## Key Considerations

- Factor 1
- Factor 2  
- Factor 3

## Cost Breakdown

| Item | Estimated Cost | Notes |
|------|---------------|-------|
| Materials | | |
| Labor | | |
| Additional Costs | | |

## Step-by-Step Guide

1. **Step 1**
2. **Step 2**
3. **Step 3**

## Professional Tips

> 💡 Pro tip: [Expert advice here]

## When to Call a Professional

[Guidance on DIY vs professional]

## Frequently Asked Questions

### Q: [Common question]?
A: [Answer]

### Q: [Another question]?
A: [Answer]

## Next Steps

[Call to action - calculator, find contractors, etc.]
`;

  writeFileSync(filePath, content);
  console.log(`✅ Created roofing article: ${filePath}`);
  return filePath;
}

// Example usage
if (process.argv[2] === '--example') {
  createArticle({
    title: 'How Much Does a New Roof Cost in 2024',
    category: 'roof-cost-calculators',
    tags: ['cost', 'estimates', 'budgeting', 'new-roof']
  });
}

export { createArticle };