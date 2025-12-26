---
project: "SAP Capstone"
---

# Risks Overview

```dataview
TABLE probability, impact, risk-score, status, owner, next-review
FROM "Projects/Active/SAP-Capstone"
WHERE type = "risk"
  AND project = this.project
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

## Risks by Category

```dataview
LIST rows.file.link
FROM "Projects/Active/SAP-Capstone"
WHERE type = "risk"
  AND project = this.project
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY category
SORT category ASC
```

## High Priority Risks (Score >= 6)

```dataview
TABLE risk-name, category, probability, impact, risk-score, status, owner
FROM "Projects/Active/SAP-Capstone"
WHERE type = "risk"
  AND project = this.project
  AND risk-score >= 6
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

## Risks by Status

```dataview
LIST rows.file.link
FROM "Projects/Active/SAP-Capstone"
WHERE type = "risk"
  AND project = this.project
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY status
SORT status ASC
```

## Risks Needing Review

```dataview
TABLE risk-name, risk-score, status, owner, next-review
FROM "Projects/Active/SAP-Capstone"
WHERE type = "risk"
  AND project = this.project
  AND status != "Closed"
  AND next-review <= date(today) + dur(7 days)
  AND !contains(file.folder, "Templates")
SORT next-review ASC
```

## Risk Statistics

```dataview
TABLE 
  length(rows) AS "Total Open",
  length(filter(rows, (r) => r.risk-score >= 6)) AS "High Risk",
  length(filter(rows, (r) => r.risk-score >= 4 AND r.risk-score < 6)) AS "Medium Risk",
  length(filter(rows, (r) => r.risk-score < 4)) AS "Low Risk"
FROM "Projects/Active/SAP-Capstone"
WHERE type = "risk"
  AND project = this.project
  AND status != "Closed"
  AND !contains(file.folder, "Templates")
GROUP BY "Total"
```

