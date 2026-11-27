import { describe, it, expect } from 'vitest';
import { localePath, otherLang, t } from '../src/i18n';

describe('i18n', () => {
  it('builds locale paths', () => {
    expect(localePath('en', '/doctor')).toBe('/doctor/');
    expect(localePath('tr', '/doctor')).toBe('/tr/doctor/');
    expect(localePath('tr', '/')).toBe('/tr/');
    expect(localePath('en', '/')).toBe('/');
  });
  it('switches language', () => {
    expect(otherLang('en')).toBe('tr');
    expect(otherLang('tr')).toBe('en');
  });
  it('throws on missing key', () => {
    expect(() => t('en', 'no.such.key')).toThrow();
  });
  it('returns strings in both languages', () => {
    expect(t('en', 'nav.cta')).not.toBe(t('tr', 'nav.cta'));
  });
});
