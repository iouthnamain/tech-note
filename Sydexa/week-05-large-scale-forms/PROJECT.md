# Project Tuần 5 - Multi-step Onboarding / Compliance Form

[<- Quay lại Tuần 5 - Form Quy Mô Lớn](./README.md)

## Vì sao project này quan trọng

Project này đưa form ra khỏi mức demo nhỏ và buộc bạn giải quyết validation, sectioning, progress và UX của một form lớn thực tế.

## Scenario / bối cảnh sản phẩm

Bạn đang xây onboarding form cho doanh nghiệp hoặc compliance questionnaire nhiều phần, có branch condition, save draft và validation phức tạp.

## Required deliverables

- Một form nhiều section hoặc nhiều step.
- Schema validation rõ ràng cho từng vùng.
- Một tài liệu mô tả field groups, validation rules và submission flow.
- Một kế hoạch xử lý error state và save draft.

## Functional requirements

- Phải có ít nhất 1 nhóm field điều kiện.
- Phải có validation runtime rõ ràng.
- Phải mô tả luồng submit, retry và server error mapping.

## System design tasks

- Vẽ sơ đồ flow từ input -> validation -> form state -> submit.
- Xác định field nào controlled, field nào có thể để uncontrolled.
- Viết schema map cho từng step hoặc từng section.

## Constraints

- Không để toàn bộ logic form nhét trong một component duy nhất.
- Phải có chiến lược hiển thị lỗi thân thiện.

## Suggested milestones

- Milestone 1: chốt structure và schema.
- Milestone 2: build sections + conditional fields.
- Milestone 3: submit flow + error mapping.
- Milestone 4: review UX và accessibility.

## Hints

- Tách field config, validation schema và presentation thành các lớp dễ đọc.
- Bắt đầu bằng happy path trước rồi thêm conditional logic.
- Nghĩ trước xem user bỏ dở giữa chừng thì trải nghiệm resume ra sao.

## Review rubric

- Form đủ rõ để người khác tiếp tục thêm field.
- Validation nhất quán giữa UI và runtime.
- Có giải thích hợp lý cho decisions về form architecture.

## Stretch goals

- Thêm autosave draft.
- Thêm review screen trước submit cuối.

## Sources / references

- https://formik.org/docs/overview
- https://zod.dev/
- https://github.com/jquense/yup
