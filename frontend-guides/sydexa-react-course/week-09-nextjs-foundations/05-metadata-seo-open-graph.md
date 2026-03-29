# Metadata, SEO, Sitemap, Robots và Open Graph

[<- Quay lại Tuần 9 - Next.js Foundations](./README.md)

## Vì sao bài này quan trọng

Metadata trong Next.js không chỉ phục vụ blog hay marketing. SaaS landing pages, docs, pricing, changelog và public profile đều phụ thuộc vào metadata đúng để index và share tốt.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- metadata api
- crawler model
- social sharing

## Giải thích chi tiết

Metadata trong Next.js không chỉ phục vụ blog hay marketing. SaaS landing pages, docs, pricing, changelog và public profile đều phụ thuộc vào metadata đúng để index và share tốt.

Static và dynamic metadata đều cần được thiết kế theo route type.

Sitemap và robots là một phần của production system.

Open Graph giúp social preview rõ ràng và nhất quán.

## Sơ đồ

```mermaid
flowchart LR
  A[Route metadata] --> B[Head output]
  B --> C[Search engine crawler]
  B --> D[Social crawler]
  B --> E[User preview]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Metadata, SEO, Sitemap, Robots và Open Graph”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Metadata, SEO, Sitemap, Robots và Open Graph” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Metadata, SEO, Sitemap, Robots và Open Graph” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/project-structure
- https://react.dev/reference/rsc/server-components
