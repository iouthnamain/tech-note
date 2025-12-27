---
type: tasks-overview
tags: [personal-tasks]
---

# Personal Tasks

## Open Tasks

```dataview
TABLE status, priority, due-date, category
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

## Tasks by Category

```dataview
LIST rows.file.link
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY category
```

## Tasks by Status

```dataview
TABLE 
  length(rows) AS "Count"
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND !contains(file.folder, "Templates")
GROUP BY status
```

---

**Last Updated**: 2025-01-29





