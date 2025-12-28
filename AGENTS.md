# Agent Contribution Rules for TodoMVC

This is the effect-native TodoMVC implementation using effect-atom + React + Effect.

## Task System

See `.tasks/AGENTS.md` for the task management system.

## Cross-Repository References

This repo is a peer to `effect-native` under `work/effect-native/`:

```
work/effect-native/
  effect-native/     # Main effect-native monorepo
  todomvc/           # This repo (effect-atom TodoMVC)
```

When referencing tasks across repos:
- Use `../effect-native/.tasks/GOAL-*.md` for effect-native tasks
- Tasks in this repo use `.tasks/` (relative to this repo root)

## Stack

- **State Management**: `@effect-atom/atom-react`
- **UI**: React 19+
- **Effects**: Effect
- **Build**: Vite
- **Tests**: Vitest

## Key Patterns

### effect-atom
- Use `Atom.make` for state
- Use `Atom.keepAlive` for persistent atoms
- Use `Atom.kvs` for localStorage integration
- Use `useAtomValue`, `useAtomSet`, `useAtom` hooks

### React 19
- No `forwardRef` - pass ref as prop
- Use modern patterns

### Effect
- Services for side effects (storage, etc.)
- Schema for validation
- Structured error handling
