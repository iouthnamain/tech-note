# Custom Hooks Cơ Bản và Nâng Cao

[<- Quay lại Tuần 2 - Tối Ưu Re-render](./README.md)

## Vì sao bài này quan trọng

Custom hooks giúp tách logic trạng thái và side effects khỏi UI tree. Một custom hook tốt làm rõ intent, giảm duplication và tạo boundary kiểm thử tốt hơn.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Re-render.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- logic reuse
- side-effect isolation
- abstraction quality

## Giải thích chi tiết

Custom hooks giúp tách logic trạng thái và side effects khỏi UI tree. Một custom hook tốt làm rõ intent, giảm duplication và tạo boundary kiểm thử tốt hơn.

Hook nên mô tả capability chứ không chỉ bọc một effect.

Hook quá tổng quát thường khó hiểu và khó thay đổi.

Custom hooks tốt hỗ trợ performance nhờ tách concern và state scope hợp lý.

## Sơ đồ

```mermaid
flowchart LR
  A[UI Component] --> B[Custom Hook]
  B --> C[State]
  B --> D[Effects]
  B --> E[Shared behavior]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Custom Hooks Cơ Bản và Nâng Cao”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Custom Hooks Cơ Bản và Nâng Cao” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Custom Hooks Cơ Bản và Nâng Cao” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/useTransition
