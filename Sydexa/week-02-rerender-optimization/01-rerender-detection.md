# Theo Dõi và Chẩn Đoán Re-render

[<- Quay lại Tuần 2 - Tối Ưu Re-render](./README.md)

## Vì sao bài này quan trọng

Nếu không nhìn thấy lý do một component rerender thì mọi tối ưu đều dễ trở thành may rủi. Hãy bắt đầu bằng việc xác định trigger, boundary và chi phí thực tế của mỗi lần rerender.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Re-render.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- render triggers
- props changes
- state changes

## Giải thích chi tiết

Rerender không luôn là bug; chỉ rerender đắt hoặc sai chỗ mới đáng xử lý.

Nguồn gốc rerender phổ biến là parent update, context change và object/function identity mới.

Debug tốt cần nhìn cả frequency lẫn cost của rerender.

## Sơ đồ

```mermaid
flowchart TD
  A[Unexpected UI slowness] --> B[Find rerendering components]
  B --> C[Identify trigger]
  C --> D[Measure cost]
  D --> E[Choose fix]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Theo Dõi và Chẩn Đoán Re-render”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Vẽ lại mental model cho bài “Theo Dõi và Chẩn Đoán Re-render” bằng một sơ đồ của riêng bạn và giải thích lại bằng ngôn ngữ đời thường.
2. Tạo một demo nhỏ hoặc một đoạn code ngắn thể hiện rõ hành vi cốt lõi của “Theo Dõi và Chẩn Đoán Re-render” trong bối cảnh một dashboard danh sách lớn cần tối ưu rerender.
3. Cố tình tạo một bug hoặc một hiểu lầm phổ biến liên quan đến “Theo Dõi và Chẩn Đoán Re-render”, sau đó viết cách bạn sẽ debug nó từng bước.
4. Viết một ghi chú system-design ngắn: nếu áp dụng “Theo Dõi và Chẩn Đoán Re-render” vào một dashboard danh sách lớn cần tối ưu rerender, quyết định kiến trúc nào sẽ bị ảnh hưởng nhiều nhất?

## Gợi ý

- Bắt đầu từ một ví dụ thật nhỏ, đủ để bạn giải thích chính xác nguyên nhân và kết quả.
- Nếu sơ đồ chưa rõ, hãy vẽ thêm inputs, outputs và nơi state/thời điểm thay đổi.
- Trong design note, hãy chỉ ra ít nhất một trade-off giữa đơn giản và tối ưu.

## Rubric tự đánh giá

- Giải thích đúng khái niệm, không chỉ lặp lại định nghĩa.
- Demo hoặc ví dụ thể hiện đúng hành vi trọng tâm của bài.
- Có bug/debug path rõ ràng và reasoning hợp lý.
- Design note chạm tới một quyết định kiến trúc cụ thể, không nói chung chung.

## Review checklist

- Bạn có thể giải thích được bài “Theo Dõi và Chẩn Đoán Re-render” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/useTransition
