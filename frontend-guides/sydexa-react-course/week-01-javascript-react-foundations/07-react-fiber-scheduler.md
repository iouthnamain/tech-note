# React Fiber và Scheduler

[<- Quay lại Tuần 1 - JavaScript Nâng Cao + Nền Tảng React](./README.md)

## Vì sao bài này quan trọng

Fiber là cấu trúc dữ liệu và execution model cho phép React chia render work thành các đơn vị nhỏ. Scheduler quyết định work nào nên chạy trước dựa trên priority và khả năng interrupt.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- fiber node
- work units
- priority

## Giải thích chi tiết

Fiber là cấu trúc dữ liệu và execution model cho phép React chia render work thành các đơn vị nhỏ. Scheduler quyết định work nào nên chạy trước dựa trên priority và khả năng interrupt.

Fiber giúp React thoát khỏi mô hình render all-or-nothing cứng nhắc.

Scheduler không thay thế browser event loop, mà phối hợp với nó.

Nhiều tối ưu mới của React tồn tại nhờ Fiber.

## Sơ đồ

```mermaid
flowchart TD
  A[Component tree] --> B[Fiber nodes]
  B --> C[Work units]
  C --> D[Scheduler priority]
  D --> E[Render / pause / resume / discard]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “React Fiber và Scheduler”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “React Fiber và Scheduler” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “React Fiber và Scheduler” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- https://react.dev/learn
- https://react.dev/reference/react
