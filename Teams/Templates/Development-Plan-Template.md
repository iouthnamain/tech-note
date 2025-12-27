---
type: development-plan
member: "{{member-name}}"
team: "{{team-name}}"
created-date: {{date}}
status: Active
tags: [development-plan]
---

# Development Plan: {{member-name}}

## Plan Overview

**Member**: `= this.member`  
**Team**: `= this.team`  
**Created**: `= this.created-date`  
**Status**: `= this.status`

## Career Goals

### Short-term Goals (6-12 months)
- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

### Long-term Goals (2-5 years)
- [ ] Goal 1
- [ ] Goal 2

## Skills to Develop

### Technical Skills
- [ ] Skill 1
- [ ] Skill 2
- [ ] Skill 3

### Soft Skills
- [ ] Skill 1
- [ ] Skill 2

## Learning Plan

### Current Quarter
- [ ] Learning objective 1
- [ ] Learning objective 2

### Resources
- [Resource 1]
- [Resource 2]

## Progress Tracking

### Completed
- 

### In Progress
- 

### Upcoming
- 

## Mentoring Sessions

```dataview
TABLE date, status
FROM "Teams/Active/{{team-name}}/Mentoring/Sessions"
WHERE type = "mentoring-session"
  AND member = this.member
  AND !contains(file.folder, "Templates")
SORT date DESC
```

## Related

- [[../Members/{{member-name}}|Member Profile]]
- [[../Mentoring/Mentoring|Mentoring Overview]]

---

**Last Updated**: {{date}}





