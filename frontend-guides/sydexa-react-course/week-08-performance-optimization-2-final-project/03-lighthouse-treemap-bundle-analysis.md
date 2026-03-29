# Lighthouse Treemap và Phân Tích Bundle

[<- Quay lại Tuần 8 - Tối Ưu Hiệu Năng II + Dự Án Cuối](./README.md)

## Vì sao bài này quan trọng

Treemap cho bạn nhìn thấy JavaScript nặng đến từ đâu. Đây là bước biến performance từ cảm nhận sang bằng chứng cụ thể để ra quyết định loại thư viện, tách chunk hay thay đổi chiến lược render.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Hiệu Năng II + Dự Án Cuối.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- bundle report
- dead weight
- third-party cost

## Giải thích chi tiết

Treemap cho bạn nhìn thấy JavaScript nặng đến từ đâu. Đây là bước biến performance từ cảm nhận sang bằng chứng cụ thể để ra quyết định loại thư viện, tách chunk hay thay đổi chiến lược render.

Third-party libs thường là nguồn phình bundle lớn nhất.

Một bundle report tốt dẫn tới backlog tối ưu rõ ràng.

Không nên chỉ nhìn tổng KB mà bỏ qua runtime cost.

## Sơ đồ

```mermaid
flowchart TD
  A[Bundle report] --> B[Large dependencies]
  B --> C[Decide remove, split or replace]
  C --> D[Smaller startup cost]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Lighthouse Treemap và Phân Tích Bundle”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Lighthouse Treemap và Phân Tích Bundle” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Lighthouse Treemap và Phân Tích Bundle” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://react.dev/reference/react-dom/client/hydrateRoot
- https://developer.chrome.com/docs/lighthouse/overview
- https://vite.dev/guide/
- https://webpack.js.org/concepts/
- https://rspack.dev/guide/start/introduction
