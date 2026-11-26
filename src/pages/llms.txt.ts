import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { procedurePath } from '../lib/procedure-meta';

export async function GET() {
  const procs = (await getCollection('procedures')).filter((e) => e.id.startsWith('en/'));
  const lines = [
    `# ${site.name}`,
    '',
    `> Plastic surgery in Istanbul led by ${site.doctor.name}, a Turkish board-certified plastic surgeon. Facial rejuvenation and body contouring. Contact is through WhatsApp only: a free online consultation, then a personal surgery plan and quote. No prices are published.`,
    '',
    '## Key pages',
    `- [Dr. Tolga Aksan](${site.url}/doctor/): surgeon profile (Turkish: ${site.url}/tr/doktor/)`,
    `- [Procedures](${site.url}/procedures/): all procedures (Turkish: ${site.url}/tr/islemler/)`,
    `- [Patient journey](${site.url}/journey/): how it works`,
    `- [Reviews](${site.url}/reviews/): independent reviews on Trustpilot and Google`,
    `- [Blog](${site.url}/blog/)`,
    '',
    '## Procedures',
    ...procs.map((e) => `- [${e.data.title}](${site.url}${procedurePath('en', e.id.split('/')[1])}): ${e.data.summary}`),
    '',
    '## Contact',
    `- WhatsApp: https://wa.me/${site.whatsappNumber}`,
    `- Address: ${site.address}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
