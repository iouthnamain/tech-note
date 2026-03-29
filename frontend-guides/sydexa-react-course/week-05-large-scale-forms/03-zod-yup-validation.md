# Validation Với Zod và Yup

[<- Quay lại Tuần 5 - Form Quy Mô Lớn](./README.md)

## Vì sao bài này quan trọng

Schema validation là cách chuyển rule nghiệp vụ thành contract rõ ràng. Zod mạnh ở trải nghiệm TypeScript-first; Yup đã quen thuộc lâu năm trong nhiều stack form.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Form Quy Mô Lớn.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- schema
- runtime validation
- error mapping

## Giải thích chi tiết

Schema validation là cách chuyển rule nghiệp vụ thành contract rõ ràng. Zod mạnh ở trải nghiệm TypeScript-first; Yup đã quen thuộc lâu năm trong nhiều stack form.

Runtime validation không thể thay bằng TypeScript.

Schema nên phản ánh domain rules chứ không chỉ field required.

Error message cần map lại cho UX dễ hiểu.

## Sơ đồ

```mermaid
flowchart LR
  A[Form values] --> B[Schema validate]
  B -->|Valid| C[Submit]
  B -->|Invalid| D[Field errors + form errors]
```

## Code ví dụ

```ts
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Validation Với Zod và Yup”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Validation Với Zod và Yup” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Validation Với Zod và Yup” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://formik.org/docs/overview
- https://zod.dev/
- https://github.com/jquense/yup
