import type { CollectionEntry } from "astro:content";

type Post = Pick<CollectionEntry<"posts">, "id" | "data">;

export function postSlug(post: Post): string {
	return post.data.filename || post.id;
}

// Frontmatter dates have no timezone. Treat them as UTC for reproducible builds.
export function postDate(value: string): Date {
	const normalized = value.replace(" ", "T");
	const date = new Date(`${normalized}Z`);
	if (
		!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(normalized) ||
		Number.isNaN(date.getTime()) ||
		date.toISOString().slice(0, 16) !== normalized
	) {
		throw new Error(`Invalid post date: ${value}. Expected YYYY-MM-DD HH:MM.`);
	}
	return date;
}

export function publishedPosts<T extends Post>(posts: T[]): T[] {
	return posts
		.filter((post) => post.id !== "index")
		.sort((a, b) => postDate(b.data.date).getTime() - postDate(a.data.date).getTime());
}
