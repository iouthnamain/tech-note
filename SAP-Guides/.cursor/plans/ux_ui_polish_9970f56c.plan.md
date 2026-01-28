---
name: UX/UI Polish
overview: Polish the bug tracker UI with shadcn patterns, toasts, filter controls, and nicer detail layouts.
todos:
  - id: shell-style
    content: Add shadcn header/shell and shared styles
    status: completed
  - id: create-modals
    content: Use dialogs for new project/issue with toasts
    status: completed
  - id: filters
    content: Add issue list filter bar with URL sync
    status: completed
  - id: issue-detail
    content: "Polish issue detail: badges, comment form, audit sidebar"
    status: completed
  - id: attachments-style
    content: Restyle attachment form with shadcn inputs
    status: completed
---

# UX/UI Polish for Bug Tracker

## Goals

- Make project/issue pages feel like shadcn/ui: consistent cards, badges, dialogs, and forms.
- Improve creation flows (modal/dialog) and add toasts for success/error.
- Add inline filter controls for issues and surface audit/attachment interactions cleanly.

## Changes

- **Styling + Layout:** Replace ad-hoc inputs/buttons with shadcn/ui primitives (button, input, textarea, select, badge, card, dialog). Add a lightweight header/nav shell.
- **Create flows:** New Project and New Issue via dialog modals instead of separate pages; keep form validation and loading states, show toasts on success/error, and refresh lists.
- **Issue list filters:** Add client-side filter bar (status/priority/severity/assignee/reporter) with controlled selects and apply/reset actions; persist via URL params.
- **Issue detail:** Add comment composer inline; improve badges for status/priority/severity; show audit log sidebar; attachments form stays but styled with shadcn inputs.
- **Project dashboard:** Keep stats cards; add quick links (new issue, filters) and consistent card styling.

## Deliverables

- Updated pages/components using shadcn/ui primitives, modals for create, toasts for feedback.
- Issue list filter bar with URL param sync.
- Enhanced issue detail with comment form, badges, audit sidebar, and styled attachments.
- No auth changes; still Bun-based commands.