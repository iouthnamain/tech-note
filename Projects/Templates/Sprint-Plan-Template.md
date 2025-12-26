---
type: sprint-plan
sprint-name: "{{title}}"
sprint-number: ""
cadence: 1w
start-date: {{date}}
end-date:
goals: []
capacity: ""
velocity-target: ""
team: []
project-scope: []
risks: []
status: Planned
tags: [sprint, planning]
---

# Sprint Plan - {{sprint-name}}

## Overview
- **Sprint Number/Name**: `= this.sprint-number` / `= this.sprint-name`
- **Dates**: `= this.start-date` → `= this.end-date`
- **Cadence**: `= this.cadence`
- **Team**: `= this.team`
- **Capacity**: `= this.capacity`
- **Velocity Target**: `= this.velocity-target`

## Goals (Outcomes)
- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

## Scope (Committed Items)
```dataview
TABLE status, priority, story-points, assignee, due-date, project
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
SORT priority DESC, due-date ASC
```

**Note**: Replace `{{project-name}}` with your actual project name, or use `AND project = "Project-Name"` to filter by project field.

### Story Points Summary
```dataview
TABLE 
  length(rows) AS "Tasks",
  sum(rows.story-points) AS "Total Story Points"
FROM "Projects/Active/{{project-name}}"
WHERE type = "task"
  AND status != "Done"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND project = "{{project-name}}"
GROUP BY "Sprint Scope"
```

## Risks / Blockers
- [ ] Risk or blocker 1
- [ ] Risk or blocker 2
- [ ] Risk or blocker 3

## Metrics Plan
- **Story Points Committed**: [calculated from scope above]
- **Velocity Target**: `= this.velocity-target` points
- **Previous Sprint Velocity**: [fill in from last sprint]
- Burnup/Burndown tracking source: [link/chart note]
- Definition of Done reminders: tests, security, performance, docs

## Communication & Ceremonies
- Standup: Daily
- Review: End of sprint
- Retro: End of sprint
- Stakeholder check-in: Mid-sprint

## Notes
- Decisions:
- Dependencies:
- Escalations:

