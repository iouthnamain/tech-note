# Tasks Overview

```dataview
TABLE status, assignee, due-date, priority, story-points
FROM "Projects/Active/E-Commerce-Platform-Enhancement/Tasks"
WHERE type = "task"
  AND !contains(file.folder, "Templates")
SORT due-date ASC, priority DESC
```

## Tasks by Status

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement/Tasks"
WHERE type = "task"
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

## Tasks by Priority

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement/Tasks"
WHERE type = "task"
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
FROM "Projects/Active/E-Commerce-Platform-Enhancement/Tasks"
WHERE type = "task"
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY "Summary"
```

