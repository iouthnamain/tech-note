---
type: member
member-name: "{{member-name}}"
role: "{{role}}"
email: "{{email}}"
projects: ["{{project-name}}"]
skills: []
tags: [member]
---

# {{member-name}}

## Member Overview

**Role**: `= this.role`  
**Email**: `= this.email`  
**Projects**: `= this.projects`  
**Skills**: `= this.skills`

## Current Assignments

### Tasks Assigned

```dataview
TABLE status, priority, due-date, story-points, project
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC, priority DESC
```

### Tasks Completed (This Month)

```dataview
TABLE status, priority, due-date, story-points, project
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status = "Done"
  AND file.mtime >= date(today) - dur(30 days)
  AND !contains(file.folder, "Templates")
SORT file.mtime DESC
LIMIT 10
```

### Risks Owned

```dataview
TABLE risk-score, status, next-review, project
FROM "Projects/Active"
WHERE type = "risk"
  AND owner = this.member-name
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

### Issues Assigned

```dataview
TABLE priority, severity, status, date-reported, project
FROM "Projects/Active"
WHERE type = "issue"
  AND assigned-to = this.member-name
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Workload Summary

### Story Points Summary

```dataview
TABLE 
  length(rows) AS "Total Tasks",
  sum(rows.story-points) AS "Total Story Points",
  sum(filter(rows, (r) => r.status = "Done").story-points) AS "Completed Points",
  sum(filter(rows, (r) => r.status != "Done").story-points) AS "Remaining Points"
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY "Workload"
```

### Tasks by Status

```dataview
TABLE 
  length(rows) AS "Count",
  sum(rows.story-points) AS "Story Points"
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

### Tasks by Project

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

## Skills & Expertise

- [Skill 1]
- [Skill 2]
- [Skill 3]

## Notes

[Additional notes about the team member, availability, preferences, etc.]

## Related

- [[Members/Members|Team Members Overview]]
- [Project links based on assignments]





