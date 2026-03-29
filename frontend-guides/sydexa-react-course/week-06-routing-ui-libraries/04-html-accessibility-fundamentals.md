# Nền Tảng HTML Accessibility

[<- Quay lại Tuần 6 - Routing + UI Libraries](./README.md)

## Vì sao bài này quan trọng

Accessibility không phải lớp phủ sau cùng. Nếu HTML semantics, keyboard flow và ARIA fundamentals sai từ đầu, mọi UI polish sau đó đều có thể làm tăng nợ kỹ thuật.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Routing + UI Libraries.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- semantics
- focus management
- screen reader mental model

## Giải thích chi tiết

Accessibility không phải lớp phủ sau cùng. Nếu HTML semantics, keyboard flow và ARIA fundamentals sai từ đầu, mọi UI polish sau đó đều có thể làm tăng nợ kỹ thuật.

Dùng element đúng semantics thường hiệu quả hơn thêm ARIA thủ công.

Focus order, visible labels và keyboard operability là nền tảng.

Accessibility tốt thường cũng làm UX tốt hơn cho tất cả người dùng.

## Sơ đồ

```mermaid
flowchart LR
  A[Semantic HTML] --> B[Keyboard support]
  A --> C[Screen reader clarity]
  B --> D[Accessible UI]
  C --> D
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Nền Tảng HTML Accessibility”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Nền Tảng HTML Accessibility” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Nền Tảng HTML Accessibility” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://reactrouter.com/home
- https://mui.com/material-ui/getting-started/
- https://www.radix-ui.com/primitives
- https://ui.shadcn.com/docs
- https://tailwindcss.com/docs
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
