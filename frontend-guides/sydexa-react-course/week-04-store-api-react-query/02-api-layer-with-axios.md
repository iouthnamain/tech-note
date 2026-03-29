# Thiết Lập Tầng API với Axios

[<- Quay lại Tuần 4 - Quản Lý Store + Best Practice Tích Hợp API](./README.md)

## Vì sao bài này quan trọng

Axios không phải là nơi đặt business logic của app, nhưng là nơi tốt để chuẩn hóa base URL, auth headers, timeout, error mapping và response transforms.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Quản Lý Store + Best Practice Tích Hợp API.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- HTTP client
- interceptors
- error normalization

## Giải thích chi tiết

Axios không phải là nơi đặt business logic của app, nhưng là nơi tốt để chuẩn hóa base URL, auth headers, timeout, error mapping và response transforms.

Tầng API nên mỏng và nhất quán.

Interceptors hữu ích nhưng dễ biến thành nơi “ảo thuật” khó debug nếu lạm dụng.

Hãy chuẩn hóa lỗi để UI không phải hiểu quá nhiều shape backend khác nhau.

## Sơ đồ

```mermaid
flowchart LR
  A[UI or Query layer] --> B[API client]
  B --> C[Interceptors]
  C --> D[Backend service]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Thiết Lập Tầng API với Axios”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Thiết Lập Tầng API với Axios” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Thiết Lập Tầng API với Axios” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://redux.js.org/introduction/getting-started
- https://zustand.docs.pmnd.rs/getting-started/introduction
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://axios-http.com/docs/intro
