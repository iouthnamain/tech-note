---
type: personal-projects-overview
tags: [personal-projects]
---

# Personal Projects

## All Projects

```dataview
TABLE status, progress, start-date
FROM "Developer/Personal-Projects"
WHERE type = "personal-project"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
```

## Projects by Status

```dataview
LIST rows.file.link
FROM "Developer/Personal-Projects"
WHERE type = "personal-project"
  AND !contains(file.folder, "Templates")
GROUP BY status
```

---

**Last Updated**: 2025-01-29



