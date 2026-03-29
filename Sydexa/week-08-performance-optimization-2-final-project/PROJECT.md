# Project Tuần 8 - Analytics Console Dữ Liệu Lớn

[<- Quay lại Tuần 8 - Tối Ưu Hiệu Năng II + Dự Án Cuối](./README.md)

## Vì sao project này quan trọng

Đây là capstone đầu tiên nơi bạn phải kết hợp performance architecture, data loading strategy, bundle analysis và UX của ứng dụng dữ liệu lớn.

## Scenario / bối cảnh sản phẩm

Bạn xây analytics console cho vận hành hoặc tài chính, nơi người dùng xem bảng lớn, biểu đồ, filter và drill-down qua nhiều màn hình.

## Required deliverables

- Route map cho analytics console.
- Component boundary diagram, đặc biệt ở heavy components.
- Data loading strategy cho list, charts và detail panels.
- Performance budget hoặc checklist gồm startup, interaction và network cost.
- Measurement report với ít nhất một vòng before/after hoặc risk-based budget review.

## Functional requirements

- Phải có một dữ liệu đủ lớn để justify virtualization hoặc tương đương.
- Phải có ít nhất một heavy component được cô lập hoặc trì hoãn tải.
- Phải dùng Lighthouse, DevTools hoặc bundle report để đọc bottleneck.

## System design tasks

- Vẽ route map, data flow và loading boundaries.
- Xác định route nào có thể precompute, route nào cần live data.
- Thiết kế performance budget theo feature hoặc route.

## Constraints

- Không được chỉ tối ưu UI bề mặt mà bỏ qua delivery strategy.
- Mọi optimization phải có lý do gắn với user flow hoặc cost.

## Suggested milestones

- Milestone 1: chọn domain và define critical flows.
- Milestone 2: dựng baseline architecture.
- Milestone 3: instrument, profile và tối ưu.
- Milestone 4: viết capstone report.

## Hints

- Chỉ cần 2-3 critical screens nhưng phải đủ sâu.
- Nếu thiếu thời gian, tập trung vào một big list và một heavy panel.
- Đừng bỏ qua ảnh, fonts và third-party bundles khi phân tích cost.

## Review rubric

- Bài làm thể hiện tư duy performance architecture rõ ràng.
- Có deliverables đủ để người khác review kiến trúc, không chỉ xem UI.
- Có ít nhất một quyết định tối ưu được biện minh bằng measurement hoặc risk analysis.

## Stretch goals

- Thêm snapshot so sánh bundle graph trước và sau khi tối ưu.
- Thêm incident-style note: nếu app chậm ở production, bạn sẽ debug theo thứ tự nào.

## Sources / references

- https://react.dev/reference/react-dom/client/hydrateRoot
- https://developer.chrome.com/docs/lighthouse/overview
- https://vite.dev/guide/
- https://webpack.js.org/concepts/
- https://rspack.dev/guide/start/introduction
