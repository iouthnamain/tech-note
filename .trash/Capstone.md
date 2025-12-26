---
type: project
project-name: "{{title}}"
status: Active
priority: Medium
start-date:
  "{ date }":
end-date:
progress: 0
client: ""
team-members: []
budget: 0
actual-cost: 0
tags:
  - project/active
---
# {{project-name}}

## Project Overview

**Status**: `= this.status`  
**Priority**: `= this.priority`  
**Start Date**: `= this.start-date`  
**End Date**: `= this.end-date`  
**Progress**: `= this.progress`%  
**Team**: `= this.team-members`  
**Budget**: $`= this.budget`  
**Actual Cost**: $`= this.actual-cost`  
**Client**: `= this.client`

## Goals & Objectives

- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

## Tasks

**Overview**: [[Projects/Active/E-Commerce-Platform-Enhancement/Tasks/Tasks|View All Tasks]]

```dataview
TABLE status, assignee, due-date, priority
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND project = this.project-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## Timeline & Milestones

- [ ] Milestone 1 - YYYY-MM-DD
- [ ] Milestone 2 - YYYY-MM-DD
- [ ] Milestone 3 - YYYY-MM-DD

## Sprints

**Overview**: [[Sprints|View All Sprints]]

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/{{project-name}}/Sprints"
WHERE type = "sprint-plan"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
```

## Risks

**Overview**: [[Risks|View All Risks]]

```dataview
TABLE probability, impact, risk-score, status, owner, next-review
FROM "Projects/Active/{{project-name}}"
WHERE type = "risk"
  AND project = this.project-name
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

## Issues

**Overview**: [[Issues|View All Issues]]

```dataview
TABLE priority, status, assigned-to, date-reported
FROM "Projects/Active/{{project-name}}"
WHERE type = "issue"
  AND project = this.project-name
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Status Reports

```dataview
TABLE report-date, status, period-start, period-end
FROM "Projects/Active/{{project-name}}"
WHERE type = "status-report"
  AND project = this.project-name
  AND !contains(file.folder, "Templates")
SORT report-date DESC
```

## Meeting Notes

```dataview
TABLE meeting-date, attendees
FROM "Projects/Active/{{project-name}}"
WHERE contains(file.folder, "Meetings")
  AND project = this.project-name
  AND !contains(file.folder, "Templates")
SORT meeting-date DESC
```

## Notes

- Decisions:
  - [Key decision 1]
  - [Key decision 2]

- Dependencies:
  - [External dependency 1]
  - [External dependency 2]

- Blockers:
  - [Current blocker 1]
  - [Current blocker 2]

## Resources & Documentation

- [[Resource 1]]
- [[Resource 2]]
- [External Link](https://example.com)
