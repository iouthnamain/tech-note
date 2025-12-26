# Teams Folder - Setup Guide

This folder contains templates and structure for managing teams in Obsidian using markdown files, links, tags, and plugins. This system integrates with the Projects folder and supports both Team Lead activities and team-level backlog management.

## Table of Contents

- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)
- [Creating a New Team](#creating-a-new-team)
- [Team Management Activities](#team-management-activities)
- [Using Templates](#using-templates)
- [Tagging Conventions](#tagging-conventions)
- [Dataview Queries](#dataview-queries)
- [Integration with Projects](#integration-with-projects)
- [Related Guides](#related-guides)

## Quick Start

1. **Enable Required Plugins**: Install and enable Dataview plugin (see [Plugin Recommendations](#plugin-recommendations))
2. **Create Your First Team**: Use the [[Templates/Team-Template|Team Template]] to create a new team
3. **View Dashboards**: Open [[Teams-Dashboard]] or [[My-Team-Dashboard]] to see team overviews
4. **Set Up Templates**: Configure Obsidian Templates plugin to use templates from `Templates/` folder
5. **Frontmatter Required**: Include proper frontmatter fields so Dataview queries work correctly
6. **Link to Projects**: Connect teams to projects they work on

## Folder Structure

```
Teams/
├── README.md                          # This file
├── Teams-Dashboard.md                 # Overview of all teams
├── My-Team-Dashboard.md               # Dashboard for team I lead
├── Team-Lead-Dashboard.md             # My Team Lead activities dashboard
├── Unified-Dashboard.md              # Combined Team Lead + Developer dashboard
├── Active/                            # Active teams
│   └── <Team-Name>/
│       ├── Team-Name.md               # Main team page
│       ├── Team-Members.md            # Team members overview
│       ├── Members/                   # Individual member profiles
│       ├── One-on-Ones/               # One-on-one meetings
│       ├── Mentoring/                 # Mentoring sessions
│       ├── Code-Reviews/              # Code review tracking
│       ├── Architecture-Reviews/      # Architecture review notes
│       ├── Technical-Decisions/       # ADRs and technical decisions
│       ├── Team-Retros/              # Team retrospectives
│       ├── Incidents/                 # Incident response
│       ├── Performance-Reviews/       # Performance reviews
│       ├── Team-Health/              # Team health metrics
│       ├── Backlog/                   # Team-level backlog
│       └── Projects/                  # Links to projects
├── Templates/                         # Team management templates
└── Archive/                           # Archived/inactive teams
```

## Creating a New Team

### Step 1: Create Team Folder

1. Navigate to `Teams/Active/`
2. Create a new folder named after your team (e.g., `Frontend-Team`)

### Step 2: Create Team Page

1. Create a new file `Team-Name.md` in the team folder
2. Use the [[Templates/Team-Template|Team Template]]:
   - In Obsidian, use `Ctrl/Cmd + P` to open command palette
   - Type "Templates: Insert template"
   - Select `Teams/Templates/Team-Template`
   - Update frontmatter fields (team-name, team-lead, members, etc.)

### Step 3: Create Supporting Folders

Create the following folders in your team folder:
- **Members/** - Team member profiles
- **One-on-Ones/** - One-on-one meeting notes
- **Mentoring/** - Mentoring sessions and development plans
- **Code-Reviews/** - Code review tracking
- **Architecture-Reviews/** - Architecture review notes
- **Technical-Decisions/** - ADRs and technical decisions
- **Team-Retros/** - Team retrospective notes
- **Incidents/** - Incident response documentation
- **Performance-Reviews/** - Performance review notes
- **Team-Health/** - Team health metrics and reports
- **Backlog/** - Team-level backlog items
- **Projects/** - Links to projects the team works on

### Step 4: Create Overview Files

Create overview files in each folder:
- `Members/Members.md` - Members overview (Dataview)
- `One-on-Ones/One-on-Ones.md` - One-on-ones overview
- `Mentoring/Mentoring.md` - Mentoring overview
- `Code-Reviews/Code-Reviews.md` - Code reviews overview
- `Architecture-Reviews/Architecture-Reviews.md` - Architecture reviews overview
- `Technical-Decisions/ADRs.md` - ADRs overview
- `Team-Retros/Team-Retros.md` - Retros overview
- `Incidents/Incidents.md` - Incidents overview
- `Performance-Reviews/Performance-Reviews.md` - Performance reviews overview
- `Team-Health/Team-Health.md` - Team health dashboard
- `Backlog/Backlog.md` - Backlog overview
- `Projects/Projects.md` - Projects overview

## Team Management Activities

### One-on-One Meetings

Regular one-on-one meetings with team members:
- Use [[Templates/One-on-One-Template|One-on-One Template]] or [[Templates/Quick-Templates/Quick-1on1-Template|Quick Template]]
- Track in `One-on-Ones/` folder
- Link to member profiles and development plans

### Mentoring

Mentoring sessions and development plans:
- Use [[Templates/Mentoring-Session-Template|Mentoring Session Template]]
- Create development plans in `Mentoring/Development-Plans/`
- Track sessions in `Mentoring/Sessions/`

### Code Reviews

Track code reviews you conduct:
- Use [[Templates/Code-Review-Template|Code Review Template]]
- Track review metrics and feedback
- Link to project tasks and PRs

### Architecture Reviews

Document architecture and design reviews:
- Use [[Templates/Architecture-Review-Template|Architecture Review Template]]
- Track design decisions and approvals

### Technical Decisions (ADRs)

Document Architecture Decision Records:
- Use [[Templates/ADR-Template|ADR Template]]
- Track decision status and rationale

### Team Retrospectives

Conduct and document team retrospectives:
- Use [[Templates/Team-Retro-Template|Team Retro Template]]
- Track action items and improvements

### Incident Response

Document incidents and post-mortems:
- Use [[Templates/Incident-Response-Template|Incident Response Template]]
- Link to project issues

### Performance Reviews

Document performance reviews:
- Use [[Templates/Performance-Review-Template|Performance Review Template]]
- Track goals and feedback

### Team Health

Monitor team health metrics:
- Use [[Templates/Team-Health-Template|Team Health Template]]
- Track metrics over time

### Team Backlog

Manage team-level backlog:
- Use [[Templates/Backlog-Template|Backlog Template]] for overview
- Use [[Templates/Backlog-Item-Template|Backlog Item Template]] for items
- Link backlog items to project tasks/stories

## Using Templates

### Quick Templates

For fast note-taking:
- [[Templates/Quick-Templates/Quick-1on1-Template|Quick One-on-One]]
- [[Templates/Quick-Templates/Quick-Code-Review-Template|Quick Code Review]]
- [[Templates/Quick-Templates/Quick-ADR-Template|Quick ADR]]

### Comprehensive Templates

For detailed documentation:
- [[Templates/Comprehensive-Templates/Comprehensive-1on1-Template|Comprehensive One-on-One]]
- [[Templates/Comprehensive-Templates/Comprehensive-Mentoring-Template|Comprehensive Mentoring]]
- [[Templates/Comprehensive-Templates/Comprehensive-Performance-Review-Template|Comprehensive Performance Review]]

### Standard Templates

- [[Templates/Team-Template|Team Template]]
- [[Templates/Member-Template|Member Template]]
- [[Templates/One-on-One-Template|One-on-One Template]]
- [[Templates/Mentoring-Session-Template|Mentoring Session Template]]
- [[Templates/Development-Plan-Template|Development Plan Template]]
- [[Templates/Code-Review-Template|Code Review Template]]
- [[Templates/Architecture-Review-Template|Architecture Review Template]]
- [[Templates/ADR-Template|ADR Template]]
- [[Templates/Team-Retro-Template|Team Retro Template]]
- [[Templates/Incident-Response-Template|Incident Response Template]]
- [[Templates/Performance-Review-Template|Performance Review Template]]
- [[Templates/Team-Health-Template|Team Health Template]]
- [[Templates/Backlog-Template|Backlog Template]]
- [[Templates/Backlog-Item-Template|Backlog Item Template]]

## Tagging Conventions

### Team Tags
- `#team/active` - Active teams
- `#team/inactive` - Inactive teams
- `#team/archived` - Archived teams

### Activity Tags
- `#1on1` - One-on-one meetings
- `#code-review` - Code reviews
- `#adr` - Architecture Decision Records
- `#retro` - Team retrospectives
- `#incident` - Incidents
- `#performance-review` - Performance reviews
- `#backlog` - Backlog items

## Dataview Queries

### Teams Dashboard

```dataview
TABLE team-lead, status, members
FROM "Teams/Active"
WHERE type = "team"
  AND !contains(file.folder, "Templates")
SORT team-name ASC
```

### My Team Dashboard

```dataview
TABLE status, priority, assignee
FROM "Teams/Active"
WHERE type = "backlog-item"
  AND team = "{{team-name}}"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

## Integration with Projects

### Linking Teams to Projects

- Teams link to projects via `projects` field in team frontmatter
- Project tasks can reference team members
- Backlog items link to project tasks/stories

### Cross-References

- Team members link to project members
- Code reviews reference project tasks
- Incidents link to project issues
- Backlog items link to project tasks

## Related Guides

- [[../Team-Lead-Guides/README|Team Lead Guides]] - Comprehensive Team Lead guides
- [[../Projects/README|Projects Guide]] - Project management structure
- [[../PM-Guides/README|PM Guides]] - Project management best practices
- [[../Developer-Guides/README|Developer Guides]] - Developer technical guides

## Plugin Recommendations

### Required Plugins

1. **Dataview** (Community Plugin)
   - Enables database-like queries in your notes
   - Required for dashboards and overviews

### Recommended Plugins

2. **Templates** (Core Plugin)
   - Enable in Settings → Core Plugins → Templates
   - Set template folder to `Teams/Templates`

3. **Calendar** (Community Plugin)
   - Visual calendar view for one-on-ones and reviews

4. **Tag Wrangler** (Community Plugin)
   - Better tag management and organization

---

**Last Updated**: 2025-01-29



