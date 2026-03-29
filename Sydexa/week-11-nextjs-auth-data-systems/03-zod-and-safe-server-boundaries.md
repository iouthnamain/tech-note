# Validation và Safe Server Boundaries Với Zod

[<- Quay lại Tuần 11 - Auth, Database và System Flows](./README.md)

## Vì sao bài này quan trọng

TypeScript không chạy ở runtime, nên input từ form, webhook, query string hoặc external service luôn cần validation thật. Zod giúp bạn biểu diễn input contract rõ ràng và tái sử dụng được.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Auth, Database và System Flows.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- runtime validation
- boundary contracts
- trusted vs untrusted input

## Giải thích chi tiết

Parse input ở boundary gần nhất có thể.

Validation message nên phục vụ cả developer lẫn UX.

Schema còn giúp documentation và testing tốt hơn.

## Sơ đồ

```mermaid
flowchart TD
  A[Incoming input] --> B[Zod schema]
  B -->|Valid| C[Business logic]
  B -->|Invalid| D[Structured errors]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Validation và Safe Server Boundaries Với Zod”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “Validation và Safe Server Boundaries Với Zod” vào một vertical slice nhỏ trong một SaaS workspace có auth, database và async workflows.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “Validation và Safe Server Boundaries Với Zod”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “Validation và Safe Server Boundaries Với Zod” nên được đặt ở boundary này thay vì boundary khác trong một SaaS workspace có auth, database và async workflows?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “Validation và Safe Server Boundaries Với Zod” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “Validation và Safe Server Boundaries Với Zod” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://authjs.dev/getting-started
- https://www.prisma.io/docs/guides/nextjs
- https://zod.dev/
- https://vercel.com/docs/storage
