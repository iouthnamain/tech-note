# Công Cụ Đo Hiệu Năng: React Profiler và Lighthouse

[<- Quay lại Tuần 2 - Tối Ưu Re-render](./README.md)

## Vì sao bài này quan trọng

Profiler cho bạn biết component nào rerender, commit nào đắt, và interaction nào chậm. Lighthouse cho góc nhìn rộng hơn về performance web như render blocking, payload và main thread work.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Re-render.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- profiling session
- commit time
- interaction tracing

## Giải thích chi tiết

Profiler cho bạn biết component nào rerender, commit nào đắt, và interaction nào chậm. Lighthouse cho góc nhìn rộng hơn về performance web như render blocking, payload và main thread work.

Dùng Profiler để xác định vấn đề trong React tree.

Dùng Lighthouse để nhìn hệ thống phân phối tài nguyên và rendering tổng thể.

Kết hợp cả hai giúp tránh tối ưu cục bộ mà bỏ lỡ vấn đề lớn hơn.

## Sơ đồ

```mermaid
flowchart LR
  A[React Profiler] --> B[Component cost]
  C[Lighthouse] --> D[Page-level signals]
  B --> E[Optimization decision]
  D --> E
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Công Cụ Đo Hiệu Năng: React Profiler và Lighthouse”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Công Cụ Đo Hiệu Năng: React Profiler và Lighthouse” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Công Cụ Đo Hiệu Năng: React Profiler và Lighthouse” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/useTransition
