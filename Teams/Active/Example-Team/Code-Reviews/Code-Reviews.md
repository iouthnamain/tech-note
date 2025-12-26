---
type: code-reviews-overview
team: "Example Team"
tags: [code-review]
---

# Code Reviews: Example Team

## Recent Code Reviews

```dataview
TABLE author, reviewer, status, date, pr-number
FROM "Teams/Active/Example-Team/Code-Reviews"
WHERE type = "code-review"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 20
```

## Reviews by Status

```dataview
TABLE 
  length(rows) AS "Count"
FROM "Teams/Active/Example-Team/Code-Reviews"
WHERE type = "code-review"
  AND !contains(file.folder, "Templates")
GROUP BY status
```

---

**Last Updated**: 2025-01-29



