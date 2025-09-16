# Repository Guidelines

## Project Structure & Module Organization
Hugo content lives in `content/` (e.g., `content/posts/2025-09-03-building-distributed-event-log-with-sqlite.md`), with page bundles following `YYYY-MM-DD-slug.md` naming. Layouts and shortcodes reside in `layouts/`, while shared SCSS, JS, and pipeline assets live in `assets/`. Static files (images, fonts, robots.txt) belong in `static/`, and compiled artifacts land in `public/` (generated—do not edit). The Cloudflare Worker that powers the contact form is implemented in `src/index.js`; update it alongside its configuration in `wrangler.toml` and `worker-configuration.d.ts`.

## Build, Test, and Development Commands
`npm run dev` starts the local Hugo server with drafts and future-dated posts for content review. `npm run build` runs `hugo --minify` to produce the publishable site in `public/`. `npm run workers:dev` launches the Worker in Wrangler's simulator; pair it with a local tunnel to test the contact form end to end. `npm run workers:deploy` deploys the Worker to production, and `npm run workers:preview` targets the `preview` environment. Use `npm run clean` before regenerating the site when static artifacts get out of sync.

## Coding Style & Naming Conventions
Keep Worker code in modern ESM with two-space indentation and descriptive helper functions (e.g., `checkRateLimit`, `generateEmailTemplate`). Shared constants should be SCREAMING_SNAKE_CASE, while request handlers stay in camelCase. For Hugo content, author posts in Markdown with YAML front matter containing `layout`, `title`, `date`, and taxonomy arrays. Media assets should use kebab-case filenames and live alongside content when possible.

## Testing Guidelines
There is no automated test suite today, so treat `npm run build` as the primary regression gate—it must succeed before any pull request. When editing the Worker, run `npm run workers:dev` and exercise happy-path plus rate-limit scenarios. Capture regressions by linking reproducible steps or short Loom clips if behavior changes.

## Commit & Pull Request Guidelines
Git history currently relies on concise one-liners; continue using an imperative subject that describes the change, e.g., `Add rate limiting to contact form`. Open pull requests with a summary of the change, screenshots for visual updates, and links to Hugo preview URLs or Wrangler preview deployments. Reference related issues and note any config updates (DNS, environment variables) in the PR description so reviewers and operators can act quickly.
