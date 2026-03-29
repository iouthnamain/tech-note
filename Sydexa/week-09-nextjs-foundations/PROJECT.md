# Project Tuần 9 - Next.js App Shell cho SaaS Dashboard

[<- Quay lại Tuần 9 - Next.js Foundations](./README.md)

## Vì sao project này quan trọng

Project này đưa bạn từ React mental model sang Next.js App Router mindset bằng một shell có thể làm nền cho data và auth ở các tuần sau.

## Scenario / bối cảnh sản phẩm

Bạn cần dựng app shell cho một SaaS dashboard có public marketing area và authenticated area, kèm loading/error/not-found flows rõ ràng.

## Required deliverables

- Cấu trúc `app/` với route groups, layouts và pages.
- Một dashboard shell có sidebar/header/content area.
- Một metadata strategy note cho marketing routes và app routes.
- Một boundary note giải thích server/client split cho shell.

## Functional requirements

- Phải có root layout và ít nhất một nested layout.
- Phải có route states như loading/error/not-found ở ít nhất một khu vực.
- Phải mô tả vì sao từng phần là server hoặc client.

## System design tasks

- Vẽ tree của App Router.
- Vẽ sơ đồ shell + route groups + route states.
- Viết note về metadata/SEO cho public routes so với app routes.

## Constraints

- Không dồn toàn bộ app vào client components.
- Không trộn marketing và authenticated areas trong cùng một mental model lộn xộn.

## Suggested milestones

- Milestone 1: route tree và file structure.
- Milestone 2: layouts + navigation.
- Milestone 3: route states + metadata.
- Milestone 4: write architecture note.

## Hints

- Thiết kế file structure trên giấy trước khi tạo file.
- Server shell trước, client islands sau.
- Metadata strategy nên được nghĩ ngay từ đầu cho marketing pages.

## Review rubric

- App shell dễ mở rộng cho data/auth về sau.
- Boundary server/client được giải thích rõ.
- File structure và route groups không bị rối.

## Stretch goals

- Thêm một command palette hoặc user menu như client island nhỏ.
- Thêm một docs/help area dùng lại root layout theo cách hợp lý.

## Sources / references

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/project-structure
- https://react.dev/reference/rsc/server-components
