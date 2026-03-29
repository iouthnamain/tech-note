# Navigation, Loading, Error và Not Found

[<- Quay lại Tuần 9 - Next.js Foundations](./README.md)

## Vì sao bài này quan trọng

Next.js App Router chuẩn hóa loading, error và not-found ở cấp route segment. Điều này giúp bạn thiết kế route UX như một phần của architecture thay vì vá lỗi ở component ngẫu nhiên.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- file conventions
- route UX
- recovery flows

## Giải thích chi tiết

Next.js App Router chuẩn hóa loading, error và not-found ở cấp route segment. Điều này giúp bạn thiết kế route UX như một phần của architecture thay vì vá lỗi ở component ngẫu nhiên.

`Link` nên là mặc định cho điều hướng.

`loading.tsx`, `error.tsx`, `not-found.tsx` làm route states rõ ràng.

Recovery UX tốt là một phần của production quality.

## Sơ đồ

```mermaid
flowchart TD
  A[Navigate] --> B[loading.tsx]
  B --> C{Result}
  C -->|Success| D[Page content]
  C -->|Error| E[error.tsx]
  C -->|Missing| F[not-found.tsx]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Navigation, Loading, Error và Not Found”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Navigation, Loading, Error và Not Found” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Navigation, Loading, Error và Not Found” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/project-structure
- https://react.dev/reference/rsc/server-components
