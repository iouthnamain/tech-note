---
type: code-reviews-overview
tags: [code-reviews]
---

# Code Reviews Received

## Recent Reviews

```dataview
TABLE reviewer, pr-number, status, date
FROM "Developer/Code-Reviews"
WHERE type = "code-review-received"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 20
```

## Reviews by Status

```dataview
LIST rows.file.link
FROM "Developer/Code-Reviews"
WHERE type = "code-review-received"
  AND !contains(file.folder, "Templates")
GROUP BY status
```

---

**Last Updated**: 2025-01-29



