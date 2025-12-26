---
type: risk
project: "Sales Order Processing Enhancement"
risk-id: RISK-SOP-001
category: Functional
probability: Medium
impact: High
risk-score: 6
status: Open
owner: "Solution Architect"
date-identified: 2024-04-15
next-review: 2024-05-10
tags: [risk, sap, sd, pricing]
---

# RISK-SOP-001 - Pricing Complexity

## Description
Custom pricing logic (volume discounts, customer-specific rules, promotions) may be more complex than initially estimated, affecting timeline and quality.

## Response Strategy
**Strategy**: Mitigate

**Response Plan**:
- Prioritize core pricing rules; defer niche rules to a later phase
- Add peer review for pricing logic
- Increase test coverage with representative scenarios

**Contingency Plan**:
- Temporarily fall back to standard pricing for outlier cases

**Trigger**:
- Rule set exceeds agreed scope by >20% or test coverage gaps remain after design

