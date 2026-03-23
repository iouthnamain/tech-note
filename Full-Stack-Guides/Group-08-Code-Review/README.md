# Group 08: Code Review / NHÓM 8: Code Review

## Overview / Tổng quan

**English**: This group teaches how to inspect code for correctness, security, performance, maintainability, and architectural fit. It is valuable both for reviewing other people's work and for improving your own code before creating a pull request.

**Vietnamese**: Nhóm này dạy cách kiểm tra code về tính đúng đắn, bảo mật, hiệu năng, khả năng bảo trì và sự phù hợp kiến trúc. Nhóm có giá trị cả khi review code của người khác lẫn khi tự nâng chất lượng code trước khi tạo pull request.

## Best Reading Order / Thứ tự đọc tốt nhất

1. [08.01 Self Code Review](./08.01_Self_Code_Review.md)
2. [08.02 Code Review Checklist](./08.02_Code_Review_Checklist.md)
3. [08.04 Code Quality Standards](./08.04_Code_Quality_Standards.md)
4. [08.05 Security Review](./08.05_Security_Review.md)
5. [08.06 Performance Review](./08.06_Performance_Review.md)
6. [08.07 Architecture Review](./08.07_Architecture_Review.md)
7. [08.08 Providing Feedback](./08.08_Providing_Feedback.md)
8. [08.11 Review Best Practices](./08.11_Review_Best_Practices.md)
9. [08.12 Common Review Issues](./08.12_Common_Review_Issues.md)
10. [08.13 Review Automation](./08.13_Review_Automation.md)

## What To Review First / Nên review gì trước

- correctness and regression risk
- security-sensitive logic
- data consistency and transaction safety
- performance hot paths
- architecture and maintainability
- tests and observability

## Best Files For Backend and Full-Stack Review / File tốt nhất cho review backend và full-stack

- [08.02 Code Review Checklist](./08.02_Code_Review_Checklist.md)
- [08.05 Security Review](./08.05_Security_Review.md)
- [08.06 Performance Review](./08.06_Performance_Review.md)
- [08.07 Architecture Review](./08.07_Architecture_Review.md)
- [08.11 Review Best Practices](./08.11_Review_Best_Practices.md)
- [08.12 Common Review Issues](./08.12_Common_Review_Issues.md)
- [08.13 Review Automation](./08.13_Review_Automation.md)

## Best Mapping To Modern Stack / Ánh xạ tốt nhất sang stack hiện đại

### Next.js

- client/server boundary mistakes
- cache invalidation and routing issues
- auth and data-fetching errors

### NestJS

- module boundaries
- DTO validation and guard coverage
- exception and interceptor consistency

### Express.js

- middleware ordering
- error handling and request validation
- security headers and rate-limiting coverage

### PostgreSQL

- dangerous migrations
- missing indexes or constraints
- risky query patterns and transaction bugs

## Recommended Next Groups / Nhóm nên đọc tiếp theo

- [Group 03: Algorithm Analysis](../Group-03-Algorithm-Analysis/README.md)
- [Group 07: Unit Test, Debug](../Group-07-Unit-Test-Debug/README.md)
- [Group 17: DevOps & Automation](../Group-17-DevOps-Automation/README.md)
