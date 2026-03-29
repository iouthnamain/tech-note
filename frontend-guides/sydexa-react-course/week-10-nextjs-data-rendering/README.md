# Tuần 10 - Data Fetching và Rendering trong Next.js

[<- Quay lại tổng quan khóa học](../sydexa-react-courses.md)

## Mục tiêu tuần

- Hiểu mô hình cache và rendering của App Router.
- Kết nối data reads, writes, route boundaries và UX loading một cách nhất quán.
- Dựng dashboard có flow đọc-ghi dữ liệu hiện đại.

## Thứ tự học

1. [01 - `fetch`, Request Caching, Revalidation và Cache Tags](./01-fetch-caching-revalidation.md)
2. [02 - Static, Dynamic, ISR và Partial Pre-rendering](./02-static-dynamic-isr-partial-prerendering.md)
3. [03 - Streaming và Suspense Với App Router](./03-streaming-and-suspense.md)
4. [04 - Server Actions Cho Mutation và Form Handling](./04-server-actions-and-form-handling.md)
5. [05 - Route Handlers và Ranh Giới API](./05-route-handlers-and-api-boundaries.md)
6. [06 - Thực Hành: Dashboard Dữ Liệu Với Cached Reads và Write Flows](./06-practice-data-driven-dashboard.md)

## Kết quả đầu ra

- Dùng được `fetch`, revalidation, Suspense, Server Actions và Route Handlers đúng chỗ.
- Chọn đúng static/dynamic/ISR theo freshness requirement.
- Xây được data-driven dashboard có cached reads và write flows rõ ràng.

## Nguồn chính

- https://nextjs.org/docs/app/getting-started/caching-and-revalidating
- https://nextjs.org/docs/app/building-your-application/data-fetching
- https://react.dev/reference/react/Suspense
