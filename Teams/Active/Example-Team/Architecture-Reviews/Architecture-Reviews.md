---
type: architecture-reviews-overview
team: "Example Team"
tags: [architecture-review]
---

# Architecture Reviews: Example Team

## Recent Architecture Reviews

```dataview
TABLE feature-name, reviewer, status, date
FROM "Teams/Active/Example-Team/Architecture-Reviews"
WHERE type = "architecture-review"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

---

**Last Updated**: 2025-01-29





