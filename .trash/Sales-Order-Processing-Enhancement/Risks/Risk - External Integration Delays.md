---
type: risk
project: "Sales Order Processing Enhancement"
risk-id: RISK-SOP-002
category: Integration
probability: High
impact: High
risk-score: 9
status: Open
owner: "Integration Lead"
date-identified: 2024-04-20
next-review: 2024-05-15
tags: [risk, sap, integration]
---

# RISK-SOP-002 - External Integration Delays

## Description
Delays in integrating with external pricing/CRM systems (RFC/IDoc) could stall approvals and pricing validation, leading to the current On-Hold state.

## Response Strategy
**Strategy**: Mitigate

**Response Plan**:
- Agree on data contracts and SLAs early with external teams
- Build mock services to unblock internal development
- Schedule integration testing windows and align environments

**Contingency Plan**:
- Phase rollout: go live with internal pricing first, add external integration later

**Trigger**:
- No confirmed integration test window by target date (2024-06-01)

