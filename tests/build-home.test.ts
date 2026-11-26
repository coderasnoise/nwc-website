import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { PROCEDURE_ORDER } from '../src/lib/procedure-meta';

const page = (p: string) => readFileSync(`dist/${p}index.html`, 'utf8');
const h1s = (h: string) => (h.match(/<h1[\s>]/g) ?? []).length;

describe.each([
  ['en', '', (s: string) => `/procedures/${s}/`],
  ['tr', 'tr/', (s: string) => `/tr/islemler/${s}/`],
] as const)('home (%s)', (lang, dir, proc) => {
  const html = page(dir);
  it('has one h1 and a whatsapp link', () => {
    expect(h1s(html)).toBe(1);
    expect(html).toContain('wa.me/905421548578');
  });
  it('links all featured procedures', () => {
    for (const s of PROCEDURE_ORDER) expect(html).toContain(`href="${proc(s)}"`);
  });
  it('has no prices or forms', () => {
    expect(html).not.toMatch(/<form|<input|€|\$\d|£|\bprice\b|\bfiyat\b/i);
  });
  it('sets the language', () => {
    expect(html).toContain(`<html lang="${lang}"`);
  });
});
