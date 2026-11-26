import en from './en.json';
import tr from './tr.json';

export type Lang = 'en' | 'tr';
export const LANGS: Lang[] = ['en', 'tr'];
const dict: Record<Lang, Record<string, string>> = { en, tr };

export function localePath(lang: Lang, path: string): string {
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p += '/';
  return lang === 'en' ? p : p === '/' ? '/tr/' : `/tr${p}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'tr' : 'en';
}

export function t(lang: Lang, key: string, vars: Record<string, string> = {}): string {
  const value = dict[lang][key];
  if (value === undefined) throw new Error(`Missing i18n key "${key}" for "${lang}"`);
  return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), value);
}
