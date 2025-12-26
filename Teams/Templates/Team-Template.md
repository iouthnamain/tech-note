---
type: team
team-name: "{{team-name}}"
team-type: "Project Team"
status: Active
team-lead: "{{team-lead}}"
members: []
projects: []
technology-stack: []
created-date: {{date}}
tags: [team/active]
---

# {{team-name}}

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
FROM "Teams/Active/{{team-name}}/Members"
WHERE type = "team-member"
  AND !contains(file.name, "Members.md")
  AND !contains(file.folder, "Templates")
SORT member-name ASC
```

## Team Backlog

**Overview**: [[Backlog/Backlog|View Team Backlog]]

```dataview
TABLE status, priority, assignee, story-points
FROM "Teams/Active/{{team-name}}/Backlog"
WHERE type = "backlog-item"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
LIMIT 10
```

## Recent Activities

### Recent One-on-Ones

```dataview
TABLE member, date, status
FROM "Teams/Active/{{team-name}}/One-on-Ones"
WHERE type = "one-on-one"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

### Recent Code Reviews

```dataview
TABLE author, reviewer, status, date
FROM "Teams/Active/{{team-name}}/Code-Reviews"
WHERE type = "code-review"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

### Recent Technical Decisions

```dataview
TABLE adr-number, status, date
FROM "Teams/Active/{{team-name}}/Technical-Decisions"
WHERE type = "adr"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 5
```

## Team Projects

**Overview**: [[Projects/Projects|View Team Projects]]

```dataview
LIST rows.file.link
FROM "Teams/Active/{{team-name}}/Projects"
WHERE type = "project"
  AND !contains(file.folder, "Templates")
```

## Team Health

**Overview**: [[Team-Health/Team-Health|View Team Health Dashboard]]

```dataview
TABLE date, status
FROM "Teams/Active/{{team-name}}/Team-Health"
WHERE type = "team-health"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 3
```

## Quick Links

- [[Members/Members|Team Members]]
- [[One-on-Ones/One-on-Ones|One-on-Ones]]
- [[Mentoring/Mentoring|Mentoring]]
- [[Code-Reviews/Code-Reviews|Code Reviews]]
- [[Architecture-Reviews/Architecture-Reviews|Architecture Reviews]]
- [[Technical-Decisions/ADRs|Technical Decisions]]
- [[Team-Retros/Team-Retros|Team Retros]]
- [[Incidents/Incidents|Incidents]]
- [[Performance-Reviews/Performance-Reviews|Performance Reviews]]
- [[Backlog/Backlog|Backlog]]
- [[Projects/Projects|Projects]]

## Notes

[Additional notes about the team, goals, challenges, etc.]

---

**Last Updated**: {{date}}



