import { RegistryProvider } from "@effect-atom/atom-react"
import { useAtom, useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import {
  todosAtom,
  filterAtom,
  editingIdAtom,
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
  startEditingAtom,
  cancelEditingAtom,
  type Todo,
  type Filter
} from "./atoms"
import "todomvc-app-css/index.css"
import "todomvc-common/base.css"

function Header() {
  const [inputValue, setInputValue] = useState("")
  const addTodo = useAtomSet(addTodoAtom)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(inputValue)
      setInputValue("")
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </header>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  const editingId = useAtomValue(editingIdAtom)
  const toggleTodo = useAtomSet(toggleTodoAtom)
  const removeTodo = useAtomSet(removeTodoAtom)
  const updateTodo = useAtomSet(updateTodoAtom)
  const startEditing = useAtomSet(startEditingAtom)
  const cancelEditing = useAtomSet(cancelEditingAtom)

  const isEditing = editingId === todo.id
  const [editText, setEditText] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(editText.length, editText.length)
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setEditText(todo.title)
    startEditing(todo.id)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTodo({ id: todo.id, title: editText })
    } else if (e.key === "Escape") {
      setEditText(todo.title)
      cancelEditing()
    }
  }

  const handleBlur = () => {
    if (isEditing) {
      updateTodo({ id: todo.id, title: editText })
    }
  }

  const className = [
    todo.completed ? "completed" : "",
    isEditing ? "editing" : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button className="destroy" onClick={() => removeTodo(todo.id)} />
      </div>
      {isEditing && (
        <input
          ref={inputRef}
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      )}
    </li>
  )
}

function TodoList() {
  const todos = useAtomValue(todosAtom)
  const filteredTodos = useAtomValue(filteredTodosAtom)
  const allCompleted = useAtomValue(allCompletedAtom)
  const toggleAll = useAtomSet(toggleAllAtom)

  if (todos.length === 0) {
    return null
  }

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allCompleted}
        onChange={() => toggleAll(!allCompleted)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  )
}

function FilterLink({
  filter,
  children
}: {
  filter: Filter
  children: React.ReactNode
}) {
  const [currentFilter, setFilter] = useAtom(filterAtom)

  return (
    <a
      href={`#/${filter === "all" ? "" : filter}`}
      className={currentFilter === filter ? "selected" : ""}
      onClick={(e) => {
        e.preventDefault()
        setFilter(filter)
      }}
    >
      {children}
    </a>
  )
}

function Footer() {
  const todos = useAtomValue(todosAtom)
  const activeCount = useAtomValue(activeCountAtom)
  const completedCount = useAtomValue(completedCountAtom)
  const clearCompleted = useAtomSet(clearCompletedAtom)

  if (todos.length === 0) {
    return null
  }

  const itemWord = activeCount === 1 ? "item" : "items"

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {itemWord} left
      </span>
      <ul className="filters">
        <li>
          <FilterLink filter="all">All</FilterLink>
        </li>
        <li>
          <FilterLink filter="active">Active</FilterLink>
        </li>
        <li>
          <FilterLink filter="completed">Completed</FilterLink>
        </li>
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

function TodoApp() {
  return (
    <section className="todoapp">
      <Header />
      <TodoList />
      <Footer />
    </section>
  )
}

export function App() {
  return (
    <RegistryProvider>
      <TodoApp />
    </RegistryProvider>
  )
}

export default App
