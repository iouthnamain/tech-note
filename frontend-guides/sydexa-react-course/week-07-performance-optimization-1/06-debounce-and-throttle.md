# Debounce và Throttle

[<- Quay lại Tuần 7 - Tối Ưu Hiệu Năng I](./README.md)

## Vì sao bài này quan trọng

Debounce và throttle đều giảm tần suất công việc, nhưng phục vụ mục tiêu khác nhau. Debounce hợp cho search input chờ người dùng dừng gõ; throttle hợp cho scroll, resize hoặc event liên tục cần cập nhật theo nhịp.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Hiệu Năng I.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- high-frequency events
- input responsiveness
- timing control

## Giải thích chi tiết

Debounce và throttle đều giảm tần suất công việc, nhưng phục vụ mục tiêu khác nhau. Debounce hợp cho search input chờ người dùng dừng gõ; throttle hợp cho scroll, resize hoặc event liên tục cần cập nhật theo nhịp.

Chọn sai kỹ thuật sẽ làm UX khó chịu.

Debounce có thể làm app cảm giác chậm nếu delay quá dài.

Throttle nên đi cùng frame budget và loại event cụ thể.

## Sơ đồ

```mermaid
flowchart TD
  A[Rapid events] --> B{Debounce or throttle?}
  B -->|Stop typing first| C[Debounce]
  B -->|Run at intervals| D[Throttle]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Debounce và Throttle”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Debounce và Throttle” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Debounce và Throttle” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/Performance
- https://react.dev/reference/react/lazy
- https://vite.dev/guide/
- https://webpack.js.org/concepts/
