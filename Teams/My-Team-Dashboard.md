---
type: dashboard
dashboard-name: "My Team Dashboard"
scope: "Team I Lead"
created-date: 2025-01-29
tags: [dashboard, my-team]
---

# My Team Dashboard

Dashboard for the team I lead. Replace `{{team-name}}` with your actual team name in queries.

## Team Overview

```dataview
TABLE team-lead, status, members, projects, technology-stack
FROM "Teams/Active"
WHERE type = "team"
  AND team-lead = "{{Your Name}}"
  AND !contains(file.folder, "Templates")
```

## Team Members

```dataview
TABLE role, status, skills
FROM "Teams/Active"
WHERE type = "team-member"
  AND contains(teams, "{{team-name}}")
  AND !contains(file.folder, "Templates")
SORT member-name ASC
```

## Team Backlog

### Open Backlog Items

```dataview
TABLE status, priority, assignee, story-points, due-date
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

### Backlog by Priority

```dataview
TABLE 
  length(rows) AS "Count",
  sum(rows.story-points) AS "Story Points"
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY priority
SORT priority DESC
```

## Upcoming One-on-Ones

```dataview
TABLE member, date, status
FROM "Teams/Active/{{team-name}}/One-on-Ones"
WHERE type = "one-on-one"
  AND status = "Scheduled"
  AND date >= date(today)
  AND !contains(file.folder, "Templates")
SORT date ASC
LIMIT 10
```

## Recent Code Reviews

```dataview
TABLE author, reviewer, status, date, review-time
FROM "Teams/Active/{{team-name}}/Code-Reviews"
WHERE type = "code-review"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Team Metrics

### Code Review Statistics

```dataview
TABLE 
  length(rows) AS "Total Reviews",
  length(filter(rows, (r) => r.status = "Approved")) AS "Approved",
  length(filter(rows, (r) => r.status = "Changes Requested")) AS "Changes Requested"
FROM "Teams/Active/{{team-name}}/Code-Reviews"
WHERE type = "code-review"
  AND date >= date(today) - dur(30 days)
  AND !contains(file.folder, "Templates")
GROUP BY "Last 30 Days"
```

### Team Health

```dataview
TABLE date, status
FROM "Teams/Active/{{team-name}}/Team-Health"
WHERE type = "team-health"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

## Team Projects

```dataview
LIST rows.file.link
FROM "Teams/Active/{{team-name}}/Projects"
WHERE type = "project"
  AND !contains(file.folder, "Templates")
```

## Quick Actions

- [[../Teams-Dashboard|All Teams]] - View all teams
- [[Team-Lead-Dashboard|My Activities]] - My Team Lead activities
- [[Unified-Dashboard|Unified View]] - Combined Team Lead + Developer view

---

**Note**: Replace `{{team-name}}` and `{{Your Name}}` with actual values in queries.

**Last Updated**: 2025-01-29





