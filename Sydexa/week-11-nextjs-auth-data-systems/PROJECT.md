# Project Tuần 11 - Authenticated SaaS Workspace Module

[<- Quay lại Tuần 11 - Auth, Database và System Flows](./README.md)

## Vì sao project này quan trọng

Project này chuyển app của bạn sang cấp độ product system thật: auth, roles, database, validation và async workflows phải khớp với nhau.

## Scenario / bối cảnh sản phẩm

Bạn đang xây một module trong workspace SaaS như projects, invoices hoặc support tickets, có roles, uploads và ít nhất một async side effect.

## Required deliverables

- Auth model và role matrix.
- Prisma schema hoặc data model tương đương.
- Một flow form/mutation có validation runtime.
- Một async workflow như email, webhook hoặc background job.
- Một design note nêu data access rules.

## Functional requirements

- Phải có protected route hoặc protected action.
- Phải có ít nhất một entity lưu trong DB.
- Phải có ít nhất một boundary được validate bằng Zod hoặc tương đương.

## System design tasks

- Vẽ auth flow và session boundary.
- Vẽ data model tối thiểu cho module.
- Vẽ async flow nếu có webhook/job.
- Viết access policy: user nào đọc gì, sửa gì, tạo gì.

## Constraints

- Không chỉ guard ở client.
- Không để role logic tản mạn khắp UI mà không có note trung tâm.

## Suggested milestones

- Milestone 1: auth model + DB model.
- Milestone 2: protected screens + data reads.
- Milestone 3: mutation + validation + async flow.
- Milestone 4: write policy and failure-mode notes.

## Hints

- Chọn một module nhỏ nhưng trọn vẹn thay vì cố làm cả product.
- Viết role matrix trước khi code authorization.
- Nếu thêm upload, giữ flow signed URL đơn giản và rõ ownership.

## Review rubric

- Auth, DB và validation nối với nhau nhất quán.
- Role/access rules rõ và hợp lý.
- Async side effect được thiết kế có retry/idempotency thinking tối thiểu.

## Stretch goals

- Thêm audit log cho một hành động quan trọng.
- Thêm tenant/workspace boundary nếu muốn đẩy sang multi-tenant mindset.

## Sources / references

- https://authjs.dev/getting-started
- https://www.prisma.io/docs/guides/nextjs
- https://zod.dev/
- https://vercel.com/docs/storage
