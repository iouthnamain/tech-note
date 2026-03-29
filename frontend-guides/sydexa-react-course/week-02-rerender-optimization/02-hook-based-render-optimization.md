# Kỹ Thuật Tối Ưu Rendering Bằng Hook

[<- Quay lại Tuần 2 - Tối Ưu Re-render](./README.md)

## Vì sao bài này quan trọng

Hooks có thể giúp tối ưu nếu bạn đặt state gần nơi dùng, tách work nặng khỏi đường đi khẩn cấp, và tránh effect hoặc memo không cần thiết.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Re-render.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- state colocation
- derived state
- deferred updates

## Giải thích chi tiết

Hooks có thể giúp tối ưu nếu bạn đặt state gần nơi dùng, tách work nặng khỏi đường đi khẩn cấp, và tránh effect hoặc memo không cần thiết.

`useDeferredValue` và `startTransition` hợp với update không khẩn cấp.

Đặt state sai chỗ có thể kéo cả subtree rerender.

Đừng biến optimization thành thêm complexity vô ích.

## Sơ đồ

```mermaid
flowchart LR
  A[Urgent input] --> B[startTransition?]
  B --> C[Non-urgent list update]
  D[Local state] --> E[Smaller rerender scope]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Kỹ Thuật Tối Ưu Rendering Bằng Hook”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Kỹ Thuật Tối Ưu Rendering Bằng Hook” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Kỹ Thuật Tối Ưu Rendering Bằng Hook” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/useTransition
