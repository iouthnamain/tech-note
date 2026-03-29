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

1. Tích hợp nội dung của bài “Metadata, SEO, Sitemap, Robots và Open Graph” vào một vertical slice nhỏ trong một Next.js dashboard shell cho SaaS product.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “Metadata, SEO, Sitemap, Robots và Open Graph”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “Metadata, SEO, Sitemap, Robots và Open Graph” nên được đặt ở boundary này thay vì boundary khác trong một Next.js dashboard shell cho SaaS product?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “Metadata, SEO, Sitemap, Robots và Open Graph” đang mang lại lợi ích thật.

## Gợi ý

- Nên chọn một flow nhỏ nhưng hoàn chỉnh thay vì cố gắn công cụ vào toàn hệ thống.
- Failure mode tốt thường gắn với data inconsistency, performance cost hoặc boundary đặt sai chỗ.
- Measurement có thể là profiler, network timeline, error logs, Lighthouse hoặc checklist hành vi.

## Rubric tự đánh giá

- Có integration task rõ ràng chứ không chỉ mô tả lý thuyết.
- Failure modes và detection strategy thực tế, không hời hợt.
- Decision note nêu rõ trade-off và lý do chọn placement hiện tại.
- Measurement hoặc evidence đủ để kiểm chứng giải pháp.

## Review checklist

- Bạn có thể giải thích được bài “Metadata, SEO, Sitemap, Robots và Open Graph” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/project-structure
- https://react.dev/reference/rsc/server-components
