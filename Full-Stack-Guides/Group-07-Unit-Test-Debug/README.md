# Group 07: Unit Test, Debug / NHÓM 7: Unit Test, Debug

## Overview / Tổng quan

**English**: This group focuses on correctness, reliability, and debugging discipline. It turns feature work into maintainable engineering work by covering tests, logging, bug reproduction, regression prevention, and automation.

**Vietnamese**: Nhóm này tập trung vào tính đúng đắn, độ tin cậy và kỷ luật debugging. Nhóm biến việc làm tính năng thành công việc kỹ thuật có thể bảo trì bằng cách bao gồm test, logging, bug reproduction, ngăn regression và automation.

## Best Reading Order / Thứ tự đọc tốt nhất

1. [07.01 Unit Test Basics](./07.01_Unit_Test_Basics.md)
2. [07.02 Test Cases Design](./07.02_Test_Cases_Design.md)
3. [07.05 Integration Test](./07.05_Integration_Test.md)
4. [07.06 Debug Techniques](./07.06_Debug_Techniques.md)
5. [07.08 Logging](./07.08_Logging.md)
6. [07.11 Bug Reproduction](./07.11_Bug_Reproduction.md)
7. [07.12 Bug Fixing](./07.12_Bug_Fixing.md)
8. [07.13 Regression Testing](./07.13_Regression_Testing.md)
9. [07.14 Test Automation](./07.14_Test_Automation.md)
10. [07.15 Debugging Tools](./07.15_Debugging_Tools.md)

## Best Files For Daily Engineering Work / File tốt nhất cho công việc kỹ thuật hàng ngày

- [07.02 Test Cases Design](./07.02_Test_Cases_Design.md)
- [07.05 Integration Test](./07.05_Integration_Test.md)
- [07.06 Debug Techniques](./07.06_Debug_Techniques.md)
- [07.08 Logging](./07.08_Logging.md)
- [07.11 Bug Reproduction](./07.11_Bug_Reproduction.md)
- [07.13 Regression Testing](./07.13_Regression_Testing.md)
- [07.14 Test Automation](./07.14_Test_Automation.md)

## Best Mapping To Modern Stack / Ánh xạ tốt nhất sang stack hiện đại

### Next.js

- component and integration testing
- route handler testing
- reproduction of hydration and data-fetching bugs

### NestJS

- unit tests for providers
- e2e tests for controllers and auth guards
- structured logging for request flows

### Express.js

- route-level integration tests
- middleware behavior tests
- reproduction of async and error-handling bugs

### PostgreSQL

- test setup with seeded databases
- regression testing around query behavior and migrations

## Practical Outcome / Kết quả thực hành

After this group, a learner should be able to:

- design useful test cases
- reproduce bugs reliably
- isolate failures faster
- prevent old bugs from returning
- run tests in a CI pipeline

## Recommended Next Groups / Nhóm nên đọc tiếp theo

- [Group 08: Code Review](../Group-08-Code-Review/README.md)
- [Group 16: Performance Testing](../Group-16-Performance-Testing/README.md)
- [Group 17: DevOps & Automation](../Group-17-DevOps-Automation/README.md)
