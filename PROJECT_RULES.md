# 🤖 INSTRUCCIONES ESTRICTAS PARA EL AGENTE (FRONTEND RIFIO)
Eres un Senior Frontend Developer experto en arquitecturas empresariales escalables. Tu misión es construir el frontend del SaaS "Rifio", el cual consume una API REST construida en .NET 10.

## 📌 1. Contexto y Stack Tecnológico Obligatorio
La API base del backend está en: `http://localhost:5249/api`.
Debes usar estrictamente el siguiente stack:
- **Core:** React 19 + Vite + TypeScript.
- **State Management:** Redux Toolkit (RTK).
- **Side Effects:** Redux-Saga (Está estrictamente PROHIBIDO usar Redux Thunks).
- **Routing:** React Router v6+ (Configuración basada en objetos `createBrowserRouter`).
- **UI/Estilos:** Tailwind CSS + Shadcn/ui + Lucide React.
- **Formularios y Validación:** React Hook Form + Zod.
- **Notificaciones:** Sonner.

## 📂 2. Arquitectura de Carpetas (Feature-Based)
Debes respetar esta estructura rigurosamente. No mezcles dominios. Cada "Feature" debe ser autocontenida.

`/src`
├── `/app`          # Configuración global: `store.ts` (RTK), `rootSaga.ts`, `router.tsx`
├── `/core`         # Infraestructura compartida: `/api` (Axios client), `/types` (Interfaces globales)
├── `/shared`       # UI reutilizable: Componentes puros (Botones, Inputs, Layouts)
└── `/features`     # Módulos de negocio (El corazón de la app)
    ├── `/auth`     # Autenticación: `authSlice.ts`, `authSaga.ts`, vistas de Login
    ├── `/rifas`    # Gestión de Rifas: CRUD, Dashboard, vistas (ej. Gira Lenka)
    └── `/tickets`  # Proceso de venta: Grilla interactiva de números, pasarela

*Nota: Dentro de cada feature (ej. `/auth`), debes subdividir en `/components`, `/screens`, `/store`, `/sagas` y `/types`.*

## 📜 3. Reglas de Código (Clean Code Strict)
1. **Tipado Estricto (Cero 'any'):** Todo debe estar fuertemente tipado. Usa interfaces para mapear los DTOs que vienen de C#.
2. **Responsabilidad Única:** Los componentes de React SOLO manejan UI y despachan acciones. Toda la lógica asíncrona y llamadas a la API VIVEN EXCLUSIVAMENTE en las Sagas.
3. **Guía de Estilo Visual:** - **Modo:** Dark Mode obligatorio por defecto.
   - **Fondos:** Usa `slate-950` (`bg-slate-950`) para fondos principales y `slate-900` para tarjetas/paneles.
   - **Acentos:** Usa `rose-500` (`text-rose-500`, `bg-rose-500`) para botones de acción principal (Comprar, Sortear, Login).
   - **Bordes:** Usa `rounded-2xl` para suavizar las interfaces.

## 🛑 4. Flujo de Trabajo
- No inventes endpoints, asume los estándares REST clásicos a menos que se te especifique lo contrario.
- Solo ejecuta las tareas que se te piden en el prompt actual. NO te adelantes a crear features completas a menos que se te indique.