# Sprints Overview

## Active Sprint

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/Customer-Portal-Redesign/Sprints"
WHERE type = "sprint-plan"
  AND status = "Active"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
LIMIT 1
```

## All Sprints

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/Customer-Portal-Redesign/Sprints"
WHERE type = "sprint-plan"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
```

## Sprint Links

- [[2025-Sprint-03/Sprint-Plan|Sprint 03 - Design & Foundation]] (Active: 2025-01-25 to 2025-02-01)
- [[2025-Sprint-04/Sprint-Plan|Sprint 04 - Authentication & Layout]] (Planned: 2025-02-01 to 2025-02-08)

## Sprint Velocity Tracking

```dataview
TABLE 
  sprint-number,
  start-date,
  end-date,
  status,
  velocity-target
FROM "Projects/Active/Customer-Portal-Redesign/Sprints"
WHERE type = "sprint-plan"
  AND !contains(file.folder, "Templates")
SORT start-date ASC
```

## Upcoming Sprints

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/Customer-Portal-Redesign/Sprints"
WHERE type = "sprint-plan"
  AND start-date >= date(today)
  AND !contains(file.folder, "Templates")
SORT start-date ASC
```

## Completed Sprints

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/Customer-Portal-Redesign/Sprints"
WHERE type = "sprint-plan"
  AND status = "Completed"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
LIMIT 5
```

