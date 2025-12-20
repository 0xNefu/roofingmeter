import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const postsDir = path.join(process.cwd(), 'src/content/posts');
const files = await glob(`${postsDir}/**/*.md`);

console.log(`Found ${files.length} markdown files. Aggressively fixing frontmatter...\n`);

let fixedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\n---/);
  if (!frontmatterMatch) continue;

  let lines = frontmatterMatch[1].split('\n');
  let newLines = [];
  let changed = false;

  for (let line of lines) {
    let trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      newLines.push(line);
      continue;
    }

    // Move inline comments to their own line
    if (trimmed.includes('#') && !trimmed.startsWith('#')) {
      const parts = trimmed.split('#');
      newLines.push(parts[0].trim());
      if (parts[1]) newLines.push(`# ${parts[1].trim()}`);
      changed = true;
      continue;
    }

    // Fix title and description: ensure properly double-quoted
    if (trimmed.startsWith('title:') || trimmed.startsWith('description:')) {
      let key = trimmed.split(':')[0];
      let value = trimmed.slice(key.length + 1).trim();

      // Remove trailing stray ' or " if present
      value = value.replace(/['"]+$/, '');

      // If not already quoted, wrap in double quotes and escape inner ones
      if (!value.startsWith('"') && !value.startsWith("'")) {
        value = '"' + value.replace(/"/g, '\\"') + '"';
        changed = true;
      } else if (value.startsWith("'") && value.endsWith("'")) {
        // Convert single to double for consistency
        value = '"' + value.slice(1, -1).replace(/"/g, '\\"') + '"';
        changed = true;
      } else if (value.startsWith('"')) {
        // Ensure it ends properly and escape inner quotes
        if (!value.endsWith('"') || value.includes("'")) {
          let inner = value.slice(1);
          inner = inner.replace(/"/g, '\\"');
          value = '"' + inner.replace(/'$/, '') + '"';
          changed = true;
        }
      }

      newLines.push(`${key}: ${value}`);
      continue;
    }

    // Remove duplicate draft lines — keep only last
    if (trimmed.startsWith('draft:')) {
      continue; // we'll add it back at the end if needed
    }

    // Pass through other lines
    newLines.push(line);
  }

  // Re-add draft if it existed (use last known value, default false)
  let hadDraft = lines.some(l => l.trim().startsWith('draft:'));
  if (hadDraft) {
    const lastDraft = lines.reverse().find(l => l.trim().startsWith('draft:'));
    const value = lastDraft.trim().split(':')[1].trim() || 'false';
    newLines.push(`draft: ${value}`);
  }

  let newFrontmatter = newLines.join('\n');

  if (newFrontmatter !== frontmatterMatch[1].trim()) {
    changed = true;
    fixedCount++;
    const newContent = '---\n' + newFrontmatter.trim() + '\n---' + content.slice(frontmatterMatch[0].length);
    fs.writeFileSync(file, newContent);
    console.log(`Fixed: ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`\nDone! Fixed ${fixedCount} files.`);
console.log(`Now run: npm run build`);