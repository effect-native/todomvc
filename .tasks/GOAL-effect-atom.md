---
title: TodoMVC with Effect-Atom + React + Effect
status: pending
done_when: |
  all criteria met:
  - pnpm install succeeds
  - pnpm dev starts the app
  - pnpm test passes all TodoMVC spec tests
  - app implements standard TodoMVC functionality using effect-atom
basis: |
  Not started. Repository cloned.
blocked_by: []
enables:
  - ../effect-native/.tasks/GOAL-debug-demo.md
artifacts:
  - path: src/
    description: Source code for effect-atom TodoMVC
  - path: examples/effect-atom/
    description: TodoMVC example directory (follows repo convention)
---

# GOAL: TodoMVC with Effect-Atom + React + Effect

## Summary

Build a TodoMVC implementation using:
- **effect-atom** (`@effect-atom/atom-react`) for state management
- **React** for the UI layer
- **Effect** for structured effects and services

This serves as:
1. A real-world example of effect-atom usage
2. A debuggable target application for the debug POC demo (in effect-native repo)
3. A contribution to the TodoMVC ecosystem

## Why TodoMVC?

TodoMVC is the canonical example app for demonstrating state management libraries. Having an effect-atom implementation:
- Makes effect-atom approachable for new users
- Provides a standard, well-understood codebase for debugging demos
- Allows comparison with other state management approaches

## Functional Requirements

Standard TodoMVC spec (see `app-spec.md` in this repo):

1. **Add todos**: Enter text, press Enter to add
2. **Complete todos**: Click checkbox to toggle complete
3. **Edit todos**: Double-click to edit, Enter to save, Escape to cancel
4. **Delete todos**: Click X button to remove
5. **Filter todos**: All, Active, Completed filters
6. **Clear completed**: Button to remove all completed todos
7. **Toggle all**: Checkbox to complete/uncomplete all
8. **Counter**: Shows count of active items
9. **Persistence**: Todos survive page refresh (localStorage)

## Technical Stack

- React 19+ (modern patterns, no forwardRef)
- effect-atom for state management
- Effect for services (persistence layer)
- TypeScript strict mode
- Vite for dev/build

## Subtasks

### Research
- `.tasks/research/spec-review.md` - Review TodoMVC spec requirements

### Implementation (in order)
- `.tasks/impl/scaffold.md` - Project setup (Vite, React, deps)
- `.tasks/impl/atoms.md` - State atoms and derived state
- `.tasks/impl/storage.md` - Effect Service for persistence
- `.tasks/impl/ui.md` - React components
- `.tasks/impl/tests.md` - Test suite

## Definition of Done

1. `pnpm install` succeeds
2. `pnpm dev` starts development server
3. `pnpm test` passes TodoMVC spec tests
4. App matches TodoMVC styling
5. State persists across page refresh
6. Code demonstrates effect-atom best practices

## Downstream Dependencies

This GOAL enables:
- `../effect-native/.tasks/GOAL-debug-demo.md` - Debug POC needs this as target app
