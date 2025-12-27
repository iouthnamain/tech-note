---
type: one-on-ones-overview
team: "Example Team"
tags: [1on1]
---

# One-on-Ones: Example Team

## Upcoming One-on-Ones

```dataview
TABLE member, date, status
FROM "Teams/Active/Example-Team/One-on-Ones"
WHERE type = "one-on-one"
  AND status = "Scheduled"
  AND date >= date(today)
  AND !contains(file.folder, "Templates")
SORT date ASC
```

## Recent One-on-Ones

```dataview
TABLE member, date, status
FROM "Teams/Active/Example-Team/One-on-Ones"
WHERE type = "one-on-one"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

---

**Last Updated**: 2025-01-29





