# React Router DOM

[<- Quay lại Tuần 6 - Routing + UI Libraries](./README.md)

## Vì sao bài này quan trọng

Routing là xương sống của một SPA hoặc hybrid app ở phía client. React Router cung cấp nested routes, layouts, data loaders ở các phiên bản hiện đại và mental model rất gần với UI tree.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Routing + UI Libraries.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- route tree
- nested routes
- data-driven navigation

## Giải thích chi tiết

Route tree nên phản ánh information architecture.

Nested routes giúp layout và state rõ hơn.

Điều hướng tốt là điều hướng người dùng hiểu được, không chỉ route chạy được.

## Sơ đồ

```mermaid
flowchart TD
  A[App routes] --> B[Shared layout]
  B --> C[Child route A]
  B --> D[Child route B]
  D --> E[Nested child route]
```

## Code ví dụ

```tsx
<Routes>
  <Route path="/" element={<AppLayout />}>
    <Route index element={<HomePage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
</Routes>
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “React Router DOM”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Tích hợp nội dung của bài “React Router DOM” vào một vertical slice nhỏ trong một settings portal có routing, layout và design system nhất quán.
2. Liệt kê 3 failure modes hoặc implementation mistakes có thể xảy ra khi dùng “React Router DOM”, kèm cách phát hiện sớm.
3. Viết một decision note: vì sao “React Router DOM” nên được đặt ở boundary này thay vì boundary khác trong một settings portal có routing, layout và design system nhất quán?
4. Xác định một cách đo hoặc kiểm chứng để biết việc áp dụng “React Router DOM” đang mang lại lợi ích thật.

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

- Bạn có thể giải thích được bài “React Router DOM” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://reactrouter.com/home
- https://mui.com/material-ui/getting-started/
- https://www.radix-ui.com/primitives
- https://ui.shadcn.com/docs
- https://tailwindcss.com/docs
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
