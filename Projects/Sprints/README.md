---
type: sprint-index
tags: [sprint]
---

# Sprints (Global)

## Folder Layout
```
Projects/Sprints/
├── YYYY-Sprint-01/
│   ├── Sprint-Plan.md
│   ├── Sprint-Board.md
│   ├── Sprint-Review-Retro.md
│   └── Daily-Standups/ (optional, or keep daily notes elsewhere)
└── README.md (this file)
```

Use one folder per sprint; name with year and sequence for clarity (e.g., `2025-Sprint-01`).

## How to Use
1. Create folder `Projects/Sprints/YYYY-Sprint-XX`.
2. Add files from templates:
   - [[Templates/Sprint-Plan-Template]]
   - [[Templates/Sprint-Board-Template]]
   - [[Templates/Sprint-Review-Retro-Template]]
   - [[Templates/Daily-Standup-Template]] (optional per day)
3. Link sprint scope to project tasks/issues via `project` and `type` frontmatter (already required in task/issue notes).

## Dataview Examples
Active sprint tasks (set `currentSprint` to folder name):
```dataview
TABLE status, priority, assignee, due-date, project
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

Completed this sprint (filter by created/closed dates if desired):
```dataview
TABLE assignee, project, due-date
FROM "Projects/Active"
WHERE type = "task"
  AND status = "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## Metrics
- Burndown/Burnup: chart via DataviewJS or external chart images linked here.
- Velocity: sum of points/estimates on Done tasks per sprint.
- Carryover: count tasks not finished; plan into next sprint.

## Tips
- Keep sprints to 1 week (your chosen cadence).
- Keep Templates folder excluded in queries.
- Use consistent `project` and `type` fields so rollups work across projects.




