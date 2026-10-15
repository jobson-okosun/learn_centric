You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Project Architecture & Directory Rules

- **`src/app/shared/`**: STRICTLY reserved for the UI component library (e.g., Zard UI, shadcn-like components). **Do not** place custom application services, state, or business logic here.
- **`src/app/core/`**: Use this directory for core application logic, custom singleton services (like Layout state), guards, and interceptors.

## Custom Project Conventions

- **Exposing Service Signals**: When exposing a writable signal from an injected service to a component template as readonly, wrap it in `computed()` (e.g., `readonly myState = computed(() => this.myService.myState());`). Do not assign the service signal directly.
- **Scrollable Areas**: For main content areas wrapping a `router-outlet` or similar scrollable panels, prefer using `overflow-auto no-scrollbar` to maintain a clean UI without default scrollbars.

- **No Shadows or Rings**: When designing UI elements, absolutely DO NOT use drop shadows (`shadow-sm`, `shadow-md`, etc.) or ring borders (`ring-*`). Rely strictly on background colors, flat borders, or padding/rounding for depth and separation in line with the established minimalist and flat design flow.

## Learner Portal Architecture & Implementation Directives

- **Master Plan**: The living source of truth for the Learner Portal is located at [PLAN.md](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/PLAN.md) (and [src/app/learner/PLAN.md](file:///c:/Users/DELL/Desktop/MULTILENT/JOB-OKOSUN-MULTILENT/APPS/learncentric/src/app/learner/PLAN.md)). Review this file before every implementation step.
- **UI Design First**: Do NOT create backend services or separate model files until UI design is completed. Keep mock data and state in local component signals.
- **Folder Structure Standard**: Strictly mirror the author module pattern in `src/app/features/courses/`:
  - Each feature has `<feature>.route.ts`, `components/`, and `pages/`.
  - Pages live in `pages/<name>/` and must use `export default class <Name>`.
  - Never introduce arbitrary intermediate directories like `feature/` or `tabs/`.
- **Route-Linked State**: All tab menus must be linked to real routes using `routerLink`, `routerLinkActive`, and `<router-outlet>` so state is preserved on page refresh.
- **Hierarchy & Thumbnails**: Modules and lessons can be one level deep (sub-modules, sub-lessons) and must support thumbnail images.

