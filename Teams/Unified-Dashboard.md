---
type: dashboard
dashboard-name: "Unified Dashboard"
scope: "Team Lead + Developer Activities"
created-date: 2025-01-29
tags: [dashboard, unified]
---

# Unified Dashboard

Combined view of Team Lead and Developer activities. See everything in one place.

## Today's Focus

### Upcoming One-on-Ones (Team Lead)

```dataview
TABLE team, member, date
FROM "Teams/Active"
WHERE type = "one-on-one"
  AND team-lead = "{{Your Name}}"
  AND date = date(today)
  AND !contains(file.folder, "Templates")
SORT date ASC
```

### High Priority Tasks (Developer)

```dataview
TABLE status, category, due-date
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND priority = "High"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## This Week Overview

### One-on-Ones This Week

```dataview
TABLE team, member, date
FROM "Teams/Active"
WHERE type = "one-on-one"
  AND team-lead = "{{Your Name}}"
  AND date >= date(today)
  AND date <= date(today) + dur(7 days)
  AND !contains(file.folder, "Templates")
SORT date ASC
```

### Pending Code Reviews (As Reviewer)

```dataview
TABLE team, author, pr-number, date
FROM "Teams/Active"
WHERE type = "code-review"
  AND reviewer = "{{Your Name}}"
  AND status = "Pending"
  AND !contains(file.folder, "Templates")
SORT date ASC
LIMIT 10
```

### Code Reviews Received (As Author)

```dataview
TABLE reviewer, pr-number, status, date
FROM "Developer/Code-Reviews"
WHERE type = "code-review-received"
  AND status = "Pending"
  AND !contains(file.folder, "Templates")
SORT date ASC
LIMIT 10
```

## Backlog Highlights

### Team Backlog Items (High Priority)

```dataview
TABLE team, item-name, priority, assignee, due-date
FROM "Teams/Active"
WHERE type = "backlog-item"
  AND priority = "High"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
LIMIT 10
```

## My Tasks

### Team Tasks (From Projects)

```dataview
TABLE project, status, priority, due-date
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = "{{Your Name}}"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
LIMIT 15
```

### Personal Tasks

```dataview
TABLE status, priority, category, due-date
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
LIMIT 15
```

## Recent Technical Activities

### Recent Technical Notes

```dataview
TABLE topic, category, date
FROM "Developer/Technical-Notes"
WHERE type = "technical-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

### Recent Technical Decisions (ADRs)

```dataview
TABLE team, adr-number, status, date
FROM "Teams/Active"
WHERE type = "adr"
  AND contains(deciders, "{{Your Name}}")
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

## Open Code Reviews

### As Reviewer

```dataview
TABLE team, author, pr-number, date
FROM "Teams/Active"
WHERE type = "code-review"
  AND reviewer = "{{Your Name}}"
  AND status = "Pending"
  AND !contains(file.folder, "Templates")
SORT date ASC
```

### As Author

```dataview
TABLE reviewer, pr-number, status, date
FROM "Developer/Code-Reviews"
WHERE type = "code-review-received"
  AND status != "Approved"
  AND !contains(file.folder, "Templates")
SORT date ASC
```

## Quick Links

- [[Team-Lead-Dashboard|Team Lead Dashboard]] - My Team Lead activities
- [[Developer-Dashboard|Developer Dashboard]] - My developer activities
- [[My-Team-Dashboard|My Team Dashboard]] - Dashboard for team I lead
- [[Teams-Dashboard|All Teams]] - View all teams
- [[../Projects/Project-Dashboard|Projects Dashboard]] - All projects

---

**Note**: Replace `{{Your Name}}` with your actual name in queries.

**Last Updated**: 2025-01-29



