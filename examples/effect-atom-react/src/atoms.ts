import { Atom } from "@effect-atom/atom"

/** A single todo item */
export interface Todo {
  readonly id: string
  readonly title: string
  readonly completed: boolean
}

/** Filter mode for the todo list */
export type Filter = "all" | "active" | "completed"

const STORAGE_KEY = "todos-effect-atom"

/** Generate a unique ID, with fallback for environments without crypto.randomUUID */
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`
}

/** Load todos from localStorage */
function loadTodos(): readonly Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as Todo[]
    }
  } catch {
    // Ignore parse errors
  }
  return []
}

/** Save todos to localStorage */
function saveTodos(todos: readonly Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // Ignore storage errors
  }
}

// ============================================================================
// State Atoms
// ============================================================================

/** The list of all todos - persisted to localStorage */
export const todosAtom = Atom.make<readonly Todo[]>(loadTodos()).pipe(
  Atom.keepAlive
)

/** Current filter selection */
export const filterAtom = Atom.make<Filter>("all")

/** ID of the todo currently being edited, or null */
export const editingIdAtom = Atom.make<string | null>(null)

// ============================================================================
// Derived Atoms
// ============================================================================

/** Todos filtered by the current filter */
export const filteredTodosAtom = Atom.make((get) => {
  const todos = get(todosAtom)
  const filter = get(filterAtom)
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed)
    case "completed":
      return todos.filter((t) => t.completed)
    default:
      return todos
  }
})

/** Count of active (incomplete) todos */
export const activeCountAtom = Atom.make(
  (get) => get(todosAtom).filter((t) => !t.completed).length
)

/** Count of completed todos */
export const completedCountAtom = Atom.make(
  (get) => get(todosAtom).filter((t) => t.completed).length
)

/** Whether all todos are completed */
export const allCompletedAtom = Atom.make((get) => {
  const todos = get(todosAtom)
  return todos.length > 0 && todos.every((t) => t.completed)
})

// ============================================================================
// Action Helpers (used directly in components via registry.set)
// ============================================================================

/** Create a writable lens for adding todos */
export const addTodoAtom = Atom.writable<readonly Todo[], string>(
  (get) => get(todosAtom),
  (ctx, title) => {
    const trimmed = title.trim()
    if (!trimmed) return
    const todo: Todo = {
      id: generateId(),
      title: trimmed,
      completed: false
    }
    const newTodos = [...ctx.get(todosAtom), todo]
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  }
)

/** Toggle a todo's completed status */
export const toggleTodoAtom = Atom.writable<readonly Todo[], string>(
  (get) => get(todosAtom),
  (ctx, id) => {
    const newTodos = ctx.get(todosAtom).map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  }
)

/** Remove a todo */
export const removeTodoAtom = Atom.writable<readonly Todo[], string>(
  (get) => get(todosAtom),
  (ctx, id) => {
    const newTodos = ctx.get(todosAtom).filter((t) => t.id !== id)
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  }
)

/** Clear all completed todos */
export const clearCompletedAtom = Atom.writable<readonly Todo[], void>(
  (get) => get(todosAtom),
  (ctx) => {
    const newTodos = ctx.get(todosAtom).filter((t) => !t.completed)
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  }
)

/** Toggle all todos to a specific completed state */
export const toggleAllAtom = Atom.writable<readonly Todo[], boolean>(
  (get) => get(todosAtom),
  (ctx, completed) => {
    const newTodos = ctx.get(todosAtom).map((t) => ({ ...t, completed }))
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  }
)

/** Update a todo's title */
export const updateTodoAtom = Atom.writable<
  readonly Todo[],
  { id: string; title: string }
>((get) => get(todosAtom), (ctx, { id, title }) => {
  const trimmed = title.trim()
  if (!trimmed) {
    // Remove todo if title is empty
    const newTodos = ctx.get(todosAtom).filter((t) => t.id !== id)
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  } else {
    const newTodos = ctx.get(todosAtom).map((t) =>
      t.id === id ? { ...t, title: trimmed } : t
    )
    ctx.set(todosAtom, newTodos)
    saveTodos(newTodos)
  }
  ctx.set(editingIdAtom, null)
})

/** Start editing a todo */
export const startEditingAtom = Atom.writable<string | null, string>(
  (get) => get(editingIdAtom),
  (ctx, id) => {
    ctx.set(editingIdAtom, id)
  }
)

/** Cancel editing */
export const cancelEditingAtom = Atom.writable<string | null, void>(
  (get) => get(editingIdAtom),
  (ctx) => {
    ctx.set(editingIdAtom, null)
  }
)
