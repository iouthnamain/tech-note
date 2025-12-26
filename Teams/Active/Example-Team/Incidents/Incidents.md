---
type: incidents-overview
team: "Example Team"
tags: [incident]
---

# Incidents: Example Team

## Recent Incidents

```dataview
TABLE incident-name, severity, status, date
FROM "Teams/Active/Example-Team/Incidents"
WHERE type = "incident"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

---

**Last Updated**: 2025-01-29



