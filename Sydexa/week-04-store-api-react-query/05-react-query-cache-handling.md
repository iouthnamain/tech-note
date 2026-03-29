# React Query: Cache Handling

[<- Quay lại Tuần 4 - Quản Lý Store + Best Practice Tích Hợp API](./README.md)

## Vì sao bài này quan trọng

Cache handling là phần tạo nên khác biệt giữa một app “hay loading lại” và một app mượt, phản hồi tức thì. Bạn cần hiểu dữ liệu nào stale được, dữ liệu nào phải luôn tươi và cache nên sống bao lâu.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Quản Lý Store + Best Practice Tích Hợp API.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- staleTime
- gcTime
- prefetch

## Giải thích chi tiết

`staleTime` quyết định dữ liệu được xem là fresh bao lâu.

Prefetch hữu ích cho navigation có thể đoán trước.

Cache lớn quá hoặc key tệ sẽ làm debug khó.

## Sơ đồ

```mermaid
flowchart TD
  A[Cached query] --> B{Fresh?}
  B -->|Yes| C[Use immediately]
  B -->|No| D[Background or foreground refetch]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “React Query: Cache Handling”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “React Query: Cache Handling” vào một vertical slice nhỏ trong một workspace dashboard có server state, mutations và cache rõ ràng.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “React Query: Cache Handling”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “React Query: Cache Handling” nên được đặt ở boundary này thay vì boundary khác trong một workspace dashboard có server state, mutations và cache rõ ràng?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “React Query: Cache Handling” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “React Query: Cache Handling” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://redux.js.org/introduction/getting-started
- https://zustand.docs.pmnd.rs/getting-started/introduction
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://axios-http.com/docs/intro
