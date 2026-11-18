# alasdair.md

Personal website and resume for Alasdair McCall.
Built with Astro and deployed as a static site.

## Commands

Use Node 24 LTS (`nvm use` reads `.nvmrc`).

```bash
npm ci
npm run dev
npm run build
npm run preview
npm run verify   # type checks, static build, and regression tests
```

Pushes to `main` run verification and deploy to GitHub Pages. Dependency versions are pinned by `package-lock.json`.

## Resume PDF

Open `/resume/`, press Cmd-P, and save as PDF at 100% scale with browser headers/footers disabled. Print styles support light/dark screen themes and retain portfolio icons. Check both pages after changing resume content or CSS.

`public/alasdair-mccall-resume.pdf` is a downloadable A4 snapshot, not generated automatically by the build. Refresh it after resume changes.

## Blog

Posts come from `posts/`, with the schema in `src/content.config.ts`. Frontmatter dates use `YYYY-MM-DD HH:MM` and are interpreted as UTC for consistent builds. The `filename` field sets the URL slug, falling back to the file ID. `/feed.rss` is generated from the same published posts as the blog listing.

## Structure

- `src/pages/` — site pages
- `src/components/` — Astro components
- `src/content/` — current resume content
- `src/data/` — structured data such as tools
- `public/` — static assets and global CSS
- `posts/` — blog posts
- `legacy/` — old site/resume files kept for reference only, not publicly served
- `tests/` — date/slug logic and built-site regression checks

## Known content gaps

Two older blog posts reference three images that are missing from the repository: `post-apple-ux-apple.gif`, `post-apple-ux-normal.gif`, and `post-using-xcode-pull-request-xcode.png` (under `public/images/`). Restore the originals when available; the review did not substitute or remove historical content.
