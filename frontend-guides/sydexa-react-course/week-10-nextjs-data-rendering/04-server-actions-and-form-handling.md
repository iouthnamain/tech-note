# Server Actions Cho Mutation và Form Handling

[<- Quay lại Tuần 10 - Data Fetching và Rendering trong Next.js](./README.md)

## Vì sao bài này quan trọng

Server Actions giúp bạn đặt mutation gần UI hơn nhưng vẫn chạy ở server boundary. Điều này đặc biệt mạnh cho form-heavy workflows miễn là bạn vẫn giữ validation, error handling và invalidation rõ ràng.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Data Fetching và Rendering trong Next.js.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- server mutation
- form action
- cache invalidation

## Giải thích chi tiết

Server Actions giúp bạn đặt mutation gần UI hơn nhưng vẫn chạy ở server boundary. Điều này đặc biệt mạnh cho form-heavy workflows miễn là bạn vẫn giữ validation, error handling và invalidation rõ ràng.

Server Actions không thay thế hoàn toàn Route Handlers hay API routes.

Validation server-side là bắt buộc.

Mỗi mutation nên chỉ rõ đường đi từ form đến cache refresh.

## Sơ đồ

```mermaid
flowchart TD
  A[Form submit] --> B[Server Action]
  B --> C[Validate]
  C --> D[Write data]
  D --> E[Revalidate]
  E --> F[Updated UI]
```

## Code ví dụ

```tsx
async function createInvoice(formData: FormData) {
  "use server";
  const amount = formData.get("amount");
  // validate, write, revalidate
}

export default function Page() {
  return <form action={createInvoice}>{/* fields */}</form>;
}
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Server Actions Cho Mutation và Form Handling”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Server Actions Cho Mutation và Form Handling” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Server Actions Cho Mutation và Form Handling” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app/getting-started/caching-and-revalidating
- https://nextjs.org/docs/app/building-your-application/data-fetching
- https://react.dev/reference/react/Suspense
