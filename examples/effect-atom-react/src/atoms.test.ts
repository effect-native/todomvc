import { describe, test, expect, beforeEach } from "bun:test"
import { Registry } from "@effect-atom/atom"
import {
  todosAtom,
  filterAtom,
  filteredTodosAtom,
  activeCountAtom,
  completedCountAtom,
  allCompletedAtom,
  addTodoAtom,
  toggleTodoAtom,
  removeTodoAtom,
  clearCompletedAtom,
  toggleAllAtom,
  updateTodoAtom,
  type Todo
} from "./atoms"

describe("TodoMVC Atoms", () => {
  let registry: Registry.Registry

  beforeEach(() => {
    // Create fresh registry for each test
    registry = Registry.make()
    // Reset todos to empty
    registry.set(todosAtom, [])
    registry.set(filterAtom, "all")
  })

  describe("addTodoAtom", () => {
    test("adds a new todo with the given title", () => {
      registry.set(addTodoAtom, "Buy milk")

      const todos = registry.get(todosAtom)
      expect(todos).toHaveLength(1)
      expect(todos[0]?.title).toBe("Buy milk")
      expect(todos[0]?.completed).toBe(false)
    })

    test("trims whitespace from title", () => {
      registry.set(addTodoAtom, "  Buy eggs  ")

      const todos = registry.get(todosAtom)
      expect(todos[0]?.title).toBe("Buy eggs")
    })

    test("does not add empty todos", () => {
      registry.set(addTodoAtom, "   ")

      const todos = registry.get(todosAtom)
      expect(todos).toHaveLength(0)
    })
  })

  describe("toggleTodoAtom", () => {
    test("toggles todo completed status", () => {
      registry.set(addTodoAtom, "Test todo")
      const todos = registry.get(todosAtom)
      const id = todos[0]!.id

      registry.set(toggleTodoAtom, id)
      expect(registry.get(todosAtom)[0]?.completed).toBe(true)

      registry.set(toggleTodoAtom, id)
      expect(registry.get(todosAtom)[0]?.completed).toBe(false)
    })
  })

  describe("removeTodoAtom", () => {
    test("removes a todo by id", () => {
      registry.set(addTodoAtom, "Todo 1")
      registry.set(addTodoAtom, "Todo 2")
      const todos = registry.get(todosAtom)
      const firstId = todos[0]!.id

      registry.set(removeTodoAtom, firstId)

      const remaining = registry.get(todosAtom)
      expect(remaining).toHaveLength(1)
      expect(remaining[0]?.title).toBe("Todo 2")
    })
  })

  describe("clearCompletedAtom", () => {
    test("removes all completed todos", () => {
      registry.set(addTodoAtom, "Active")
      registry.set(addTodoAtom, "Completed")
      const todos = registry.get(todosAtom)
      registry.set(toggleTodoAtom, todos[1]!.id)

      registry.set(clearCompletedAtom, undefined)

      const remaining = registry.get(todosAtom)
      expect(remaining).toHaveLength(1)
      expect(remaining[0]?.title).toBe("Active")
    })
  })

  describe("toggleAllAtom", () => {
    test("marks all todos as completed", () => {
      registry.set(addTodoAtom, "Todo 1")
      registry.set(addTodoAtom, "Todo 2")

      registry.set(toggleAllAtom, true)

      const todos = registry.get(todosAtom)
      expect(todos.every((t) => t.completed)).toBe(true)
    })

    test("marks all todos as active", () => {
      registry.set(addTodoAtom, "Todo 1")
      registry.set(addTodoAtom, "Todo 2")
      registry.set(toggleAllAtom, true)

      registry.set(toggleAllAtom, false)

      const todos = registry.get(todosAtom)
      expect(todos.every((t) => !t.completed)).toBe(true)
    })
  })

  describe("updateTodoAtom", () => {
    test("updates todo title", () => {
      registry.set(addTodoAtom, "Original")
      const todos = registry.get(todosAtom)
      const id = todos[0]!.id

      registry.set(updateTodoAtom, { id, title: "Updated" })

      expect(registry.get(todosAtom)[0]?.title).toBe("Updated")
    })

    test("removes todo if title is empty", () => {
      registry.set(addTodoAtom, "To delete")
      const todos = registry.get(todosAtom)
      const id = todos[0]!.id

      registry.set(updateTodoAtom, { id, title: "   " })

      expect(registry.get(todosAtom)).toHaveLength(0)
    })
  })

  describe("filteredTodosAtom", () => {
    beforeEach(() => {
      registry.set(addTodoAtom, "Active todo")
      registry.set(addTodoAtom, "Completed todo")
      const todos = registry.get(todosAtom)
      registry.set(toggleTodoAtom, todos[1]!.id)
    })

    test("shows all todos when filter is 'all'", () => {
      registry.set(filterAtom, "all")
      expect(registry.get(filteredTodosAtom)).toHaveLength(2)
    })

    test("shows only active todos when filter is 'active'", () => {
      registry.set(filterAtom, "active")
      const filtered = registry.get(filteredTodosAtom)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]?.title).toBe("Active todo")
    })

    test("shows only completed todos when filter is 'completed'", () => {
      registry.set(filterAtom, "completed")
      const filtered = registry.get(filteredTodosAtom)
      expect(filtered).toHaveLength(1)
      expect(filtered[0]?.title).toBe("Completed todo")
    })
  })

  describe("derived count atoms", () => {
    beforeEach(() => {
      registry.set(addTodoAtom, "Active 1")
      registry.set(addTodoAtom, "Active 2")
      registry.set(addTodoAtom, "Completed")
      const todos = registry.get(todosAtom)
      registry.set(toggleTodoAtom, todos[2]!.id)
    })

    test("activeCountAtom returns count of incomplete todos", () => {
      expect(registry.get(activeCountAtom)).toBe(2)
    })

    test("completedCountAtom returns count of completed todos", () => {
      expect(registry.get(completedCountAtom)).toBe(1)
    })

    test("allCompletedAtom returns true when all todos are completed", () => {
      expect(registry.get(allCompletedAtom)).toBe(false)

      registry.set(toggleAllAtom, true)
      expect(registry.get(allCompletedAtom)).toBe(true)
    })

    test("allCompletedAtom returns false when no todos", () => {
      registry.set(todosAtom, [])
      expect(registry.get(allCompletedAtom)).toBe(false)
    })
  })
})
