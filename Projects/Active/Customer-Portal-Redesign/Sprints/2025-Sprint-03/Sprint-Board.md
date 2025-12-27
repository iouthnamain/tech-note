---
type: sprint-board
sprint-name: "2025 Sprint 03 - Design & Foundation"
sprint-number: "03"
start-date: 2025-01-25
end-date: 2025-02-01
status: Active
tags: [sprint, board]
---

# Sprint Board - 2025 Sprint 03 - Design & Foundation

## Sprint Scope (Dataview)
```dataview
TABLE status, priority, story-points, assignee, due-date, project
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND !contains(file.folder, "Templates")
  AND project = "Customer Portal Redesign"
  AND (file.name = "Task-001-Design-System-Setup" OR file.name = "Task-005-Accessibility-Audit")
SORT priority DESC, due-date ASC
```

### Story Points Summary
```dataview
TABLE 
  length(rows) AS "Tasks",
  sum(rows.story-points) AS "Total Points"
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "Customer Portal Redesign"
  AND (file.name = "Task-001-Design-System-Setup" OR file.name = "Task-005-Accessibility-Audit")
GROUP BY "Sprint Scope"
```

## In-Progress
```dataview
TABLE status, story-points, assignee, due-date, project
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND status = "In Progress"
  AND !contains(file.folder, "Templates")
  AND project = "Customer Portal Redesign"
  AND (file.name = "Task-001-Design-System-Setup" OR file.name = "Task-005-Accessibility-Audit")
SORT due-date ASC
```

### In-Progress Story Points
```dataview
TABLE sum(story-points) AS "Points In Progress"
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND status = "In Progress"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "Customer Portal Redesign"
  AND (file.name = "Task-001-Design-System-Setup" OR file.name = "Task-005-Accessibility-Audit")
GROUP BY "Total"
```

## Done (This Sprint)
```dataview
TABLE story-points, assignee, due-date, project
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND status = "Done"
  AND !contains(file.folder, "Templates")
  AND project = "Customer Portal Redesign"
  AND (file.name = "Task-001-Design-System-Setup" OR file.name = "Task-005-Accessibility-Audit")
SORT due-date ASC
```

### Completed Story Points (Velocity)
```dataview
TABLE 
  length(rows) AS "Completed Tasks",
  sum(rows.story-points) AS "Story Points Completed"
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND status = "Done"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "Customer Portal Redesign"
  AND (file.name = "Task-001-Design-System-Setup" OR file.name = "Task-005-Accessibility-Audit")
GROUP BY "Sprint Velocity"
```





