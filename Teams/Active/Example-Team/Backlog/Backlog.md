---
type: backlog-overview
team: "Example Team"
date: 2025-01-29
tags: [backlog, team-backlog]
---

# Team Backlog: Example Team

## Backlog Overview

**Team**: `= this.team`  
**Last Updated**: `= this.date`

## Open Backlog Items

```dataview
TABLE status, priority, assignee, story-points, due-date
FROM "Teams/Active/Example-Team/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

## Backlog Statistics

```dataview
TABLE 
  length(rows) AS "Total Items",
  sum(rows.story-points) AS "Total Story Points"
FROM "Teams/Active/Example-Team/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY "Summary"
```

---

**Last Updated**: 2025-01-29





