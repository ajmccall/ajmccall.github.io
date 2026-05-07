# alasdair.md — Agent Instructions

Personal website and blog for Alasdair McCall. Built with Astro 5, deployed as a static site.

## Stack

- **Framework**: Astro 5 (static output, no JS framework)
- **Styling**: Plain CSS at `public/styles.css`
- **Content**: Markdown files in `posts/` loaded via Astro Content Collections
- **Package manager**: npm

## Running locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output to dist/
npm run preview   # preview the built site
```

## Project structure

```
posts/            # Blog post markdown files (source of truth)
public/           # Static assets: styles.css, images/, favicon
src/
  components/
    ResumeContent.astro         # Public/default resume
    ResumeContentTargeted.astro # Targeted resume variant
  content/
    config.ts                    # Content collection schema for posts
  layouts/
    Layout.astro                 # Master layout — header, nav, meta tags
  pages/
    index.astro                  # Home page
    resume/index.astro           # /resume/
    resume-targeted/index.astro  # hidden/known-url resume variant
    blog/
      index.astro                # Blog listing page
      [slug].astro               # Individual post pages
legacy/                          # Old site/resume files kept for reference only
```

## Adding a blog post

Create a new markdown file in `posts/` with this frontmatter:

```markdown
---
date: YYYY-MM-DD HH:MM
description: Short title / description of the post
filename: the-post-slug
tags:
---

Post content here...
```

- `filename` should match the filename (without `.md`) — used as the URL slug
- `tags` can be left empty or omitted
- The file is auto-picked up by the Content Collection — no registration needed
- URL will be `/blog/<filename>/`

## Updating the resume

- Public/default resume: `src/components/ResumeContent.astro`
- Targeted/hidden resume: `src/components/ResumeContentTargeted.astro`
- Current resume copy lives in `src/content/resume-*.md`
- Targeted resume copy lives in `src/content/resume-*-targeted.md`
- Legacy files live in `legacy/` for reference only and should not be reused for live pages unless intentionally migrated.
- Whenever resume copy or layout changes, include a print/PDF readability check before finishing. At minimum, review `/resume/` in print context or generate a PDF using browser print/Cmd-P/headless Chrome and confirm the content reads cleanly, page breaks are sensible, and no section is awkwardly split.

Sections follow this pattern:

- `<h1>` — section heading (e.g. "I'm currently", "I've done", "I've been")
- `<h3>` — role title
- `<p class="resume-company">` — company + dates
- `<ul class="resume-skills">` — hashtag skill list
- `<ul class="portfolio">` — app icons with descriptions
- `<ul class="find-me">` — social/contact links with SVG icons

## Updating meta tags / SEO

`Layout.astro` accepts props:

```astro
<Layout
  title="Page Title | alasdair.md"
  description="Short description for search engines"
  canonical="https://alasdair.md/page-path/"
>
```

Defaults: title `"Alasdair McCall | alasdair.md"`, description `"Alasdair's blog and resume"`, canonical `"https://alasdair.md"`.

## Styling conventions

- All styles in `public/styles.css` — no scoped component styles
- Dark mode via `@media (prefers-color-scheme: dark)`
- Print styles via `@media print` — `.print-only` class shows only on print
- Responsive breakpoint at 600px
- Max content width: 900px via `.wrapper`
- Key classes: `.item-list`, `.resume-skills`, `.find-me`, `.portfolio`, `.tag-list`

## Content collections

Schema defined in `src/content/config.ts`. Posts are loaded from the top-level `posts/` directory using the glob loader. Fields: `date` (string), `description` (optional string), `filename` (optional string), `tags` (optional nullable string array).

## GitHub workflow

- Single branch: `main`
- Commit directly to main for content updates (blog posts, resume edits)
- Use feature branches for structural/layout changes if significant
- No CI/CD configured yet — build and deploy manually

## Things to keep in mind

- `posts/index.md` is a stub — it's filtered out of the blog listing
- The home page (`/`) and `/resume/` both render `ResumeContent` — they are intentionally the same content at different URLs
- Portfolio images live in `public/images/portfolio/`
- Favicon at `public/images/favicon.png`
- RSS feed linked in `<head>` at `/feed.rss` — not yet implemented
