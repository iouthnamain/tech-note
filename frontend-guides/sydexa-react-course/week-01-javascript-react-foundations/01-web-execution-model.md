# Nền Tảng Cách Web Vận Hành

[<- Quay lại Tuần 1 - JavaScript Nâng Cao + Nền Tảng React](./README.md)

## Vì sao bài này quan trọng

Browser không chạy React trước, nó chạy tài nguyên web trước. Hiểu đường đi từ request đến DOM giúp bạn lý giải vì sao hydration, bundle size và critical rendering path lại quan trọng.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- Browser architecture
- request-response
- HTML/CSS/JS pipeline

## Giải thích chi tiết

Browser không chạy React trước, nó chạy tài nguyên web trước. Hiểu đường đi từ request đến DOM giúp bạn lý giải vì sao hydration, bundle size và critical rendering path lại quan trọng.

Event loop, parsing, rendering và network đều là một phần của UX.

Nếu bạn không hiểu browser pipeline, bạn rất dễ tối ưu sai chỗ trong frontend.

React chỉ là một lớp trên cùng của hệ thống web platform.

## Sơ đồ

```mermaid
flowchart LR
  A[HTTP Request] --> B[HTML Response]
  B --> C[Parse HTML]
  C --> D[Fetch CSS and JS]
  D --> E[Build DOM and CSSOM]
  E --> F[Render Tree]
  F --> G[Paint and Interact]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Nền Tảng Cách Web Vận Hành”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Nền Tảng Cách Web Vận Hành” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Nền Tảng Cách Web Vận Hành” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- https://react.dev/learn
- https://react.dev/reference/react
