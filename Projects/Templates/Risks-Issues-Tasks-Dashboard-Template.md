---
type: dashboard
dashboard-name: "{{title}}"
scope: "{{scope}}"
created-date: {{date}}
tags: [dashboard, risks, issues, tasks]
---

# {{dashboard-name}} - Risks, Issues & Tasks Dashboard

> **Last Updated**: `= date(today)`  
> **Scope**: `= this.scope` (All Projects / Specific Project / Custom Filter)

<!-- 
Customize this dashboard by commenting/uncommenting sections below.
Remove sections you don't need or add project-specific filters.
-->

## Quick Statistics

### Overview Metrics

```dataview
TABLE 
  length(rows) AS "Total Open Tasks",
  length(filter(rows, (r) => r.due-date <= date(today))) AS "Overdue Tasks",
  length(filter(rows, (r) => r.status = "In Progress")) AS "In Progress"
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

```dataview
TABLE 
  length(rows) AS "Open Risks",
  length(filter(rows, (r) => r.risk-score >= 6)) AS "High Risk",
  length(filter(rows, (r) => r.status = "Open")) AS "Active"
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

```dataview
TABLE 
  length(rows) AS "Open Issues",
  length(filter(rows, (r) => r.priority = "Critical" OR r.priority = "High")) AS "High Priority",
  length(filter(rows, (r) => r.status = "Open")) AS "Active"
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

---

## Tasks

<!-- Uncomment the sections below you want to include -->

### All Open Tasks

```dataview
TABLE task-name, project, status, assignee, due-date, priority
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
SORT due-date ASC, priority DESC
```

### Tasks by Priority

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY priority
SORT priority DESC
```

### Tasks by Status

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

### Tasks by Project

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

### My Tasks

```dataview
TABLE task-name, project, status, due-date, priority
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND contains(assignee, "YourName")
  AND project
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### Overdue Tasks

```dataview
TABLE task-name, project, assignee, due-date, priority
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND due-date <= date(today)
  AND project
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### Tasks Due This Week

```dataview
TABLE task-name, project, assignee, due-date, priority
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND due-date <= date(today) + dur(7 days)
  AND due-date >= date(today)
  AND project
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### Task Statistics

```dataview
TABLE 
  length(rows) AS "Total Open",
  length(filter(rows, (r) => r.status = "To Do")) AS "To Do",
  length(filter(rows, (r) => r.status = "In Progress")) AS "In Progress",
  length(filter(rows, (r) => r.status = "Blocked")) AS "Blocked",
  length(filter(rows, (r) => r.due-date <= date(today))) AS "Overdue"
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

---

## Risks

<!-- Uncomment the sections below you want to include -->

### All Open Risks

```dataview
TABLE risk-name, project, category, probability, impact, risk-score, status, owner, next-review
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

### High Priority Risks (Score >= 6)

```dataview
TABLE risk-name, project, category, probability, impact, risk-score, status, owner
FROM "Projects/Active"
WHERE type = "risk"
  AND risk-score >= 6
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

### Risks by Category

```dataview
TABLE risk-name, project, probability, impact, risk-score, status, owner
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY category
SORT category ASC
```

### Risks by Status

```dataview
TABLE risk-name, project, category, risk-score, owner, next-review
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

### Risks by Project

```dataview
TABLE risk-name, category, probability, impact, risk-score, status, owner
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

### Risks Needing Review

```dataview
TABLE risk-name, project, risk-score, status, owner, next-review
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND next-review <= date(today) + dur(7 days)
  AND project
  AND !contains(file.folder, "Templates")
SORT next-review ASC
```

### Risk Statistics

```dataview
TABLE 
  length(rows) AS "Total Open",
  length(filter(rows, (r) => r.risk-score >= 6)) AS "High Risk",
  length(filter(rows, (r) => r.risk-score >= 4 AND r.risk-score < 6)) AS "Medium Risk",
  length(filter(rows, (r) => r.risk-score < 4)) AS "Low Risk",
  length(filter(rows, (r) => r.status = "Open")) AS "Open",
  length(filter(rows, (r) => r.status = "Mitigating")) AS "Mitigating"
FROM "Projects/Active"
WHERE type = "risk"
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

---

## Issues

<!-- Uncomment the sections below you want to include -->

### All Open Issues

```dataview
TABLE issue-name, project, priority, severity, status, assigned-to, date-reported
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

### Critical & High Priority Issues

```dataview
TABLE issue-name, project, severity, status, assigned-to, date-reported
FROM "Projects/Active"
WHERE type = "issue"
  AND (priority = "Critical" OR priority = "High")
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

### Issues by Priority

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY priority
SORT priority DESC
```

### Issues by Status

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

### Issues by Project

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

### My Issues

```dataview
TABLE issue-name, project, priority, severity, status, date-reported
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND contains(assigned-to, "YourName")
  AND project
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

### Recent Issues (Last 7 Days)

```dataview
TABLE issue-name, project, priority, severity, status, assigned-to, date-reported
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND date-reported >= date(today) - dur(7 days)
  AND project
  AND !contains(file.folder, "Templates")
SORT date-reported DESC
```

### Issue Statistics

```dataview
TABLE 
  length(rows) AS "Total Open",
  length(filter(rows, (r) => r.priority = "Critical")) AS "Critical",
  length(filter(rows, (r) => r.priority = "High")) AS "High",
  length(filter(rows, (r) => r.status = "Open")) AS "Open",
  length(filter(rows, (r) => r.status = "In Progress")) AS "In Progress",
  length(filter(rows, (r) => r.status = "Blocked")) AS "Blocked"
FROM "Projects/Active"
WHERE type = "issue"
  AND status != "Resolved" AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

---

## Combined Views

### Tasks, Risks, and Issues by Project

```dataview
TABLE 
  length(filter(rows, (r) => r.type = "task" AND r.status != "Done")) AS "Tasks",
  length(filter(rows, (r) => r.type = "risk" AND r.status != "Closed")) AS "Risks",
  length(filter(rows, (r) => r.type = "issue" AND r.status != "Resolved" AND r.status != "Closed")) AS "Issues"
FROM "Projects/Active"
WHERE (type = "task" OR type = "risk" OR type = "issue")
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

### Urgent Items (Overdue Tasks + High Risks + Critical Issues)

```dataview
TABLE 
  choice(type = "task", task-name, choice(type = "risk", risk-name, issue-name)) AS "Item",
  type AS "Type",
  project,
  choice(type = "task", due-date, choice(type = "risk", next-review, date-reported)) AS "Date",
  choice(type = "task", priority, choice(type = "risk", risk-score, priority)) AS "Priority/Score"
FROM "Projects/Active"
WHERE (
  (type = "task" AND status != "Done" AND due-date <= date(today)) OR
  (type = "risk" AND status != "Closed" AND risk-score >= 6) OR
  (type = "issue" AND status != "Resolved" AND status != "Closed" AND priority = "Critical")
)
  AND project
  AND !contains(file.folder, "Templates")
SORT choice(type = "task", due-date, choice(type = "risk", next-review, date-reported)) ASC
```

---

## Customization Notes

- **Filter by Project**: Add `AND project = "Project-Name"` to any query to filter for a specific project
- **Filter by Assignee**: Replace `"YourName"` with actual assignee name in "My Tasks" and "My Issues" sections
- **Adjust Date Ranges**: Modify `dur(7 days)` in queries to change time windows
- **Enable/Disable Sections**: Comment out sections you don't need using `<!-- -->`
- **Add Custom Filters**: Extend WHERE clauses with additional conditions as needed

## Quick Links

- [[Project-Dashboard|Main Project Dashboard]]
- [[Projects/README|Setup Guide]]
- [[Task-Template|Task Template]]
- [[Risk-Template|Risk Template]]
- [[Issue-Template|Issue Template]]


