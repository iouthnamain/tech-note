---
type: guide
title: Bases Setup
tags: [bases, setup, obsidian]
---

# Bases Setup (Obsidian)

Use this checklist to create/update Bases that sit on top of `Projects/`. Align filters/columns with the Dataview patterns already in the templates.

## Enable Bases

1) Settings → Core Plugins → enable **Bases**.  
2) Command Palette → **Bases: New base**.

## Base Definitions

### Projects Base
- **Scope**: `Projects/Active`, `Projects/On-Hold`, `Projects/Completed`
- **Filter**: files with `project-name`; exclude `type` in [`task`,`risk`,`issue`,`status-report`]
- **Columns**: `project-name`, `status`, `priority`, `progress`, `start-date`, `end-date`, `client`, `team-members`, `tags`
- **Views**: Table (sort priority DESC, start-date ASC); Card (group by status)

### Tasks Base
- **Scope**: entire `Projects/`
- **Filter**: `type = "task"`
- **Columns**: `task-name` (or file title), `project`, `status`, `assignee`, `due-date`, `priority`, `story-points`, `estimated-hours`, `actual-hours`, `tags`
- **Views**: Table for “My tasks” (filter `assignee = <you>`, `status != "Done"`, sort due-date ASC, priority DESC); Card grouped by `status`

### Risks Base
- **Scope**: entire `Projects/`
- **Filter**: `type = "risk"`
- **Columns**: `risk-id`, `project`, `category`, `probability`, `impact`, `risk-score`, `status`, `owner`, `date-identified`, `next-review`, `tags`
- **Views**: Table sorted by `risk-score` DESC; Grouped by `project`

### Issues Base
- **Scope**: entire `Projects/`
- **Filter**: `type = "issue"`
- **Columns**: `issue-id`, `project`, `priority`, `severity`, `status`, `assigned-to`, `reported-by`, `date-reported`, `resolution-date`, `tags`
- **Views**: Table filtered `status != "Resolved"` AND `status != "Closed"`; sort priority DESC then date-reported ASC; Grouped by `project`

### Status Reports Base
- **Scope**: entire `Projects/`
- **Filter**: `type = "status-report"`
- **Columns**: `project`, `report-date`, `status`, `period-start`, `period-end`, `tags`
- **Views**: Table sorted `report-date` DESC (limit last N); Grouped by `project`

## Tips

- Keep column names identical to frontmatter fields in templates to allow inline editing.
- If a base shows extra template files, add a filter to exclude `contains(path, "Templates")`.
- Use card/grouped views for pipelines (e.g., project status) and table views for bulk edits (e.g., progress updates).



