---
type: research-overview
tags: [research]
---

# Technical Research

## Recent Research

```dataview
TABLE title, status, date
FROM "Developer/Technical-Research"
WHERE type = "research-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 20
```

## Research by Status

```dataview
LIST rows.file.link
FROM "Developer/Technical-Research"
WHERE type = "research-note"
  AND !contains(file.folder, "Templates")
GROUP BY status
```

---

**Last Updated**: 2025-01-29





