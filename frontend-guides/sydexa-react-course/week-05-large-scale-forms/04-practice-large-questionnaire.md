# Thực Hành: Form Bảng Câu Hỏi Lớn

[<- Quay lại Tuần 5 - Form Quy Mô Lớn](./README.md)

## Vì sao bài này quan trọng

Một questionnaire lớn buộc bạn xử lý grouping, progress, conditional sections, draft state và validation theo ngữ cảnh. Đây là bài rất sát thực tế với onboarding, compliance, application forms hoặc internal tools.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Form Quy Mô Lớn.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- multi-section form
- conditional fields
- save draft

## Giải thích chi tiết

Một questionnaire lớn buộc bạn xử lý grouping, progress, conditional sections, draft state và validation theo ngữ cảnh. Đây là bài rất sát thực tế với onboarding, compliance, application forms hoặc internal tools.

Nên chia form thành section hoặc step để giữ focus.

Cần tách schema theo vùng hoặc theo step để dễ kiểm thử.

Hãy nghĩ trước về save draft, resume later và server error mapping.

## Sơ đồ

```mermaid
flowchart TD
  A[Section 1] --> B[Section 2]
  B --> C[Conditional branch]
  C --> D[Review screen]
  D --> E[Submit]
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Thực Hành: Form Bảng Câu Hỏi Lớn”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Thực Hành: Form Bảng Câu Hỏi Lớn” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Thực Hành: Form Bảng Câu Hỏi Lớn” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://formik.org/docs/overview
- https://zod.dev/
- https://github.com/jquense/yup
