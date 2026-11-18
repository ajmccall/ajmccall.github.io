// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alasdair.md',
	// Preserve HTML whitespace when upgrading from Astro 5/6.
	compressHTML: true,
	devToolbar: {
		enabled: false,
	},
});
