---
type: code-snippets-overview
tags: [code-snippets]
---

# Code Snippets

## Recent Snippets

```dataview
TABLE language, category, date
FROM "Developer/Code-Snippets"
WHERE type = "code-snippet"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 20
```

## Snippets by Language

```dataview
LIST rows.file.link
FROM "Developer/Code-Snippets"
WHERE type = "code-snippet"
  AND !contains(file.folder, "Templates")
GROUP BY language
```

## Snippets by Category

```dataview
LIST rows.file.link
FROM "Developer/Code-Snippets"
WHERE type = "code-snippet"
  AND !contains(file.folder, "Templates")
GROUP BY category
```

---

**Last Updated**: 2025-01-29



