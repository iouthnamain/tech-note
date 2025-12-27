# Developer Workspace - Setup Guide

This folder contains your personal developer workspace for tracking technical learning, code snippets, personal projects, and development activities. This workspace integrates with Teams and Projects folders.

## Table of Contents

- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)
- [Using Templates](#using-templates)
- [Tagging Conventions](#tagging-conventions)
- [Dataview Queries](#dataview-queries)
- [Integration with Teams and Projects](#integration-with-teams-and-projects)
- [Related Guides](#related-guides)

## Quick Start

1. **Enable Required Plugins**: Install and enable Dataview plugin
2. **View Dashboard**: Open [[Developer-Dashboard]] to see your developer activities
3. **Set Up Templates**: Configure Obsidian Templates plugin to use templates from `Templates/` folder
4. **Start Tracking**: Begin documenting your technical notes, code snippets, and learning

## Folder Structure

```
Developer/
├── README.md                          # This file
├── Developer-Dashboard.md             # Personal developer dashboard
├── Personal-Tasks/                   # Personal development tasks
│   ├── Personal-Tasks.md             # Tasks overview
│   └── Task-XXX-Task-Name.md         # Individual tasks
├── Technical-Notes/                   # Technical notes and learning
│   ├── Technical-Notes.md            # Notes overview
│   ├── Topics/                        # Notes by topic
│   └── Learning/                      # Learning notes
├── Code-Snippets/                     # Code snippets and references
│   ├── Code-Snippets.md              # Snippets overview
│   ├── Snippets/                      # Code snippets by language/topic
│   └── References/                    # Code references and patterns
├── Personal-Projects/                 # Personal development projects
│   ├── Personal-Projects.md           # Projects overview
│   └── <Project-Name>/                # Individual personal projects
├── Code-Reviews/                      # Code reviews I receive
│   ├── Code-Reviews.md                # Reviews overview
│   └── YYYY-MM-DD-PR-XXX-Review.md   # Individual review notes
├── Technical-Research/                # Technical research and experiments
│   ├── Technical-Research.md          # Research overview
│   └── YYYY-MM-DD-Research-Topic.md  # Research notes
├── Daily-Notes/                       # Daily development notes
│   └── YYYY-MM-DD.md                  # Daily notes
└── Templates/                         # Developer templates
    └── Templates.md                   # Templates overview
```

## Using Templates

### Personal Tasks

Track personal development tasks and goals:
- Use [[Templates/Personal-Task-Template|Personal Task Template]]
- Link to project work if contributing to projects
- Track learning goals and practice tasks

### Technical Notes

Document technical learning and solutions:
- Use [[Templates/Technical-Note-Template|Technical Note Template]]
- Organize by topic in `Topics/` folder
- Track learning progress in `Learning/` folder

### Code Snippets

Store reusable code snippets and patterns:
- Use [[Templates/Code-Snippet-Template|Code Snippet Template]]
- Organize by language in `Snippets/` folder
- Reference patterns in `References/` folder

### Learning Notes

Document your learning journey:
- Use [[Templates/Learning-Note-Template|Learning Note Template]]
- Track progress and insights
- Link to technical notes and code snippets

### Code Reviews Received

Learn from code reviews you receive:
- Use [[Templates/Code-Review-Received-Template|Code Review Received Template]]
- Document key learnings and feedback
- Track improvements over time

### Technical Research

Document research and experiments:
- Use [[Templates/Research-Note-Template|Research Note Template]]
- Track experiments and findings
- Link to related technical notes

### Daily Notes

Daily development notes and reflections:
- Use [[Templates/Daily-Note-Template|Daily Note Template]]
- Track daily progress and learnings
- Link to tasks, notes, and projects

## Tagging Conventions

### Task Tags
- `#personal-task` - Personal development tasks
- `#learning` - Learning-related tasks
- `#practice` - Practice tasks
- `#project` - Personal project tasks

### Technical Note Tags
- `#technical-note` - Technical notes
- `#learning` - Learning notes
- `#reference` - Reference notes
- `#solution` - Solution notes
- `#pattern` - Pattern notes

### Code Snippet Tags
- `#code-snippet` - Code snippets
- `#pattern` - Design patterns
- `#utility` - Utility functions
- `#algorithm` - Algorithms

## Dataview Queries

### Personal Tasks Overview

```dataview
TABLE status, priority, due-date, category
FROM "Developer/Personal-Tasks"
WHERE type = "personal-task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

### Recent Technical Notes

```dataview
TABLE topic, category, date
FROM "Developer/Technical-Notes"
WHERE type = "technical-note"
  AND !contains(file.folder, "Templates")
SORT date DESC
LIMIT 10
```

### Code Snippets by Language

```dataview
LIST rows.file.link
FROM "Developer/Code-Snippets"
WHERE type = "code-snippet"
  AND !contains(file.folder, "Templates")
GROUP BY language
```

## Integration with Teams and Projects

### Linking to Projects

- Personal tasks can link to project work via `related-project` field
- Technical notes can reference project technologies
- Code reviews received link to project PRs

### Linking to Teams

- Code reviews received link to team code review tracking
- Technical notes can inform team technical decisions
- Learning progress supports team mentoring

## Related Guides

- [[../Developer-Guides/README|Developer Guides]] - Technical guides and best practices
- [[../Team-Lead-Guides/README|Team Lead Guides]] - Team Lead guides (if you're also a Team Lead)
- [[../Projects/README|Projects Guide]] - Project management structure

---

**Last Updated**: 2025-01-29





