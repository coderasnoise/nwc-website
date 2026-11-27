import { describe, it, expect } from 'vitest';
import { wpPostToMarkdown } from '../src/lib/wp-import';

const post = {
  slug: 'rhinoplasty-recovery',
  title: { rendered: 'Recovery &amp; Care &#8211; A Guide' },
  date: '2024-03-05T10:00:00',
  content: { rendered: '<style>p{color:red}</style><h2>Week 1</h2><p>Rest &amp; <a href="https://x.com/a">read</a>.</p><ul><li>One</li><li>Two</li></ul><script>alert(1)</script>' },
};

describe('wpPostToMarkdown', () => {
  const out = wpPostToMarkdown(post);
  it('names the file by slug', () => expect(out.filename).toBe('rhinoplasty-recovery.md'));
  it('decodes the title and keeps it quote-safe', () => {
    expect(out.body).toContain('title: "Recovery & Care – A Guide"');
  });
  it('converts html to markdown', () => {
    expect(out.body).toContain('## Week 1');
    expect(out.body).toContain('[read](https://x.com/a)');
    expect(out.body).toMatch(/-\s+One/);
  });
  it('strips scripts and styles', () => {
    expect(out.body).not.toMatch(/alert\(1\)|color:red|<script|<style/);
  });
  it('is always a draft', () => expect(out.body).toContain('draft: true'));
  it('escapes double quotes in titles', () => {
    const o = wpPostToMarkdown({ ...post, title: { rendered: 'The "best" way' } });
    expect(o.body).toContain('title: "The \\"best\\" way"');
  });
});
