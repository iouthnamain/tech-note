---
type: member
member-name: "Lisa UX Designer"
role: "UX Designer"
email: "lisa@company.com"
projects: ["Customer Portal Redesign"]
skills: ["UI/UX Design", "User Research", "Prototyping", "Design Systems", "Accessibility", "Figma"]
tags: [member, member/design]
---

# Lisa UX Designer

## Member Overview

**Role**: `= this.role`  
**Email**: `= this.email`  
**Projects**: `= this.projects`  
**Skills**: `= this.skills`

## Current Assignments

### Tasks Assigned

```dataview
TABLE status, priority, due-date, story-points, project
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC, priority DESC
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

### Risks Owned

```dataview
TABLE risk-score, status, next-review, project
FROM "Projects/Active"
WHERE type = "risk"
  AND owner = this.member-name
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

### Issues Assigned

```dataview
TABLE priority, severity, status, date-reported, project
FROM "Projects/Active"
WHERE type = "issue"
  AND assigned-to = this.member-name
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Workload Summary

### Story Points Summary

```dataview
TABLE 
  length(rows) AS "Total Tasks",
  sum(rows.story-points) AS "Total Story Points",
  sum(filter(rows, (r) => r.status = "Done").story-points) AS "Completed Points",
  sum(filter(rows, (r) => r.status != "Done").story-points) AS "Remaining Points"
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY "Workload"
```

### Tasks by Status

```dataview
TABLE 
  length(rows) AS "Count",
  sum(rows.story-points) AS "Story Points"
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

### Tasks by Project

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "task"
  AND assignee = this.member-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

## Skills & Expertise

- UI/UX Design
- User Research & Usability Testing
- Prototyping (Figma, Adobe XD)
- Design Systems & Component Libraries
- Accessibility (WCAG 2.1)
- Information Architecture
- Interaction Design

## Notes

- Primary focus: Design system setup and user experience design
- Currently working on design system component library
- Assigned to design mockup approval issue (ISSUE-001)
- Available for design reviews and UX consultations

## Related

- [[Members/Members|Team Members Overview]]
- [[Customer Portal Redesign]]
- [[ISSUE-001-Design-Mockup-Approval-Delay]]





