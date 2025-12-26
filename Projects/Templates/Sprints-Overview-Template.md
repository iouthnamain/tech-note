# Sprints Overview

## Active Sprint

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/{{project-name}}/Sprints"
WHERE type = "sprint-plan"
  AND status = "Active"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
LIMIT 1
```

## All Sprints

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/{{project-name}}/Sprints"
WHERE type = "sprint-plan"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
```

## Sprint Velocity Tracking

```dataview
TABLE 
  sprint-number,
  start-date,
  end-date,
  status,
  velocity-target
FROM "Projects/Active/{{project-name}}/Sprints"
WHERE type = "sprint-plan"
  AND !contains(file.folder, "Templates")
SORT start-date ASC
```

## Upcoming Sprints

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/{{project-name}}/Sprints"
WHERE type = "sprint-plan"
  AND start-date >= date(today)
  AND !contains(file.folder, "Templates")
SORT start-date ASC
```

## Completed Sprints

```dataview
TABLE sprint-number, start-date, end-date, status, velocity-target
FROM "Projects/Active/{{project-name}}/Sprints"
WHERE type = "sprint-plan"
  AND status = "Completed"
  AND !contains(file.folder, "Templates")
SORT start-date DESC
LIMIT 5
```



