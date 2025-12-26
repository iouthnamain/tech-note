---
type: project
project-name: "Projects"
status: Active
priority: Medium
start-date: 2025-12-23
end-date:
progress: 0
team-members: []
budget: 0
actual-cost: 0
client: ""
tags: [project/active]
---

# Projects

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

```dataview
TABLE status, assignee, due-date, priority
FROM "Projects/Active"
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

## Risks

```dataview
TABLE probability, impact, risk-score, status, owner, next-review
FROM "Projects/Active"
WHERE type = "risk"
  AND project = this.project-name
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

## Issues

```dataview
TABLE priority, status, assigned-to, date-reported
FROM "Projects/Active"
WHERE type = "issue"
  AND project = this.project-name
  AND status != "Resolved" AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT priority DESC, date-reported ASC
```

## Status Reports

```dataview
TABLE report-date, status, period-start, period-end
FROM "Projects/Active"
WHERE type = "status-report"
  AND project = this.project-name
  AND !contains(file.folder, "Templates")
SORT report-date DESC
```

## Resources & Documentation

- [[Resource 1]]
- [[Resource 2]]
- [External Link](https://example.com)

## Meeting Notes

```dataview
TABLE meeting-date, attendees
FROM "Projects/Active"
WHERE contains(file.folder, "Meetings")
  AND project = this.project-name
  AND !contains(file.folder, "Templates")
SORT meeting-date DESC
```

## Related Projects

- [[Project 2]]
- [[Project 3]]

## Notes

Add any additional notes, decisions, or important information here.

