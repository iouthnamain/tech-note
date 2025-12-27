---
type: dashboard
dashboard-name: "Team Lead Dashboard"
scope: "My Team Lead Activities"
created-date: 2025-01-29
tags: [dashboard, team-lead]
---

# Team Lead Dashboard

My Team Lead activities dashboard. Shows upcoming one-on-ones, pending reviews, backlog items, and recent activities.

## Upcoming One-on-Ones

```dataview
TABLE team, member, date, status
FROM "Teams/Active"
WHERE type = "one-on-one"
  AND team-lead = "{{Your Name}}"
  AND status = "Scheduled"
  AND date >= date(today)
  AND !contains(file.folder, "Templates")
SORT date ASC
LIMIT 10
```

## Pending Code Reviews

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

## Backlog Items Needing Attention

```dataview
TABLE team, item-name, priority, status, assignee
FROM "Teams/Active"
WHERE type = "backlog-item"
  AND status != "Done"
  AND (priority = "High" OR assignee = "{{Your Name}}")
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
LIMIT 15
```

## Recent Technical Decisions (ADRs)

```dataview
TABLE team, adr-number, status, date
FROM "Teams/Active"
WHERE type = "adr"
  AND contains(deciders, "{{Your Name}}")
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Team Activities Summary

### This Week's One-on-Ones

```dataview
TABLE team, member, date
FROM "Teams/Active"
WHERE type = "one-on-one"
  AND team-lead = "{{Your Name}}"
  AND date >= date(today) - dur(7 days)
  AND date <= date(today) + dur(7 days)
  AND !contains(file.folder, "Templates")
SORT date ASC
```

### Code Reviews This Week

```dataview
TABLE team, author, status, date
FROM "Teams/Active"
WHERE type = "code-review"
  AND reviewer = "{{Your Name}}"
  AND date >= date(today) - dur(7 days)
  AND !contains(file.folder, "Templates")
SORT date DESC
```

## Performance Review Reminders

```dataview
TABLE team, member, date
FROM "Teams/Active"
WHERE type = "performance-review"
  AND date >= date(today)
  AND date <= date(today) + dur(90 days)
  AND !contains(file.folder, "Templates")
SORT date ASC
```

## Retrospective Reminders

```dataview
TABLE team, date
FROM "Teams/Active"
WHERE type = "team-retro"
  AND date >= date(today)
  AND date <= date(today) + dur(14 days)
  AND !contains(file.folder, "Templates")
SORT date ASC
```

## Recent Incidents

```dataview
TABLE team, incident-name, status, date
FROM "Teams/Active"
WHERE type = "incident"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

## Quick Links

- [[My-Team-Dashboard|My Team Dashboard]] - Dashboard for team I lead
- [[Teams-Dashboard|All Teams]] - View all teams
- [[Unified-Dashboard|Unified Dashboard]] - Combined Team Lead + Developer view
- [[../Team-Lead-Guides/README|Team Lead Guides]] - Reference guides

---

**Note**: Replace `{{Your Name}}` with your actual name in queries.

**Last Updated**: 2025-01-29





