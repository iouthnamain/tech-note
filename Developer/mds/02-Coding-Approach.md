# Coding Approach

This page defines how to study, code, debug, review, and use AI.

## Core Rules

- Study by building, not by only reading.
- Every topic must end in a visible artifact: note, code sample, bug write-up, or shipped feature.
- Prefer one stack path for momentum: frontend-first full-stack.
- Use AI for explanation, scaffolding, review, and debugging ideas, but always verify behavior yourself.
- Learn leadership through execution quality first: reliable updates, clean docs, realistic estimates, thoughtful reviews.

## Study Workflow

For every topic:

1. Read one focused guide, not ten overlapping guides.
2. Write a short note with the key concept and one example.
3. Build a small artifact that uses the concept.
4. Record one mistake, confusion, or lesson learned.
5. Add the result to a project page or weekly review.

## Coding Workflow

Write code in small increments:

1. Understand the problem.
2. Define input and output.
3. Sketch the data flow.
4. Implement the smallest working version.
5. Test manually.
6. Refactor obvious duplication or naming problems.
7. Document the behavior and any tradeoffs.

## Debugging Workflow

Debug with evidence first:

1. Reproduce the issue clearly.
2. Isolate the failing layer: UI, API, database, config, or deployment.
3. Inspect logs, errors, and request data.
4. Form one concrete hypothesis.
5. Verify the fix with the same reproduction steps.
6. Add a test, note, or checklist item to reduce regression risk.

## Code Review Workflow

Before asking for review:

- check correctness first
- check validation and error handling
- check data consistency and side effects
- check obvious performance problems
- check naming, structure, and readability
- check whether tests and logs are enough to support the change

When reviewing someone else:

- start with bug risk, not style
- explain impact, not only preference
- suggest the smallest safe improvement
- be direct and respectful

## AI Usage Rules

Use AI for:

- concept explanation
- code scaffolding
- test ideas
- debugging hypotheses
- review checklists
- documentation structure

Do not outsource to AI:

- final judgment
- security-sensitive assumptions
- hidden complexity in business logic
- whether code actually works
- ownership of your learning

## Anti-Patterns

- reading without building
- copying code without understanding request flow
- switching frameworks every week
- treating tutorials as proof of skill
- using AI output without local verification
- hiding blockers instead of writing them down early
