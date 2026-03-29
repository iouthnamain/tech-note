# Project Tuần 1 - Browser Runtime Explorer

[<- Quay lại Tuần 1 - JavaScript Nâng Cao + Nền Tảng React](./README.md)

## Vì sao project này quan trọng

Project này giúp bạn nối các khái niệm về request, parsing, event loop, render pipeline và React mental model thành một sản phẩm nhỏ nhưng có khả năng giải thích hệ thống.

## Scenario / bối cảnh sản phẩm

Bạn đang làm một microsite nội bộ để onboarding frontend engineers mới. Họ cần nhìn thấy trình tự browser load trang, task queue, microtasks và render cycle bằng ví dụ trực quan.

## Required deliverables

- Route hoặc màn hình chính mô tả browser load lifecycle từ request đến paint.
- Một demo nhỏ thể hiện khác biệt giữa synchronous work, microtasks và macrotasks.
- Một sơ đồ component/render flow giải thích React render phase và commit phase.
- Một ghi chú kiến trúc nêu rõ phần nào là browser concern, phần nào là React concern.

## Functional requirements

- Phải có ít nhất 2 interactive demos đơn giản.
- Phải có ít nhất 2 Mermaid diagrams.
- Phải giải thích được vì sao UI bị block khi main thread bận.
- Phải có phần so sánh SPA, MPA và hybrid rendering ở mức ngắn gọn.

## System design tasks

- Vẽ route map hoặc content map cho microsite.
- Xác định component boundaries cho từng demo.
- Xác định state nào là local, state nào có thể derived, state nào không cần lưu.
- Viết một note về performance risk lớn nhất của chính microsite này.

## Constraints

- Không dùng thư viện UI nặng.
- Ưu tiên giải thích rõ hơn là làm hiệu ứng cầu kỳ.
- Mỗi demo phải chạy độc lập và có expected behavior mô tả bằng chữ.

## Suggested milestones

- Milestone 1: chốt content map và demo list.
- Milestone 2: làm browser/event loop demos.
- Milestone 3: thêm React render/reconciliation explanation.
- Milestone 4: viết note tổng kết trade-off.

## Hints

- Bắt đầu từ một timeline đơn giản trước khi thêm tương tác.
- Dùng log hoặc timestamp để chứng minh thứ tự chạy của microtasks và macrotasks.
- Nếu phần React quá rộng, chỉ chọn một flow rõ ràng như state update -> render -> commit.

## Review rubric

- Khái niệm được giải thích đúng và có chứng minh bằng demo.
- Sơ đồ và component boundaries rõ ràng.
- Người xem có thể học lại mental model mà không cần source ngoài.
- Có ít nhất một quyết định kiến trúc được giải thích bằng trade-off cụ thể.

## Stretch goals

- Thêm một demo so sánh `setTimeout`, Promise và `requestAnimationFrame`.
- Thêm phần giải thích vì sao hydration cần JavaScript tải xong mới interactive.

## Sources / references

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
- https://react.dev/learn
- https://react.dev/reference/react
