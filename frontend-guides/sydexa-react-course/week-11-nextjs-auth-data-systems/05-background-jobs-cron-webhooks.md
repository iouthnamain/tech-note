# Background Jobs, Cron, Webhooks và Async Workflows

[<- Quay lại Tuần 11 - Auth, Database và System Flows](./README.md)

## Vì sao bài này quan trọng

Không phải mọi việc đều nên hoàn thành trong request/response. Email, billing sync, report generation, webhook handling và scheduled cleanup là những bài toán buộc bạn nghĩ như system designer.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Auth, Database và System Flows.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- idempotency
- retry
- event-driven flows

## Giải thích chi tiết

Không phải mọi việc đều nên hoàn thành trong request/response. Email, billing sync, report generation, webhook handling và scheduled cleanup là những bài toán buộc bạn nghĩ như system designer.

Async workflow phải có retry strategy và idempotency.

Webhook luôn cần signature verification nếu provider hỗ trợ.

Cron nên được xem như scheduler cho domain jobs, không phải nơi nhét logic ngẫu nhiên.

## Sơ đồ

```mermaid
flowchart TD
  A[User action] --> B[DB write]
  B --> C[Enqueue job]
  C --> D[Worker]
  D --> E[External service]
  F[Webhook] --> G[Route Handler]
  G --> H[Verify + process]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Background Jobs, Cron, Webhooks và Async Workflows”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Background Jobs, Cron, Webhooks và Async Workflows” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Background Jobs, Cron, Webhooks và Async Workflows” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://authjs.dev/getting-started
- https://www.prisma.io/docs/guides/nextjs
- https://zod.dev/
- https://vercel.com/docs/storage
