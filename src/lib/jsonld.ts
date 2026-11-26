import { site } from '../config/site';
import { procedurePath } from './procedure-meta';
import type { Lang } from '../i18n';

const abs = (path: string) => new URL(path, site.url).href;

export function physicianJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: site.doctor.name,
    medicalSpecialty: 'PlasticSurgery',
    jobTitle: site.doctor.title[lang],
    url: abs(lang === 'en' ? '/doctor/' : '/tr/doktor/'),
    worksFor: { '@type': 'MedicalClinic', name: site.name, url: site.url },
    knowsLanguage: ['en', 'tr'],
  };
}

export function clinicJsonLd(lang: Lang) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.name,
    url: abs(lang === 'en' ? '/' : '/tr/'),
    telephone: site.phoneDisplay,
    address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Üsküdar, İstanbul', addressCountry: 'TR' },
    medicalSpecialty: 'PlasticSurgery',
    founder: { '@type': 'Physician', name: site.doctor.name },
  };
  const agg = site.reviewLinks.aggregate;
  if (agg) base.aggregateRating = { '@type': 'AggregateRating', ratingValue: agg.rating, reviewCount: agg.count };
  return base;
}

export function procedureJsonLd(lang: Lang, p: { slug: string; title: string; summary: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: p.title,
    description: p.summary,
    url: abs(procedurePath(lang, p.slug)),
    procedureType: 'https://schema.org/SurgicalProcedure',
    performer: { '@type': 'Physician', name: site.doctor.name },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
