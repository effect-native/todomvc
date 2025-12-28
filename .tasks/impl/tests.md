---
title: TodoMVC Test Suite
status: pending
done_when: cd examples/effect-atom && pnpm test
basis: |
  Not started.
blocked_by:
  - .tasks/impl/ui.md
artifacts:
  - path: examples/effect-atom/tests/todomvc.spec.ts
    description: Integration tests for full app behavior
  - path: examples/effect-atom/vitest.config.ts
    description: Vitest configuration
  - path: examples/effect-atom/tests/setup.ts
    description: Test setup file
---

# Impl: TodoMVC Test Suite

## Objective

Create comprehensive test coverage for the TodoMVC implementation.

## Test Structure

```
examples/effect-atom/
  src/
    atoms/
      todos.test.ts        # Atom unit tests (from atoms.md)
      persisted.test.ts    # Persistence tests (from storage.md)
  tests/
    todomvc.spec.ts        # Integration tests
    setup.ts               # Test setup
```

## Integration Tests

Using vitest + @testing-library/react:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('TodoMVC', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  
  describe('No Todos', () => {
    it('hides main section when empty', () => {})
    it('hides footer when empty', () => {})
  })
  
  describe('New Todo', () => {
    it('adds todo on Enter', () => {})
    it('trims whitespace', () => {})
    it('ignores empty input', () => {})
    it('clears input after adding', () => {})
  })
  
  describe('Mark All Complete', () => {
    it('marks all as complete', () => {})
    it('marks all as incomplete when all complete', () => {})
  })
  
  describe('Item', () => {
    it('shows todo text', () => {})
    it('toggles complete on checkbox click', () => {})
    it('deletes on destroy click', () => {})
  })
  
  describe('Editing', () => {
    it('enters edit mode on double-click', () => {})
    it('saves on Enter', () => {})
    it('cancels on Escape', () => {})
    it('saves on blur', () => {})
    it('deletes when cleared', () => {})
  })
  
  describe('Counter', () => {
    it('shows singular for 1 item', () => {})
    it('shows plural for multiple items', () => {})
    it('counts only active items', () => {})
  })
  
  describe('Clear Completed', () => {
    it('hidden when no completed', () => {})
    it('visible when completed exist', () => {})
    it('removes only completed items', () => {})
  })
  
  describe('Persistence', () => {
    it('loads todos from localStorage', () => {})
    it('saves todos to localStorage', () => {})
  })
  
  describe('Routing', () => {
    it('filters by hash route', () => {})
    it('highlights current filter', () => {})
  })
})
```

## Vitest Configuration

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts']
  }
})
```

## Test Setup

```ts
// tests/setup.ts
import '@testing-library/jest-dom'
```

## Dev Dependencies

```json
{
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^25.0.0"
  }
}
```

## Verification

```bash
cd examples/effect-atom && pnpm test
# All tests pass
```
