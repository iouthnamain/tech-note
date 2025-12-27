---
project: "E-Commerce Platform Enhancement"
---

# Team Members Overview

## All Team Members

```dataview
TABLE role, email, skills
FROM "Projects/Active/E-Commerce-Platform-Enhancement/Members"
WHERE type = "member"
  AND !contains(file.name, "Members.md")
  AND !contains(file.folder, "Templates")
SORT member-name ASC
```

## Member Workload Distribution

```dataview
TABLE 
  member-name,
  length(filter(rows, (r) => r.assignee = member-name AND r.status != "Done")) AS "Open Tasks",
  sum(filter(rows, (r) => r.assignee = member-name AND r.status != "Done").story-points) AS "Remaining Points"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND assignee
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = this.project
GROUP BY assignee
SORT "Remaining Points" DESC
```

## Assignments by Member

### Tasks by Assignee

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND assignee
  AND project = this.project
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY assignee
SORT assignee ASC
```

### Risks by Owner

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "risk"
  AND owner
  AND project = this.project
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY owner
SORT owner ASC
```

### Issues by Assignee

```dataview
LIST rows.file.link
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "issue"
  AND assigned-to
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY assigned-to
SORT assigned-to ASC
```

## Member Statistics

### Task Statistics by Member

```dataview
TABLE 
  assignee AS "Member",
  length(rows) AS "Total Tasks",
  length(filter(rows, (r) => r.status = "Done")) AS "Completed",
  length(filter(rows, (r) => r.status = "In Progress")) AS "In Progress",
  length(filter(rows, (r) => r.status = "To Do")) AS "To Do",
  sum(rows.story-points) AS "Total Points"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND assignee
  AND project = this.project
  AND !contains(file.folder, "Templates")
GROUP BY assignee
SORT "Total Points" DESC
```

### Workload Summary

```dataview
TABLE 
  length(rows) AS "Total Members",
  sum(rows.story-points) AS "Total Story Points",
  sum(filter(rows, (r) => r.status != "Done").story-points) AS "Remaining Points"
FROM "Projects/Active/E-Commerce-Platform-Enhancement"
WHERE type = "task"
  AND assignee
  AND story-points
  AND project = this.project
  AND !contains(file.folder, "Templates")
GROUP BY "Summary"
```

## Member Links

- [[Alice-Developer|Alice Developer]] - Full Stack Developer
- [[Bob-Designer|Bob Designer]] - UI/UX Designer
- [[Carol-QA|Carol QA]] - QA Engineer





