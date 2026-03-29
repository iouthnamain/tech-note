# Bất Đồng Bộ, Event Loop và Microtasks

[<- Quay lại Tuần 1 - JavaScript Nâng Cao + Nền Tảng React](./README.md)

## Vì sao bài này quan trọng

Event loop là mô hình concurrency của JavaScript trên web. Khi hiểu stack, queue, microtask và macrotask, bạn mới hiểu được vì sao Promise chạy trước `setTimeout`, vì sao UI bị block, và vì sao effect cleanup có thể gây bug khó đọc.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- Call stack
- task queue
- microtask queue

## Giải thích chi tiết

Event loop là mô hình concurrency của JavaScript trên web. Khi hiểu stack, queue, microtask và macrotask, bạn mới hiểu được vì sao Promise chạy trước `setTimeout`, vì sao UI bị block, và vì sao effect cleanup có thể gây bug khó đọc.

Microtasks chạy sau khi stack rỗng nhưng trước khi browser quay lại xử lý task tiếp theo.

Promise callbacks, mutation observers và một số cơ chế framework dựa mạnh vào microtasks.

Một tác vụ nặng trong main thread sẽ chặn cả input, animation và paint.

## Sơ đồ

```mermaid
flowchart TD
  A[Call Stack] --> B{Stack empty?}
  B -->|No| A
  B -->|Yes| C[Drain Microtasks]
  C --> D[Run Next Task]
  D --> E[Browser render opportunity]
  E --> B
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Bất Đồng Bộ, Event Loop và Microtasks”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Bất Đồng Bộ, Event Loop và Microtasks” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Bất Đồng Bộ, Event Loop và Microtasks” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- https://react.dev/learn
- https://react.dev/reference/react
