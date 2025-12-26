---
type: issue
project: "Financial Reporting Dashboard"
issue-id: ISSUE-FRD-002
priority: Medium
severity: Medium
status: Resolved
assigned-to: "FI/CO Consultant"
reported-by: "Finance SME"
date-reported: 2024-08-25
resolution-date: 2024-09-10
verified-by: "Finance SME"
tags: [issue, sap, data-quality]
---

# ISSUE-FRD-002 - Currency Conversion Accuracy

## Description
Currency conversion inconsistencies were found in multi-currency reports.

## Impact
- Could undermine trust in financial metrics; affects multi-entity reporting.

## Root Cause
Incorrect exchange rate type used in aggregation; rounding applied prematurely.

## Solution
- Corrected exchange rate type and sequence
- Adjusted rounding to post-aggregation
- Reconciled outputs with FI/CO source

## Action Items
- [x] Fix conversion logic
- [x] Validate with reconciliation samples
- [x] SME sign-off (completed)

