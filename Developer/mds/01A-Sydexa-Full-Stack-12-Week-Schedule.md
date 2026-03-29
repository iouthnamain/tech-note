# Sydexa + Full-Stack-Guides 12-Week Execution Schedule

This is the concrete execution schedule for studying `Sydexa` and `Full-Stack-Guides` together without drowning in parallel reading.

Use it with one rule:

- `Sydexa` is the primary spine
- `Full-Stack-Guides` is a just-in-time support library
- you do not read `Full-Stack-Guides` linearly

Assumed start date: **Monday, March 30, 2026**  
If you start later, shift all week ranges forward and keep the same sequence.

## Who This Schedule Is For

- frontend-first learning goal
- `15h+` realistic weekly capacity
- JavaScript already decent
- React still weaker than JavaScript
- wants strong React/Next.js depth first, then broader full-stack judgment

## Operating Rules

1. Finish the `Sydexa` week before adding extra support reading.
2. Cap `Full-Stack-Guides` at **4 guides per week**.
3. Ship one artifact every week:
   - summary note
   - architecture/design artifact
   - code demo or project slice
   - self-review
4. If overloaded, cut support-guide reading first.
5. Carry over only:
   - one unresolved concept note
   - one unfinished project slice

## Weekly Cadence

| Day | Time | Default work |
| --- | --- | --- |
| Monday | 2.5h | `Sydexa` core reading block A |
| Tuesday | 2.5h | `Sydexa` core reading block B |
| Wednesday | 2h | 2 targeted `Full-Stack-Guides` support docs |
| Thursday | 2.5h | `Sydexa` core reading block C + architecture note |
| Friday | 2h | 1-2 support docs + flashcards/checklist/review |
| Saturday | 4.5-5h | practice lesson + `PROJECT.md` + one shipped artifact |
| Sunday | 1-1.5h | light review, backlog cleanup, carry-over decision |

## Schedule At A Glance

| Week | Dates | Primary spine | Main artifact |
| --- | --- | --- | --- |
| 1 | Mar 30-Apr 5, 2026 | browser model + React foundations | browser/render flow diagram + mini hook demo |
| 2 | Apr 6-Apr 12, 2026 | re-render optimization | re-render audit + profiling note |
| 3 | Apr 13-Apr 19, 2026 | virtualization and infinite loading | virtualized list prototype |
| 4 | Apr 20-Apr 26, 2026 | store, API layer, React Query | UI/server/cache data-flow diagram |
| 5 | Apr 27-May 3, 2026 | forms at scale | form architecture map + large-form prototype |
| 6 | May 4-May 10, 2026 | routing, UI systems, accessibility | settings portal route map |
| 7 | May 11-May 17, 2026 | performance optimization I | optimized listing/search page |
| 8 | May 18-May 24, 2026 | performance optimization II | large-data capstone slice + evidence report |
| 9 | May 25-May 31, 2026 | Next.js App Router foundations | dashboard shell + layout ownership diagram |
| 10 | Jun 1-Jun 7, 2026 | Next.js data fetching and rendering | data-driven dashboard vertical slice |
| 11 | Jun 8-Jun 14, 2026 | auth, database, async systems | authenticated SaaS module + system flow |
| 12 | Jun 15-Jun 21, 2026 | production architecture | full architecture pack + deployment/testing plan |

## Detailed Weekly Plan

### Week 1 - Mar 30-Apr 5, 2026

**Primary**

- [Sydexa Week 1](../../Sydexa/week-01-javascript-react-foundations/README.md)
- [Sydexa Week 1 Project](../../Sydexa/week-01-javascript-react-foundations/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-03`
- Tuesday: lessons `04-06`
- Thursday: lessons `07-09`

**Support pack**

- Wednesday:
  - [01.05 HTTP Protocol / RESTful API](../../Full-Stack-Guides/Group-01-Foundation-Review/01.05_HTTP_Protocol_RESTful_API.md)
  - [01.06 MVC / MVVM / Layered Architecture](../../Full-Stack-Guides/Group-01-Foundation-Review/01.06_MVC_MVVM_Layered_Architecture.md)
- Friday:
  - [01.10 JavaScript ES6 / Modern JavaScript](../../Full-Stack-Guides/Group-01-Foundation-Review/01.10_JavaScript_ES6_Modern_JavaScript.md)

**Ship by Saturday**

- one browser/rendering flow diagram
- one mini hook demo
- one weekly summary note: what React is abstracting on top of the browser

### Week 2 - Apr 6-Apr 12, 2026

**Primary**

- [Sydexa Week 2](../../Sydexa/week-02-rerender-optimization/README.md)
- [Sydexa Week 2 Project](../../Sydexa/week-02-rerender-optimization/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lessons `05-06`

**Support pack**

- Wednesday:
  - [03.01 Big O Notation / Algorithm Complexity](../../Full-Stack-Guides/Group-03-Algorithm-Analysis/03.01_Big_O_Notation_Algorithm_Complexity.md)
  - [03.02 Time Complexity / Execution Time](../../Full-Stack-Guides/Group-03-Algorithm-Analysis/03.02_Time_Complexity_Execution_Time.md)
- Friday:
  - [03.04 Loop Optimization](../../Full-Stack-Guides/Group-03-Algorithm-Analysis/03.04_Loop_Optimization.md)
  - [03.15 Performance Profiling / Measurement](../../Full-Stack-Guides/Group-03-Algorithm-Analysis/03.15_Performance_Profiling_Measurement.md)

**Ship by Saturday**

- one re-render audit for a small component tree
- one profiling note with before/after observations
- one memoization decision note: where `memo` helps and where it adds noise

### Week 3 - Apr 13-Apr 19, 2026

**Primary**

- [Sydexa Week 3](../../Sydexa/week-03-infinite-loading-virtualization/README.md)
- [Sydexa Week 3 Project](../../Sydexa/week-03-infinite-loading-virtualization/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lesson `05` + recap

**Support pack**

- Wednesday:
  - [03.13 Array / Collection Optimization](../../Full-Stack-Guides/Group-03-Algorithm-Analysis/03.13_Array_Collection_Optimization.md)
  - [16.09 Frontend Performance](../../Full-Stack-Guides/Group-16-Performance-Testing/16.09_Frontend_Performance.md)
- Friday:
  - [16.06 Bottleneck Identification](../../Full-Stack-Guides/Group-16-Performance-Testing/16.06_Bottleneck_Identification.md)
  - [16.10 Caching Strategies](../../Full-Stack-Guides/Group-16-Performance-Testing/16.10_Caching_Strategies.md)

**Ship by Saturday**

- one virtualized list prototype
- one trade-off note: initial load vs incremental loading vs UX smoothness
- one screenshot or recording proving the list behaves well at scale

### Week 4 - Apr 20-Apr 26, 2026

**Primary**

- [Sydexa Week 4](../../Sydexa/week-04-store-api-react-query/README.md)
- [Sydexa Week 4 Project](../../Sydexa/week-04-store-api-react-query/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-05`
- Thursday: lessons `06-07`

**Support pack**

- Wednesday:
  - [02.12 Backend / Frontend Integration](../../Full-Stack-Guides/Group-02-Basic-Functions/02.12_Backend_Frontend_Integration.md)
  - [02.13 API Documentation / Swagger / OpenAPI](../../Full-Stack-Guides/Group-02-Basic-Functions/02.13_API_Documentation_Swagger_OpenAPI.md)
- Friday:
  - [02.15 Caching API Responses](../../Full-Stack-Guides/Group-02-Basic-Functions/02.15_Caching_API_Responses.md)
  - [06.08 N+1 Query Problem](../../Full-Stack-Guides/Group-06-Database-Analysis/06.08_N_Plus_1_Query_Problem.md)

**Ship by Saturday**

- one data-flow diagram: local UI state vs server state vs cache
- one small app slice using React Query plus a store
- one invalidation checklist for the entities you touch

### Week 5 - Apr 27-May 3, 2026

**Primary**

- [Sydexa Week 5](../../Sydexa/week-05-large-scale-forms/README.md)
- [Sydexa Week 5 Project](../../Sydexa/week-05-large-scale-forms/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lesson `03`
- Thursday: lesson `04` + recap

**Support pack**

- Wednesday:
  - [02.02 Validation Client / Server Side](../../Full-Stack-Guides/Group-02-Basic-Functions/02.02_Validation_Client_Server_Side.md)
  - [09.11 Complex Validation](../../Full-Stack-Guides/Group-09-Complex-Functions/09.11_Complex_Validation.md)
- Friday:
  - [01.14 Error Handling Basics](../../Full-Stack-Guides/Group-01-Foundation-Review/01.14_Error_Handling_Basics.md)

**Ship by Saturday**

- one form architecture map
- one large-form or multi-step prototype
- one validation strategy note: browser, schema, server, and UX error surfaces

### Week 6 - May 4-May 10, 2026

**Primary**

- [Sydexa Week 6](../../Sydexa/week-06-routing-ui-libraries/README.md)
- [Sydexa Week 6 Project](../../Sydexa/week-06-routing-ui-libraries/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lesson `05` + recap

**Support pack**

- Wednesday:
  - [02.08 Authentication / JWT / Session](../../Full-Stack-Guides/Group-02-Basic-Functions/02.08_Authentication_JWT_Session.md)
  - [02.09 Authorization / User Permissions](../../Full-Stack-Guides/Group-02-Basic-Functions/02.09_Authorization_User_Permissions.md)
- Friday:
  - [04.07 Use Cases / Scenarios](../../Full-Stack-Guides/Group-04-Requirements-Research/04.07_Use_Cases_Scenarios.md)
  - [04.03 Acceptance Criteria](../../Full-Stack-Guides/Group-04-Requirements-Research/04.03_Acceptance_Criteria.md)

**Ship by Saturday**

- one settings portal route map
- one component-boundary note for the UI stack you choose
- one accessibility checklist for your main flows

### Week 7 - May 11-May 17, 2026

**Primary**

- [Sydexa Week 7](../../Sydexa/week-07-performance-optimization-1/README.md)
- [Sydexa Week 7 Project](../../Sydexa/week-07-performance-optimization-1/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-05`
- Thursday: lessons `06-07`

**Support pack**

- Wednesday:
  - [16.05 Performance Metrics](../../Full-Stack-Guides/Group-16-Performance-Testing/16.05_Performance_Metrics.md)
  - [16.09 Frontend Performance](../../Full-Stack-Guides/Group-16-Performance-Testing/16.09_Frontend_Performance.md)
- Friday:
  - [16.14 Network Optimization](../../Full-Stack-Guides/Group-16-Performance-Testing/16.14_Network_Optimization.md)
  - [16.16 Performance Tuning](../../Full-Stack-Guides/Group-16-Performance-Testing/16.16_Performance_Tuning.md)

**Ship by Saturday**

- one optimized listing/search page
- one loading strategy note for SSR vs CSR vs lazy-loading trade-offs
- one measurement snapshot showing where the improvement actually came from

### Week 8 - May 18-May 24, 2026

**Primary**

- [Sydexa Week 8](../../Sydexa/week-08-performance-optimization-2-final-project/README.md)
- [Sydexa Week 8 Project](../../Sydexa/week-08-performance-optimization-2-final-project/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lessons `05-06`

**Support pack**

- Wednesday:
  - [16.11 CDN Optimization](../../Full-Stack-Guides/Group-16-Performance-Testing/16.11_CDN_Optimization.md)
  - [16.15 Performance Monitoring](../../Full-Stack-Guides/Group-16-Performance-Testing/16.15_Performance_Monitoring.md)
- Friday:
  - [07.08 Logging](../../Full-Stack-Guides/Group-07-Unit-Test-Debug/07.08_Logging.md)
  - [07.06 Debug Techniques](../../Full-Stack-Guides/Group-07-Unit-Test-Debug/07.06_Debug_Techniques.md)

**Ship by Saturday**

- one large-data app slice
- one capstone report with bottlenecks, fixes, and evidence
- one performance checklist you would reuse on the next project

### Week 9 - May 25-May 31, 2026

**Primary**

- [Sydexa Week 9](../../Sydexa/week-09-nextjs-foundations/README.md)
- [Sydexa Week 9 Project](../../Sydexa/week-09-nextjs-foundations/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lessons `05-06`

**Support pack**

- Wednesday:
  - [Track 00 - NextJS + NestJS Overview](../../Full-Stack-Guides/Tracks/NextJS-NestJS/00_Track_Overview.md)
  - [Track 01 - Architecture and Project Structure](../../Full-Stack-Guides/Tracks/NextJS-NestJS/01_Architecture_and_Project_Structure.md)
- Friday:
  - [Track 02 - NextJS App Router Integration](../../Full-Stack-Guides/Tracks/NextJS-NestJS/02_NextJS_App_Router_Integration.md)

**Ship by Saturday**

- one Next.js dashboard shell
- one route tree plus layout-ownership diagram
- one note explaining your server/client boundary choices

### Week 10 - Jun 1-Jun 7, 2026

**Primary**

- [Sydexa Week 10](../../Sydexa/week-10-nextjs-data-rendering/README.md)
- [Sydexa Week 10 Project](../../Sydexa/week-10-nextjs-data-rendering/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lessons `05-06`

**Support pack**

- Wednesday:
  - [Track 02 - NextJS App Router Integration](../../Full-Stack-Guides/Tracks/NextJS-NestJS/02_NextJS_App_Router_Integration.md)
  - [02.01 CRUD Basic](../../Full-Stack-Guides/Group-02-Basic-Functions/02.01_CRUD_Basic_Create_Read_Update_Delete.md)
- Friday:
  - [02.05 Pagination / Data Paging](../../Full-Stack-Guides/Group-02-Basic-Functions/02.05_Pagination_Data_Paging.md)
  - [02.15 Caching API Responses](../../Full-Stack-Guides/Group-02-Basic-Functions/02.15_Caching_API_Responses.md)

**Ship by Saturday**

- one data-driven dashboard vertical slice
- one cache/revalidation decision note
- one mutation-flow note covering optimistic update vs refresh vs invalidation

### Week 11 - Jun 8-Jun 14, 2026

**Primary**

- [Sydexa Week 11](../../Sydexa/week-11-nextjs-auth-data-systems/README.md)
- [Sydexa Week 11 Project](../../Sydexa/week-11-nextjs-auth-data-systems/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lessons `05-06`

**Support pack**

- Wednesday:
  - [Track 03 - NestJS Backend Foundation](../../Full-Stack-Guides/Tracks/NextJS-NestJS/03_NestJS_Backend_Foundation.md)
  - [Track 04 - Data Layer: Postgres / Redis / Prisma vs Drizzle](../../Full-Stack-Guides/Tracks/NextJS-NestJS/04_Data_Layer_Postgres_Redis_Prisma_vs_Drizzle.md)
- Friday:
  - [02.08 Authentication / JWT / Session](../../Full-Stack-Guides/Group-02-Basic-Functions/02.08_Authentication_JWT_Session.md)
  - [09.06 Background Jobs](../../Full-Stack-Guides/Group-09-Complex-Functions/09.06_Background_Jobs.md)

**Ship by Saturday**

- one authenticated SaaS module
- one auth/data contract/system flow diagram
- one note defining what must stay synchronous and what should become background work

### Week 12 - Jun 15-Jun 21, 2026

**Primary**

- [Sydexa Week 12](../../Sydexa/week-12-nextjs-production-architecture/README.md)
- [Sydexa Week 12 Project](../../Sydexa/week-12-nextjs-production-architecture/PROJECT.md)

**Sydexa lesson split**

- Monday: lessons `01-02`
- Tuesday: lessons `03-04`
- Thursday: lessons `05-06`

**Support pack**

- Wednesday:
  - [Track 05 - Deployment, Observability and Appendices](../../Full-Stack-Guides/Tracks/NextJS-NestJS/05_Deployment_Observability_and_Appendices.md)
  - [14.12 Monitoring / Observability](../../Full-Stack-Guides/Group-14-Advanced-Tech/14.12_Monitoring_Observability.md)
- Friday:
  - [07.05 Integration Test](../../Full-Stack-Guides/Group-07-Unit-Test-Debug/07.05_Integration_Test.md)
  - [17.07 Deployment Strategies](../../Full-Stack-Guides/Group-17-DevOps-Automation/17.07_Deployment_Strategies.md)

**Ship by Saturday**

- one final architecture pack
- one deployment and monitoring plan
- one testing plan for critical flows
- one capstone self-review: what you can now build confidently, and what still needs a second pass

## Weekly Review Template

At the end of each week, answer these five prompts:

1. What did I understand deeply this week?
2. What still feels mechanical or shaky?
3. What artifact proves I learned something real?
4. What decision or trade-off did I reason through instead of copying blindly?
5. What single thing must carry into next week, if anything?

## End-of-Program Success Criteria

By the end of Week 12, you should have:

- completed all 12 `Sydexa` weeks, including practice and weekly `PROJECT.md`
- read about **45 targeted support guides**, not the entire `Full-Stack-Guides` library
- built at least:
  - 4 small demos
  - 4 medium project slices
  - 1 serious capstone
- created reusable engineering artifacts:
  - route maps
  - data-flow diagrams
  - cache strategy notes
  - performance reports
  - testing and deployment checklists

## If The Schedule Slips

Do this in order:

1. keep the `Sydexa` reading blocks
2. keep the weekly `PROJECT.md`
3. drop the least relevant support guide first
4. carry only one unfinished slice into the next week

Do not respond to slippage by trying to read more.
