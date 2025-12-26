---
type: projects-overview
team: "Example Team"
tags: [projects]
---

# Team Projects: Example Team

## Projects Overview

```dataview
LIST rows.file.link
FROM "Teams/Active/Example-Team/Projects"
WHERE type = "project"
  AND !contains(file.folder, "Templates")
```

## Projects Linked from Projects Folder

[Link to projects in Projects/Active folder]

---

**Last Updated**: 2025-01-29



