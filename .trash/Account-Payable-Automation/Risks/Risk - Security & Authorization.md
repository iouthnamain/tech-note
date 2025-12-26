---
type: risk
project: "Account Payable Automation"
risk-id: RISK-APA-004
category: Security
probability: Low
impact: High
risk-score: 3
status: Open
owner: "PM"
date-identified: 2024-01-12
next-review: 2024-01-30
tags: [risk, sap, security]
---

# RISK-APA-004 - Security & Authorization

## Description
Insufficient authorization checks or insecure handling of payment files could expose sensitive data or enable unauthorized actions.

## Response Strategy
**Strategy**: Mitigate

**Response Plan**:
- Enforce authz checks on posting/payments; secure file handling
- Review roles/authorizations with security team
- Add audit logging for critical actions

**Contingency Plan**:
- Immediate role lockdown; rotate credentials; audit recent actions

**Trigger**:
- Security review findings or failed authorization tests

## Monitoring
- [x] Risk monitoring plan in place
- [x] Owner assigned
- [x] Review date scheduled
- [x] Mitigation actions tracked

