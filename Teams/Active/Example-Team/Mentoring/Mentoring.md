---
type: mentoring-overview
team: "Example Team"
tags: [mentoring]
---

# Mentoring: Example Team

## Recent Mentoring Sessions

```dataview
TABLE member, date, status
FROM "Teams/Active/Example-Team/Mentoring/Sessions"
WHERE type = "mentoring-session"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Development Plans

```dataview
TABLE member, status, created-date
FROM "Teams/Active/Example-Team/Mentoring/Development-Plans"
WHERE type = "development-plan"
  AND !contains(file.folder, "Templates")
SORT created-date DESC
```

---

**Last Updated**: 2025-01-29





