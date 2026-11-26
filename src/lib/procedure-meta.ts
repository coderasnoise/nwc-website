export const PROCEDURE_ORDER = [
  'deep-plane-facelift',
  'necklift',
  'temporal-lift',
  'upper-eyelid',
  'lower-eyelid',
  'browlift',
  'lip-lift',
  'body-surgery',
] as const;

export function diffSlugs(en: string[], tr: string[]): void {
  const missingTr = en.filter((s) => !tr.includes(s));
  const missingEn = tr.filter((s) => !en.includes(s));
  if (missingTr.length) throw new Error(`Missing TR: ${missingTr.join(', ')}`);
  if (missingEn.length) throw new Error(`Missing EN: ${missingEn.join(', ')}`);
}

export function sortBySlugOrder<T extends { slug: string }>(items: T[]): T[] {
  const rank = (s: string) => {
    const i = (PROCEDURE_ORDER as readonly string[]).indexOf(s);
    return i === -1 ? 999 : i;
  };
  return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}
