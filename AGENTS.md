# AGENTS.md — Rifio Web Frontend

## Before writing any code

Read `GEMINI.md` first — it contains **mandatory** stack rules and visual conventions that take priority.

## Dev commands

```bash
npm run dev      # Vite dev server (default port 5173)
npm run build    # tsc -b && vite build  (typecheck THEN build)
npm run lint     # eslint .
npm run preview  # Vite preview of built output
```

There is **no test runner** or test config in this repo.

## Stack & architecture (non-obvious facts)

- **State management**: Redux Toolkit with **Redux-Saga only**. Thunks are explicitly disabled in `src/app/store.ts` (`thunk: false`). Every feature uses `*Request` / `*Success` / `*Failure` action triplets dispatched by sagas.
- **React Router v7** using `createBrowserRouter` in `src/app/router.tsx`.
- **Forms**: React Hook Form + Zod (not shadcn form abstractions).
- **Toasts**: Sonner with dark theme, configured in `src/main.tsx`.

## Backend API

- Base URL: `http://localhost:5249/api`
- Axios instance in `src/core/api/axiosClient.ts`
- Auth token stored in `localStorage` under key `rifio_token`
- Request interceptor auto-attaches `Bearer` token

## Feature-based structure

```
src/
├── app/           # store.ts, rootSaga.ts, router.tsx, hooks.ts
├── core/          # api/ (axios), types/ (generic API types)
├── shared/        # components/ui/, components/layout/, lib/utils.ts
└── features/      # auth/, rifas/, tickets/, clientes/
    └── <feature>/ # screens/, components/, store/, sagas/, types/
```

Use typed hooks from `src/app/hooks.ts` (`useAppDispatch`, `useAppSelector`) — never plain `useDispatch`/`useSelector`.

## Visual conventions (mandatory)

- **Dark mode only**: `bg-slate-950` for page backgrounds, `bg-slate-900` for cards/panels.
- **Accent color**: `rose-500` for primary actions, active nav links, focus rings.
- **Border radius**: `rounded-2xl` everywhere.
- **Classname composition**: Use `cn()` from `src/shared/lib/utils.ts` (clsx + tailwind-merge).

## Code quirks & gotchas

- **All UI text and error messages are in Spanish.**
- **Login is currently mocked**: `LoginForm.tsx` dispatches `loginSuccess` directly with a fake JWT. The real saga-based login flow is commented out. Don't assume the real flow works yet.
- **Two parallel ticket systems exist**: `ticketsSlice` (availability-based, saga-driven) and `ticketSlice` (100-ticket grid, mock API). They serve different views.
- **Many screens use hardcoded/stub data**: `DashboardScreen`, `RifasListScreen`, `TicketsScreen` have hardcoded values. `ClientesScreen` is a placeholder.
- There is a **duplicate PostCSS config** at `src/shared/components/layout/postcss.config.js` — likely unintentional, only the root one matters.

## Typing

Strict TypeScript (`erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`). Interfaces in `core/types/api.ts` define `ApiResponse<T>`, `PaginatedResponse<T>`, and `ApiErrorResponse`. Feature-specific types live in each feature's `types/` folder.
