# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router project using JavaScript, React, Tailwind CSS, and Supabase.

- `app/` contains active routes, layouts, loading states, and pages.
- `app/_components/` contains reusable UI components.
- `app/_lib/` contains data and service code; Supabase helpers live in `app/_lib/supabase/`.
- `app/_styles/globals.css` and `app/globals.css` contain global styling.
- `public/` stores static assets.
- `starter/` is reference material, not production code unless a task says otherwise.

Use the `@/*` alias for root-relative imports, for example `@/app/_lib/data-service`.

## Build, Test, and Development Commands

- `npm.cmd run dev` starts the local development server.
- `npm.cmd run build` creates a production build and verifies static generation.
- `npm.cmd run start` serves the production build after `build`.
- `npm.cmd run lint` runs ESLint with Next.js core web vitals rules.

On Windows PowerShell, prefer `npm.cmd` and `npx.cmd` if the normal `npm` shim reports access or resolution issues.

## Coding Style & Naming Conventions

Write JavaScript with ES modules and React function components. Components use PascalCase file names, such as `CabinCard.js`; route files keep Next.js names like `page.js`, `layout.js`, `loading.js`, and `not-found.js`.

Follow the existing style: two-space indentation, double quotes, semicolons, and Tailwind utility classes in JSX. Prettier and `prettier-plugin-tailwindcss` are installed.

Keep Supabase request-aware clients inside functions that need cookies. Public/static reads should use a non-cookie client so build-time routes like `generateStaticParams` remain valid.

## Testing Guidelines

There is no dedicated test framework configured yet. Validate changes with:

- `npm.cmd run lint` for static checks.
- `npm.cmd run build` for routing, static generation, and Next.js integration checks.

If tests are added later, place them near the relevant feature or under a clear test directory, and document the command in `package.json`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries, for example `Implement Supabase integration` or `Add cabin listing and loading components`. Keep commits focused on one behavior or fix.

Pull requests should include a concise description, changed routes or components, any Supabase schema or environment changes, and screenshots for visible UI updates. Mention lint and build results.

## Security & Configuration Tips

Do not commit secrets. Supabase public browser keys may use `NEXT_PUBLIC_` variables, but service-role keys or private credentials must stay out of the client bundle. Check `app/_lib/supabase/` before changing auth or cookies.
