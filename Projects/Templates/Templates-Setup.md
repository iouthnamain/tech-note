---
type: guide
title: Templates Setup
tags: [templates, setup, obsidian]
---

# Templates Setup (Obsidian)

Use this checklist to wire the Templates core plugin to `Projects/Templates/` and add hotkeys for the most-used inserts.

## Configure Templates Plugin

1) Settings → Core Plugins → enable **Templates**.  
2) Settings → Templates → set **Template folder** to `Projects/Templates`.  
3) (Optional) Set **Date format** to `YYYY-MM-DD` for consistent filenames.  
4) (Optional) Set **Time format** if you timestamp notes.  
5) Close/reopen command palette to refresh the template list.

## Suggested Hotkeys

Assign in Settings → Hotkeys (search “Templates: Insert template”):

- `Alt+P` → `Templates/Project-Template`
- `Alt+T` → `Templates/Task-Template`
- `Alt+R` → `Templates/Status-Report-Template`
- `Alt+S` → `Templates/Sprint-Plan-Template`

Feel free to swap keys to avoid conflicts; keep them grouped for muscle memory.

## Insert Tips

- Run the insert command *after* creating/renaming the target note so links/queries match the file name.
- Replace all `{{...}}` placeholders immediately (project names, dates, scope).
- For overview templates, ensure frontmatter `project` matches the display name in the main project file; FROM paths use the project **folder** name.

