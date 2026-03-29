# Project Tuần 2 - Re-render Audit cho Dashboard

[<- Quay lại Tuần 2 - Tối Ưu Re-render](./README.md)

## Vì sao project này quan trọng

Project này biến tuần tối ưu rerender thành một bài audit thật: đo, tìm bottleneck, sửa, đo lại.

## Scenario / bối cảnh sản phẩm

Bạn nhận một dashboard nội bộ có bảng lớn, filter và search nhưng gõ input bị lag. Nhiệm vụ là làm audit và đề xuất fix có chứng cứ.

## Required deliverables

- Một dashboard demo có bảng hoặc danh sách ít nhất vài nghìn item.
- Một profiling note ghi lại component nào rerender nhiều nhất.
- Một bản tối ưu ít nhất 3 điểm khác nhau.
- Một báo cáo trước-sau nêu rõ perceived performance hoặc measurement thay đổi ra sao.

## Functional requirements

- Phải dùng React DevTools Profiler hoặc chiến lược logging tương đương.
- Phải có ít nhất một ví dụ dùng `memo` hoặc boundary split đúng chỗ.
- Phải có ít nhất một ví dụ dùng update non-urgent hoặc state colocation.

## System design tasks

- Vẽ component tree và đánh dấu vùng rerender đắt.
- Giải thích vì sao state hiện tại đang đặt sai chỗ hoặc props đang không ổn định.
- Viết decision note: khi nào chấp nhận rerender thay vì tối ưu thêm.

## Constraints

- Không “tối ưu mù” mà phải có evidence.
- Không chấp nhận fix làm code khó đọc hơn mà không có lợi ích rõ ràng.

## Suggested milestones

- Milestone 1: tái hiện vấn đề và profile baseline.
- Milestone 2: fix state boundaries và prop stability.
- Milestone 3: đo lại và viết audit report.

## Hints

- Tìm input path hoặc filter path vì đó thường là nơi người dùng cảm nhận lag đầu tiên.
- Bắt đầu bằng component split trước khi thêm optimization hooks.
- Nếu dùng `memo`, hãy chứng minh props đủ stable để nó có ý nghĩa.

## Review rubric

- Có baseline và after-state rõ ràng.
- Fix bám vào nguyên nhân gốc, không chỉ chữa triệu chứng.
- Giải thích được trade-off giữa độ phức tạp và lợi ích.

## Stretch goals

- Thêm một custom hook để gom logic filter/search hợp lý.
- So sánh hai hướng fix khác nhau và nêu vì sao chọn một hướng.

## Sources / references

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useDeferredValue
- https://react.dev/reference/react/useTransition
