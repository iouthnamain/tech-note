# Tuần 2 - Tối Ưu Re-render

[<- Quay lại tổng quan khóa học](../sydexa-react-courses.md)

## Mục tiêu tuần

- Biết cách đo rerender thay vì đoán.
- Hiểu identity, props stability và component boundaries.
- Tối ưu bằng dữ liệu profiling thực thay vì mẹo truyền miệng.

## Thứ tự học

1. [01 - Theo Dõi và Chẩn Đoán Re-render](./01-rerender-detection.md)
2. [02 - Kỹ Thuật Tối Ưu Rendering Bằng Hook](./02-hook-based-render-optimization.md)
3. [03 - Công Cụ Đo Hiệu Năng: React Profiler và Lighthouse](./03-profiling-tools.md)
4. [04 - Cách Dùng `memo` và HOC Một Cách Có Chủ Đích](./04-memo-and-hoc-patterns.md)
5. [05 - Custom Hooks Cơ Bản và Nâng Cao](./05-custom-hooks-architecture.md)
6. [06 - Thực Hành: Tối Ưu Bảng 10.000 Dòng](./06-practice-10000-row-table.md)

## Kết quả đầu ra

- Dùng được React DevTools Profiler để lần ra bottleneck.
- Áp dụng đúng `memo`, state colocation và custom hooks.
- Tối ưu được một view danh sách lớn mà không phá maintainability.

## Nguồn chính

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/useTransition
