# Projects Folder - Setup Guide

This folder contains templates and structure for managing projects in Obsidian using markdown files, links, tags, and plugins.

## Table of Contents

- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)
- [Creating a New Project](#creating-a-new-project)
- [Sprints](#sprints)
- [Using Templates](#using-templates)
- [Tagging Conventions](#tagging-conventions)
- [Dataview Queries](#dataview-queries)
- [Plugin Recommendations](#plugin-recommendations)
- [Workflow Examples](#workflow-examples)
- [Related Guides](#related-guides)

## Quick Start

1. **Enable Required Plugins**: Install and enable Dataview plugin (see [Plugin Recommendations](#plugin-recommendations))
2. **Create Your First Project**: Use the [[Project-Template|Project Template]] to create a new project
3. **View Dashboard**: Open [[Project-Dashboard]] to see all projects and tasks
4. **Set Up Templates**: Configure Obsidian Templates plugin to use templates from `Templates/` folder
5. **Frontmatter Required**: Include `type`, `project`, `status`, `priority`, `assignee/owner` (where relevant), and `due-date` (for tasks) so Dataview/Bases work
6. **Plan Sprints**: Use the sprint templates under `Templates/` and create sprint folders under `Projects/Sprints/`

## Folder Structure

```
Projects/
├── Active/                          # Active projects (one folder per project)
│   └── <Project-Name>/
│       ├── Project-Name.md          # Main project page (from template)
│       ├── Tasks.md                 # Tasks overview (Dataview over Tasks/)
│       ├── Tasks/                   # Individual task notes (type: task)
│       ├── Risks.md                 # Risks overview (Dataview over Risks/)
│       ├── Risks/                   # Individual risk notes (type: risk)
│       ├── Issues.md                # Issues overview (Dataview over Issues/)
│       ├── Issues/                  # Individual issue notes (type: issue)
│       ├── Status-Reports/          # Status report notes (type: status-report)
│       └── Meetings/                # Meeting notes (optional)
├── Completed/                       # Completed projects (archived)
├── On-Hold/                         # Projects temporarily paused
├── Sprints/                         # Global sprint folders (1 per sprint)
│   └── YYYY-Sprint-01/              # Example sprint folder
│       ├── Sprint-Plan.md
│       ├── Sprint-Board.md
│       ├── Sprint-Review-Retro.md
│       └── Daily-Standups/          # Optional daily notes
├── Templates/                       # Template files
│   ├── Project-Template.md
│   ├── Task-Template.md
│   ├── Risk-Template.md
│   ├── Issue-Template.md
│   └── Status-Report-Template.md
├── Project-Dashboard.md             # Main dashboard with Dataview queries
└── README.md                        # This file
```

### Example Project Structure

When you create a new project, it should follow this structure:

```
Projects/Active/Project-Name/
├── Project-Name.md                 # Main project page (from template)
├── Tasks/                          # Tasks folder
│   ├── Tasks.md                    # Task overview (Dataview) - inside Tasks folder
│   └── Task-001-*.md               # Individual task notes (type: task)
├── Risks/                          # Risks folder
│   ├── Risks.md                    # Risk overview (Dataview) - inside Risks folder
│   └── RISK-001-*.md               # Individual risk notes (type: risk)
├── Issues/                         # Issues folder
│   ├── Issues.md                   # Issue overview (Dataview) - inside Issues folder
│   └── ISSUE-001-*.md              # Individual issue notes (type: issue)
├── Sprints/                        # Sprints folder
│   ├── Sprints.md                  # Sprints overview (Dataview) - inside Sprints folder
│   └── YYYY-Sprint-XX/            # Individual sprint folders
├── Members/                        # Team members folder
│   ├── Members.md                  # Members overview (Dataview) - inside Members folder
│   └── Member-Name.md              # Individual member profiles (type: member)
├── Status-Reports/                 # Status report notes (type: status-report)
│   └── YYYY-MM-DD-Status-Report.md
└── Meetings/                       # Meeting notes
    └── YYYY-MM-DD-Meeting-Notes.md
```

## Creating a New Project

### Step 1: Create Project Folder

1. Navigate to the appropriate state folder (`Projects/Active/`, `Projects/On-Hold/`, or `Projects/Completed/`)
2. Create a new folder named after your project (e.g., `My-New-Project`)

### Step 2: Create Project Page

1. Create a new file `My-New-Project.md` in the project folder
2. Use the [[Project-Template|Project Template]]:
   - In Obsidian, use `Ctrl/Cmd + P` to open command palette
   - Type "Templates: Insert template"
   - Select `Templates/Project-Template`
   - Replace `{{title}}` with your project name
   - Update frontmatter fields (status, priority, dates, etc.)

### Step 3: Create Supporting Files

Create the following files in your project folder:

- **Tasks/Tasks.md** and **Tasks/**: Use [[Templates/Tasks-Overview-Template|Tasks Overview Template]] for `Tasks/Tasks.md` (overview file inside Tasks folder), and [[Task-Template|Task Template]] for individual task notes in `Tasks/`
- **Risks/Risks.md** and **Risks/**: Use [[Templates/Risks-Overview-Template|Risks Overview Template]] for `Risks/Risks.md` (overview file inside Risks folder), and [[Risk-Template|Risk Template]] for individual risk notes in `Risks/`
- **Issues/Issues.md** and **Issues/**: Use [[Templates/Issues-Overview-Template|Issues Overview Template]] for `Issues/Issues.md` (overview file inside Issues folder), and [[Issue-Template|Issue Template]] for individual issue notes in `Issues/`
- **Sprints/Sprints.md** and **Sprints/**: Use [[Templates/Sprints-Overview-Template|Sprints Overview Template]] for `Sprints/Sprints.md` (overview file inside Sprints folder), and sprint templates for individual sprint files
- **Status-Reports/**: Create folder for status reports
- **Meetings/**: Create folder for meeting notes

**Note**: Overview files (`Tasks.md`, `Risks.md`, `Issues.md`, `Sprints.md`) are now located inside their respective folders, not at the project root. This keeps all related files together and follows the same organizational pattern.

### Sample Projects (reference implementations)

- Active: `Projects/Active/Custom-Inventory-Management-System/`
- On Hold: `Projects/On-Hold/Sales-Order-Processing-Enhancement/`
- Completed: `Projects/Completed/Financial-Reporting-Dashboard/`

### Step 4: Update Dashboard

The [[Project-Dashboard]] will automatically show your new project once it's created in the `Active/` folder.

## Using Templates

### Overview Templates
- [[Templates/Tasks-Overview-Template|Tasks Overview]] — Template for `Tasks.md` with Dataview queries for task management
- [[Templates/Risks-Overview-Template|Risks Overview]] — Template for `Risks.md` with risk grouping and filtering
- [[Templates/Issues-Overview-Template|Issues Overview]] — Template for `Issues.md` with issue tracking views
- [[Templates/Sprints-Overview-Template|Sprints Overview]] — Template for `Sprints.md` with sprint tracking and velocity

### Sprint Templates
- [[Templates/Sprint-Plan-Template|Sprint Plan]] — goals, scope, risks, capacity, velocity target (1-week cadence)
- [[Templates/Sprint-Board-Template|Sprint Board]] — Kanban + Dataview of sprint scope
- [[Templates/Sprint-Review-Retro-Template|Sprint Review/Retro]] — summary, metrics, actions
- [[Templates/Daily-Standup-Template|Daily Standup]] — yesterday/today/blockers
- [[Templates/Story-Point-Template|Story Points Guide]] — estimation guide, Fibonacci scale, velocity tracking

### Project Template

The [[Project-Template|Project Template]] includes:
- Frontmatter with project metadata
- Sections for Goals, Tasks, Timeline, Risks, Issues, Status Reports
- Dataview queries to automatically link related files
- Placeholders for customization
- PM lifecycle prompts (kickoff → planning/estimation → execution → test → release/handover)
- References to PM/Dev standards sections in this README for governance and engineering

**Template Variables**:
- `{{title}}`: Project name
- `{{date}}`: Current date
- `{{project-name}}`: Project name (for linking)

**Standard Frontmatter Keys** (keeps Dataview/Bases consistent):
- Projects: `type: project`, `project-name`, `status`, `priority`, `progress`, `start-date`, `end-date`, `client`, `team-members`, `budget`, `actual-cost`, `tags`
- Tasks: `type: task`, `task-name`, `project`, `status`, `assignee`, `due-date`, `priority`, `story-points`, `estimated-hours`, `actual-hours`, `tags`
- Risks: `type: risk`, `project`, `risk-name`, `risk-id`, `category`, `probability`, `impact`, `risk-score`, `status`, `owner`, `date-identified`, `next-review`, `tags`
- Issues: `type: issue`, `project`, `issue-name`, `issue-id`, `priority`, `severity`, `status`, `assigned-to`, `reported-by`, `date-reported`, `resolution-date`, `verified-by`, `tags`
- Members: `type: member`, `member-name`, `role`, `email`, `projects[]`, `skills[]`, `tags`
- Status Reports: `type: status-report`, `project`, `report-date`, `period-start`, `period-end`, `status`, `tags`
- Sprint Plan: `type: sprint-plan`, `sprint-name`, `sprint-number`, `cadence`, `start-date`, `end-date`, `goals`, `capacity`, `velocity-target`, `team`, `project-scope`, `risks`, `status`, `tags`
- Sprint Board: `type: sprint-board`, `sprint-name`, `sprint-number`, `start-date`, `end-date`, `status`, `tags`
- Sprint Review/Retro: `type: sprint-review`, `sprint-name`, `sprint-number`, `start-date`, `end-date`, `status`, `tags`
- Daily Standup: `type: daily-standup`, `date`, `sprint-name`, `yesterday`, `today`, `blockers`, `tags`
- Dashboard: `type: dashboard`, `dashboard-name`, `scope`, `created-date`, `tags`

**Note**: All overview templates (Tasks, Risks, Issues, Sprints) use `{{project-name}}` as a placeholder. Replace this with your actual project name when using the templates.

### Task Template

Use [[Task-Template|Task Template]] for individual tasks. Tasks can be:
- Listed in `Tasks.md` with Dataview queries
- Created as separate files for complex tasks
- Managed in a Kanban board (requires Kanban plugin)
- Include acceptance/testing/security/performance reminders and Definition of Done checklist
- **Story Points**: Add `story-points` field for agile estimation (see [[Templates/Story-Point-Template|Story Points Guide]])

### Story Points Template

Use [[Templates/Story-Point-Template|Story Points Guide]] for:
- **Estimation reference**: Fibonacci scale (1, 2, 3, 5, 8, 13, 21) with complexity/effort/risk criteria
- **Team estimation**: Planning poker process and relative sizing guidelines
- **Velocity tracking**: Calculate and use velocity for sprint planning
- **Best practices**: When to use story points, breaking down large stories, common mistakes

**Story Point Scale**:
- **1-3**: Simple to small tasks (trivial to small complexity)
- **5-8**: Medium to large tasks (moderate to significant complexity)
- **13+**: Very large tasks (should be broken down into smaller stories)

**Integration**:
- Add `story-points` field to Task template frontmatter
- Sprint Plan and Board templates include story point summaries and velocity tracking
- Use Dataview queries to calculate total points, velocity, and burnup/burndown

### Risk Template

Use [[Risk-Template|Risk Template]] to document project risks. Each risk should include:
- Risk ID (e.g., RISK-001)
- Probability and Impact levels
- Risk Score (calculated: Probability × Impact)
- Response strategy and plan
- Suggested categories (scope, schedule, integration, security, performance) and review cadence

### Issue Template

Use [[Issue-Template|Issue Template]] to log project issues. Each issue should include:
- Issue ID (e.g., ISSUE-001)
- Priority and Severity
- Root cause analysis
- Solution and action items
- RCA/mitigation/validation prompts

### Member Template

Use [[Member-Template|Member Template]] to create team member profiles. Each member profile should include:
- Member name, role, and email
- Projects they're working on
- Skills and expertise
- Current assignments (tasks, risks, issues)
- Workload summary (story points, open items)
- Member profiles are stored in `Members/` folder with overview in `Members/Members.md`

**Member Frontmatter**:
- `type: member`, `member-name`, `role`, `email`, `projects[]`, `skills[]`, `tags`

**Member Queries**:
- Member profiles automatically show tasks where `assignee = member-name`
- Risks where `owner = member-name`
- Issues where `assigned-to = member-name`
- Workload summaries with story points

### Status Report Template

Use [[Status-Report-Template|Status Report Template]] for regular status updates. Create reports:
- Weekly or bi-weekly
- Before important milestones
- When status changes (Green/Yellow/Red)
- Include KPIs (scope/schedule/cost/quality) and risk/issue summary cues

### Risks/Issues/Tasks Dashboard Template

Use [[Templates/Risks-Issues-Tasks-Dashboard-Template|Risks/Issues/Tasks Dashboard Template]] to create a comprehensive dashboard combining all three item types in one view. The template includes:

- **Summary sections**: Quick statistics and overview metrics for Tasks, Risks, and Issues
- **Detailed filtered views**: 
  - Tasks: by priority, status, project, assignee, overdue, due this week
  - Risks: by category, status, project, high priority, needing review
  - Issues: by priority, status, project, assignee, recent issues
- **Metrics/statistics**: Counts, trends, and breakdowns for each type
- **Combined views**: Cross-cutting views showing tasks/risks/issues by project and urgent items
- **Customizable**: Comment/uncomment sections to enable/disable views as needed

**Usage**:
- Insert the template where you want the dashboard (project folder, root, or custom location)
- Replace `{{title}}` with your dashboard name
- Set `{{scope}}` to describe the dashboard scope (e.g., "All Projects", "Project X Only")
- Customize queries by adding project filters: `AND project = "Project-Name"`
- Update assignee filters: replace `"YourName"` with actual names

**Standard Frontmatter Keys**:
- Dashboard: `type: dashboard`, `dashboard-name`, `scope`, `created-date`, `tags`

## Tagging Conventions

Use consistent tags for filtering and querying:

### Project Tags
- `#project/active` - Active projects
- `#project/completed` - Completed projects
- `#project/on-hold` - Projects on hold

### Task Tags
- `#task/high-priority` - High priority tasks
- `#task/medium-priority` - Medium priority tasks
- `#task/low-priority` - Low priority tasks
- `#task/blocked` - Blocked tasks
- `#task/urgent` - Urgent tasks

### Risk Tags
- `#risk/high` - High risk score (6-9)
- `#risk/medium` - Medium risk score (3-5)
- `#risk/low` - Low risk score (1-2)

### Issue Tags
- `#issue/critical` - Critical issues
- `#issue/high` - High priority issues
- `#issue/medium` - Medium priority issues
- `#issue/low` - Low priority issues

### Status Tags
- `#status/green` - On track
- `#status/yellow` - At risk
- `#status/red` - Off track

## Dataview Queries

The dashboard and project pages use Dataview queries to automatically aggregate information. 

### Overview Files Query Pattern

Overview files (`Tasks/Tasks.md`, `Risks/Risks.md`, `Issues/Issues.md`, `Sprints/Sprints.md`) follow the same query pattern as the main project file:

- **Query from project root**: `FROM "Projects/Active/{{project-name}}"`
- **Filter by project name**: `AND project = this.project` (using frontmatter `project` field)
- **Frontmatter**: Overview files include `project: "{{project-name}}"` to enable `this.project` references
- **Sprints exception**: Sprints overview queries from `FROM "Projects/Active/{{project-name}}/Sprints"` (no project filter needed)

This ensures consistency across all project files and allows queries to work regardless of where files are located within the project folder structure.

Here are some useful query examples:

### Active Sprint Scope (set sprint filter as needed)

```dataview
TABLE status, priority, assignee, due-date, project
FROM "Projects/Active"
WHERE type = "task"
  AND status != "Done"
  AND !contains(file.folder, "Templates")
SORT priority DESC, due-date ASC
```

### Done This Sprint (filter by sprint window)

```dataview
TABLE assignee, project, due-date
FROM "Projects/Active"
WHERE type = "task"
  AND status = "Done"
  AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### List All Active Projects

```dataview
TABLE status, priority, progress
FROM "Projects/Active"
WHERE status = "Active" AND !contains(file.folder, "Templates")
SORT priority DESC
```

### Find Tasks Due This Week

```dataview
TASK
FROM "Projects/Active"
WHERE due-date <= date(today) + dur(7 days) AND !completed AND !contains(file.folder, "Templates")
SORT due-date ASC
```

### High Priority Risks

```dataview
TABLE project, risk-score, status
FROM "Projects/Active"
WHERE risk-score >= 6 AND !contains(file.folder, "Templates")
SORT risk-score DESC
```

### Open Issues by Project

```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE status != "Resolved" AND !contains(file.folder, "Templates")
GROUP BY project
```

### Recent Status Reports

```dataview
TABLE report-date, status
FROM "Projects/Active"
WHERE type = "status-report" AND !contains(file.folder, "Templates")
SORT report-date DESC
LIMIT 5
```

### GROUP BY Query Best Practices

When using `GROUP BY` in Dataview queries, use `LIST` format instead of `TABLE` for grouped views to properly display items under each group:

**Use LIST for grouped views:**
```dataview
LIST rows.file.link
FROM "Projects/Active"
WHERE type = "task"
GROUP BY status
```

**Use TABLE for aggregated statistics:**
```dataview
TABLE 
  length(rows) AS "Total",
  sum(rows.story-points) AS "Points"
FROM "Projects/Active"
WHERE type = "task"
GROUP BY "Summary"
```

For more Dataview examples, see the [Dataview documentation](https://blacksmithgu.github.io/obsidian-dataview/).

## Using Obsidian Bases with Projects

Obsidian **Bases** is a core plugin that lets you create database-like views over your notes. With your `Projects/` structure and templates, Bases can act like a Notion-style UI on top of your markdown.

### Enable Bases

1. Open **Settings → Core plugins**
2. Enable **Bases**
3. Use the Command Palette (**Ctrl/Cmd + P**) → search for **\"Bases\"** to create or open a base

### Projects Base

Use this base to see and edit all projects in one table.

- **Scope**: all project files under:
  - `Projects/Active`
  - `Projects/Completed`
  - `Projects/On-Hold`
- **Filter**:
  - Include files that have a `project-name` property
  - Optionally exclude files where `type` is `task`, `risk`, `issue`, or `status-report`
- **Recommended columns**:
  - `project-name`
  - `status`
  - `priority`
  - `progress`
  - `start-date`
  - `end-date`
  - `client`
  - `team-members`
  - `tags`
- **Views**:
  - **Table view**:
    - Sort by `priority` (High → Low), then `start-date`
    - Filter `status = Active` for current projects
  - **Card view**:
    - Group by `status` to get a simple pipeline (Active / On-Hold / Completed)

You can edit properties (e.g., `status`, `priority`, `progress`) directly in the Projects base; Bases writes changes back into the project files.

### Tasks Base

Use this base to see and edit tasks across all projects.

- **Scope**: the entire `Projects/` folder
- **Filter**:
  - `type = "task"` in frontmatter
- **Recommended columns**:
  - `task-name` (or file title)
  - `project`
  - `status`
  - `assignee`
  - `due-date`
  - `priority`
  - `estimated-hours`
  - `actual-hours`
  - `tags`
- **Views**:
  - **Table view (My tasks)**:
    - Filter `assignee = "YourName"` (or whatever value you use)
    - Sort by `due-date` ascending, then `priority`
  - **Card / grouped view**:
    - Group by `status` (To Do / In Progress / Done)

### Risks Base

Use this base as a live risk register.

- **Scope**: the entire `Projects/` folder
- **Filter**:
  - `type = "risk"`
- **Recommended columns**:
  - `risk-id`
  - `project`
  - `category`
  - `probability`
  - `impact`
  - `risk-score`
  - `status`
  - `owner`
  - `date-identified`
  - `next-review`
  - `tags`
- **Views**:
  - **Open risks**:
    - Filter `status != "Closed"`
    - Sort by `risk-score` descending
  - **By project**:
    - Group by `project` to see risks per project

### Issues Base

Use this base as an issue/bug tracker.

- **Scope**: the entire `Projects/` folder
- **Filter**:
  - `type = "issue"`
- **Recommended columns**:
  - `issue-id`
  - `project`
  - `priority`
  - `severity`
  - `status`
  - `assigned-to`
  - `reported-by`
  - `date-reported`
  - `resolution-date`
  - `tags`
- **Views**:
  - **Open issues**:
    - Filter `status != "Resolved"` and `status != "Closed"`
    - Sort by `priority` (Critical/High first), then `date-reported`
  - **By project**:
    - Group by `project` to see issues per project

### Status Reports Base

Use this base to see all status reports across projects.

- **Scope**: the entire `Projects/` folder
- **Filter**:
  - `type = "status-report"`
- **Recommended columns**:
  - `project`
  - `report-date`
  - `status`
  - `period-start`
  - `period-end`
  - `tags`
- **Views**:
  - **Recent reports**:
    - Sort by `report-date` descending
    - Optionally limit to the last N items
  - **By project**:
    - Group by `project` to review a single project's report history

### Example Bases Formulas

Bases formulas are configured in the **Bases UI**, not in these markdown files, but you can use these ideas when creating formula columns:

- **Projects Base**
  - **Days left** until end date:
    - `days_left = end-date - today`
  - **Is overdue** (project past end date and not completed):
    - `is_overdue = today > end-date AND status != "Completed"`
- **Tasks Base**
  - **Is overdue** (task past due date and not done):
    - `is_overdue = today > due-date AND status != "Done"`
- **Risks Base**
  - **Risk score** (if `probability` and `impact` are numeric scales, e.g. 1–3):
    - `risk-score = probability * impact`

Adjust names and exact syntax to match how Bases implements formulas in your version of Obsidian.

## Plugin Recommendations

### Required Plugins

1. **Dataview** (Community Plugin)
   - Enables database-like queries in your notes
   - Required for dashboard and project page queries
   - Install from Community Plugins: "Dataview"

### Recommended Plugins

2. **Templates** (Core Plugin)
   - Enable in Settings → Core Plugins → Templates
   - Set template folder to `Projects/Templates`
   - Use hotkey to insert templates quickly

3. **Kanban** (Community Plugin)
   - Create Kanban boards for task management
   - Alternative to list-based task tracking
   - Install from Community Plugins: "Kanban"

4. **Tasks** (Community Plugin)
   - Enhanced task management with due dates, priorities
   - Better task querying and filtering
   - Install from Community Plugins: "Tasks"

5. **Calendar** (Community Plugin)
   - Visual calendar view for deadlines and milestones
   - Link daily notes to projects
   - Install from Community Plugins: "Calendar"

6. **Tag Wrangler** (Community Plugin)
   - Better tag management and organization
   - Bulk tag operations
   - Install from Community Plugins: "Tag Wrangler"

### Optional Plugins

- **Projects**: Enhanced project management features
- **Periodic Notes**: For recurring status reports
- **Daily Notes**: Link daily updates to projects

## Workflow Examples

### Daily Workflow

1. Open [[Project-Dashboard]] to see overview
2. Check "My Tasks" section for assigned tasks
3. Review "Upcoming Deadlines" for the week
4. Update task status as you work
5. Add notes to project pages as needed

### Weekly Workflow

1. Review all active projects
2. Create status report using [[Status-Report-Template|Status Report Template]]
3. Update project progress percentages
4. Review and update risks and issues
5. Plan tasks for next week

### Project Completion Workflow

1. Complete all tasks and close issues
2. Create final status report
3. Document lessons learned
4. Move project folder from `Active/` to `Completed/`
5. Update project status tag to `#project/completed`

### Risk Management Workflow

1. Identify risk → Create entry in `Risks.md` using [[Risk-Template|Risk Template]]
2. Assess probability and impact → Calculate risk score
3. Develop response plan → Update risk entry
4. Assign owner → Set review date
5. Monitor regularly → Update status as needed

### Issue Management Workflow

1. Report issue → Create entry in `Issues.md` using [[Issue-Template|Issue Template]]
2. Assign priority and assignee
3. Analyze root cause → Document in issue entry
4. Develop solution → Update issue entry
5. Resolve → Update status and resolution date
6. Document lessons learned

## Related Guides

This project management system is based on templates and best practices from:

- [[../PM-Guides/MONITORING_CONTROL_REPORTING_GUIDE|Monitoring, Control & Reporting Guide]] - Status reports and progress tracking
- [[../PM-Guides/RISK_ISSUE_MANAGEMENT_GUIDE|Risk & Issue Management Guide]] - Risk and issue templates
- [[../PM-Guides/PROJECT_METHODOLOGIES_GUIDE|Project Methodologies Guide]] - Project management methodologies
- [[../PM-Guides/PLANNING_ESTIMATION_GUIDE|Planning & Estimation Guide]] - Project planning templates
- [[../PM-Guides/DELIVERY_HANDOVER_GUIDE|Delivery & Handover Guide]] - Project completion and handover
- [[../Developer-Guides/TESTING_STRATEGIES_GUIDE|Testing Strategies Guide]] - Testing pyramid, coverage, automation
- [[../Developer-Guides/SECURITY_BEST_PRACTICES_GUIDE|Security Best Practices Guide]] - Secure coding and checks
- [[../Developer-Guides/DEVOPS_CICD_GUIDE|DevOps/CI-CD Guide]] - Branching, CI checks, deployments
- [[../Developer-Guides/PERFORMANCE_OPTIMIZATION_GUIDE|Performance Optimization Guide]] - Performance testing and tuning
- [[../Developer-Guides/API_DESIGN_INTEGRATION_GUIDE|API Design & Integration Guide]] - API standards
- [[../Developer-Guides/ARCHITECTURE_PATTERNS_GUIDE|Architecture Patterns Guide]] - System and integration patterns
- [[../Developer-Guides/OOP_DESIGN_PATTERNS_GUIDE|OOP & Design Patterns Guide]] - Design discipline

## PM Best Practices (Lifecycle & Governance)

- **Phases**: Kickoff → Planning/Estimation → Execution/Build → Test → Release/Handover → Closure.
- **Kickoff/Planning**: define scope, roles/RACI, comms cadence, risks, approval gates; link to `PROJECT_METHODOLOGIES_GUIDE`, `PLANNING_ESTIMATION_GUIDE`.
- **Execution/Monitoring**: track risks/issues, status cadence (weekly/biweekly), KPIs (scope/schedule/cost/quality); link to `MONITORING_CONTROL_REPORTING_GUIDE`, `RISK_ISSUE_MANAGEMENT_GUIDE`.
- **Handover/Closure**: acceptance, documentation, training, support plan; link to `DELIVERY_HANDOVER_GUIDE`.
- **Communication**: cadence (daily/weekly), stakeholder map; link to `COMMUNICATION_NEGOTIATION_GUIDE`, `TEAM_MANAGEMENT_LEADERSHIP_GUIDE`.

## Engineering Standards (Dev Best Practices)

- **Coding/Architecture**: follow patterns from `ARCHITECTURE_PATTERNS_GUIDE`, `OOP_DESIGN_PATTERNS_GUIDE`, `API_DESIGN_INTEGRATION_GUIDE`.
- **Testing**: testing pyramid, coverage expectations, automation (unit/integration/e2e); see `TESTING_STRATEGIES_GUIDE`.
- **Security**: secure coding, input validation, secrets management, authn/z checks; see `SECURITY_BEST_PRACTICES_GUIDE`.
- **Performance**: budgets and profiling; see `PERFORMANCE_OPTIMIZATION_GUIDE`.
- **CI/CD**: branching, mandatory checks (lint/test/build), artifact/deploy, rollback; see `DEVOPS_CICD_GUIDE`.
- **Definition of Done (DoD)**: code review done, tests green, security/perf considerations addressed, docs/notes updated.
## Tips & Best Practices

1. **Consistent Naming**: Use consistent naming conventions for projects, tasks, risks, and issues
2. **Regular Updates**: Update project pages and status reports regularly
3. **Link Everything**: Use `[[links]]` to connect related items
4. **Use Tags**: Tag everything appropriately for easy filtering
5. **Frontmatter**: Keep frontmatter updated for accurate Dataview queries
6. **Archive Old Projects**: Move completed projects to `Completed/` folder
7. **Review Dashboard**: Check [[Project-Dashboard]] regularly for overview
8. **Template Customization**: Customize templates to fit your specific needs

## Troubleshooting

### Dataview Queries Not Working

- Ensure Dataview plugin is installed and enabled
- Check that frontmatter fields match query requirements
- Verify file paths in queries are correct
- Check Dataview syntax documentation

### Templates Not Appearing

- Enable Templates core plugin
- Set template folder path in Settings → Templates
- Ensure template files are in `Projects/Templates/` folder

### Links Not Working

- Use `[[Page Name]]` for internal links
- Use `[[Folder/Page Name]]` for files in subfolders
- Check that file names match exactly (case-sensitive)

## Support

For questions or issues:
- Check Obsidian documentation: https://help.obsidian.md/
- Dataview documentation: https://blacksmithgu.github.io/obsidian-dataview/
- Review related PM guides in `PM-Guides/` folder

---

**Last Updated**: 2024-01-15

