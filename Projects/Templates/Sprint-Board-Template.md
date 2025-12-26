---
type: sprint-board
sprint-name: "{{title}}"
sprint-number: ""
start-date: {{date}}
end-date:
status: Planned
tags: [sprint, board]
---

# Sprint Board - {{sprint-name}}

## Kanban (requires Kanban plugin)
```kanban
- [ ] Backlog item 1
- [ ] Backlog item 2
```

## Sprint Scope (Dataview)
```dataview
TABLE status, priority, story-points, assignee, due-date, project
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
SORT priority DESC, due-date ASC
```

**Note**: Replace `{{project-name}}` with your actual project name, or use `AND project = "Project-Name"` to filter by project field.

### Story Points Summary
```dataview
TABLE 
  length(rows) AS "Tasks",
  sum(rows.story-points) AS "Total Points"
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
GROUP BY "Sprint Scope"
```

## In-Progress
```dataview
TABLE status, story-points, assignee, due-date, project
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status = "In Progress"
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
SORT due-date ASC
```

### In-Progress Story Points
```dataview
TABLE sum(story-points) AS "Points In Progress"
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status = "In Progress"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
GROUP BY "Total"
```

## Done (This Sprint)
```dataview
TABLE story-points, assignee, due-date, project
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status = "Done"
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
  AND file.ctime >= this.start-date
SORT due-date ASC
```

### Completed Story Points (Velocity)
```dataview
TABLE 
  length(rows) AS "Completed Tasks",
  sum(rows.story-points) AS "Story Points Completed"
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status = "Done"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
  AND file.ctime >= this.start-date
GROUP BY "Sprint Velocity"
```

