---
type: members-overview
team: "Example Team"
tags: [members]
---

# Team Members: Example Team

## All Members

```dataview
TABLE role, status, skills, teams
FROM "Teams/Active/Example-Team/Members"
WHERE type = "team-member"
  AND !contains(file.name, "Members.md")
  AND !contains(file.folder, "Templates")
SORT member-name ASC
```

## Members by Role

```dataview
LIST rows.file.link
FROM "Teams/Active/Example-Team/Members"
WHERE type = "team-member"
  AND !contains(file.name, "Members.md")
  AND !contains(file.folder, "Templates")
GROUP BY role
```

---

**Last Updated**: 2025-01-29





