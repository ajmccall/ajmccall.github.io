import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './posts' }),
	schema: z.object({
		date: z.string(),
		description: z.string().optional(),
		filename: z.string().optional(),
		tags: z.array(z.string()).optional().nullable(),
	}),
});

export const collections = { posts };
