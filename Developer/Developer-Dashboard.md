---
type: dashboard
dashboard-name: "Developer Dashboard"
scope: "My Developer Activities"
created-date: 2025-01-29
tags: [dashboard, developer]
---

# Developer Dashboard

My personal developer activities dashboard. Track tasks, learning, code snippets, and development progress.

## Personal Tasks Overview

### Open Tasks

```dataview
TABLE status, priority, due-date, category
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

### Tasks by Category

```dataview
TABLE 
  length(rows) AS "Count"
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY category
```

## Recent Technical Notes

```dataview
TABLE topic, category, date
FROM "Developer/Technical-Notes"
WHERE type = "technical-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Code Snippets by Topic

```dataview
LIST rows.file.link
FROM "Developer/Code-Snippets"
WHERE type = "code-snippet"
  AND !contains(file.folder, "Templates")
GROUP BY language
SORT language ASC
```

## Learning Progress

### Recent Learning Notes

```dataview
TABLE topic, date
FROM "Developer/Technical-Notes/Learning"
WHERE type = "technical-note"
  AND category = "Learning"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Code Reviews Received

### Recent Reviews

```dataview
TABLE reviewer, pr-number, status, date
FROM "Developer/Code-Reviews"
WHERE type = "code-review-received"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

### Review Statistics

```dataview
TABLE 
  length(rows) AS "Total Reviews",
  length(filter(rows, (r) => r.status = "Approved")) AS "Approved",
  length(filter(rows, (r) => r.status = "Changes Requested")) AS "Changes Requested"
FROM "Developer/Code-Reviews"
WHERE type = "code-review-received"
  AND date >= date(today) - dur(30 days)
  AND !contains(file.folder, "Templates")
GROUP BY "Last 30 Days"
```

## Personal Projects Status

```dataview
TABLE status, progress, start-date
FROM "Developer/Personal-Projects"
WHERE type = "personal-project"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
```

## Technical Research

### Recent Research

```dataview
TABLE title, date
FROM "Developer/Technical-Research"
WHERE type = "research-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Daily Notes Summary

### Recent Daily Notes

```dataview
TABLE date
FROM "Developer/Daily-Notes"
WHERE type = "daily-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 7
```

## Links to Project Work

### Tasks Linked to Projects

```dataview
TABLE status, priority, related-project, due-date
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND related-project
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

## Quick Links

- [[../Teams/Unified-Dashboard|Unified Dashboard]] - Combined Team Lead + Developer view
- [[../Teams/Team-Lead-Dashboard|Team Lead Dashboard]] - My Team Lead activities (if applicable)
- [[../Projects/Project-Dashboard|Projects Dashboard]] - All projects
- [[../Developer-Guides/README|Developer Guides]] - Technical guides

---

**Last Updated**: 2025-01-29





