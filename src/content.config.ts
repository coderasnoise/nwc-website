import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const procedures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/procedures' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    group: z.enum(['face', 'body']),
    order: z.number(),
  }),
});

const doctor = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/doctor' }),
  schema: z.object({ name: z.string(), title: z.string() }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faq' }),
  schema: z.object({ items: z.array(z.object({ q: z.string(), a: z.string() })) }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Dr. Tolga Aksan'),
    draft: z.boolean().default(true),
    description: z.string().optional(),
  }),
});

export const collections = { procedures, doctor, faq, blog };
