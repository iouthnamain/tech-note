# Bug Tracking Management System

**Hệ thống Quản lý theo dõi lỗi**

---

## Tổng quan Dự án

Đây là dự án capstone SAP ABAP toàn diện kéo dài 12 tuần để phát triển Hệ thống Quản lý theo dõi Lỗi. Hệ thống tự động hóa toàn bộ quy trình quản lý lỗi từ việc ghi nhận lỗi, qua quy trình phân công developer, đến báo cáo thống kê và thông báo.

### Tính năng Chính

1. ✅ **Ghi nhận Lỗi** - Cho phép người dùng ghi nhận lỗi trong hệ thống SAP với ID tự động tạo
2. ✅ **Thông báo Email** - Gửi email đến team Developer sau khi ghi nhận lỗi
3. ✅ **Hiển thị Danh sách Lỗi** - Hiển thị danh sách lỗi trong ALV và SmartForm với bộ lọc (trạng thái, loại, độ ưu tiên, developer)
4. ✅ **Thống kê Lỗi** - Thống kê số lỗi (đã sửa, chờ duyệt, đang xử lý)
5. ✅ **Đính kèm Bằng chứng** - Đính kèm bằng chứng vào Bug System

### Công nghệ Sử dụng

- **Phát triển ABAP**: Logic lập trình cốt lõi
- **SAP Workflow**: Quy trình phân công developer
- **Báo cáo ALV**: Hiển thị dữ liệu và xuất Excel
- **SmartForms**: Tạo biểu mẫu báo cáo lỗi
- **Tích hợp Email**: Thông báo tự động
- **Xử lý Đính kèm**: Quản lý file bằng chứng

---

## Tiến độ Dự án

```mermaid
gantt
    title Bug Tracking Management System - 12 Week Timeline
    dateFormat YYYY-MM-DD
    section Phase 1
    Requirements & Design    :a1, 2026-01-05, 14d
    section Phase 2
    Development              :a2, after a1, 42d
    section Phase 3
    Testing & QA             :a3, after a2, 14d
    section Phase 4
    Documentation            :a4, after a3, 14d
```

**Thời gian**: 12 tuần  
**Quy mô Nhóm**: 5 thành viên  
**Loại Dự án**: Phát triển ABAP Tùy chỉnh

---

## Điều hướng

### 📋 Tài liệu Dự án

- **[00_Project_Overview.md](00_Project_Overview.md)** - Cấu trúc nhóm, tiến độ, tổng quan kiến trúc
- **[Team_Members_Tasks.md](Team_Members_Tasks.md)** - Tóm tắt ngắn gọn công việc và nhiệm vụ cho từng thành viên nhóm
- **[Technical_Architecture.md](Technical_Architecture.md)** - Đặc tả kỹ thuật chi tiết
- **[Kế hoạch Quản lý Dự án](Project_Management/Project_Management_Plan.md)** - Cấu trúc sprint, story points, quy trình agile

### 📝 Tài liệu Giai đoạn

- **[Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)** (Tuần 1-2)
  - Thu thập yêu cầu
  - Thiết kế mô hình dữ liệu
  - Thiết kế quy trình
  - Thiết kế UI/UX

- **[Giai đoạn 2: Phát triển](Phase2_Development.md)** (Tuần 3-8)
  - Nền tảng & Mô hình Dữ liệu
  - Chức năng cốt lõi
  - Triển khai quy trình
  - Báo cáo & Biểu mẫu

- **[Giai đoạn 3: Kiểm thử & QA](Phase3_Testing_QA.md)** (Tuần 9-10)
  - Kiểm thử đơn vị
  - Kiểm thử tích hợp
  - Kiểm thử chấp nhận người dùng

- **[Giai đoạn 4: Tài liệu & Trình bày](Phase4_Documentation_Presentation.md)** (Tuần 11-12)
  - Tài liệu kỹ thuật
  - Hướng dẫn người dùng
  - Chuẩn bị trình bày

### 📚 Tài nguyên

- **[Tham khảo & Tài nguyên](References_Resources.md)** - Hướng dẫn SAP, mã giao dịch, thực hành tốt nhất
- **[Tài liệu Sprint](Sprints/README.md)** - Tài liệu chi tiết theo từng sprint

---

## Cấu trúc Nhóm

| Vai trò | Trọng tâm Chính | Trách nhiệm Chính |
|------|--------------|---------------------|
| **Thành viên Nhóm 1** | Trưởng Nhóm Phát triển / Chuyên gia Mô hình Dữ liệu | Data Dictionary, Logic ABAP Cốt lõi, Tích hợp User Management |
| **Thành viên Nhóm 2** | Chuyên gia Workflow & Phân công | SAP Workflow, Logic Phân công Developer, Phân quyền |
| **Thành viên Nhóm 3** | Chuyên gia UI & Báo cáo | Màn hình, Báo cáo ALV, Giao diện Người dùng |
| **Thành viên Nhóm 4** | Chuyên gia Biểu mẫu & Tích hợp | SmartForms, Tích hợp Email, Xử lý Đính kèm |
| **Thành viên Nhóm 5** | Phát triển & Chất lượng | Hỗ trợ Phát triển, Kiểm thử, Tài liệu, Đảm bảo Chất lượng |

**Tham khảo Nhanh**: Xem [Team_Members_Tasks.md](Team_Members_Tasks.md) để xem tóm tắt nhiệm vụ cho từng thành viên.

Để xem mô tả vai trò chi tiết, xem [00_Project_Overview.md](00_Project_Overview.md#team-structure--roles).

---

## Bắt đầu Nhanh

### Cho Thành viên Nhóm

1. **Đọc README này** để hiểu cấu trúc dự án
2. **Xem lại [00_Project_Overview.md](00_Project_Overview.md)** để biết vai trò nhóm và tiến độ
3. **Kiểm tra tài liệu giai đoạn được giao** để biết nhiệm vụ chi tiết
4. **Tham khảo [Technical_Architecture.md](Technical_Architecture.md)** để biết chi tiết kỹ thuật
5. **Sử dụng [References_Resources.md](References_Resources.md)** để xem hướng dẫn và ví dụ SAP

### Cho Người Xem xét Dự án

1. Bắt đầu với README này để xem tổng quan dự án
2. Xem lại [00_Project_Overview.md](00_Project_Overview.md) để biết phạm vi dự án
3. Kiểm tra [Technical_Architecture.md](Technical_Architecture.md) để biết thiết kế hệ thống
4. Xem lại tài liệu giai đoạn để biết chi tiết triển khai
5. Kiểm tra các sản phẩm trong mỗi tài liệu giai đoạn

---

## Danh sách Kiểm tra Sản phẩm Chính

### Sản phẩm Kỹ thuật
- [ ] Bảng Cơ sở Dữ liệu (5 bảng: Header, Items, History, Config, Attachments)
- [ ] Lớp ABAP (5+ lớp cho chức năng cốt lõi)
- [ ] Chương trình ABAP (4 chương trình: Log, List, Statistics, Assign)
- [ ] Mẫu Workflow (ZBUG_WF)
- [ ] SmartForm (ZBUG_FORM)
- [ ] Mẫu Email (4+ mẫu thông báo)
- [ ] Xử lý Đính kèm File

### Sản phẩm Tài liệu
- [ ] Tài liệu Thiết kế Kỹ thuật
- [ ] Hướng dẫn Người dùng
- [ ] Hướng dẫn Quản trị viên
- [ ] Tài liệu Kiểm thử
- [ ] Tài liệu API

### Sản phẩm Dự án
- [ ] Hệ thống Hoạt động
- [ ] Mã Nguồn
- [ ] Trường hợp Kiểm thử & Kết quả
- [ ] Trình bày
- [ ] Demo

---

## Trạng thái Dự án

| Giai đoạn | Trạng thái | Tiến độ |
|-------|--------|----------|
| Giai đoạn 1: Yêu cầu & Thiết kế | 🟡 Đang tiến hành | 0% |
| Giai đoạn 2: Phát triển | ⚪ Chưa bắt đầu | 0% |
| Giai đoạn 3: Kiểm thử & QA | ⚪ Chưa bắt đầu | 0% |
| Giai đoạn 4: Tài liệu & Trình bày | ⚪ Chưa bắt đầu | 0% |

**Chú giải**: 🟢 Hoàn thành | 🟡 Đang tiến hành | ⚪ Chưa bắt đầu

---

## Tiêu chí Thành công

1. ✅ Tất cả 5 tính năng được triển khai và hoạt động
2. ✅ Quy trình phân công developer hoạt động
3. ✅ Tất cả kiểm thử đạt (Đơn vị, Tích hợp, UAT)
4. ✅ Tài liệu hoàn chỉnh
5. ✅ Đạt được sự chấp nhận người dùng
6. ✅ Trình bày thành công

---

## Tài liệu Liên quan

### Tài liệu Dự án
- **[Yêu cầu Dự án](../Abap-8.md)** - Đặc tả dự án gốc
- **[Tham khảo & Tài nguyên](References_Resources.md)** - Comprehensive SAP guides và resources

### Hướng dẫn Dự án
- **[Hướng dẫn Dự án Capstone SAP](../../SAP-General-Guides/SAP_CAPSTONE_PROJECT_GUIDE.md)** - Hướng dẫn capstone chung

### Hướng dẫn Kỹ thuật Nhanh
- **[Hướng dẫn Cơ bản ABAP](../../ABAP-Guides/01_SAP_ABAP_BASICS_GUIDE.md)** - Kiến thức cơ bản ABAP
- **[Hướng dẫn Data Dictionary](../../ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md)** - Tạo bảng
- **[Hướng dẫn ABAP Objects](../../ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md)** - Lập trình hướng đối tượng
- **[Hướng dẫn Lập trình ALV](../../ABAP-Guides/07_SAP_ABAP_ALV_PROGRAMMING_GUIDE.md)** - ALV reports
- **[Hướng dẫn SAP Workflow](../../SAP-General-Guides/SAP_WORKFLOW_GUIDE.md)** - Workflow development

---

## Liên hệ & Hỗ trợ

Đối với câu hỏi hoặc vấn đề:
- Xem lại tài liệu giai đoạn liên quan
- Kiểm tra [References_Resources.md](References_Resources.md) để xem hướng dẫn
- Tham khảo [Technical_Architecture.md](Technical_Architecture.md) để biết chi tiết kỹ thuật

---

**Cập nhật lần cuối**: 2026  
**Phiên bản Dự án**: 1.0  
**Trạng thái**: Giai đoạn Lập kế hoạch

