---
type: team-retros-overview
team: "Example Team"
tags: [retro]
---

# Team Retros: Example Team

## Recent Retros

```dataview
TABLE sprint, date, status
FROM "Teams/Active/Example-Team/Team-Retros"
WHERE type = "team-retro"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

---

**Last Updated**: 2025-01-29





