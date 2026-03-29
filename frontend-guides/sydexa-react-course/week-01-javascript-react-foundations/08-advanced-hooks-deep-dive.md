# Đào Sâu Các Hook Quan Trọng

[<- Quay lại Tuần 1 - JavaScript Nâng Cao + Nền Tảng React](./README.md)

## Vì sao bài này quan trọng

Hooks là API để gắn state, effect, memoization và imperative escape hatches vào function components. Điều quan trọng không phải là nhớ cú pháp, mà là biết hook nào là mô hình dữ liệu, hook nào là optimization, hook nào là escape hatch.

## Điều kiện trước

- Biết các khái niệm JavaScript và frontend cơ bản.
- Sẵn sàng ghi chú lại trade-off và câu hỏi thực chiến thay vì chỉ ghi nhớ định nghĩa.

## Core concepts

- useEffect
- useMemo
- useCallback
- useImperativeHandle

## Giải thích chi tiết

Hooks là API để gắn state, effect, memoization và imperative escape hatches vào function components. Điều quan trọng không phải là nhớ cú pháp, mà là biết hook nào là mô hình dữ liệu, hook nào là optimization, hook nào là escape hatch.

Không nên dùng `useMemo` và `useCallback` như phản xạ mặc định.

Effect cần được xem là đồng bộ hóa với hệ bên ngoài, không phải nơi nhồi business logic.

Imperative handle chỉ nên dùng ở boundary cần expose control từ parent.

## Sơ đồ

```mermaid
flowchart LR
  A[Component logic] --> B[State hooks]
  A --> C[Effect hooks]
  A --> D[Optimization hooks]
  A --> E[Escape hatches]
```

## Code ví dụ

```tsx
import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return <time>{time.toLocaleTimeString()}</time>;
}
```

## Common mistakes

- Nhớ tên khái niệm nhưng không gắn nó với một bài toán sản phẩm cụ thể trong bài “Đào Sâu Các Hook Quan Trọng”.
- Tối ưu hoặc trừu tượng hóa quá sớm trước khi đo, trước khi nhìn rõ boundary và trước khi hiểu cost thật.
- Chỉ học cú pháp mà không mô tả được dòng chảy dữ liệu, trạng thái và trách nhiệm của từng tầng.

## Performance / debugging notes

- Khi debug, hãy luôn hỏi: điều gì kích hoạt thay đổi, điều gì thực sự tốn chi phí, và chi phí đó xảy ra ở client, server hay network.
- Ghi lại giả thuyết trước khi sửa. Sau đó đo lại để biết tối ưu có hiệu quả thật hay chỉ làm code phức tạp hơn.
- Nếu một vấn đề lặp lại nhiều lần, hãy nâng nó thành quy ước kiến trúc hoặc checklist cho dự án sau.

## Bài tập thực hành

1. Viết lại bằng lời của bạn mental model cho bài “Đào Sâu Các Hook Quan Trọng” mà không nhìn tài liệu.
2. Tạo một ví dụ nhỏ trong codebase hoặc sandbox để nhìn thấy hành vi của khái niệm này thay vì chỉ đọc mô tả.
3. Ghi lại ít nhất 3 trade-off hoặc quyết định kiến trúc bạn sẽ áp dụng nếu xây một app thật.

## Review checklist

- Bạn có thể giải thích được bài “Đào Sâu Các Hook Quan Trọng” bằng ngôn ngữ của riêng mình.
- Bạn biết khái niệm nào là nền tảng, khái niệm nào là optimization, và khái niệm nào là production concern.
- Bạn có thể chỉ ra ít nhất một ví dụ thực tế nơi bài học này tạo khác biệt rõ ràng cho UX hoặc maintainability.

## Further reading / sources

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- https://react.dev/learn
- https://react.dev/reference/react
