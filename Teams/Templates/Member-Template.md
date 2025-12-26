---
type: team-member
member-name: "{{member-name}}"
role: "{{role}}"
email: "{{email}}"
teams: ["{{team-name}}"]
projects: []
skills: []
status: Active
tags: [member]
---

# {{member-name}}

## Member Overview

**Role**: `= this.role`  
**Email**: `= this.email`  
**Teams**: `= this.teams`  
**Projects**: `= this.projects`  
**Skills**: `= this.skills`  
**Status**: `= this.status`

## Current Assignments

### Tasks Assigned (From Projects)

```dataview
TABLE status, priority, due-date, story-points, project
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC, priority DESC
```

### Backlog Items Assigned

```dataview
TABLE status, priority, story-points, due-date
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND assignee = this.member-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

### Tasks Completed (This Month)

```dataview
TABLE status, priority, due-date, story-points, project
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status = "Done"
  AND file.mtime >= date(today) - dur(30 days)
  AND !contains(file.folder, "Templates")
SORT file.mtime DESC
LIMIT 10
```

## One-on-One History

```dataview
TABLE date, status
FROM "Teams/Active/{{team-name}}/One-on-Ones"
WHERE type = "one-on-one"
  AND member = this.member-name
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

## Development Plan

**Development Plan**: [[../Mentoring/Development-Plans/{{member-name}}-Development-Plan|View Development Plan]]

## Code Review Statistics

### Reviews Conducted

```dataview
TABLE 
  length(rows) AS "Total Reviews",
  length(filter(rows, (r) => r.status = "Approved")) AS "Approved"
FROM "Teams/Active/{{team-name}}/Code-Reviews"
WHERE type = "code-review"
  AND reviewer = this.member-name
  AND date >= date(today) - dur(30 days)
  AND !contains(file.folder, "Templates")
GROUP BY "Last 30 Days"
```

## Performance Reviews

```dataview
TABLE date, status
FROM "Teams/Active/{{team-name}}/Performance-Reviews"
WHERE type = "performance-review"
  AND member = this.member-name
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

## Skills & Expertise

- [Skill 1]
- [Skill 2]
- [Skill 3]

## Notes

[Additional notes about the team member, availability, preferences, etc.]

## Related

- [[../Members/Members|Team Members Overview]]
- [[../One-on-Ones/One-on-Ones|One-on-Ones]]
- [[../Mentoring/Mentoring|Mentoring]]
- [Project links based on assignments]

---

**Last Updated**: {{date}}



