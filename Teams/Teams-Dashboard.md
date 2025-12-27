---
type: dashboard
dashboard-name: "Teams Dashboard"
scope: "All Teams"
created-date: 2025-01-29
tags: [dashboard, teams]
---

# Teams Dashboard

Overview of all teams, their status, and recent activities.

## All Teams

```dataview
TABLE 
  team-lead,
  status,
  length(members) AS "Members",
  length(projects) AS "Projects"
FROM "Teams/Active"
WHERE type = "team"
  AND !contains(file.folder, "Templates")
SORT team-name ASC
```

## Active Teams Summary

```dataview
TABLE 
  length(rows) AS "Total Teams",
  sum(length(rows.members)) AS "Total Members",
  sum(length(rows.projects)) AS "Total Projects"
FROM "Teams/Active"
WHERE type = "team"
  AND status = "Active"
  AND !contains(file.folder, "Templates")
GROUP BY "Summary"
```

## Recent Team Activities

### Recent One-on-Ones

```dataview
TABLE team, member, date
FROM "Teams/Active"
WHERE type = "one-on-one"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

### Recent Code Reviews

```dataview
TABLE team, author, reviewer, status, date
FROM "Teams/Active"
WHERE type = "code-review"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

### Recent Technical Decisions (ADRs)

```dataview
TABLE team, adr-number, status, date
FROM "Teams/Active"
WHERE type = "adr"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Team Health Overview

```dataview
TABLE team-name, status
FROM "Teams/Active"
WHERE type = "team-health"
  AND !contains(file.folder, "Templates")
SORT date DESC
```

## Quick Links

- [[My-Team-Dashboard|My Team Dashboard]] - Dashboard for team I lead
- [[Team-Lead-Dashboard|Team Lead Dashboard]] - My Team Lead activities
- [[Unified-Dashboard|Unified Dashboard]] - Combined Team Lead + Developer view
- [[../Projects/Project-Dashboard|Projects Dashboard]] - All projects

---

**Last Updated**: 2025-01-29





