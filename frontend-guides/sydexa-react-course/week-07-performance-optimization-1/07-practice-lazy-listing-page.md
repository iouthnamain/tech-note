# Thực Hành: Listing Page với Lazy Loading + Debounce

[<- Quay lại Tuần 7 - Tối Ưu Hiệu Năng I](./README.md)

## Vì sao bài này quan trọng

Listing page là nơi nhiều kỹ thuật tối ưu gặp nhau: search, filter, pagination/infinite loading, code split, debounce và skeleton states. Đây là bài thực hành cực sát với SaaS dashboards và storefronts.

## Điều kiện trước

- Đã học hoặc đọc các khái niệm nền của Tối Ưu Hiệu Năng I.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- search UX
- filters
- progressive data loading

## Giải thích chi tiết

Listing page là nơi nhiều kỹ thuật tối ưu gặp nhau: search, filter, pagination/infinite loading, code split, debounce và skeleton states. Đây là bài thực hành cực sát với SaaS dashboards và storefronts.

Nên thêm search box, filters, empty state và sort.

Đo perceived performance khi gõ tìm kiếm nhanh.

Ghi chú đâu là optimization do network, đâu là optimization do rendering.

## Sơ đồ

```mermaid
flowchart LR
  A[Type search] --> B[Debounce]
  B --> C[Fetch results]
  C --> D[Lazy-render heavy parts]
  D --> E[Responsive list UI]
```

## Code ví dụ

```tsx
import { lazy, Suspense } from "react";

const ChartPanel = lazy(() => import("./ChartPanel"));

export function Dashboard() {
  return (
    <Suspense fallback={<p>Dang tai bieu do...</p>}>
      <ChartPanel />
    </Suspense>
  );
}
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Thực Hành: Listing Page với Lazy Loading + Debounce”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Thực Hành: Listing Page với Lazy Loading + Debounce” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Thực Hành: Listing Page với Lazy Loading + Debounce” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/Performance
- https://react.dev/reference/react/lazy
- https://vite.dev/guide/
- https://webpack.js.org/concepts/
