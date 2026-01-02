# Thành viên Nhóm - Tóm tắt Công việc & Nhiệm vụ

**← [Quay lại README](README.md)**

---

## Mục lục

1. [Thành viên Nhóm 1: Trưởng Nhóm Phát triển / Chuyên gia Mô hình Dữ liệu](#team-member-1-lead-developer--data-model-specialist)
2. [Thành viên Nhóm 2: Chuyên gia Workflow & Phân công](#team-member-2-workflow--assignment-specialist)
3. [Thành viên Nhóm 3: Chuyên gia UI & Báo cáo](#team-member-3-ui--reporting-specialist)
4. [Thành viên Nhóm 4: Chuyên gia Biểu mẫu & Tích hợp](#team-member-4-forms--integration-specialist)
5. [Thành viên Nhóm 5: Chuyên gia Phát triển & Chất lượng](#team-member-5-development--quality-specialist)
6. [Trách nhiệm Chung](#shared-responsibilities)

---

## Thành viên Nhóm 1: Trưởng Nhóm Phát triển / Chuyên gia Mô hình Dữ liệu

### Tổng quan Vai trò

**Trọng tâm Chính**: Data Dictionary, Logic ABAP Cốt lõi, Tích hợp  
**Kỹ năng Chính**: ABAP Nâng cao, Data Dictionary (SE11), ABAP Objects, Tích hợp User Management

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Phân tích yêu cầu nghiệp vụ từ đặc tả dự án
- [ ] Xác định yêu cầu mô hình dữ liệu
- [ ] Xác định điểm tích hợp User Management
- [ ] Tạo tài liệu đặc tả kỹ thuật
- [ ] Thiết kế cấu trúc bảng cơ sở dữ liệu

#### Nhiệm vụ Tuần 2
- [ ] Hoàn thiện thiết kế data dictionary (5 bảng: Header, Items, History, Config, Attachments)
- [ ] Thiết kế cấu trúc lớp ABAP (ZCL_BUG_REQUEST, ZCL_BUG_VALIDATOR, ZCL_BUG_STATISTICS, ZCL_BUG_ATTACHMENT)
- [ ] Thiết kế tích hợp với hệ thống người dùng
- [ ] Tạo sơ đồ luồng dữ liệu

**Sản phẩm Chính**: Đặc tả yêu cầu, Thiết kế mô hình dữ liệu, Thiết kế kỹ thuật

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Tạo bảng ZBUG_HEADER (SE11)
- [ ] Tạo bảng ZBUG_ITEMS
- [ ] Tạo bảng ZBUG_HISTORY
- [ ] Tạo bảng ZBUG_CONFIG
- [ ] Tạo bảng ZBUG_ATTACHMENTS
- [ ] Tạo domains và data elements
- [ ] Tạo search helps
- [ ] Kích hoạt tất cả bảng

#### Tuần 4: Chức năng Ghi nhận Lỗi Cốt lõi
- [ ] Phát triển lớp ZCL_BUG_REQUEST
  - Phương thức: CREATE_BUG
  - Phương thức: UPDATE_BUG
  - Phương thức: GET_BUG
  - Phương thức: GENERATE_BUG_ID (private)
- [ ] Phát triển lớp ZCL_BUG_VALIDATOR
  - Phương thức: VALIDATE_BUG
  - Phương thức: VALIDATE_REPORTER
  - Phương thức: VALIDATE_DESCRIPTION
- [ ] Tích hợp với hệ thống người dùng
- [ ] Triển khai logic tạo ID tự động
- [ ] Kiểm thử đơn vị các lớp cốt lõi

#### Tuần 5-8: Các thành phần khác
- [ ] Phát triển lớp ZCL_BUG_STATISTICS
- [ ] Phát triển lớp ZCL_BUG_ATTACHMENT
- [ ] Tích hợp với các thành phần khác
- [ ] Xem xét mã và tối ưu hóa

**Sản phẩm Chính**: 5 bảng cơ sở dữ liệu, 5+ lớp ABAP, Mã tích hợp User Management

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Table | ZBUG_HEADER | Bug Header |
| Table | ZBUG_ITEMS | Bug Items |
| Table | ZBUG_HISTORY | History/Audit Log |
| Table | ZBUG_CONFIG | Configuration Table |
| Table | ZBUG_ATTACHMENTS | Attachments Table |
| Class | ZCL_BUG_REQUEST | Main Bug Management |
| Class | ZCL_BUG_VALIDATOR | Validation Logic |
| Class | ZCL_BUG_STATISTICS | Statistics Logic |
| Class | ZCL_BUG_ATTACHMENT | Attachment Handling |

---

## Thành viên Nhóm 2: Chuyên gia Workflow & Phân công

### Tổng quan Vai trò

**Trọng tâm Chính**: SAP Workflow, Logic Phân công, Phân quyền  
**Kỹ năng Chính**: SAP Workflow (SWDD), Workflow Builder, Xác định Đại lý, Phân quyền

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu workflow phân công
- [ ] Ánh xạ logic phân công dựa trên loại/độ ưu tiên lỗi
- [ ] Xác định yêu cầu phân quyền
- [ ] Thiết kế sơ đồ workflow
- [ ] Tài liệu hóa quy tắc phân công

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế mẫu workflow (SWDD)
- [ ] Xác định nhiệm vụ workflow
- [ ] Thiết kế xác định developer phân công
- [ ] Tạo phần tử workflow container
- [ ] Thiết kế kích hoạt sự kiện workflow

**Sản phẩm Chính**: Yêu cầu workflow, Quy tắc phân công, Sơ đồ thiết kế workflow

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Thiết lập môi trường phát triển workflow
- [ ] Tạo mẫu workflow ZBUG_WF (SWDD)
- [ ] Xác định workflow container
- [ ] Tạo nhiệm vụ workflow cơ bản

#### Tuần 5: Triển khai Quy trình Phân công Workflow
- [ ] Hoàn thiện mẫu workflow
- [ ] Triển khai logic phân công developer
  - Phân công theo loại lỗi
  - Phân công theo độ ưu tiên
- [ ] Triển khai xác định developer
- [ ] Tạo workflow binding
- [ ] Kiểm thử workflow phân công end-to-end

**Sản phẩm Chính**: Mẫu workflow (ZBUG_WF), Nhiệm vụ phân công, Logic xác định developer

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Workflow | ZBUG_WF | Assignment Workflow Template |
| Task | ZBUG_ASSIGN_TASK | Assignment Task |
| Task | ZBUG_FIX_TASK | Fix Task |
| Method | ZBUG_ASSIGN_METHOD | Assignment Method |

---

## Thành viên Nhóm 3: Chuyên gia UI & Báo cáo

### Tổng quan Vai trò

**Trọng tâm Chính**: Màn hình, Báo cáo ALV, Giao diện Người dùng  
**Kỹ năng Chính**: Screen Painter (SE51), Lập trình ALV, Màn hình Lựa chọn, Xuất Excel

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu giao diện người dùng
- [ ] Thiết kế bố cục màn hình
- [ ] Xác định yêu cầu báo cáo
- [ ] Tạo mockup/wireframe UI
- [ ] Tài liệu hóa yêu cầu lọc

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế luồng màn hình (SE51)
- [ ] Thiết kế cấu trúc báo cáo ALV
- [ ] Xác định tham số màn hình lựa chọn
- [ ] Thiết kế tùy chọn lọc
- [ ] Thiết kế cấu trúc xuất Excel

**Sản phẩm Chính**: Yêu cầu UI, Mockup màn hình, Yêu cầu báo cáo

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 4: Chức năng Ghi nhận Lỗi Cốt lõi
- [ ] Phát triển chương trình ZBUG_LOG
  - Màn hình lựa chọn
  - Màn hình 0100 (Màn hình ghi nhận chính)
  - Triển khai logic luồng màn hình
  - Kết nối với các lớp cốt lõi

#### Tuần 6: Danh sách Lỗi & Lọc
- [ ] Phát triển chương trình ZBUG_LIST
  - Màn hình lựa chọn với bộ lọc (trạng thái, loại, độ ưu tiên, developer)
  - Hiển thị ALV
  - Xem chi tiết
- [ ] Triển khai logic lọc
- [ ] Thêm chức năng sắp xếp

#### Tuần 7: Thống kê & Báo cáo
- [ ] Phát triển chương trình ZBUG_STATISTICS
  - Màn hình lựa chọn
  - Hiển thị ALV Grid
  - Tính toán thống kê (fixed, waiting, pending)
  - Chức năng xuất Excel
- [ ] Triển khai thanh công cụ ALV
- [ ] Thêm xuất Excel (XLSX)

**Sản phẩm Chính**: 4 chương trình ABAP (Log, List, Statistics, Assign), Báo cáo ALV với xuất Excel

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Program | ZBUG_LOG | Bug Logging |
| Program | ZBUG_LIST | Bug List |
| Program | ZBUG_STATISTICS | Statistics Report |
| Program | ZBUG_ASSIGN | Assignment Interface |
| Screen | 0100 | Main Logging Screen |

---

## Thành viên Nhóm 4: Chuyên gia Biểu mẫu & Tích hợp

### Tổng quan Vai trò

**Trọng tâm Chính**: SmartForms, Tích hợp Email, Xử lý Đính kèm  
**Kỹ năng Chính**: SmartForms, Tích hợp Email (SO_DOCUMENT_SEND_API1), Xử lý File

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu SmartForm
- [ ] Thiết kế bố cục biểu mẫu
- [ ] Xác định kích hoạt thông báo email
- [ ] Xác định mẫu thông báo
- [ ] Tài liệu hóa yêu cầu xử lý đính kèm

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế bố cục SmartForm (SMARTFORMS)
- [ ] Xác định trường biểu mẫu và nguồn dữ liệu
- [ ] Thiết kế mẫu email
- [ ] Xác định kích hoạt thông báo
- [ ] Tài liệu hóa yêu cầu xử lý file

**Sản phẩm Chính**: Yêu cầu SmartForm, Thiết kế bố cục biểu mẫu, Đặc tả thông báo email, Yêu cầu xử lý đính kèm

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 4: Chức năng Ghi nhận Lỗi Cốt lõi
- [ ] Phát triển SmartForm ZBUG_FORM
  - Phần header
  - Chi tiết lỗi
  - Thông tin developer
  - Phần trạng thái
- [ ] Kiểm thử đầu ra biểu mẫu

#### Tuần 5: Triển khai Quy trình Phân công Workflow
- [ ] Triển khai kích hoạt thông báo email
- [ ] Tạo mẫu email cho lỗi đã ghi nhận
- [ ] Tạo mẫu email cho phân công developer
- [ ] Tạo mẫu email cho lỗi đã sửa
- [ ] Tạo mẫu email cho lỗi bị từ chối
- [ ] Kiểm thử thông báo email

#### Tuần 8: Biểu mẫu, Email & Tích hợp
- [ ] Hoàn thiện SmartForm ZBUG_FORM
- [ ] Triển khai chức năng in
- [ ] Hoàn thiện hệ thống thông báo email
- [ ] Triển khai xử lý đính kèm file
  - Upload file
  - Download file
  - Validation file

**Sản phẩm Chính**: SmartForm (ZBUG_FORM), 4+ mẫu email, Chức năng in, Xử lý đính kèm file

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| SmartForm | ZBUG_FORM | Bug Report Print Form |
| Email Template | ZBUG_EMAIL_LOGGED | Bug Logged Email |
| Email Template | ZBUG_EMAIL_ASSIGNED | Assignment Email |
| Email Template | ZBUG_EMAIL_FIXED | Fixed Email |
| Email Template | ZBUG_EMAIL_REJECTED | Rejected Email |

---

## Thành viên Nhóm 5: Chuyên gia Phát triển & Chất lượng

### Tổng quan Vai trò

**Trọng tâm Chính**: Hỗ trợ Phát triển, Kiểm thử, Tài liệu, Đảm bảo Chất lượng  
**Kỹ năng Chính**: Lập trình ABAP, Kiểm thử ABAP Unit, Thiết kế Trường hợp Kiểm thử, Viết Tài liệu

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu thành phần tiện ích
- [ ] Xác định hàm tiện ích chung cần thiết
- [ ] Tạo kế hoạch kiểm thử
- [ ] Xác định kịch bản kiểm thử
- [ ] Tạo ma trận truy vết yêu cầu

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế thành phần tiện ích (ZCL_BUG_UTILITIES)
- [ ] Thiết kế module hàm trợ giúp
- [ ] Thiết kế khung xử lý lỗi
- [ ] Tạo trường hợp kiểm thử chi tiết

**Sản phẩm Chính**: Đặc tả thành phần tiện ích, Kế hoạch kiểm thử, Kịch bản kiểm thử

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Phát triển lớp tiện ích (ZCL_BUG_UTILITIES)
  - Phương thức: FORMAT_DATE
  - Phương thức: GET_USER_NAME
  - Phương thức: GET_STATUS_TEXT
  - Phương thức: LOG_MESSAGE
- [ ] Phát triển hàm trợ giúp
- [ ] Tạo dữ liệu kiểm thử cho bảng
- [ ] Viết thiết lập khung kiểm thử đơn vị

#### Tuần 4-8: Hỗ trợ Phát triển
- [ ] Hỗ trợ hoạt động kiểm thử
- [ ] Tạo dữ liệu kiểm thử
- [ ] Viết kiểm thử đơn vị cho lớp tiện ích

**Sản phẩm Chính**: Lớp tiện ích, Hàm trợ giúp, Dữ liệu kiểm thử, Khung kiểm thử đơn vị

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Class | ZCL_BUG_UTILITIES | Utility Functions Class |
| Function | Z_BUG_GET_DEVELOPER | Get Developer |
| Function | Z_BUG_CHECK_AUTHORITY | Check Authority |
| Function | Z_BUG_SEND_EMAIL | Send Email |

---

## Trách nhiệm Chung

### Tất cả Thành viên Nhóm

#### Trách nhiệm Kiểm thử (Trong suốt Dự án)

- [ ] **Kiểm thử Đơn vị**
  - Viết kiểm thử đơn vị cho các thành phần của mình
  - Thực thi kiểm thử đơn vị thường xuyên
  - Duy trì 80%+ phủ sóng mã

- [ ] **Kiểm thử Tích hợp**
  - Tham gia phiên kiểm thử tích hợp
  - Kiểm thử tích hợp các thành phần của mình với các thành phần khác

- [ ] **Xem xét Mã**
  - Tham gia xem xét mã đồng nghiệp
  - Cung cấp phản hồi mang tính xây dựng

#### Trách nhiệm Tài liệu (Trong suốt Dự án)

- [ ] **Tài liệu Mã**
  - Thêm nhận xét nội tuyến vào mã của mình
  - Tài liệu hóa logic phức tạp

- [ ] **Đóng góp Hướng dẫn Người dùng**
  - Đóng góp phần cho các thành phần của mình
  - Tài liệu hóa điều hướng màn hình

---

## Tham khảo Nhanh: Nhiệm vụ theo Giai đoạn

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

| Thành viên | Trọng tâm Chính |
|--------|--------------|
| **Thành viên 1** | Thiết kế mô hình dữ liệu, Đặc tả kỹ thuật |
| **Thành viên 2** | Thiết kế workflow, Quy tắc phân công |
| **Thành viên 3** | Thiết kế UI/UX, Yêu cầu báo cáo |
| **Thành viên 4** | Thiết kế SmartForm, Mẫu email, Xử lý đính kèm |
| **Thành viên 5** | Thiết kế thành phần tiện ích, Lập kế hoạch kiểm thử |

### Giai đoạn 2: Phát triển (Tuần 3-8)

| Thành viên | Trọng tâm Chính |
|--------|--------------|
| **Thành viên 1** | Bảng cơ sở dữ liệu, Lớp ABAP cốt lõi |
| **Thành viên 2** | Triển khai workflow, Logic phân công |
| **Thành viên 3** | Chương trình màn hình, Báo cáo ALV |
| **Thành viên 4** | SmartForms, Tích hợp email, Xử lý đính kèm |
| **Thành viên 5** | Lớp tiện ích, Hàm trợ giúp, Hỗ trợ kiểm thử |

---

## Tham khảo

### Tài liệu Dự án
- **[Tổng quan Dự án](00_Project_Overview.md)** - Mô tả vai trò chi tiết
- **[Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)** - Nhiệm vụ Giai đoạn 1 chi tiết
- **[Giai đoạn 2: Phát triển](Phase2_Development.md)** - Nhiệm vụ Giai đoạn 2 chi tiết
- **[Giai đoạn 3: Kiểm thử & QA](Phase3_Testing_QA.md)** - Nhiệm vụ Giai đoạn 3 chi tiết
- **[Giai đoạn 4: Tài liệu & Trình bày](Phase4_Documentation_Presentation.md)** - Nhiệm vụ Giai đoạn 4 chi tiết

### Tham khảo Hướng dẫn Nhanh
- **[Tham khảo & Tài nguyên](References_Resources.md)** - Comprehensive SAP guides, transaction codes, best practices, và code examples

---

**← [Quay lại README](README.md)**

