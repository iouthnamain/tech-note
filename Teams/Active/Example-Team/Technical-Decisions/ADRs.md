---
type: adrs-overview
team: "Example Team"
tags: [adr]
---

# Architecture Decision Records: Example Team

## Recent ADRs

```dataview
TABLE adr-number, status, date
FROM "Teams/Active/Example-Team/Technical-Decisions"
WHERE type = "adr"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 20
```

## ADRs by Status

```dataview
LIST rows.file.link
FROM "Teams/Active/Example-Team/Technical-Decisions"
WHERE type = "adr"
  AND !contains(file.folder, "Templates")
GROUP BY status
```

---

**Last Updated**: 2025-01-29





