---
type: team
team-name: "Example Team"
team-type: "Project Team"
status: Active
team-lead: "Your Name"
members: ["Alice Developer", "Bob Designer"]
projects: ["Example Project"]
technology-stack: ["React", "TypeScript", "Node.js"]
created-date: 2025-01-29
tags: [team/active]
---

# Example Team

This is an example team structure. Replace with your actual team information.

## Team Overview

**Team Lead**: `= this.team-lead`  
**Status**: `= this.status`  
**Team Type**: `= this.team-type`  
**Created**: `= this.created-date`  
**Members**: `= this.members`  
**Projects**: `= this.projects`  
**Technology Stack**: `= this.technology-stack`

## Team Members

**Overview**: [[Members/Members|View All Team Members]]

```dataview
TABLE role, status, skills
FROM "Teams/Active/Example-Team/Members"
WHERE type = "team-member"
  AND !contains(file.name, "Members.md")
  AND !contains(file.folder, "Templates")
SORT member-name ASC
```

## Team Backlog

**Overview**: [[Backlog/Backlog|View Team Backlog]]

```dataview
TABLE status, priority, assignee, story-points
FROM "Teams/Active/Example-Team/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
LIMIT 10
```

## Quick Links

- [[Members/Members|Team Members]]
- [[One-on-Ones/One-on-Ones|One-on-Ones]]
- [[Mentoring/Mentoring|Mentoring]]
- [[Code-Reviews/Code-Reviews|Code Reviews]]
- [[Backlog/Backlog|Backlog]]
- [[Projects/Projects|Projects]]

---

**Last Updated**: 2025-01-29





