# Project Tuần 12 - Multi-system Product Architecture Capstone

[<- Quay lại Tuần 12 - Production Architecture với Next.js](./README.md)

## Vì sao project này quan trọng

Đây là capstone cuối cùng, nơi toàn bộ khóa học gặp nhau thành một sản phẩm có thể giải thích, triển khai và vận hành ở mức kiến trúc.

## Scenario / bối cảnh sản phẩm

Bạn là frontend/product engineer được giao đề xuất kiến trúc cho một nền tảng gồm marketing site, SaaS dashboard và commerce-like workflows dùng cùng một nền tảng Next.js.

## Required deliverables

- Product brief ngắn: users, roles, key flows, non-functional goals.
- Route map cho toàn hệ thống.
- Component boundary và rendering strategy map.
- Data model + API contract summary.
- Cache/runtime/deployment/observability plan.
- Một vertical slice được hiện thực hoặc mô tả cực rõ nếu bạn không code toàn bộ.

## Functional requirements

- Phải chỉ ra ít nhất 3 subsystem: public, authenticated, và transactional/content flow.
- Phải có auth model, cache strategy, performance budget và rollout/observability thinking.
- Phải giải thích trade-off thay vì chỉ vẽ sơ đồ đẹp.

## System design tasks

- Vẽ toàn bộ route map và ownership của từng khu vực.
- Xác định server/client boundaries ở các flows quan trọng.
- Viết cache, data contract và invalidation strategy cho 2-3 entity chính.
- Viết deployment và incident-readiness checklist tối thiểu.

## Constraints

- Không mở quá rộng mà thiếu chiều sâu ở flow chính.
- Không né phần vận hành như logging, tracing, rollout và monitoring.

## Suggested milestones

- Milestone 1: chọn scope và viết product brief.
- Milestone 2: chốt route map, data model, auth model.
- Milestone 3: dựng hoặc mô tả vertical slice end-to-end.
- Milestone 4: hoàn thiện architecture pack và rubric self-review.

## Hints

- Chọn một domain bạn hiểu đủ rõ để trade-off có ý nghĩa.
- Đừng cố code tất cả; một vertical slice thật tốt còn giá trị hơn một bản demo quá rộng.
- Viết architecture pack như thể bạn sẽ handoff cho teammate tiếp tục build.

## Review rubric

- Hệ thống có tính nhất quán giữa route, data, auth, cache và runtime.
- Trade-off được nêu rõ, không né các quyết định khó.
- Có dấu hiệu rõ của production readiness: testing, telemetry, deployment, rollback thinking.
- Người khác đọc vào có thể tiếp tục triển khai mà không phải đoán quá nhiều.

## Stretch goals

- Thêm ADR ngắn cho 3 quyết định kiến trúc quan trọng nhất.
- Thêm sơ đồ incident flow: nếu lỗi production xảy ra, log/trace/alert nào sẽ giúp bạn xử lý đầu tiên.

## Sources / references

- https://nextjs.org/docs/app/building-your-application/optimizing
- https://nextjs.org/docs/app/guides/testing
- https://nextjs.org/docs/app/guides/open-telemetry
- https://vercel.com/docs
