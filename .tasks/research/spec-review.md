---
title: Review TodoMVC Specification
status: pending
done_when: |
  see .tasks/research/spec-review.md
  verify: contains "Requirements Checklist" with all items checked/documented
basis: |
  Not started.
blocked_by: []
artifacts: []
---

# Research: TodoMVC Specification Review

## Objective

Review the official TodoMVC spec (`app-spec.md` in this repo) to understand all required functionality.

## Source

The spec is in this repo at `app-spec.md`.

## Requirements Checklist

(To be filled during research)

### No Todos State
- [ ] Hide main section when no todos
- [ ] Hide footer section when no todos

### New Todo
- [ ] Input field at top of app
- [ ] Placeholder: "What needs to be done?"
- [ ] Trim input text
- [ ] Clear input after adding
- [ ] Add on Enter key

### Mark All Complete
- [ ] Toggle-all checkbox
- [ ] Marks all as complete when checked
- [ ] Marks all as incomplete when unchecked
- [ ] Reflects current state (all complete = checked)

### Item Display
- [ ] Checkbox for complete status
- [ ] Label with todo text
- [ ] Destroy button (visible on hover)
- [ ] Completed class when done
- [ ] Strikethrough styling for completed

### Editing
- [ ] Double-click label to edit
- [ ] Class "editing" on li
- [ ] Input with class "edit"
- [ ] Enter to save
- [ ] Escape to cancel
- [ ] Blur to save
- [ ] Empty saves = delete

### Counter
- [ ] Shows active item count
- [ ] "X items left" format
- [ ] Singular "item" for 1

### Clear Completed
- [ ] Button visible only when completed exist
- [ ] Removes all completed items

### Persistence
- [ ] localStorage with namespace
- [ ] Key: "todos-effectatom" (or similar)
- [ ] Load on page load
- [ ] Save on change

### Routing
- [ ] Hash-based: #/, #/active, #/completed
- [ ] Default to all (#/)
- [ ] Highlight current filter

## Notes

(Add observations during research)
