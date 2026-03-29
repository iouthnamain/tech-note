# React Query: Mutation

[<- Quay lại Tuần 4 - Quản Lý Store + Best Practice Tích Hợp API](./README.md)

## Vì sao bài này quan trọng

Mutation là điểm giao nhau giữa UX và data consistency. Bạn cần quyết định khi nào chờ server rồi cập nhật UI, khi nào optimistic update, và khi nào rollback nếu request lỗi.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Quản Lý Store + Best Practice Tích Hợp API.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- write operations
- optimistic update
- mutation status

## Giải thích chi tiết

Không phải mutation nào cũng phù hợp optimistic update.

Mutation thành công thường phải kéo theo invalidation hoặc cache update.

Đừng để form submit logic tản mạn khắp component tree.

## Sơ đồ

```mermaid
flowchart LR
  A[User submits] --> B[Mutation starts]
  B --> C[Pending UI]
  C --> D{Success?}
  D -->|Yes| E[Update cache / invalidate]
  D -->|No| F[Show error / rollback]
```

## Code ví dụ

```tsx
const mutation = useMutation({
  mutationFn: api.projects.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  },
});
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “React Query: Mutation”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “React Query: Mutation” vào một vertical slice nhỏ trong một workspace dashboard có server state, mutations và cache rõ ràng.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “React Query: Mutation”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “React Query: Mutation” nên được đặt ở boundary này thay vì boundary khác trong một workspace dashboard có server state, mutations và cache rõ ràng?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “React Query: Mutation” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “React Query: Mutation” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://redux.js.org/introduction/getting-started
- https://zustand.docs.pmnd.rs/getting-started/introduction
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://axios-http.com/docs/intro
