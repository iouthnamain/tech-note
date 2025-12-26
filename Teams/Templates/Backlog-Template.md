---
type: backlog-overview
team: "{{team-name}}"
date: {{date}}
tags: [backlog, team-backlog]
---

# Team Backlog: {{team-name}}

## Backlog Overview

**Team**: `= this.team`  
**Last Updated**: `= this.date`

## Open Backlog Items

```dataview
TABLE status, priority, assignee, story-points, due-date
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

## Backlog by Priority

### High Priority

```dataview
TABLE status, assignee, story-points, due-date
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND priority = "High"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### Medium Priority

```dataview
TABLE status, assignee, story-points, due-date
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND priority = "Medium"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### Low Priority

```dataview
TABLE status, assignee, story-points, due-date
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND priority = "Low"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## Backlog by Category

```dataview
LIST rows.file.link
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY category
```

## Backlog Statistics

```dataview
TABLE 
  length(rows) AS "Total Items",
  sum(rows.story-points) AS "Total Story Points"
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY "Summary"
```

## Backlog by Status

```dataview
TABLE 
  length(rows) AS "Count",
  sum(rows.story-points) AS "Story Points"
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

## Related Projects

```dataview
LIST DISTINCT rows.project
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND project
  AND !contains(file.folder, "Templates")
```

## Quick Links

- [[../Team-Name|Team Page]]
- [[../Projects/Projects|Team Projects]]

---

**Last Updated**: {{date}}



