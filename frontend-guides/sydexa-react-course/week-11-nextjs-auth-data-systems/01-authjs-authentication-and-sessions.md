# Authentication và Sessions Với Auth.js

[<- Quay lại Tuần 11 - Auth, Database và System Flows](./README.md)

## Vì sao bài này quan trọng

Auth là cửa vào của toàn hệ thống. Nếu thiết kế session, guards và role model mơ hồ, mọi phần data access về sau sẽ chồng chéo và dễ tạo lỗ hổng.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Auth, Database và System Flows.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- identity model
- session storage
- route protection

## Giải thích chi tiết

Auth là cửa vào của toàn hệ thống. Nếu thiết kế session, guards và role model mơ hồ, mọi phần data access về sau sẽ chồng chéo và dễ tạo lỗ hổng.

Cần phân biệt authentication và authorization.

Route protection phải sống ở server boundary đáng tin cậy.

Session strategy nên phản ánh loại sản phẩm và mức độ mở rộng mong muốn.

## Sơ đồ

```mermaid
sequenceDiagram
  participant User
  participant App
  participant Auth
  participant DB
  User->>App: Sign in
  App->>Auth: Verify identity
  Auth->>DB: Read or create user
  Auth-->>App: Session
  App-->>User: Protected access
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Authentication và Sessions Với Auth.js”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Authentication và Sessions Với Auth.js” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Authentication và Sessions Với Auth.js” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://authjs.dev/getting-started
- https://www.prisma.io/docs/guides/nextjs
- https://zod.dev/
- https://vercel.com/docs/storage
