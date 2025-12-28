# Task System for Agents

## Directory Structure

```
.tasks/
  GOAL-*.md              # High-level objectives (active goals at root)
  done/                  # Archived completed GOALs
  research/              # Exploration, documentation, learning
  experiment/            # POCs, spikes, prototypes (no TDD required)
  spec/                  # Test specifications (Red phase)
  impl/                  # Implementation code (Green phase)
  cleanup/               # Refactoring tasks (Refactor phase)
```

## Cross-Repository References

This repo (`todomvc`) is a peer to `effect-native`:

```
work/effect-native/
  effect-native/         # @effect-native packages
  todomvc/               # This repo
```

When referencing across repos, use relative paths from the monorepo root:
- `../effect-native/.tasks/GOAL-debug-demo.md` - references effect-native goal
- `.tasks/GOAL-effect-atom.md` - references task in this repo

## Task Categories

| Category | Location | Purpose | TDD Phase |
|----------|----------|---------|-----------|
| GOAL | `.tasks/GOAL-*.md` | Major milestones (active) | - |
| Done | `.tasks/done/GOAL-*.md` | Archived completed GOALs | - |
| Research | `.tasks/research/*.md` | Exploration, inventories, docs | - |
| Experiment | `.tasks/experiment/*.md` | POCs, spikes, prototypes | - |
| Spec | `.tasks/spec/*.md` | Test specifications | Red |
| Impl | `.tasks/impl/*.md` | Implementation work | Green |
| Cleanup | `.tasks/cleanup/*.md` | Refactoring, polish | Refactor |

## RGRTDD Workflow

1. **Experiment** (optional): Quick exploration in `.tasks/experiment/`
2. **Red Phase**: Spec in `.tasks/spec/*.md` - write failing tests first
3. **Green Phase**: Impl in `.tasks/impl/*.md` - minimal code to pass tests
4. **Refactor Phase**: Cleanup in `.tasks/cleanup/*.md` - improve quality

## Status Field

```yaml
status: complete
basis: |
  - All tests pass (src/atoms/todos.test.ts)
  - Verified by running: pnpm test
```

Valid status values:
- `pending` - Not started
- `in_progress` - Currently being worked on
- `complete` - Done, with basis explaining why
- `blocked` - Waiting on dependencies
- `poc-complete` - Experiment/POC done, not production-ready

## YAML Frontmatter

```yaml
---
title: Short description
status: pending | in_progress | complete | blocked | poc-complete
done_when: pnpm test  # Command that returns 0 when done
basis: |
  Explanation of how status was determined.
blocked_by:
  - .tasks/impl/scaffold.md           # Same repo
  - ../effect-native/.tasks/GOAL-*.md # Cross-repo reference
artifacts:
  - path: src/atoms/todos.ts
    description: What it does
---
```

## Rules

1. **Only GOAL-*.md at root** - All other tasks go in category subfolders
2. **All artifacts must link to a task** - Track every file created
3. **Impl blocked by Spec** - Implementation tasks must have a spec task in `blocked_by`
4. **Update status with basis** - Explain WHY it's complete
5. **Git commit as you go** - Commit after completing each task

## Archiving

Only Tom (project owner) may archive GOALs to `done/`.
