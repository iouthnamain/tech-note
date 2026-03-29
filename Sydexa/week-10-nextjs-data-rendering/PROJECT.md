# Project Tuần 10 - Operations Dashboard Với App Router Data Layer

[<- Quay lại Tuần 10 - Data Fetching và Rendering trong Next.js](./README.md)

## Vì sao project này quan trọng

Project này buộc bạn thiết kế reads, writes, revalidation và route boundaries như một hệ thống App Router thật.

## Scenario / bối cảnh sản phẩm

Bạn cần xây dashboard vận hành có list dữ liệu, detail view, form cập nhật, cached reads và route-level loading states.

## Required deliverables

- Một dashboard route với cached list và detail flow.
- Ít nhất một Server Action hoặc Route Handler ở đúng boundary.
- Một cache/revalidation map.
- Một ghi chú render strategy cho các route chính.

## Functional requirements

- Phải có ít nhất một read flow và một write flow.
- Phải mô tả query freshness hoặc revalidation policy.
- Phải có loading state rõ cho một route hoặc panel.

## System design tasks

- Vẽ sơ đồ data read/write trong App Router.
- Xác định route nào static/dynamic hoặc vì sao không.
- Viết boundary note: direct data access vs Route Handler.

## Constraints

- Không dùng HTTP nội bộ vòng vo nếu server component có thể đọc trực tiếp.
- Không để mutation xong mà UI stale không kiểm soát.

## Suggested milestones

- Milestone 1: define entities và route responsibilities.
- Milestone 2: build read flow + caching.
- Milestone 3: build mutation flow + revalidate.
- Milestone 4: document rendering choices.

## Hints

- Chọn một entity đơn giản như orders, invoices hoặc tickets.
- Viết cache map ngay từ đầu sẽ dễ hơn vá sau.
- Nếu dùng Server Action, hãy gắn luôn plan invalidation đi kèm.

## Review rubric

- Read và write flows rõ ràng, nhất quán.
- Render strategy và cache strategy có lý do cụ thể.
- Architecture note đủ rõ để teammate mở rộng tiếp.

## Stretch goals

- Thêm streaming hoặc Suspense boundary cho panel chậm.
- Thêm optimistic UI hoặc retry strategy nếu thật sự cần.

## Sources / references

- https://nextjs.org/docs/app/getting-started/caching-and-revalidating
- https://nextjs.org/docs/app/building-your-application/data-fetching
- https://react.dev/reference/react/Suspense
