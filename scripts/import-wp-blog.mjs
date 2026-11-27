// Usage: node --experimental-strip-types scripts/import-wp-blog.mjs https://northwesternclinic.com src/content/blog/en
// Imports WordPress posts as DRAFT markdown files. Review and update each post before setting draft: false.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { wpPostToMarkdown } from '../src/lib/wp-import.ts';

const [base, outDir] = process.argv.slice(2);
if (!base || !outDir) {
  console.error('Usage: import-wp-blog.mjs <baseUrl> <outDir>');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
let page = 1;
let total = 0;
for (;;) {
  const res = await fetch(`${base}/wp-json/wp/v2/posts?per_page=100&page=${page}`);
  if (res.status === 400) break; // past the last page
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  const posts = await res.json();
  if (!posts.length) break;
  for (const post of posts) {
    const { filename, body } = wpPostToMarkdown(post);
    writeFileSync(join(outDir, filename), body);
    total++;
  }
  page++;
}
console.log(`Imported ${total} posts into ${outDir} as drafts.`);
