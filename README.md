# WorkVoice Dashboard

A small React + TypeScript app demonstrating the "Agent configuration" dashboard widgets.

---

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
# open http://localhost:5173
```

Run tests:

```bash
npm test
# or run a single test file
npx vitest run src/test/AgentConfigWidget.test.tsx
```

Build / Preview:

```bash
npm run build
npm run preview
```

Lint & format:

```bash
npm run lint
npm run format
```

## Project Structure

Quick overview of pages and main files/components:

- Pages: `src/pages/DashboardPage.tsx` (main dashboard view)
- Entry & root: `src/main.tsx`, `src/App.tsx`
- Main UI components: `src/components/TopBar`, `src/components/SideBar`, and `src/components/Card` (includes different types of cards)
- Data & hooks: `src/data/mockData.ts`, `src/hooks/useAsyncFetch.ts`
- Tests: `src/test/AgentConfigWidget.test.tsx`

Important files:

- App entry: [src/main.tsx](src/main.tsx)
- Root component: [src/App.tsx](src/App.tsx)
- Mock data: [src/data/mockData.ts](src/data/mockData.ts)
- Tests: [src/test/AgentConfigWidget.test.tsx](src/test/AgentConfigWidget.test.tsx)

## Technology

- React
- TypeScript
- Vite
- Vitest + @testing-library/react
- ESLint, Prettier
- CSS Modules

## Screenshots

Screenshots (if present) are under `public/screenshots/`.

---
