---
title: TodoMVC Project Scaffold
status: pending
done_when: |
  cd examples/effect-atom && pnpm install && pnpm dev
  verify: opens localhost with empty React app
basis: |
  Not started.
blocked_by:
  - .tasks/research/spec-review.md
artifacts:
  - path: examples/effect-atom/package.json
    description: Package configuration with dependencies
  - path: examples/effect-atom/vite.config.ts
    description: Vite configuration
  - path: examples/effect-atom/tsconfig.json
    description: TypeScript configuration
  - path: examples/effect-atom/src/main.tsx
    description: React entry point
  - path: examples/effect-atom/src/App.tsx
    description: Root App component
  - path: examples/effect-atom/index.html
    description: HTML template
---

# Impl: TodoMVC Project Scaffold

## Objective

Set up the project structure for the effect-atom TodoMVC implementation in `examples/effect-atom/`.

## Location

Following TodoMVC repo convention, the app goes in `examples/effect-atom/`.

## Dependencies

```json
{
  "dependencies": {
    "@effect-atom/atom-react": "latest",
    "effect": "^3.17.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vitest": "^2.0.0"
  }
}
```

## Directory Structure

```
examples/effect-atom/
  src/
    atoms/           # effect-atom state
    components/      # React components
    services/        # Effect services (storage)
    App.tsx
    main.tsx
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  vitest.config.ts
  readme.md          # TodoMVC example readme
```

## Steps

1. Create `examples/effect-atom/` directory
2. Initialize package.json with dependencies
3. Configure TypeScript (strict mode)
4. Configure Vite with React plugin
5. Create minimal React app structure
6. Link TodoMVC CSS from repo assets
7. Create readme.md describing the implementation
8. Verify dev server starts

## Verification

```bash
cd examples/effect-atom
pnpm install
pnpm dev
# Opens http://localhost:5173 with empty app
```
