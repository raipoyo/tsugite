<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->

# Project Rules

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4
- Package manager: **Bun** (use `bun` instead of `npm` / `yarn` / `pnpm`)

## Directory Structure

```
app/            # Next.js routes (App Router)
components/ui/  # Shared UI primitives (no business logic)
features/<name>/{components,hooks,utils,types}/  # Feature modules
lib/            # Global utils, API client, constants
hooks/          # Global custom hooks
types/          # Global TypeScript types
```

## Coding Conventions (enforced by linter/formatter)

- Formatter: Prettier (auto-applied on commit via Husky + lint-staged)
- Linter: ESLint with Next.js + TypeScript rules
- `'use client'` only when strictly necessary — prefer Server Components
- No `any` without `// eslint-disable-next-line` and a reason comment
- Component file: one `export default` per file
- Props: use `type`, not `interface`

## Commit Convention

Follow Conventional Commits (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `ci`).
commitlint enforces this on every commit.

## Branch Convention

- Work on `feature/<desc>`, `fix/<desc>`, `chore/<desc>` branches
- Never push directly to `main`

## CHANGELOG

Update `CHANGELOG.md` for every code change. Record what changed and why.

<!-- END:project-rules -->
