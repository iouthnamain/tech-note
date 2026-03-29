# React Query: Background Refetch

[<- Quay lại Tuần 4 - Quản Lý Store + Best Practice Tích Hợp API](./README.md)

## Vì sao bài này quan trọng

Background refetch là công cụ giữ dữ liệu tươi mà không làm UX giật. Nhưng nếu cấu hình sai, app có thể spam network hoặc khiến người dùng thấy UI nhảy dữ liệu khó hiểu.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Quản Lý Store + Best Practice Tích Hợp API.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- focus refetch
- network reconnect
- silent freshness

## Giải thích chi tiết

Refetch on focus hữu ích cho dashboard.

Không phải màn hình nào cũng cần luôn-refetch.

Cần phân biệt freshness requirement giữa analytics, chat, settings, billing.

## Sơ đồ

```mermaid
flowchart LR
  A[Window refocus] --> B[Check query stale?]
  B -->|Yes| C[Background refetch]
  C --> D[Update UI silently]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “React Query: Background Refetch”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “React Query: Background Refetch” vào một vertical slice nhỏ trong một workspace dashboard có server state, mutations và cache rõ ràng.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “React Query: Background Refetch”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “React Query: Background Refetch” nên được đặt ở boundary này thay vì boundary khác trong một workspace dashboard có server state, mutations và cache rõ ràng?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “React Query: Background Refetch” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “React Query: Background Refetch” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://redux.js.org/introduction/getting-started
- https://zustand.docs.pmnd.rs/getting-started/introduction
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://axios-http.com/docs/intro
