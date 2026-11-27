import TurndownService from 'turndown';

export type WpPost = {
  slug: string;
  title: { rendered: string };
  date: string;
  content: { rendered: string };
};

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

export function wpPostToMarkdown(post: WpPost): { filename: string; body: string } {
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
  td.remove(['script', 'style']);
  const html = post.content.rendered.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
  const title = decodeEntities(post.title.rendered).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const front = [
    '---',
    `title: "${title}"`,
    `date: ${post.date.slice(0, 10)}`,
    'author: "Dr. Tolga Aksan"',
    'draft: true',
    '---',
    '',
  ].join('\n');
  return { filename: `${post.slug}.md`, body: `${front}${td.turndown(html)}\n` };
}
