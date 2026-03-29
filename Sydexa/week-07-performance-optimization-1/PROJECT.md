# Project Tuần 7 - Search & Listing Optimization Sprint

[<- Quay lại Tuần 7 - Tối Ưu Hiệu Năng I](./README.md)

## Vì sao project này quan trọng

Project này ép bạn nhìn performance như một bài toán sản phẩm: người dùng gõ, lọc, đổi tab và kỳ vọng kết quả phản hồi gần như tức thì.

## Scenario / bối cảnh sản phẩm

Bạn được giao tối ưu một listing page có search, filters, chart panel và section ít dùng nhưng nặng bundle.

## Required deliverables

- Một listing/search page có data set đủ để cảm nhận chi phí render.
- Một bản chiến lược SSR/CSR hoặc render strategy ngắn gọn nếu phù hợp.
- Một kế hoạch code splitting hoặc dynamic import.
- Một báo cáo đo perceived performance trước-sau.

## Functional requirements

- Phải có debounce hoặc throttle ở đúng interaction.
- Phải có ít nhất một lazy-loaded feature.
- Phải giải thích vì sao từng optimization tồn tại.

## System design tasks

- Vẽ flow input -> debounce/throttle -> fetch -> render.
- Xác định đâu là urgent update, đâu là non-urgent update.
- Viết bundle strategy note: route split, feature split, heavy dependency placement.

## Constraints

- Không thêm optimization chỉ vì nghe hay mà không chứng minh nhu cầu.
- Fallback/loading states phải tự nhiên và không gây jank lớn.

## Suggested milestones

- Milestone 1: baseline và bottleneck inventory.
- Milestone 2: optimize input path.
- Milestone 3: optimize code delivery.
- Milestone 4: review metrics và trade-offs.

## Hints

- Bắt đầu từ interaction mà người dùng chạm nhiều nhất.
- Nếu feature ít dùng nhưng nặng, hãy cân nhắc dynamic import trước.
- Viết rõ “nếu bỏ optimization này thì user sẽ cảm nhận tệ ở đâu”.

## Review rubric

- Optimization bám vào user pain thật.
- Có evidence cho before/after hoặc ít nhất là reasoning rất rõ.
- Không làm codebase khó bảo trì vô ích.

## Stretch goals

- Thêm route prefetch hoặc prewarm strategy có chủ đích.
- Thêm lightweight performance checklist cho PR review sau này.

## Sources / references

- https://developer.mozilla.org/en-US/docs/Web/Performance
- https://react.dev/reference/react/lazy
- https://vite.dev/guide/
- https://webpack.js.org/concepts/
