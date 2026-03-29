# Project Tuần 4 - Workspace Data Layer Playground

[<- Quay lại Tuần 4 - Quản Lý Store + Best Practice Tích Hợp API](./README.md)

## Vì sao project này quan trọng

Project này buộc bạn thiết kế data layer thực chiến: global store, transport layer và server-state cache phải có ranh giới rõ ràng.

## Scenario / bối cảnh sản phẩm

Bạn cần dựng một workspace dashboard có danh sách entity, filter, create/update action và cache behavior đủ rõ để team khác tiếp tục mở rộng.

## Required deliverables

- Một API layer hoặc client abstraction rõ ràng.
- Một module global state cho UI state thật sự cần chia sẻ.
- Một flow React Query đầy đủ cho fetching, mutation và invalidation.
- Một document mô tả query keys, cache policy và state ownership.

## Functional requirements

- Phải dùng ít nhất một query list và một mutation write flow.
- Phải tách UI state với server state.
- Phải chỉ ra ít nhất 3 query keys và lý do đặt chúng như vậy.

## System design tasks

- Vẽ sơ đồ từ UI -> API layer -> React Query cache -> backend.
- Xác định state nào ở local, state nào ở Zustand/Redux, state nào ở React Query.
- Viết invalidation map cho từng mutation chính.

## Constraints

- Không dùng global store làm nơi chứa toàn bộ dữ liệu server.
- Không để mutation xong mà UI không nhất quán.

## Suggested milestones

- Milestone 1: chốt data model và query keys.
- Milestone 2: dựng API layer + list query.
- Milestone 3: thêm mutation + invalidation.
- Milestone 4: viết design note.

## Hints

- Bắt đầu bằng một entity duy nhất như projects hoặc invoices.
- Query key tốt thường phản ánh workspace + entity + filter.
- Nếu một state chỉ dùng trong một component, đừng kéo nó lên global store.

## Review rubric

- Ranh giới giữa local state, global UI state và server state rõ ràng.
- Mutation flows cập nhật UI nhất quán.
- Cache policy được mô tả rõ chứ không ngầm định.

## Stretch goals

- Thêm optimistic update và rollback có kiểm soát.
- Thêm prefetch cho một route hoặc tab mà người dùng thường vào tiếp theo.

## Sources / references

- https://redux.js.org/introduction/getting-started
- https://zustand.docs.pmnd.rs/getting-started/introduction
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://axios-http.com/docs/intro
