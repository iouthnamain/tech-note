# Static, Dynamic, ISR và Partial Pre-rendering

[<- Quay lại Tuần 10 - Data Fetching và Rendering trong Next.js](./README.md)

## Vì sao bài này quan trọng

Rendering strategy là quyết định kiến trúc trọng yếu. Một route public pricing page, một blog post và một private dashboard không nên có cùng cách render nếu bạn muốn tối ưu đúng.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Data Fetching và Rendering trong Next.js.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- render strategy
- freshness SLA
- delivery cost

## Giải thích chi tiết

Rendering strategy là quyết định kiến trúc trọng yếu. Một route public pricing page, một blog post và một private dashboard không nên có cùng cách render nếu bạn muốn tối ưu đúng.

Static mạnh cho nội dung ổn định.

Dynamic cần cho request-time, session-aware content.

ISR và partial pre-rendering là điểm cân bằng giữa cost và freshness.

## Sơ đồ

```mermaid
flowchart TD
  A[Route] --> B{Freshness and request context?}
  B -->|Low| C[Static]
  B -->|Medium| D[ISR]
  B -->|High or session-bound| E[Dynamic]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Static, Dynamic, ISR và Partial Pre-rendering”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Static, Dynamic, ISR và Partial Pre-rendering” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Static, Dynamic, ISR và Partial Pre-rendering” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app/getting-started/caching-and-revalidating
- https://nextjs.org/docs/app/building-your-application/data-fetching
- https://react.dev/reference/react/Suspense
