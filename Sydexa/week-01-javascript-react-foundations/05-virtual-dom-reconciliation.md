# Virtual DOM và Reconciliation

[<- Quay lại Tuần 1 - JavaScript Nâng Cao + Nền Tảng React](./README.md)

## Vì sao bài này quan trọng

Virtual DOM là cách biểu diễn UI bằng object tree trong memory. Reconciliation là thuật toán quyết định node nào giữ lại, node nào thay thế, và chỗ nào cần commit thay đổi.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- tree diffing
- keys
- identity

## Giải thích chi tiết

Keys ảnh hưởng trực tiếp đến component identity.

Reconciliation không diff kiểu tối ưu tuyệt đối cho mọi trường hợp mà dựa trên heuristic thực dụng.

Tối ưu sai key có thể gây mất state, rerender thừa hoặc bug UI.

## Sơ đồ

```mermaid
flowchart TD
  A[Previous tree] --> C[Reconciliation]
  B[Next tree] --> C
  C --> D[Minimal host changes]
  C --> E[Preserve or reset state by identity]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Virtual DOM và Reconciliation”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “Virtual DOM và Reconciliation” vào một vertical slice nhỏ trong một mini app mô phỏng browser/runtime và render flow.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “Virtual DOM và Reconciliation”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “Virtual DOM và Reconciliation” nên được đặt ở boundary này thay vì boundary khác trong một mini app mô phỏng browser/runtime và render flow?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “Virtual DOM và Reconciliation” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “Virtual DOM và Reconciliation” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- https://react.dev/learn
- https://react.dev/reference/react
