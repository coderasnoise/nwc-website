import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';
import { localePath } from '../i18n';
import { sortBySlugOrder } from './procedure-meta';

export type Procedure = { slug: string; title: string; summary: string; group: 'face' | 'body'; order: number; body: string | undefined };

export async function getProcedures(lang: Lang): Promise<Procedure[]> {
  const all = await getCollection('procedures');
  const mine = all
    .filter((e) => e.id.startsWith(`${lang}/`))
    .map((e) => ({ slug: e.id.split('/')[1].replace(/\.md$/, ''), ...e.data, body: e.body }));
  return sortBySlugOrder(mine);
}

export function procedurePath(lang: Lang, slug: string): string {
  return lang === 'en' ? `/procedures/${slug}/` : localePath('tr', `/islemler/${slug}`);
}

export function proceduresIndexPath(lang: Lang): string {
  return lang === 'en' ? '/procedures/' : '/tr/islemler/';
}
