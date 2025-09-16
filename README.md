# Lloyd Moore Blog

Static site for lloydmoore.com built with Hugo and deployed to Cloudflare Workers.

## Quickstart

1. Install [Hugo](https://gohugo.io/getting-started/installing/) and Node.js 18 or newer.
2. Install dependencies with `npm install`.
3. Run `npm run dev` to preview the site locally with drafts and future-dated posts.

## Contributor Checklist

Before opening a pull request, review [`AGENTS.md`](./AGENTS.md) for project structure, coding conventions, and deployment workflows. That guide also covers Wrangler commands for the contact-form Worker and the manual checks expected when no automated tests are available.

Writing style guidance for posts and docs lives in [`CLAUDE.md`](./CLAUDE.md); keep it handy alongside `AGENTS.md` when authoring content.

## Deployment Notes

- `npm run build` runs `hugo --minify` to produce the `public/` folder.
- `npm run workers:deploy` publishes the contact-form Worker; use `npm run workers:preview` for preview environments.
- Production hosting is handled by Cloudflare Pages + Workers. Update `wrangler.toml` and `worker-configuration.d.ts` together when changing Worker bindings.
