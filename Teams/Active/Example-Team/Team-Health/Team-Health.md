---
type: team-health-overview
team: "Example Team"
tags: [team-health]
---

# Team Health: Example Team

## Recent Health Reports

```dataview
TABLE date, status
FROM "Teams/Active/Example-Team/Team-Health"
WHERE type = "team-health"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

---

**Last Updated**: 2025-01-29





