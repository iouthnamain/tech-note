# Route Handlers và Ranh Giới API

[<- Quay lại Tuần 10 - Data Fetching và Rendering trong Next.js](./README.md)

## Vì sao bài này quan trọng

Route Handlers nên được dùng có chiến lược. Chúng rất tốt cho webhook, public API, upload endpoint và backend-for-frontend cases, nhưng không nên là lớp HTTP vòng vo cho mọi server-side read.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Data Fetching và Rendering trong Next.js.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- backend for frontend
- webhook endpoints
- internal vs external APIs

## Giải thích chi tiết

Server Components thường nên gọi data source trực tiếp thay vì fetch nội bộ qua localhost.

Route Handlers tạo boundary rõ cho external systems.

Boundary đúng làm app ít network hop và dễ reason hơn.

## Sơ đồ

```mermaid
flowchart LR
  A[Server Component] --> B[Direct DB/service call]
  C[External system] --> D[Route Handler]
  D --> B
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Route Handlers và Ranh Giới API”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “Route Handlers và Ranh Giới API” vào một vertical slice nhỏ trong một operations dashboard dùng App Router cho data reads và writes.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “Route Handlers và Ranh Giới API”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “Route Handlers và Ranh Giới API” nên được đặt ở boundary này thay vì boundary khác trong một operations dashboard dùng App Router cho data reads và writes?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “Route Handlers và Ranh Giới API” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “Route Handlers và Ranh Giới API” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app/getting-started/caching-and-revalidating
- https://nextjs.org/docs/app/building-your-application/data-fetching
- https://react.dev/reference/react/Suspense
