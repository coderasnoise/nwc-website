import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function walk(d: string): string[] {
  return readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith('.html') ? [join(d, f)] : []));
}
const files = walk('dist');
const htmls = files.map((f) => [f, readFileSync(f, 'utf8')] as const);

describe('build quality', () => {
  it('builds the expected number of pages', () => expect(files.length).toBeGreaterThanOrEqual(40));
  it('every page has lang, one h1, a title and a description', () => {
    for (const [f, h] of htmls) {
      expect(h, f).toMatch(/<html lang="(en|tr)"/);
      expect((h.match(/<h1[\s>]/g) ?? []).length, f).toBe(1);
      expect(h, f).toMatch(/<title>[^<]{5,}<\/title>/);
      expect(h, f).toMatch(/<meta name="description" content="[^"]{20,}/);
    }
  });
  it('titles are unique', () => {
    const titles = htmls.map(([, h]) => h.match(/<title>([^<]*)<\/title>/)![1]);
    expect(new Set(titles).size).toBe(titles.length);
  });
  it('every img has alt, width and height', () => {
    for (const [f, h] of htmls)
      for (const [tag] of h.matchAll(/<img\b[^>]*>/g)) {
        expect(tag, f).toMatch(/\balt=/);
        expect(tag, f).toMatch(/\bwidth=/);
        expect(tag, f).toMatch(/\bheight=/);
      }
  });
  it('loads no third-party scripts or forbidden content anywhere', () => {
    for (const [f, h] of htmls) {
      expect(h, f).not.toMatch(/<script[^>]+src=/);
      expect(h, f).not.toMatch(/<form|<input|swedish|svenska|\/sv\//i);
      expect(h, f).not.toMatch(/dental|hair transplant|saç ekimi|obesity|gastric/i);
      expect(h, f).not.toContain('nortwestern');
    }
  });
  it('ships robots, llms.txt, redirects and sitemap', () => {
    for (const f of ['robots.txt', 'llms.txt', '_redirects', 'sitemap-index.xml']) expect(existsSync(`dist/${f}`), f).toBe(true);
  });
});
