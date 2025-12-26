---
type: task
task-name: "{{title}}"
project: "{{project-name}}"
status: To Do
assignee: ""
due-date:
priority: Medium
story-points:
estimated-hours: 0
actual-hours: 0
tags:
  - task
---

# {{task-name}}

## Task Details

**Status**: `= this.status`  
**Project**: [[`= this.project`]]  
**Assignee**: `= this.assignee`  
**Due Date**: `= this.due-date`  
**Priority**: `= this.priority`  
**Story Points**: `= this.story-points`  
**Estimated Hours**: `= this.estimated-hours`h  
**Actual Hours**: `= this.actual-hours`h

## Description

[Task description and requirements]

## Acceptance Criteria

- [ ] Functional acceptance met
- [ ] Tests added/run (unit, integration, e2e as appropriate)
- [ ] Security considerations addressed (input validation, authz, secrets)
- [ ] Performance considerations addressed (limits/budgets)
- [ ] Docs/notes updated (user/dev/runbook)

## Subtasks

- [ ] Subtask 1
- [ ] Subtask 2
- [ ] Subtask 3

## Definition of Done (DoD) Checklist

- [ ] Code reviewed and merged
- [ ] CI checks passing (lint/test/build)
- [ ] Tests appropriate to scope written and green
- [ ] Security/performance checks considered
- [ ] Documentation/notes updated (README/ops/ADR as needed)
- [ ] Demo ready for review

## Quality & Risk Reminders

- Data/inputs validated; authn/z enforced where applicable
- Secrets/config managed via vault/env, not hard-coded
- Performance budget checked for critical paths
- Monitoring/logging updated if behaviour changes

## Notes

[Additional notes, blockers, or context]

## Related

- [[Related Task 1]]
- [[Related Task 2]]
- [[Risk-001]]
- [[Issue-001]]

