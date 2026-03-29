# Project Tuần 6 - Settings Portal với Routing và Design System

[<- Quay lại Tuần 6 - Routing + UI Libraries](./README.md)

## Vì sao project này quan trọng

Project này kết hợp điều hướng, layout, UI architecture và accessibility thành một portal thật có thể mở rộng.

## Scenario / bối cảnh sản phẩm

Bạn cần xây portal quản trị/settings cho workspace với nhiều khu vực như profile, billing, members, notifications và security.

## Required deliverables

- Một route tree rõ ràng cho portal.
- Một layout có navigation, content area và empty/error states.
- Một lựa chọn UI stack có giải thích rõ vì sao chọn.
- Một accessibility checklist cho các luồng chính.

## Functional requirements

- Phải có nested routes hoặc routing structure tương đương.
- Phải dùng một UI stack rõ ràng và nhất quán.
- Phải có keyboard-friendly navigation.

## System design tasks

- Vẽ route map và layout map.
- Xác định reusable components và component ownership.
- Viết design-system note cho spacing, typography, color tokens và focus states.

## Constraints

- Không copy-paste UI thiếu nhất quán giữa các route.
- Không bỏ qua accessibility chỉ vì tập trung vào visuals.

## Suggested milestones

- Milestone 1: route map + layout wireframe.
- Milestone 2: chọn UI stack và dựng shared components.
- Milestone 3: hoàn thiện 3-4 màn hình settings.
- Milestone 4: audit accessibility và polish.

## Hints

- Chọn một visual direction và giữ token nhất quán.
- Thiết kế route tree trước khi code component.
- Luôn thử tab keyboard qua các form và menu chính.

## Review rubric

- Navigation và layout rõ ràng.
- UI stack được chọn có lý do hợp lý.
- Accessibility được chứng minh bằng checklist và interaction thực tế.

## Stretch goals

- Thêm responsive sidebar hoặc mobile navigation.
- Thêm theme tokens hoặc dark/light strategy nếu thực sự có ích.

## Sources / references

- https://reactrouter.com/home
- https://mui.com/material-ui/getting-started/
- https://www.radix-ui.com/primitives
- https://ui.shadcn.com/docs
- https://tailwindcss.com/docs
- https://developer.mozilla.org/en-US/docs/Web/Accessibility
