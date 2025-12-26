---
type: risk
project: "{{project-name}}"
risk-name: "{{title}}"
risk-id: RISK-001
category: Technical
probability: 2
impact: 2
risk-score: "= this.probability * this.impact"
status: Open
owner: ""
date-identified: {{date}}
next-review:
tags: [risk]
---

# {{risk-name}}

## Risk Details

**Risk ID**: `= this.risk-id`  
**Project**: [[`= this.project`]]  
**Category**: `= this.category`  
**Probability**: `= this.probability`  
**Impact**: `= this.impact`  
**Risk Score**: `= this.risk-score` (Probability × Impact)  
**Status**: `= this.status`  
**Owner**: `= this.owner`  
**Date Identified**: `= this.date-identified`  
**Next Review**: `= this.next-review`

## Description

[Detailed description of the risk]

## Response Strategy

**Strategy**: [Accept / Mitigate / Transfer / Avoid]

**Response Plan**: 
[Detailed plan to address the risk]

**Contingency Plan**: 
[Plan if risk materializes]

**Trigger**: 
[Conditions that would trigger the contingency plan]

## Monitoring

- [ ] Risk monitoring plan in place
- [ ] Owner assigned
- [ ] Review date scheduled
- [ ] Mitigation actions tracked

## Risk Categories (Suggested)

- Scope: requirements changes, unclear scope
- Schedule: delays, resource conflicts
- Budget: cost overruns, funding issues
- Technical: integration, performance, security
- Resource: staffing shortages, skill gaps
- External: vendors, regulatory/market shifts

## Review Cadence

- Set `next-review` and revisit monthly (or faster for high risks)
- Update probability/impact after each review and recalc `risk-score`
- Escalate when score increases or mitigation stalls

## Related

- [[Issue-001]]
- [[Task-001]]


