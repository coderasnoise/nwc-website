import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { REVIEW_NOTICE, REVIEW_NOTICE_TR } from '../src/config/site';

const read = (p: string) => readFileSync(`dist${p}index.html`, 'utf8');
const EN = ['results', 'journey', 'reviews', 'team', 'clinic', 'privacy', 'terms'];
const TR = ['sonuclar', 'yolculuk', 'yorumlar', 'ekip', 'klinik', 'gizlilik', 'kosullar'];

describe('info pages', () => {
  it('exist in both languages with one h1 and no prices or forms', () => {
    for (const [list, prefix, lang] of [[EN, '/', 'en'], [TR, '/tr/', 'tr']] as const)
      for (const s of list) {
        const html = read(`${prefix}${s}/`);
        expect((html.match(/<h1[\s>]/g) ?? []).length, s).toBe(1);
        expect(html).toContain(`<html lang="${lang}"`);
        expect(html).not.toMatch(/<form|€|\$\d|\bprice\b|\bfiyat\b/i);
      }
  });
  it('draft pages carry the review notice', () => {
    for (const s of ['privacy', 'terms', 'team', 'results']) expect(read(`/${s}/`)).toContain(REVIEW_NOTICE);
    for (const s of ['gizlilik', 'kosullar', 'ekip', 'sonuclar']) expect(read(`/tr/${s}/`)).toContain(REVIEW_NOTICE_TR);
  });
  it('results page makes no guarantee and marks placeholders', () => {
    expect(read('/results/')).toMatch(/placeholder/i);
    expect(read('/results/')).toMatch(/not guaranteed|no guarantee|vary/i);
    expect(read('/tr/sonuclar/')).toMatch(/garanti/i);
  });
});
