# Group 03: Algorithm Analysis / NHÓM 3: Phân tích thuật toán

## Overview / Tổng quan

**English**: This group improves code quality, runtime performance, and maintainability. It is especially important for backend APIs, query-heavy systems, and teams that want to move from working code to efficient code.

**Vietnamese**: Nhóm này cải thiện chất lượng code, hiệu năng chạy và khả năng bảo trì. Nhóm đặc biệt quan trọng cho API backend, hệ thống truy vấn nhiều, và các team muốn đi từ code chạy được sang code hiệu quả.

## Best Reading Order / Thứ tự đọc tốt nhất

1. [03.01 Big-O Notation](./03.01_Big_O_Notation_Algorithm_Complexity.md)
2. [03.02 Time Complexity](./03.02_Time_Complexity_Execution_Time.md)
3. [03.03 Space Complexity](./03.03_Space_Complexity_Memory_Usage.md)
4. [03.05 Database Query Optimization](./03.05_Database_Query_Optimization.md)
5. [03.07 Clean Code](./03.07_Clean_Code_DRY_KISS_YAGNI.md)
6. [03.08 SOLID Principles](./03.08_SOLID_Principles_Design.md)
7. [03.10 Refactoring](./03.10_Refactoring_Improve_Code.md)
8. [03.11 Code Smell](./03.11_Code_Smell_Identify_Bad_Code.md)
9. [03.15 Performance Profiling](./03.15_Performance_Profiling_Measurement.md)

## Where This Group Helps Most / Nhóm này giúp nhiều nhất ở đâu

- optimizing API handlers
- reducing slow SQL patterns
- cleaning service-layer code
- improving maintainability before scaling a system
- reviewing technical debt in backend and frontend codebases

## Best Files For Backend and Database Work / File tốt nhất cho backend và database

- [03.05 Database Query Optimization](./03.05_Database_Query_Optimization.md)
- [03.06 Common Mistakes](./03.06_Common_Mistakes_20_Errors.md)
- [03.07 Clean Code](./03.07_Clean_Code_DRY_KISS_YAGNI.md)
- [03.08 SOLID Principles](./03.08_SOLID_Principles_Design.md)
- [03.10 Refactoring](./03.10_Refactoring_Improve_Code.md)
- [03.15 Performance Profiling](./03.15_Performance_Profiling_Measurement.md)

## Best Mapping To Modern Stack / Ánh xạ tốt nhất sang stack hiện đại

### Next.js

- reduce expensive rendering paths
- avoid unnecessary client-side work
- improve data fetching patterns

### NestJS

- apply SOLID and service decomposition
- reduce controller and provider complexity
- profile slow request flows

### Express.js

- reduce middleware overhead
- improve route and service layering
- catch common async and data-access mistakes

### PostgreSQL

- inspect query cost
- avoid N+1 and inefficient joins
- identify where indexes and query rewrites matter

## Recommended Next Groups / Nhóm nên đọc tiếp theo

- [Group 06: Database Analysis](../Group-06-Database-Analysis/README.md)
- [Group 07: Unit Test, Debug](../Group-07-Unit-Test-Debug/README.md)
- [Group 08: Code Review](../Group-08-Code-Review/README.md)
- [Group 16: Performance Testing](../Group-16-Performance-Testing/README.md)
