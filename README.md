# STARTER KIT

A starter kit with `NEXTJS 15`, `TYPESCRIPT`, `SHADCN/UI`, `PRISMA`, `SUPABASE`.

## Features

- Light/dark mode toggle ([next-themes](https://github.com/pacocoursey/next-themes))
- Multi-language ([next-intl](https://next-intl-docs.vercel.app/))
- OAuth Social Media ([Supabase](https://supabase.com/docs))
- Code Quality and Commit Standardization:
  - Conventional Commits: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Linting & Formatting: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/).
  - Pre-commit Hooks: [Husky](https://typicode.github.io/husky), [lint-staged](https://github.com/okonet/lint-staged)
  - Automated Release: [Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
- Devcontainer ([VSCode Remote](https://code.visualstudio.com/docs/remote/containers))
- Dockerize ([Docker compose](https://docs.docker.com/compose/))

## Installation

```bash
git clone git@github.com:leho-dev/starter-kit.git
cd starter-kit

# cp .env.example .env
# modify .env file
```

With `pnpm`

```bash
pnpm i
pnpm dev
```

With `Docker compose`

```bash
docker compose up
```

## Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleho-dev%2Fstarter-kit&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,DATABASE_URL,DIRECT_URL)

## Authors

- [@leho-dev](https://www.github.com/leho-dev)
