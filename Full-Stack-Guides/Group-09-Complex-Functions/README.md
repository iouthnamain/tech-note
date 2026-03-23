# Group 09: Complex Functions / NHÓM 9: Chức năng phức tạp

## Overview / Tổng quan

**English**: This group connects simple CRUD systems to real production backends. It covers jobs, scheduling, real-time updates, workflows, state machines, multi-tenancy, synchronization, and integration patterns.

**Vietnamese**: Nhóm này nối từ hệ CRUD đơn giản sang backend production thực tế. Nhóm bao gồm jobs, scheduling, real-time updates, workflow, state machine, multi-tenancy, synchronization và integration patterns.

## Best Reading Order / Thứ tự đọc tốt nhất

1. [09.05 Scheduled Tasks](./09.05_Scheduled_Tasks.md)
2. [09.06 Background Jobs](./09.06_Background_Jobs.md)
3. [09.07 Real-time Updates](./09.07_Real_time_Updates.md)
4. [09.08 Event-Driven Architecture](./09.08_Event_Driven_Architecture.md)
5. [09.09 Workflow Management](./09.09_Workflow_Management.md)
6. [09.10 State Machines](./09.10_State_Machines.md)
7. [09.13 Multi-tenancy](./09.13_Multi_tenancy.md)
8. [09.14 Data Synchronization](./09.14_Data_Synchronization.md)
9. [09.16 System Integration](./09.16_System_Integration.md)

## Best Files For Server-Side Complexity / File tốt nhất cho độ phức tạp phía server

- [09.06 Background Jobs](./09.06_Background_Jobs.md)
- [09.07 Real-time Updates](./09.07_Real_time_Updates.md)
- [09.08 Event-Driven Architecture](./09.08_Event_Driven_Architecture.md)
- [09.13 Multi-tenancy](./09.13_Multi_tenancy.md)
- [09.16 System Integration](./09.16_System_Integration.md)

## Best Mapping To Modern Stack / Ánh xạ tốt nhất sang stack hiện đại

### Next.js

- real-time UI updates
- cache invalidation after mutations
- tenant-aware routing

### NestJS

- background workers
- event-driven modules
- WebSocket gateways
- complex authorization boundaries

### Express.js

- queue consumers
- integration services
- lightweight real-time APIs

### PostgreSQL

- job persistence
- outbox/event patterns
- tenant data isolation

## Related Guides / Hướng dẫn liên quan

- [Group 02: Basic Functions](../Group-02-Basic-Functions/README.md)
- [Group 14: Advanced Technologies](../Group-14-Advanced-Tech/README.md)
- [Modern Full-Stack Research Roadmap 2026](../Modern_Full_Stack_Research_Roadmap_2026.md)
