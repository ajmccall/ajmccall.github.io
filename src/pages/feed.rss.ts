import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { postDate, postSlug, publishedPosts } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("RSS requires site to be set in astro.config.mjs");

	return rss({
		title: "Alasdair McCall | alasdair.md",
		description: "Writing on mobile engineering, technology, and building software.",
		site,
		items: publishedPosts(await getCollection("posts")).map((post) => ({
			title: post.data.description ?? post.id,
			pubDate: postDate(post.data.date),
			link: `/blog/${postSlug(post)}/`,
		})),
	});
};
