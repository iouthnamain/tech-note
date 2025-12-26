---
type: sprint-board
sprint-name: "2025 Sprint 02 - Checkout & Performance"
sprint-number: "02"
start-date: 2025-01-22
end-date: 2025-01-29
status: Active
tags: [sprint, board]
---

# Sprint Board - 2025 Sprint 02 - Checkout & Performance

## Sprint Scope (Dataview)
```dataview
TABLE status, priority, story-points, assignee, due-date, project
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND !contains(file.folder, "Templates")
  AND (file.name = "Task-001-Integrate-Payment-Gateway-API" OR file.name = "Task-002-Redesign-Checkout-UI" OR file.name = "Task-004-Performance-Optimization")
SORT priority DESC, due-date ASC
```

### Story Points Summary
```dataview
TABLE 
  length(rows) AS "Tasks",
  sum(rows.story-points) AS "Total Points"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND (file.name = "Task-001-Integrate-Payment-Gateway-API" OR file.name = "Task-002-Redesign-Checkout-UI" OR file.name = "Task-004-Performance-Optimization")
GROUP BY "Sprint Scope"
```

## In-Progress
```dataview
TABLE status, story-points, assignee, due-date, project
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND status = "In Progress"
  AND !contains(file.folder, "Templates")
  AND (file.name = "Task-001-Integrate-Payment-Gateway-API" OR file.name = "Task-002-Redesign-Checkout-UI" OR file.name = "Task-004-Performance-Optimization")
SORT due-date ASC
```

### In-Progress Story Points
```dataview
TABLE sum(story-points) AS "Points In Progress"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND status = "In Progress"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND (file.name = "Task-001-Integrate-Payment-Gateway-API" OR file.name = "Task-002-Redesign-Checkout-UI" OR file.name = "Task-004-Performance-Optimization")
GROUP BY "Total"
```

## Done (This Sprint)
```dataview
TABLE story-points, assignee, due-date, project
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND status = "Done"
  AND !contains(file.folder, "Templates")
  AND (file.name = "Task-001-Integrate-Payment-Gateway-API" OR file.name = "Task-002-Redesign-Checkout-UI" OR file.name = "Task-004-Performance-Optimization")
SORT due-date ASC
```

### Completed Story Points (Velocity)
```dataview
TABLE 
  length(rows) AS "Completed Tasks",
  sum(rows.story-points) AS "Story Points Completed"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND status = "Done"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND (file.name = "Task-001-Integrate-Payment-Gateway-API" OR file.name = "Task-002-Redesign-Checkout-UI" OR file.name = "Task-004-Performance-Optimization")
GROUP BY "Sprint Velocity"
```



