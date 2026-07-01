# Prompt.tax — Landing (standalone Next.js)

Marketing landing page for **prompt.tax**, extracted as a standalone Next.js 14 App Router
app so it can be deployed independently (replacing the old TS landing on Appliku).

The full cloud application continues to live in `prompt-front` and is deployed under
`app.prompt.tax`. This repo only serves the public marketing site (landing, download,
pricing, about, terms, privacy) at `prompt.tax`.

## Stack

- Next.js 14.0.1 (App Router)
- React 18
- framer-motion (animations)
- lucide-react (icons)
- Tailwind CSS

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start    # honors the PORT env var (used by Appliku)
```

## Routes

| Route       | Description                                  |
|-------------|----------------------------------------------|
| `/`         | Landing (PromptOSLanding)                     |
| `/download` | Landing focused on the download section       |
| `/pricing`  | Static pricing page                           |
| `/about`    | About page                                    |
| `/terms`    | Terms of Service                              |
| `/privacy`  | Privacy Policy                                |

## Deploy (Appliku)

Appliku auto-deploys on `git push`. This app uses the Node buildpack:

1. `npm install`
2. `npm run build` (runs automatically via the `build` script)
3. `web: npm run start` (from the `Procfile`) — Next.js binds to `$PORT`.

No custom environment variables are required for the landing.
