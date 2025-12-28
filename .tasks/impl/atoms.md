---
title: TodoMVC State Atoms
status: pending
done_when: pnpm test examples/effect-atom/src/atoms/*.test.ts
basis: |
  Not started.
blocked_by:
  - .tasks/impl/scaffold.md
artifacts:
  - path: examples/effect-atom/src/atoms/todos.ts
    description: Todo list atom with CRUD operations
  - path: examples/effect-atom/src/atoms/filter.ts
    description: Filter state atom
  - path: examples/effect-atom/src/atoms/derived.ts
    description: Derived atoms (filteredTodos, activeCount, etc)
  - path: examples/effect-atom/src/atoms/index.ts
    description: Public exports
  - path: examples/effect-atom/src/atoms/todos.test.ts
    description: Unit tests for atom behavior
---

# Impl: TodoMVC State Atoms

## Objective

Implement the state management layer using effect-atom.

## Types

```ts
interface Todo {
  id: string
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'
```

## Atoms

### todos.ts - Core State

```ts
import { Atom } from "@effect-atom/atom-react"

export const todosAtom = Atom.make<Todo[]>([]).pipe(Atom.keepAlive)

// Action atoms using Atom.fn
export const addTodoAtom = Atom.fn((text: string) => 
  Effect.gen(function* (get) {
    const todos = get(todosAtom)
    const newTodo = { id: crypto.randomUUID(), text, completed: false }
    get.set(todosAtom, [...todos, newTodo])
  })
)

// Or simpler approach with useAtomSet:
// const setTodos = useAtomSet(todosAtom)
// setTodos(todos => [...todos, newTodo])
```

### filter.ts - Filter State

```ts
export const filterAtom = Atom.make<Filter>('all').pipe(Atom.keepAlive)
```

### derived.ts - Computed Values

```ts
export const filteredTodosAtom = Atom.make((get) => {
  const todos = get(todosAtom)
  const filter = get(filterAtom)
  switch (filter) {
    case 'active': return todos.filter(t => !t.completed)
    case 'completed': return todos.filter(t => t.completed)
    default: return todos
  }
})

export const activeCountAtom = Atom.map(todosAtom, todos => 
  todos.filter(t => !t.completed).length
)

export const allCompletedAtom = Atom.make((get) => {
  const todos = get(todosAtom)
  return todos.length > 0 && todos.every(t => t.completed)
})

export const hasCompletedAtom = Atom.map(todosAtom, todos =>
  todos.some(t => t.completed)
)

export const hasTodosAtom = Atom.map(todosAtom, todos => todos.length > 0)
```

## Tests

Test cases:
- Adding a todo creates new item with unique id
- Toggling a todo flips completed state
- Editing a todo updates text
- Deleting a todo removes it from list
- Toggle all marks all as complete/incomplete
- Clear completed removes only completed todos
- Filter atom filters correctly for each state
- Derived atoms update when source changes

## Verification

```bash
cd examples/effect-atom
pnpm test src/atoms/*.test.ts
```
