import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { site, REVIEW_NOTICE, REVIEW_NOTICE_TR } from '../src/config/site';
import { redirectRules } from '../src/lib/redirects';

function walk(d: string): string[] {
  return readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f === 'index.html' ? [join(d, f)] : []));
}
const pages = walk('dist').map((f) => [f, readFileSync(f, 'utf8')] as const);

describe('redirect rules file', () => {
  const rules = redirectRules().split('\n').filter((l) => l && !l.startsWith('#')).map((l) => l.split(' '));
  it('has no rule that redirects to itself', () => {
    for (const [from, to] of rules) expect(from, `${from} -> ${to}`).not.toBe(to);
  });
  it('emitted public/_redirects matches the generator', () => {
    expect(readFileSync('public/_redirects', 'utf8')).toBe(redirectRules());
  });
});

describe('draft mode guard', () => {
  it('while draftMode is on, every page is noindex and shows the review notice', () => {
    expect(site.draftMode).toBe(true);
    for (const [f, h] of pages) {
      expect(h, f).toContain('<meta name="robots" content="noindex"');
      expect(h, f).toContain(h.includes('<html lang="tr"') ? REVIEW_NOTICE_TR : REVIEW_NOTICE);
    }
    expect(readFileSync('dist/robots.txt', 'utf8')).toMatch(/Disallow: \//);
  });
});

describe('one-language blog post', () => {
  it('EN-only post has a self canonical and no hreflang to a missing page', () => {
    const html = readFileSync('dist/blog/what-to-bring-sample/index.html', 'utf8');
    expect(html).toContain('rel="canonical" href="https://northwesternclinic.com/blog/what-to-bring-sample/"');
    expect(html).not.toContain('<link rel="alternate" hreflang="tr"');
  });
});
