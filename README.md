This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy to GitHub Pages (static export)

This project can be exported as a static site and hosted on GitHub Pages. Because GitHub Pages only serves static files, server features such as API routes and middleware are not available in that environment. This repository uses in-memory/mock data for the UI, so a static export works for demo purposes.

Steps to enable GitHub Pages deployment:

- A GitHub Actions workflow has been added at `.github/workflows/gh-pages.yml` to build and publish the exported static site to the `gh-pages` branch on pushes to `main`.
- The `next.config.ts` is configured to use `output: 'export'` and will set `basePath` automatically when run inside GitHub Actions.
- A new npm script `npm run export` runs `next build && next export` and writes static files to the `out/` directory.

Note: The project `middleware.ts` was moved to `server/middleware.ts` because middleware is server-only and incompatible with static export.

If you want to preview the exported site locally:

```bash
npm ci
npm run export

# serve the exported files (install a static server if you don't have one)
npx http-server out -p 8080

# then open http://localhost:8080
```

If you prefer to host the app with full Next.js features (server, API routes, middleware), consider Vercel or Netlify instead of GitHub Pages.
