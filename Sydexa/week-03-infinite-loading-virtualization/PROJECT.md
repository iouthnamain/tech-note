# Project Tuần 3 - Virtualized Activity Feed

[<- Quay lại Tuần 3 - Infinite Loading và Virtualization](./README.md)

## Vì sao project này quan trọng

Project này giúp bạn áp dụng virtualization, infinite loading và browser observer APIs vào một luồng dữ liệu dài như ngoài đời thực.

## Scenario / bối cảnh sản phẩm

Bạn đang xây activity feed hoặc product catalog có dữ liệu rất dài, người dùng scroll liên tục và cần UX mượt trên máy trung bình.

## Required deliverables

- Một list hoặc feed có dữ liệu đủ lớn để thấy khác biệt giữa render thường và virtualized render.
- Một flow load thêm dữ liệu khi scroll bằng sentinel hoặc trigger tương đương.
- Một note so sánh `react-window`, TanStack Virtual hoặc cách bạn chọn giải pháp.
- Một sơ đồ data + scroll flow.

## Functional requirements

- Phải có virtualization.
- Phải có loading state cho giai đoạn load thêm.
- Phải mô tả trade-off giữa UX và complexity.

## System design tasks

- Vẽ scroll container, sentinel, fetch trigger và render window.
- Xác định state cho pages, visible window, loading và error.
- Viết cache strategy cơ bản nếu dữ liệu được tải theo page.

## Constraints

- Không render toàn bộ dữ liệu cùng lúc.
- Scroll phải không giật và không reset vị trí sai cách.

## Suggested milestones

- Milestone 1: list thường + baseline.
- Milestone 2: thêm virtualization.
- Milestone 3: thêm infinite loading.
- Milestone 4: viết trade-off report.

## Hints

- Bắt đầu với fixed-height items trước khi thử dynamic height.
- Luôn tách phần fetch logic khỏi phần render window.
- Dùng một sentinel node đơn giản cho load thêm trước khi tối ưu sâu.

## Review rubric

- List chạy mượt ở dữ liệu lớn.
- Flow load thêm ổn định và không tạo duplicate fetch.
- Learner giải thích rõ khi nào dùng virtualization, khi nào dùng infinite loading, khi nào cần cả hai.

## Stretch goals

- Thêm filter/search mà không phá scroll UX.
- Thử dynamic row height và ghi lại issue phát sinh.

## Sources / references

- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- https://github.com/bvaughn/react-window
- https://tanstack.com/virtual/latest/docs/introduction
