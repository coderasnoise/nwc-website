import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { PROCEDURE_ORDER } from '../src/lib/procedure-meta';

const read = (p: string) => readFileSync(`dist${p}index.html`, 'utf8');
const h1s = (h: string) => (h.match(/<h1[\s>]/g) ?? []).length;
const waTexts = (h: string) =>
  [...h.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map(
    (m) => new URL(m[1].replaceAll('&amp;', '&')).searchParams.get('text') ?? '',
  );
const waText = (h: string) => waTexts(h).join(' | ');

describe('procedure pages', () => {
  for (const slug of PROCEDURE_ORDER) {
    it(`${slug} EN and TR`, () => {
      for (const [lang, path] of [['en', `/procedures/${slug}/`], ['tr', `/tr/islemler/${slug}/`]] as const) {
        const html = read(path);
        expect(h1s(html), path).toBe(1);
        expect(html).toContain(`<html lang="${lang}"`);
        expect(waText(html).length, path).toBeGreaterThan(10);
        expect(html).not.toMatch(/<form|€|\$\d|\bprice\b|\bfiyat\b/i);
      }
    });
  }
  it('whatsapp text names the procedure', () => {
    expect(waText(read('/procedures/lip-lift/'))).toContain('Lip lift');
    expect(waText(read('/tr/islemler/lip-lift/'))).toContain('Dudak kaldırma');
  });
  it('index pages list all procedures', () => {
    for (const p of ['/procedures/', '/tr/islemler/'])
      for (const s of PROCEDURE_ORDER) expect(read(p)).toContain(s);
  });
});

describe('doctor pages', () => {
  it('mention only the Turkish board', () => {
    const en = read('/doctor/'), tr = read('/tr/doktor/');
    expect(en).toMatch(/Turkish board/i);
    expect(tr).toMatch(/board sertifika/i);
    for (const h of [en, tr]) expect(h).not.toMatch(/ISAPS|ASPS|ABPS|American Board|FRCS|EBOPRAS/);
    expect(existsSync('dist/doctor/index.html')).toBe(true);
  });
});
