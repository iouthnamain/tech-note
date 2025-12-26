---
project: "E-Commerce Platform Enhancement"
---

# Tasks Overview

```dataview
TABLE status, assignee, due-date, priority, story-points
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND !contains(file.folder, "Templates")
SORT due-date ASC, priority DESC
```

## Tasks by Status

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

## Tasks by Priority

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND !contains(file.folder, "Templates")
GROUP BY priority
SORT priority DESC
```

## Story Points Summary

```dataview
TABLE 
  length(rows) AS "Total Tasks",
  sum(rows.story-points) AS "Total Story Points",
  sum(filter(rows, (r) => r.status = "Done").story-points) AS "Completed Points",
  sum(filter(rows, (r) => r.status != "Done").story-points) AS "Remaining Points"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY "Summary"
```

## Tasks by Assignee

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND assignee
  AND !contains(file.folder, "Templates")
GROUP BY assignee
SORT assignee ASC
```

## Overdue Tasks

```dataview
TABLE task-name, assignee, due-date, priority, story-points
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND status != "Done"
  AND due-date <= date(today)
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## Tasks Due This Week

```dataview
TABLE task-name, assignee, due-date, priority, story-points
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND project = this.project
  AND status != "Done"
  AND due-date <= date(today) + dur(7 days)
  AND due-date >= date(today)
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```
