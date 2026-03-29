# Vì Sao Học Next.js Sau React

[<- Quay lại Tuần 9 - Next.js Foundations](./README.md)

## Vì sao bài này quan trọng

React giúp xây UI rất tốt, nhưng production app cần thêm routing, SEO, caching, auth, deployment và data boundaries. Next.js đóng vai trò framework để gom các quyết định kiến trúc đó vào một hệ thống nhất quán.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- framework mental model
- production systems
- full-stack boundaries

## Giải thích chi tiết

React giúp xây UI rất tốt, nhưng production app cần thêm routing, SEO, caching, auth, deployment và data boundaries. Next.js đóng vai trò framework để gom các quyết định kiến trúc đó vào một hệ thống nhất quán.

Next.js không chỉ là React có thêm routing.

App Router đưa rendering, data fetching và layouts vào cùng một mental model.

Học Next.js là học cách tổ chức hệ thống, không chỉ học thêm API.

## Sơ đồ

```mermaid
flowchart LR
  A[React library] --> B[UI composition]
  C[Next.js framework] --> D[Routing]
  C --> E[Server rendering]
  C --> F[Metadata and SEO]
  C --> G[Data and deployment]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Vì Sao Học Next.js Sau React”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Vì Sao Học Next.js Sau React” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Vì Sao Học Next.js Sau React” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/project-structure
- https://react.dev/reference/rsc/server-components
