---
type: project
project-name: "Customer Portal Redesign"
status: Active
priority: High
start-date: 2025-01-25
end-date: 2025-06-30
progress: 5
client: "TechCorp Inc"
team-members: ["Sarah Frontend", "Mike Backend", "Lisa UX Designer", "Tom QA"]
budget: 75000
actual-cost: 3750
tags: [project/active]
---

# Customer Portal Redesign

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

## Team Members

**Overview**: [[Members/Members|View All Team Members]]

```dataview
TABLE role, email, skills
FROM "Projects/Active/Customer-Portal-Redesign/Members"
WHERE type = "member"
  AND !contains(file.name, "Members.md")
  AND !contains(file.folder, "Templates")
SORT member-name ASC
```

### Member Workload Summary

```dataview
TABLE 
  member-name,
  length(filter(rows, (r) => r.assignee = member-name AND r.status != "Done")) AS "Open Tasks",
  sum(filter(rows, (r) => r.assignee = member-name AND r.status != "Done").story-points) AS "Remaining Points"
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND assignee
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = this.project-name
GROUP BY assignee
SORT "Remaining Points" DESC
```

## Goals & Objectives

- [ ] Redesign customer portal with modern UI/UX
- [ ] Improve user experience and accessibility
- [ ] Implement responsive design for mobile devices
- [ ] Enhance performance and page load times
- [ ] Migrate legacy components to modern framework
- [ ] Implement user authentication and authorization

## Tasks

**Overview**: [[Tasks/Tasks|View All Tasks]]

```dataview
TABLE status, assignee, due-date, priority
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "task"
  AND project = this.project-name
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

## Timeline & Milestones

- [ ] Design Phase Complete - 2025-02-15
- [ ] Development Phase 1 Complete - 2025-03-31
- [ ] Development Phase 2 Complete - 2025-05-15
- [ ] Testing & QA Complete - 2025-06-15
- [ ] Production Launch - 2025-06-30

## Sprints

**Overview**: [[Sprints/Sprints|View All Sprints]]

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/Customer-Portal-Redesign/Sprints"
WHERE type = "sprint-plan"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
```

## Risks

**Overview**: [[Risks/Risks|View All Risks]]

```dataview
TABLE probability, impact, risk-score, status, owner, next-review
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "risk"
  AND project = this.project-name
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

## Issues

**Overview**: [[Issues/Issues|View All Issues]]

```dataview
TABLE priority, status, assigned-to, date-reported
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "issue"
  AND project = this.project-name
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Status Reports

```dataview
TABLE report-date, status, period-start, period-end
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE type = "status-report"
  AND project = this.project-name
  AND !contains(file.folder, "Templates")
SORT report-date DESC
```

## Meeting Notes

```dataview
TABLE meeting-date, attendees
FROM "Projects/Active/Customer-Portal-Redesign"
WHERE contains(file.folder, "Meetings")
  AND project = this.project-name
  AND !contains(file.folder, "Templates")
SORT meeting-date DESC
```

## Notes

- Decisions:
  - Selected React as frontend framework
  - Adopted Material-UI design system
  - Chose AWS for hosting infrastructure

- Dependencies:
  - Design system documentation delivery expected by 2025-02-01
  - API specifications needed before backend integration

- Blockers:
  - Waiting on stakeholder approval for design mockups
  - Need access to legacy system documentation

## Resources & Documentation

- [[Design System Guidelines]]
- [[API Documentation]]
- [Project Repository](https://github.com/company/customer-portal)

