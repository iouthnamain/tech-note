---
type: performance-reviews-overview
team: "Example Team"
tags: [performance-review]
---

# Performance Reviews: Example Team

## Recent Performance Reviews

```dataview
TABLE member, date, status
FROM "Teams/Active/Example-Team/Performance-Reviews"
WHERE type = "performance-review"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

---

**Last Updated**: 2025-01-29



