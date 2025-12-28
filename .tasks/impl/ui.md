---
title: TodoMVC UI Components
status: pending
done_when: |
  cd examples/effect-atom && pnpm dev
  verify: app renders with full TodoMVC UI, all interactions work
basis: |
  Not started.
blocked_by:
  - .tasks/impl/atoms.md
  - .tasks/impl/storage.md
artifacts:
  - path: examples/effect-atom/src/components/Header.tsx
    description: New todo input component
  - path: examples/effect-atom/src/components/TodoList.tsx
    description: List container with toggle-all
  - path: examples/effect-atom/src/components/TodoItem.tsx
    description: Individual todo item with edit mode
  - path: examples/effect-atom/src/components/Footer.tsx
    description: Filter tabs, counter, clear completed
  - path: examples/effect-atom/src/components/index.ts
    description: Public exports
  - path: examples/effect-atom/src/App.tsx
    description: Root component with routing
---

# Impl: TodoMVC UI Components

## Objective

Build React components implementing TodoMVC UI with effect-atom hooks.

## Component Structure

```
<App>
  <section class="todoapp">
    <Header />           # h1 + new todo input
    <TodoList>           # main section (hidden when empty)
      <TodoItem />...    # li for each todo
    </TodoList>
    <Footer />           # footer section (hidden when empty)
  </section>
</App>
```

## Components

### Header.tsx
- h1 with "todos"
- Input with placeholder "What needs to be done?"
- Add on Enter, trim text, clear input

### TodoList.tsx
- Hidden when no todos
- Toggle-all checkbox
- Maps filteredTodosAtom to TodoItem components

### TodoItem.tsx
- Checkbox for complete
- Label (double-click to edit)
- Destroy button
- Edit mode with input
- Escape to cancel, Enter/blur to save
- Empty save deletes

### Footer.tsx
- Hidden when no todos
- Active count with proper pluralization
- Filter links (#/, #/active, #/completed)
- Clear completed button (hidden when none completed)

### App.tsx
- Hash routing via useEffect + hashchange listener
- Updates filterAtom based on hash

## CSS

Use TodoMVC CSS from repo:
```tsx
import '../../site-assets/base.css'
// Or copy to examples/effect-atom/
```

## Hooks Pattern

```tsx
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import { todosAtom, filteredTodosAtom, activeCountAtom } from "../atoms"

function Counter() {
  const count = useAtomValue(activeCountAtom)
  return <span>{count} {count === 1 ? 'item' : 'items'} left</span>
}

function AddTodo() {
  const setTodos = useAtomSet(todosAtom)
  const handleAdd = (text: string) => {
    setTodos(todos => [...todos, { id: crypto.randomUUID(), text, completed: false }])
  }
  // ...
}
```

## Verification

```bash
cd examples/effect-atom && pnpm dev
# Test all interactions manually
```
