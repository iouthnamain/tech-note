# LLM Guide: Creating a New Project from Templates

This guide provides step-by-step instructions for an LLM to create a new empty project folder structure using the available templates.

## Overview

When creating a new project, you need to:
1. Create the folder structure
2. Create the main project file from template
3. Create overview files in their respective folders
4. Set up supporting folders
5. Replace template variables with actual project information

## Step-by-Step Process

### Step 1: Determine Project Information

Before creating files, gather or determine:
- **Project Name**: The name of the project (e.g., "Customer Portal Redesign")
- **Project Folder Name**: URL-friendly version (e.g., "Customer-Portal-Redesign")
- **Status**: Usually "Active" for new projects
- **Priority**: "High", "Medium", or "Low"
- **Start Date**: Current date or project start date (format: YYYY-MM-DD)
- **Client**: Client name (if applicable)
- **Team Members**: Array of team member names

### Step 2: Create Folder Structure

Create the following folder structure in `Projects/Active/{{project-folder-name}}/`:

```
Projects/Active/{{project-folder-name}}/
├── {{project-folder-name}}.md      # Main project file
├── Tasks/
│   └── Tasks.md                     # Tasks overview
├── Risks/
│   └── Risks.md                     # Risks overview
├── Issues/
│   └── Issues.md                    # Issues overview
├── Sprints/
│   └── Sprints.md                   # Sprints overview
├── Status-Reports/                  # Empty folder
└── Meetings/                        # Empty folder
```

**Commands to create folders:**
```bash
mkdir -p "Projects/Active/{{project-folder-name}}/Tasks"
mkdir -p "Projects/Active/{{project-folder-name}}/Risks"
mkdir -p "Projects/Active/{{project-folder-name}}/Issues"
mkdir -p "Projects/Active/{{project-folder-name}}/Sprints"
mkdir -p "Projects/Active/{{project-folder-name}}/Status-Reports"
mkdir -p "Projects/Active/{{project-folder-name}}/Meetings"
```

### Step 3: Create Main Project File

**Source Template**: `Projects/Templates/Project-Template.md`

**File to Create**: `Projects/Active/{{project-folder-name}}/{{project-folder-name}}.md`

**Template Variables to Replace**:
- `{{title}}` → Project Name (e.g., "Customer Portal Redesign")
- `{{date}}` → Start Date (format: YYYY-MM-DD)
- `{{project-name}}` → Project Name (same as title, used in queries)

**Frontmatter Fields to Fill**:
- `project-name`: Project Name
- `status`: "Active" (or appropriate status)
- `priority`: "High", "Medium", or "Low"
- `start-date`: Start date (YYYY-MM-DD)
- `end-date`: Leave empty or set target end date
- `progress`: 0 (for new project)
- `client`: Client name or empty string
- `team-members`: Array of team member names or empty array
- `budget`: Budget amount or 0
- `actual-cost`: 0 (for new project)

**Important**: The queries in the template use `{{project-name}}` which should be replaced with the actual project folder name for the FROM paths.

### Step 4: Create Tasks Overview File

**Source Template**: `Projects/Templates/Tasks-Overview-Template.md`

**File to Create**: `Projects/Active/{{project-folder-name}}/Tasks/Tasks.md`

**Template Variables to Replace**:
- `{{project-name}}` → Project Folder Name (e.g., "Customer-Portal-Redesign")

**Frontmatter to Add**:
```yaml
---
project: "Project Name"
---
```

**Note**: The `project` field in frontmatter should match the `project-name` from the main project file (not the folder name).

### Step 5: Create Risks Overview File

**Source Template**: `Projects/Templates/Risks-Overview-Template.md`

**File to Create**: `Projects/Active/{{project-folder-name}}/Risks/Risks.md`

**Template Variables to Replace**:
- `{{project-name}}` → Project Folder Name

**Frontmatter to Add**:
```yaml
---
project: "Project Name"
---
```

### Step 6: Create Issues Overview File

**Source Template**: `Projects/Templates/Issues-Overview-Template.md`

**File to Create**: `Projects/Active/{{project-folder-name}}/Issues/Issues.md`

**Template Variables to Replace**:
- `{{project-name}}` → Project Folder Name

**Frontmatter to Add**:
```yaml
---
project: "Project Name"
---
```

### Step 7: Create Sprints Overview File

**Source Template**: `Projects/Templates/Sprints-Overview-Template.md`

**File to Create**: `Projects/Active/{{project-folder-name}}/Sprints/Sprints.md`

**Template Variables to Replace**:
- `{{project-name}}` → Project Folder Name

**Note**: Sprints overview doesn't need frontmatter with project field since it queries from the Sprints folder directly.

### Step 8: Verify File Structure

After creation, verify the structure:

```bash
find "Projects/Active/{{project-folder-name}}" -type f -name "*.md" | sort
```

Expected files:
- `{{project-folder-name}}/{{project-folder-name}}.md`
- `{{project-folder-name}}/Tasks/Tasks.md`
- `{{project-folder-name}}/Risks/Risks.md`
- `{{project-folder-name}}/Issues/Issues.md`
- `{{project-folder-name}}/Sprints/Sprints.md`

## Template Variable Reference

### Project Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{title}}` | Project display name | "Customer Portal Redesign" |
| `{{date}}` | Start date (YYYY-MM-DD) | "2025-01-20" |
| `{{project-name}}` | Project folder name for paths | "Customer-Portal-Redesign" |

### Overview Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{project-name}}` | Project folder name for FROM paths | "Customer-Portal-Redesign" |

**Important Distinction**:
- In **Project Template**: `{{project-name}}` in frontmatter = Project Display Name
- In **Overview Templates**: `{{project-name}}` in queries = Project Folder Name
- In **Overview Templates**: `project` in frontmatter = Project Display Name (matches `project-name` from main file)

## Query Pattern Consistency

All overview files follow the same query pattern as the main project file:

1. **Query from project root**: `FROM "Projects/Active/{{project-folder-name}}"`
2. **Filter by project**: `AND project = this.project` (for Tasks, Risks, Issues)
3. **Frontmatter**: Include `project: "Project Display Name"` to enable `this.project` references
4. **Sprints exception**: Queries from `FROM "Projects/Active/{{project-folder-name}}/Sprints"` (no project filter)

## Example: Creating "Customer Portal Redesign" Project

### Project Information
- **Project Name**: "Customer Portal Redesign"
- **Project Folder**: "Customer-Portal-Redesign"
- **Status**: "Active"
- **Priority**: "High"
- **Start Date**: "2025-01-20"
- **Client**: "Acme Corp"
- **Team**: ["Alice Developer", "Bob Designer"]

### Files to Create

1. **Main Project File**: `Projects/Active/Customer-Portal-Redesign/Customer-Portal-Redesign.md`
   - Replace `{{title}}` → "Customer Portal Redesign"
   - Replace `{{date}}` → "2025-01-20"
   - Replace `{{project-name}}` in queries → "Customer-Portal-Redesign"
   - Set `project-name: "Customer Portal Redesign"` in frontmatter

2. **Tasks Overview**: `Projects/Active/Customer-Portal-Redesign/Tasks/Tasks.md`
   - Replace `{{project-name}}` in queries → "Customer-Portal-Redesign"
   - Add frontmatter: `project: "Customer Portal Redesign"`

3. **Risks Overview**: `Projects/Active/Customer-Portal-Redesign/Risks/Risks.md`
   - Replace `{{project-name}}` in queries → "Customer-Portal-Redesign"
   - Add frontmatter: `project: "Customer Portal Redesign"`

4. **Issues Overview**: `Projects/Active/Customer-Portal-Redesign/Issues/Issues.md`
   - Replace `{{project-name}}` in queries → "Customer-Portal-Redesign"
   - Add frontmatter: `project: "Customer Portal Redesign"`

5. **Sprints Overview**: `Projects/Active/Customer-Portal-Redesign/Sprints/Sprints.md`
   - Replace `{{project-name}}` in queries → "Customer-Portal-Redesign"
   - No frontmatter needed

## Checklist for LLM

When creating a new project, ensure:

- [ ] All folders created (Tasks, Risks, Issues, Sprints, Status-Reports, Meetings)
- [ ] Main project file created with all template variables replaced
- [ ] All overview files created in their respective folders
- [ ] All `{{project-name}}` variables replaced with actual project folder name in queries
- [ ] Frontmatter `project` field matches `project-name` from main file (for Tasks, Risks, Issues)
- [ ] All FROM paths use project folder name
- [ ] All project filters use `this.project` (for Tasks, Risks, Issues)
- [ ] No overview files at project root (they should be in their folders)
- [ ] Empty folders (Status-Reports, Meetings) created

## Common Mistakes to Avoid

1. **Wrong variable usage**: Using project display name where folder name is needed in FROM paths
2. **Missing frontmatter**: Forgetting to add `project` field to overview files
3. **Incorrect paths**: Using `FROM "Projects/Active/{{project-name}}/Tasks"` instead of `FROM "Projects/Active/{{project-name}}"`
4. **Root-level overview files**: Creating `Tasks.md` at project root instead of `Tasks/Tasks.md`
5. **Mismatched project names**: Frontmatter `project` field doesn't match main file's `project-name`

## Testing the Created Project

After creation, verify:
1. Main project file loads and shows project overview
2. Overview links work (Tasks/Tasks, Risks/Risks, etc.)
3. Dataview queries execute without errors
4. All files are in correct locations
5. Template variables are fully replaced (no `{{...}}` remaining)

## Related Templates

- **Project Template**: `Projects/Templates/Project-Template.md`
- **Tasks Overview**: `Projects/Templates/Tasks-Overview-Template.md`
- **Risks Overview**: `Projects/Templates/Risks-Overview-Template.md`
- **Issues Overview**: `Projects/Templates/Issues-Overview-Template.md`
- **Sprints Overview**: `Projects/Templates/Sprints-Overview-Template.md`

## Additional Resources

- **Main README**: `Projects/README.md` - Complete documentation
- **Sample Project**: `Projects/Active/E-Commerce-Platform-Enhancement/` - Reference implementation

