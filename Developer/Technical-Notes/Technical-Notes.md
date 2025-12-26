---
type: technical-notes-overview
tags: [technical-notes]
---

# Technical Notes

## Recent Notes

```dataview
TABLE topic, category, date
FROM "Developer/Technical-Notes"
WHERE type = "technical-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 20
```

## Notes by Topic

```dataview
LIST rows.file.link
FROM "Developer/Technical-Notes"
WHERE type = "technical-note"
  AND !contains(file.folder, "Templates")
GROUP BY topic
```

## Notes by Category

```dataview
LIST rows.file.link
FROM "Developer/Technical-Notes"
WHERE type = "technical-note"
  AND !contains(file.folder, "Templates")
GROUP BY category
```

---

**Last Updated**: 2025-01-29



