# Project Management Dashboard

> **Last Updated**: `= date(today)`

## Active Projects

```dataview
TABLE status, priority, progress, start-date, end-date
FROM "Projects/Active"
WHERE project-name AND status = "Active" AND !contains(file.folder, "Templates")
SORT priority DESC, start-date ASC
```

## Tasks Overview

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
TABLE task-name, project, status, assignee, due-date
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY priority
SORT priority DESC
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

## Upcoming Deadlines

```dataview
TABLE project, task-name, assignee, due-date
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND due-date <= date(today) + dur(7 days)
  AND project
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## High Priority Risks

```dataview
TABLE project, probability, impact, risk-score, status, owner
FROM "Projects/Active"
WHERE type = "risk"
  AND risk-score >= 6
  AND status != "Closed"
  AND project
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

## Open Issues

```dataview
TABLE project, priority, status, assigned-to, date-reported
FROM "Projects/Active"
WHERE type = "issue"
  AND project
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Recent Status Reports

```dataview
TABLE project, report-date, status, period-start, period-end
FROM "Projects/Active"
WHERE type = "status-report"
  AND project
  AND !contains(file.folder, "Templates")
SORT report-date DESC
LIMIT 10
```

## Projects by Status

### On Hold Projects

```dataview
TABLE status, priority, start-date
FROM "Projects/On-Hold"
WHERE project-name AND !contains(file.folder, "Templates")
SORT start-date DESC
```

### Completed Projects

```dataview
TABLE status, end-date, progress
FROM "Projects/Completed"
WHERE project-name AND !contains(file.folder, "Templates")
SORT end-date DESC
LIMIT 10
```

## Quick Links

- [[Projects/README|Setup Guide]]
- [[Project-Template|New Project Template]]
- [[Templates/Risks-Issues-Tasks-Dashboard-Template|Risks/Issues/Tasks Dashboard Template]]
- [[Task-Template|Task Template]]
- [[Templates/Story-Point-Template|Story Points Guide]]
- [[Risk-Template|Risk Template]]
- [[Issue-Template|Issue Template]]
- [[Status-Report-Template|Status Report Template]]
- PM Guides: [[../PM-Guides/PROJECT_METHODOLOGIES_GUIDE|Methodologies]], [[../PM-Guides/PLANNING_ESTIMATION_GUIDE|Planning & Estimation]], [[../PM-Guides/RISK_ISSUE_MANAGEMENT_GUIDE|Risk & Issue Mgmt]], [[../PM-Guides/MONITORING_CONTROL_REPORTING_GUIDE|Monitoring & Reporting]], [[../PM-Guides/DELIVERY_HANDOVER_GUIDE|Delivery & Handover]]
- Dev Guides: [[../Developer-Guides/TESTING_STRATEGIES_GUIDE|Testing]], [[../Developer-Guides/SECURITY_BEST_PRACTICES_GUIDE|Security]], [[../Developer-Guides/DEVOPS_CICD_GUIDE|CI/CD]], [[../Developer-Guides/PERFORMANCE_OPTIMIZATION_GUIDE|Performance]], [[../Developer-Guides/API_DESIGN_INTEGRATION_GUIDE|API Design]], [[../Developer-Guides/ARCHITECTURE_PATTERNS_GUIDE|Architecture]]

## Statistics

### Project Counts

```dataview
TABLE length(rows) AS "Active Projects"
FROM "Projects/Active"
WHERE project-name AND status = "Active" AND !contains(file.folder, "Templates")
```

```dataview
TABLE length(rows) AS "Completed Projects"
FROM "Projects/Completed"
WHERE project-name AND status = "Completed" AND !contains(file.folder, "Templates")
```

```dataview
TABLE length(rows) AS "On Hold Projects"
FROM "Projects/On-Hold"
WHERE project-name AND status = "On Hold" AND !contains(file.folder, "Templates")
```

### Task Statistics

```dataview
TABLE length(rows) AS "Total Open Tasks"
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

```dataview
TABLE length(rows) AS "Overdue Tasks"
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND due-date <= date(today)
  AND project
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```


