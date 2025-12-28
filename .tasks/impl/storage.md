---
title: TodoMVC Storage Service
status: pending
done_when: pnpm test examples/effect-atom/src/services/*.test.ts
basis: |
  Not started.
blocked_by:
  - .tasks/impl/atoms.md
artifacts:
  - path: examples/effect-atom/src/atoms/persisted.ts
    description: Atoms with persistence integration using Atom.kvs
  - path: examples/effect-atom/src/atoms/persisted.test.ts
    description: Tests for persistence
---

# Impl: TodoMVC Storage Service

## Objective

Implement localStorage persistence using effect-atom's `Atom.kvs` integration.

## Approach: Atom.kvs (Preferred)

Using effect-atom's built-in key-value store integration:

```ts
import { Atom } from "@effect-atom/atom-react"
import { BrowserKeyValueStore } from "@effect/platform-browser"
import { Schema } from "effect"

const runtime = Atom.runtime(BrowserKeyValueStore.layerLocalStorage)

const TodoSchema = Schema.Struct({
  id: Schema.String,
  text: Schema.String,
  completed: Schema.Boolean
})

export const todosAtom = Atom.kvs({
  runtime,
  key: "todos-effectatom",
  schema: Schema.Array(TodoSchema),
  defaultValue: () => []
}).pipe(Atom.keepAlive)
```

## Integration

The `todosAtom` from `persisted.ts` replaces the simple in-memory atom. All other atoms derive from it unchanged.

```ts
// atoms/index.ts
export { todosAtom } from './persisted'  // Instead of from './todos'
export { filterAtom } from './filter'
export * from './derived'
```

## Tests

- Atom.kvs round-trips data correctly
- Empty localStorage returns default value
- Invalid data in localStorage handled gracefully
- Changes persist immediately
- Schema validation works

## Verification

```bash
cd examples/effect-atom
pnpm test src/atoms/persisted.test.ts
```

## Notes

- Use `todos-effectatom` as localStorage key (namespaced per TodoMVC spec)
- Schema provides runtime validation
- `Atom.keepAlive` ensures state persists across component unmounts
