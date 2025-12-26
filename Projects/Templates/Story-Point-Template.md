---
type: story-point-guide
title: "Story Points Estimation Guide"
created-date: {{date}}
tags: [story-points, estimation, planning]
---

# Story Points Estimation Guide

> **Reference Guide**: Use this for team estimation, sprint planning, and velocity tracking

## Story Point Scale (Fibonacci)

Use the **Fibonacci sequence** for story point estimation:

- **1** - Trivial task, minimal effort (< 2 hours)
- **2** - Simple task, straightforward (2-4 hours)
- **3** - Small task, some complexity (4-8 hours)
- **5** - Medium task, moderate complexity (1-2 days)
- **8** - Large task, significant complexity (2-3 days)
- **13** - Very large task, high complexity (3-5 days)
- **21** - Epic-sized task, break down further (5+ days)

**Rule of Thumb**: If a task is 13+ points, it should be broken down into smaller stories.

## Estimation Criteria

Consider these factors when estimating:

### Complexity
- **Low (1-3)**: Well-understood, straightforward implementation
- **Medium (5-8)**: Some unknowns, requires investigation or design
- **High (13+)**: Significant unknowns, research needed, or complex integration

### Effort
- **Low (1-3)**: Quick implementation, minimal code changes
- **Medium (5-8)**: Moderate development work, multiple components
- **High (13+)**: Extensive development, multiple systems affected

### Risk/Uncertainty
- **Low (1-3)**: Clear requirements, familiar technology
- **Medium (5-8)**: Some ambiguity, new technology or approach
- **High (13+)**: High uncertainty, unclear requirements, experimental work

### Dependencies
- **Low (1-3)**: Independent work, no blockers
- **Medium (5-8)**: Some dependencies, coordination needed
- **High (13+)**: Complex dependencies, multiple teams/systems

## Estimation Process

### Planning Poker / Team Estimation

1. **Read the story/task** - Ensure everyone understands the scope
2. **Silent estimation** - Each team member selects a story point value
3. **Reveal estimates** - Show all estimates simultaneously
4. **Discuss differences** - If estimates vary significantly, discuss:
   - What assumptions were made?
   - What risks or unknowns exist?
   - What dependencies are involved?
5. **Re-estimate** - Repeat until consensus (or close enough)
6. **Record** - Document the final story point estimate

### Relative Sizing

Compare tasks to each other, not to time:
- "This task is similar to Task X (5 points), but slightly more complex → 8 points"
- "This is simpler than Task Y (8 points) → 5 points"
- Use a reference task as an anchor (e.g., "our 5-point task")

## Story Point Guidelines

### When to Use Story Points

✅ **Use story points for**:
- User stories and features
- Development tasks with clear scope
- Work that can be completed in a sprint
- Items that require team estimation

❌ **Don't use story points for**:
- Bug fixes (use time estimates instead)
- Maintenance tasks (use time estimates)
- Research spikes (use time estimates or mark as "spike")
- Tasks that are too small (< 1 point, combine with related work)

### Breaking Down Large Stories

If a story is **13+ points**, break it down:

1. **Identify sub-components** - What are the logical parts?
2. **Create separate stories** - Each should be independently valuable
3. **Re-estimate** - Each sub-story should be 8 points or less
4. **Link stories** - Use `[[links]]` to show relationships

### Re-estimation

Re-estimate if:
- Requirements change significantly
- New risks or dependencies discovered
- Story is blocked and scope changes
- Story takes much longer than estimated (learn for next time)

## Velocity Tracking

### What is Velocity?

**Velocity** = Total story points completed in a sprint

### Calculating Velocity

```dataview
TABLE 
  sum(rows.story-points) AS "Total Story Points"
FROM "Projects/Active"
WHERE type = "task"
  AND status = "Done"
  AND story-points
  AND !contains(file.folder, "Templates")
  AND file.ctime >= date("{{sprint-start-date}}")
  AND file.ctime <= date("{{sprint-end-date}}")
GROUP BY "Sprint"
```

### Using Velocity for Planning

1. **Track velocity** over 2-3 sprints to establish baseline
2. **Average velocity** = (Sum of points completed) / (Number of sprints)
3. **Plan next sprint** = Average velocity ± 10% (account for uncertainty)
4. **Adjust** based on team capacity, holidays, known blockers

### Velocity Examples

- **Sprint 1**: Completed 21 points
- **Sprint 2**: Completed 18 points
- **Sprint 3**: Completed 23 points
- **Average Velocity**: (21 + 18 + 23) / 3 = **20.7 points**
- **Next Sprint Plan**: Target **18-23 points** (20 ± 10%)

## Story Points vs. Time Estimates

| Story Points | Typical Time Range | Use Case |
|--------------|-------------------|----------|
| 1 | < 2 hours | Trivial fixes, small changes |
| 2 | 2-4 hours | Simple features, straightforward work |
| 3 | 4-8 hours | Small features, minor complexity |
| 5 | 1-2 days | Medium features, moderate complexity |
| 8 | 2-3 days | Large features, significant complexity |
| 13 | 3-5 days | Very large features, high complexity |
| 21 | 5+ days | Epics (should be broken down) |

**Note**: These are guidelines. Actual time varies based on:
- Team experience
- Technology familiarity
- Dependencies and blockers
- Quality requirements

## Common Estimation Mistakes

❌ **Don't do this**:
- Converting story points directly to hours/days
- Estimating based on who will do the work
- Using story points for bug fixes
- Ignoring dependencies and risks
- Not re-estimating when scope changes

✅ **Do this instead**:
- Estimate relative complexity and effort
- Consider the work itself, not the person
- Use time estimates for bugs/maintenance
- Account for all factors (complexity, risk, dependencies)
- Re-estimate when requirements change

## Sprint Planning with Story Points

### Step 1: Review Backlog

- Prioritize stories by business value
- Ensure stories are "ready" (clear acceptance criteria)
- Break down any stories > 13 points

### Step 2: Estimate Stories

- Use planning poker or team discussion
- Record story points in task frontmatter: `story-points: 5`
- Document any assumptions or risks

### Step 3: Calculate Capacity

- Team capacity = Available team members × Days in sprint
- Account for holidays, time off, other commitments
- Example: 3 developers × 5 days = 15 developer-days

### Step 4: Select Sprint Scope

- Target velocity = Average of last 2-3 sprints
- Select stories that total ≤ target velocity
- Leave buffer (10-20%) for unexpected work

### Step 5: Track During Sprint

- Update task status as work progresses
- Monitor burnup/burndown charts
- Adjust scope if needed (add/remove stories)

## Dataview Queries for Story Points

### Total Story Points in Sprint

```dataview
TABLE sum(story-points) AS "Total Points"
FROM "Projects/Active"
WHERE type = "task"
  AND sprint = "{{sprint-name}}"
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

### Story Points by Status

```dataview
TABLE 
  length(rows) AS "Count",
  sum(rows.story-points) AS "Story Points"
FROM "Projects/Active"
WHERE type = "task"
  AND sprint = "{{sprint-name}}"
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY status
```

### Completed Story Points

```dataview
TABLE sum(story-points) AS "Completed Points"
FROM "Projects/Active"
WHERE type = "task"
  AND status = "Done"
  AND sprint = "{{sprint-name}}"
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

### Story Points by Project

```dataview
TABLE 
  length(rows) AS "Tasks",
  sum(rows.story-points) AS "Story Points"
FROM "Projects/Active"
WHERE type = "task"
  AND story-points
  AND !contains(file.folder, "Templates")
GROUP BY project
SORT project ASC
```

## Quick Reference

### Estimation Cheat Sheet

| Points | Complexity | Effort | Example |
|--------|-----------|--------|---------|
| 1 | Trivial | < 2h | Fix typo, update config |
| 2 | Simple | 2-4h | Add simple field, minor UI change |
| 3 | Small | 4-8h | Small feature, single component |
| 5 | Medium | 1-2d | Feature with multiple components |
| 8 | Large | 2-3d | Complex feature, integration work |
| 13 | Very Large | 3-5d | Major feature, multiple systems |
| 21 | Epic | 5+d | Break down into smaller stories |

### Best Practices

1. **Estimate as a team** - Get multiple perspectives
2. **Use relative sizing** - Compare to known stories
3. **Consider all factors** - Complexity, effort, risk, dependencies
4. **Break down large stories** - 13+ points should be split
5. **Track velocity** - Use historical data for planning
6. **Re-estimate when needed** - Update if scope changes
7. **Don't convert to time** - Story points are about relative complexity

## Related

- [[Task-Template|Task Template]] - Add `story-points` field to tasks
- [[Sprint-Plan-Template|Sprint Plan Template]] - Plan sprints with story points
- [[Sprint-Board-Template|Sprint Board Template]] - Track story points in sprint board
- [[Projects/README|Projects Setup Guide]]




