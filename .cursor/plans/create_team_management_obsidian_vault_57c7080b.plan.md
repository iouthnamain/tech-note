---
name: Create Team Management Obsidian Vault
overview: Create a comprehensive Obsidian vault folder structure for team and project management, integrating Team-Lead-Guides with existing Projects structure. Includes separate Teams folder, team management templates, dashboards, and integration points with Projects.
todos:
  - id: todo-teams-structure
    content: Create Teams folder structure (including backlog)
    status: pending
  - id: todo-developer-structure
    content: Create Developer folder structure
    status: pending
  - id: todo-readmes
    content: Create README files for Teams and Developer workspaces
    status: pending
  - id: todo-dashboards
    content: Create dashboards (Teams, My Team, Team Lead, Developer, Unified)
    status: pending
  - id: todo-templates
    content: Create templates (Teams + Developer, minimal + comprehensive, backlog)
    status: pending
  - id: todo-example-team
    content: Create example team structure
    status: pending
  - id: todo-example-dev
    content: Create example developer workspace
    status: pending
  - id: todo-integration-queries
    content: Add integration queries (Teams/Projects/Developer, backlogs)
    status: pending
  - id: todo-workflows
    content: Document workflows and usage
    status: pending
---

# Create Team Management Obsidian Vault Structure

## Overview

Create a comprehensive Obsidian vault structure for managing teams and projects, integrating the Team-Lead-Guides with the existing Projects structure. This will include separate team management, templates for all Team Lead activities, dashboards, and seamless integration with project management.

## Current State Analysis

### Existing Structure

- **Projects/** folder with comprehensive project management
- **Team-Lead-Guides/** with 14 detailed guides
- **PM-Guides/** and **Developer-Guides/** for reference
- Templates in `Projects/Templates/` for projects, tasks, risks, issues
- Member templates exist but are project-specific

### What's Needed

- Separate **Teams/** folder for team management
- Team-level organization (flexible, members in multiple teams)
- Team Lead activity tracking (one-on-ones, mentoring, code reviews, etc.)
- Team-level backlogs linked to projects
- Multiple dashboards (team, member, team lead)
- Integration with Projects folder
- Templates for all Team Lead activities
- Links to Team-Lead-Guides for reference

## Target Folder Structure

```
Teams/
├── README.md                          # Teams folder overview and guide
├── Teams-Dashboard.md                 # Overview of all teams
├── My-Team-Dashboard.md               # Dashboard for team I lead
├── Team-Lead-Dashboard.md             # My Team Lead activities dashboard
├── Unified-Dashboard.md              # Combined Team Lead + Developer dashboard
├── Active/                            # Active teams
│   └── <Team-Name>/
│       ├── Team-Name.md               # Main team page
│       ├── Team-Members.md            # Team members overview
│       ├── Members/                   # Individual member profiles
│       │   ├── Members.md             # Members overview (Dataview)
│       │   └── Member-Name.md         # Individual member profile
│       ├── One-on-Ones/               # One-on-one meetings
│       │   ├── One-on-Ones.md         # One-on-ones overview
│       │   └── YYYY-MM-DD-Member-Name-1on1.md
│       ├── Mentoring/                 # Mentoring sessions
│       │   ├── Mentoring.md           # Mentoring overview
│       │   ├── Development-Plans/     # Individual development plans
│       │   │   └── Member-Name-Development-Plan.md
│       │   └── Sessions/              # Mentoring session notes
│       │       └── YYYY-MM-DD-Member-Name-Mentoring.md
│       ├── Code-Reviews/              # Code review tracking
│       │   ├── Code-Reviews.md        # Code reviews overview
│       │   └── YYYY-MM-DD-PR-Review.md
│       ├── Architecture-Reviews/      # Architecture review notes
│       │   ├── Architecture-Reviews.md
│       │   └── YYYY-MM-DD-Feature-Review.md
│       ├── Technical-Decisions/       # ADRs and technical decisions
│       │   ├── ADRs.md                # ADRs overview
│       │   └── ADR-XXX-Decision-Name.md
│       ├── Team-Retros/              # Team retrospectives
│       │   ├── Team-Retros.md         # Retros overview
│       │   └── YYYY-MM-DD-Team-Retro.md
│       ├── Incidents/                 # Incident response
│       │   ├── Incidents.md           # Incidents overview
│       │   └── YYYY-MM-DD-Incident-Name.md
│       ├── Performance-Reviews/       # Performance reviews
│       │   ├── Performance-Reviews.md
│       │   └── YYYY-MM-Member-Name-Performance-Review.md
│       ├── Team-Health/              # Team health metrics
│       │   ├── Team-Health.md         # Health dashboard
│       │   └── YYYY-MM-Team-Health-Report.md
│       ├── Backlog/                   # Team-level backlog (linked to projects)
│       │   ├── Backlog.md             # Backlog overview (Dataview)
│       │   └── Backlog-Item-XXX.md    # Backlog items (type: backlog-item)
│       └── Projects/                  # Links to projects team works on
│           └── Projects.md            # Projects overview
├── Templates/                         # Team management templates
│   ├── Templates.md                   # Templates overview
│   ├── Team-Template.md               # Main team page template
│   ├── Member-Template.md             # Team member profile template
│   ├── One-on-One-Template.md        # One-on-one meeting template
│   ├── Mentoring-Session-Template.md  # Mentoring session template
│   ├── Development-Plan-Template.md  # Development plan template
│   ├── Code-Review-Template.md        # Code review tracking template
│   ├── Architecture-Review-Template.md # Architecture review template
│   ├── ADR-Template.md               # Architecture Decision Record template
│   ├── Team-Retro-Template.md        # Team retrospective template
│   ├── Incident-Response-Template.md # Incident response template
│   ├── Performance-Review-Template.md # Performance review template
│   ├── Team-Health-Template.md       # Team health report template
│   ├── Backlog-Template.md           # Team backlog overview template
│   ├── Backlog-Item-Template.md      # Backlog item template
│   ├── Quick-Templates/              # Minimal quick templates
│   │   ├── Quick-1on1-Template.md
│   │   ├── Quick-Code-Review-Template.md
│   │   └── Quick-ADR-Template.md
│   └── Comprehensive-Templates/      # Detailed comprehensive templates
│       ├── Comprehensive-1on1-Template.md
│       ├── Comprehensive-Mentoring-Template.md
│       └── Comprehensive-Performance-Review-Template.md
└── Archive/                           # Archived/inactive teams
    └── <Team-Name>/

Developer/                             # Personal developer workspace
├── README.md                          # Developer workspace overview
├── Developer-Dashboard.md             # Personal developer dashboard
├── Personal-Tasks/                    # Personal development tasks
│   ├── Personal-Tasks.md              # Tasks overview
│   └── Task-XXX-Task-Name.md          # Individual tasks
├── Technical-Notes/                   # Technical notes and learning
│   ├── Technical-Notes.md             # Notes overview
│   ├── Topics/                        # Notes by topic
│   │   ├── React/
│   │   ├── Java/
│   │   ├── Algorithms/
│   │   ├── Architecture/
│   │   └── DevOps/
│   └── Learning/                      # Learning notes
│       └── YYYY-MM-DD-Learning-Topic.md
├── Code-Snippets/                     # Code snippets and references
│   ├── Code-Snippets.md               # Snippets overview
│   ├── Snippets/                      # Code snippets by language/topic
│   │   ├── JavaScript/
│   │   ├── TypeScript/
│   │   ├── Java/
│   │   └── SQL/
│   └── References/                    # Code references and patterns
├── Personal-Projects/                 # Personal development projects
│   ├── Personal-Projects.md           # Projects overview
│   └── <Project-Name>/                # Individual personal projects
│       └── Project-Name.md
├── Code-Reviews/                      # Code reviews I receive
│   ├── Code-Reviews.md                # Reviews overview
│   └── YYYY-MM-DD-PR-XXX-Review.md   # Individual review notes
├── Technical-Research/                # Technical research and experiments
│   ├── Technical-Research.md          # Research overview
│   └── YYYY-MM-DD-Research-Topic.md  # Research notes
├── Daily-Notes/                       # Daily development notes
│   └── YYYY-MM-DD.md                  # Daily notes
└── Templates/                         # Developer templates
    ├── Templates.md                   # Templates overview
    ├── Personal-Task-Template.md       # Personal task template
    ├── Technical-Note-Template.md      # Technical note template
    ├── Code-Snippet-Template.md       # Code snippet template
    ├── Learning-Note-Template.md      # Learning note template
    ├── Code-Review-Received-Template.md # Code review received template
    ├── Research-Note-Template.md       # Research note template
    └── Daily-Note-Template.md         # Daily development note template
```

## Key Features

### 1. Team Organization

- **Flexible Structure**: Teams can be organized by project, department, technology, or any way
- **Multi-Team Members**: Members can belong to multiple teams
- **Team Metadata**: Team type, purpose, technology stack, etc.

### 2. Team Lead Activities

- **One-on-Ones**: Regular one-on-one meeting tracking
- **Mentoring**: Mentoring sessions and development plans
- **Code Reviews**: Code review tracking and metrics
- **Architecture Reviews**: Design and architecture review notes
- **Technical Decisions**: ADRs and decision documentation
- **Team Retros**: Team retrospective notes
- **Incidents**: Incident response and post-mortems
- **Performance Reviews**: Performance review documentation
- **Team Health**: Team health metrics and reports

### 3. Dashboards

- **Teams Dashboard**: Overview of all teams
- **My Team Dashboard**: Dashboard for team I lead
- **Team Lead Dashboard**: My Team Lead activities (one-on-ones, reviews, etc.)
- **Developer Dashboard**: My developer activities (tasks, notes, learning)
- **Unified Dashboard**: Combined view of Team Lead + Developer activities
- **Member Dashboard**: Individual team member view (in member profile)

### 4. Developer Workspace

- **Personal Tasks**: Track personal development tasks and goals
- **Technical Notes**: Organize technical learning by topic
- **Code Snippets**: Store reusable code snippets and patterns
- **Personal Projects**: Track personal side projects
- **Learning Progress**: Document learning journey
- **Code Reviews Received**: Track and learn from code reviews
- **Technical Research**: Document research and experiments
- **Daily Notes**: Daily development notes and reflections

### 5. Integration with Projects

- **Project Links**: Teams link to projects they work on
- **Member Links**: Members link to projects they're assigned to
- **Activity Links**: Team activities can reference project tasks/issues
- **Developer Links**: Personal tasks can link to project work
- **Cross-References**: Bidirectional links between Teams, Projects, and Developer workspace
- **Backlog Links**: Team backlogs link to project tasks/stories

### 6. Templates

- **Minimal Templates**: Quick templates for fast note-taking
- **Comprehensive Templates**: Detailed templates with prompts and checklists
- **Based on Guides**: Templates align with Team-Lead-Guides content
- **Dataview Ready**: All templates include proper frontmatter for queries

## Implementation Details

### Frontmatter Standards

#### Team

```yaml
type: team
team-name: "Team Name"
team-type: "Project Team" | "Department" | "Technology" | "Cross-Functional"
status: Active | Inactive | Archived
team-lead: "Name"
members: ["Member1", "Member2"]
projects: ["Project1", "Project2"]
technology-stack: ["Tech1", "Tech2"]
created-date: YYYY-MM-DD
tags: [team/active]
```

#### Backlog Item

```yaml
type: backlog-item
item-name: "Backlog Item"
team: "Team Name"
project: "Project Name"          # optional link to project
status: To Do | In Progress | Done | On Hold
priority: High | Medium | Low
story-points: 1 | 2 | 3 | 5 | 8 | 13
category: Feature | Bug | Tech Debt | Research | Chore
assignee: "Name"                 # optional
due-date: YYYY-MM-DD             # optional
tags: [backlog, team-backlog]
```

#### Member (Team-level)

```yaml
type: team-member
member-name: "Name"
role: "Role"
email: "email@example.com"
teams: ["Team1", "Team2"]
projects: ["Project1"]
skills: ["Skill1", "Skill2"]
status: Active | On Leave | Inactive
tags: [member]
```

#### One-on-One

```yaml
type: one-on-one
date: YYYY-MM-DD
team: "Team Name"
team-lead: "Name"
member: "Member Name"
status: Scheduled | Completed | Cancelled
tags: [1on1]
```

#### Code Review

```yaml
type: code-review
date: YYYY-MM-DD
team: "Team Name"
reviewer: "Name"
author: "Author Name"
pr-number: "PR-123"
repository: "repo-name"
status: Pending | Approved | Changes Requested
review-time: "30 min"
tags: [code-review]
```

#### ADR

```yaml
type: adr
adr-number: "ADR-001"
date: YYYY-MM-DD
team: "Team Name"
status: Proposed | Accepted | Deprecated | Superseded
deciders: ["Name1", "Name2"]
tags: [adr, technical-decision]
```

#### Personal Task

```yaml
type: personal-task
task-name: "Task Name"
status: To Do | In Progress | Done
priority: High | Medium | Low
due-date: YYYY-MM-DD
category: Learning | Practice | Project | Research
related-project: "Project Name" (optional)
tags: [personal-task]
```

#### Technical Note

```yaml
type: technical-note
title: "Note Title"
topic: "React" | "Java" | "Algorithms" | etc.
date: YYYY-MM-DD
category: Learning | Reference | Solution | Pattern
related-topics: ["Topic1", "Topic2"]
tags: [technical-note, topic-name]
```

#### Code Snippet

```yaml
type: code-snippet
snippet-name: "Snippet Name"
language: "JavaScript" | "TypeScript" | "Java" | etc.
date: YYYY-MM-DD
category: Pattern | Utility | Algorithm | Example
use-case: "When to use this"
related-topics: ["Topic1"]
tags: [code-snippet, language]
```

#### Code Review Received

```yaml
type: code-review-received
date: YYYY-MM-DD
pr-number: "PR-123"
repository: "repo-name"
reviewer: "Reviewer Name"
status: Pending | Approved | Changes Requested
learnings: [] # Key learnings from review
tags: [code-review, received]
```

### Dataview Queries

#### Teams Dashboard

- List all active teams
- Team health summary
- Recent activities across teams
- Team member distribution

#### My Team Dashboard

- Team members and their status
- Upcoming one-on-ones
- Recent code reviews
- Team metrics and health
- Team backlog (open items, by priority)

#### Team Lead Dashboard

- My upcoming one-on-ones
- Pending code reviews
- Recent technical decisions
- Team activities summary
- Backlog items needing attention
- Retros and performance review reminders

#### Member Dashboard (in profile)

- Assigned tasks (from Projects)
- One-on-one history
- Development plan progress
- Code review statistics
- Performance review history

#### Developer Dashboard

- Personal tasks overview
- Recent technical notes
- Code snippets by topic
- Learning progress
- Code reviews received
- Personal projects status
- Daily notes summary
- Links to project tasks (if contributing)

#### Unified Dashboard

- Combined Team Lead + Developer view
- Upcoming one-on-ones and reviews
- Backlog highlights (team-level)
- My tasks (team + personal)
- Recent technical notes and learnings
- Open code reviews (as reviewer and as author)

## Templates to Create

### Minimal Templates (Quick)

1. **Quick-1on1-Template.md** - Basic one-on-one structure
2. **Quick-Code-Review-Template.md** - Simple code review notes
3. **Quick-ADR-Template.md** - Minimal ADR format

### Comprehensive Templates (Detailed)

1. **Comprehensive-1on1-Template.md** - Full one-on-one with prompts
2. **Comprehensive-Mentoring-Template.md** - Detailed mentoring session
3. **Comprehensive-Performance-Review-Template.md** - Full performance review

### Standard Templates (Team Lead)

1. **Team-Template.md** - Main team page
2. **Member-Template.md** - Team member profile
3. **One-on-One-Template.md** - One-on-one meeting
4. **Mentoring-Session-Template.md** - Mentoring session
5. **Development-Plan-Template.md** - Development plan
6. **Code-Review-Template.md** - Code review tracking
7. **Architecture-Review-Template.md** - Architecture review
8. **ADR-Template.md** - Architecture Decision Record
9. **Team-Retro-Template.md** - Team retrospective
10. **Incident-Response-Template.md** - Incident response
11. **Performance-Review-Template.md** - Performance review
12. **Team-Health-Template.md** - Team health report
13. **Backlog-Template.md** - Team backlog overview
14. **Backlog-Item-Template.md** - Backlog item details (acceptance criteria, linkage)

### Developer Templates

1. **Personal-Task-Template.md** - Personal development task
2. **Technical-Note-Template.md** - Technical learning note
3. **Code-Snippet-Template.md** - Code snippet with context
4. **Learning-Note-Template.md** - Learning progress note
5. **Code-Review-Received-Template.md** - Code review I received
6. **Research-Note-Template.md** - Technical research note
7. **Daily-Note-Template.md** - Daily development note

## Integration Points

### With Projects Folder

- **Member Links**: Team members link to project members
- **Project Links**: Teams show projects they work on
- **Task Links**: Code reviews can reference project tasks
- **Issue Links**: Incidents can link to project issues
- **Backlog Links**: Team backlogs reference project tasks/stories

### With Team-Lead-Guides

- **Reference Links**: Templates link to relevant guides
- **Best Practices**: Templates include references to guide sections
- **Checklists**: Templates use checklists from guides

### With Developer-Guides

- **Technical References**: Developer templates link to technical guides
- **Best Practices**: Code snippets and notes reference guide content
- **Learning Paths**: Link to Developer-Guides learning paths

## Implementation Approach

1. **Create Teams folder structure** - Main folder and subfolders
2. **Create Developer folder structure** - Developer workspace and subfolders
3. **Create README files** - Overview and usage guides for both
4. **Create dashboards** - All dashboard files (Teams + Developer + Unified)
5. **Create templates** - All template files (Teams + Developer, minimal + comprehensive)
6. **Create example team** - Sample team structure for reference
7. **Create example developer notes** - Sample developer workspace structure
8. **Add integration queries** - Dataview queries linking Teams, Projects, and Developer
9. **Create unified dashboard** - Combined Team Lead + Developer view
10. **Document workflows** - How to use the structure for both roles

## Quality Standards

- **Consistent Structure**: Same pattern across all teams
- **Dataview Compatible**: All frontmatter supports queries
- **Cross-Referenced**: Links between Teams and Projects
- **Template-Based**: All activities use templates
- **Guide-Aligned**: Templates reference Team-Lead-Guides
- **Production-Ready**: Complete, tested, documented

## Dependencies

- Reference **Team-Lead-Guides/** for Team Lead template content
- Reference **Developer-Guides/** for developer technical content
- Reference **Projects/** for integration patterns
- Reference **PM-Guides/** for project management alignment
- Use existing **Projects/Templates/** as pattern reference

## Key Features Summary

### Team Lead Features

- Team management and organization
- One-on-one meeting tracking
- Mentoring and development plans
- Code review tracking (as reviewer)
- Architecture reviews
- Technical decisions (ADRs)
- Team retrospectives
- Incident response
- Performance reviews
- Team health metrics
- Team backlogs linked to projects
- Delivery/handover checklists and readiness

### Developer Features

- Personal task management
- Technical notes and learning
- Code snippets library
- Personal project tracking
- Learning progress tracking
- Code reviews received (as author)
- Technical research and experiments
- Daily development notes
- Mixed organization (topics + projects + dates)

### Integration Features

- Links between Teams and Projects
- Links between Developer workspace and Projects
- Links between Team Lead activities and Developer notes
- Unified dashboards showing all activities
- Cross-referenced templates

### Role Integration

#### Dual Role Workflow

- **As Team Lead**: Manage teams, conduct one-on-ones, review code, make decisions
- **As Developer**: Write code, receive reviews, learn, track personal tasks
- **Unified View**: See both roles in one dashboard
- **Cross-Linking**: Code reviews link to both Team Lead tracking and Developer learning
- **Knowledge Sharing**: Technical notes inform Team Lead decisions

#### Example Workflows

- **Code Review**: Track as Team Lead (reviewer) + Learn as Developer (if receiving)
- **Technical Decision**: Document as ADR (Team Lead) + Reference in Technical Notes (Developer)
- **Learning**: Document in Developer workspace + Apply in Team Lead mentoring
- **Project Work**: Track in Projects + Link to Team activities + Link to Developer tasks
- **Backlog Management**: Team backlog items linked to project tasks/stories; acceptance criteria tracked in backlog item and project task
- **Evaluations**: Task acceptance criteria; retros in Team-Retros; performance reviews in Performance-Reviews; delivery/handover checklists in Incident/Delivery templates