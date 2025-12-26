---
project: "Customer Portal Redesign"
---

# Issues Overview

```dataview
TABLE priority, severity, status, assigned-to, date-reported
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Issues by Priority

```dataview
LIST rows.file.link
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY priority
SORT priority DESC
```

## Issues by Status

```dataview
LIST rows.file.link
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

## Critical & High Priority Issues

```dataview
TABLE WITHOUT ID issue-name, severity, status, assigned-to, date-reported
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND (priority = "Critical" OR priority = "High")
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Issues by Assignee

```dataview
LIST rows.file.link
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND assigned-to
  AND !contains(file.folder, "Templates")
GROUP BY assigned-to
SORT assigned-to ASC
```

## Recent Issues (Last 7 Days)

```dataview
TABLE WITHOUT ID issue-name, priority, severity, status, assigned-to, date-reported
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND date-reported >= date(today) - dur(7 days)
  AND !contains(file.folder, "Templates")
SORT date-reported DESC
```

## Issue Statistics

```dataview
TABLE 
  length(rows) AS "Total Open",
  length(filter(rows, (r) => r.priority = "Critical")) AS "Critical",
  length(filter(rows, (r) => r.priority = "High")) AS "High",
  length(filter(rows, (r) => r.status = "Open")) AS "Open",
  length(filter(rows, (r) => r.status = "In Progress")) AS "In Progress"
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```



