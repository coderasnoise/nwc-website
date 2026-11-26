import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(d: string): string[] {
  return readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f === 'index.html' ? [join(d, f)] : []));
}
const toPath = (url: string) => new URL(url).pathname;
const pages = walk('dist').map((f) => {
  const html = readFileSync(f, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const alts = Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="(en|tr)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  return { f, path: '/' + f.replace(/^dist\//, '').replace(/index\.html$/, ''), canonical, alts };
});

describe('hreflang and canonical', () => {
  it('every page has a self-referencing canonical', () => {
    for (const p of pages) {
      expect(p.canonical, p.f).toBeDefined();
      expect(toPath(p.canonical!), p.f).toBe(p.path);
    }
  });
  it('alternates are reciprocal', () => {
    const byPath = new Map(pages.map((p) => [p.path, p]));
    for (const p of pages)
      for (const [lang, url] of Object.entries(p.alts)) {
        const target = byPath.get(toPath(url));
        expect(target, `${p.path} -> ${url}`).toBeDefined();
        const back = Object.values(target!.alts).map(toPath);
        expect(back, `${toPath(url)} should link back to ${p.path}`).toContain(p.path);
        expect(lang === 'tr' ? toPath(url).startsWith('/tr/') : !toPath(url).startsWith('/tr/')).toBe(true);
      }
  });
});
