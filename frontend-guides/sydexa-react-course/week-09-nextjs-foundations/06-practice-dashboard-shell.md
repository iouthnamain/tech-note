# Thực Hành: Dashboard Shell Với Nested Layouts

[<- Quay lại Tuần 9 - Next.js Foundations](./README.md)

## Vì sao bài này quan trọng

Dashboard shell là bài tập chuẩn để thực hành App Router vì nó đòi hỏi layout sâu, navigation, route states và khả năng mở rộng cho auth/data ở tuần sau.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- layout architecture
- route groups
- future-proof shell

## Giải thích chi tiết

Dashboard shell là bài tập chuẩn để thực hành App Router vì nó đòi hỏi layout sâu, navigation, route states và khả năng mở rộng cho auth/data ở tuần sau.

Nên tách marketing area và authenticated area từ đầu.

Shell tốt sẽ làm các tuần data/auth dễ nối vào hơn.

Cần xác định chỗ nào là server shell, chỗ nào là client island.

## Sơ đồ

```mermaid
flowchart TD
  A[Root layout] --> B[(marketing)]
  A --> C[(app)/dashboard layout]
  C --> D[Analytics]
  C --> E[Billing]
  C --> F[Settings]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Thực Hành: Dashboard Shell Với Nested Layouts”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Thực Hành: Dashboard Shell Với Nested Layouts” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Thực Hành: Dashboard Shell Với Nested Layouts” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/project-structure
- https://react.dev/reference/rsc/server-components
