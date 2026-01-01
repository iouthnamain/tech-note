# Thành viên Nhóm - Tóm tắt Công việc & Nhiệm vụ

**← [Quay lại README](README.md)**

---

## Mục lục

1. [Thành viên Nhóm 1: Trưởng Nhóm Phát triển / Chuyên gia Mô hình Dữ liệu](#team-member-1-lead-developer--data-model-specialist)
2. [Thành viên Nhóm 2: Chuyên gia Workflow & Phê duyệt](#team-member-2-workflow--approval-specialist)
3. [Thành viên Nhóm 3: Chuyên gia UI & Báo cáo](#team-member-3-ui--reporting-specialist)
4. [Thành viên Nhóm 4: Chuyên gia Biểu mẫu & Tích hợp](#team-member-4-forms--integration-specialist)
5. [Thành viên Nhóm 5: Chuyên gia Phát triển & Chất lượng](#team-member-5-development--quality-specialist)
6. [Trách nhiệm Chung](#shared-responsibilities)

---

## Thành viên Nhóm 1: Trưởng Nhóm Phát triển / Chuyên gia Mô hình Dữ liệu

### Tổng quan Vai trò

**Trọng tâm Chính**: Data Dictionary, Logic ABAP Cốt lõi, Tích hợp  
**Kỹ năng Chính**: ABAP Nâng cao, Data Dictionary (SE11), ABAP Objects, Tích hợp HR

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Phân tích yêu cầu nghiệp vụ từ đặc tả dự án
- [ ] Xác định yêu cầu mô hình dữ liệu
- [ ] Xác định điểm tích hợp HR (PA0001, PA0002)
- [ ] Tạo tài liệu đặc tả kỹ thuật
- [ ] Thiết kế cấu trúc bảng cơ sở dữ liệu

#### Nhiệm vụ Tuần 2
- [ ] Hoàn thiện thiết kế data dictionary (4 bảng: Header, Items, History, Config)
- [ ] Thiết kế cấu trúc lớp ABAP (ZCL_LEAVE_REQUEST, ZCL_LEAVE_VALIDATOR, ZCL_LEAVE_CALCULATOR)
- [ ] Thiết kế tích hợp với bảng HR
- [ ] Tạo sơ đồ luồng dữ liệu
- [ ] Tài liệu hóa giao diện API

**Sản phẩm Chính**: Đặc tả yêu cầu, Thiết kế mô hình dữ liệu, Thiết kế kỹ thuật, Đặc tả tích hợp HR

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Tạo bảng ZLEAVE_REQ_HDR (SE11)
- [ ] Tạo bảng ZLEAVE_REQ_ITEM
- [ ] Tạo bảng ZLEAVE_HISTORY
- [ ] Tạo bảng ZLEAVE_CONFIG
- [ ] Tạo domains và data elements
- [ ] Tạo search helps
- [ ] Kích hoạt tất cả bảng
- [ ] Tạo maintenance views (SM30)

#### Tuần 4: Chức năng Yêu cầu Nghỉ phép Cốt lõi
- [ ] Phát triển lớp ZCL_LEAVE_REQUEST
  - Phương thức: CREATE_REQUEST
  - Phương thức: UPDATE_REQUEST
  - Phương thức: GET_REQUEST
  - Phương thức: GENERATE_REQUEST_ID (private)
- [ ] Phát triển lớp ZCL_LEAVE_VALIDATOR
  - Phương thức: VALIDATE_REQUEST
  - Phương thức: VALIDATE_EMPLOYEE
  - Phương thức: VALIDATE_DATES
  - Phương thức: VALIDATE_LEAVE_BALANCE
  - Phương thức: CHECK_OVERLAPPING
- [ ] Phát triển lớp ZCL_LEAVE_CALCULATOR
  - Phương thức: CALCULATE_DAYS
  - Phương thức: GET_WORKING_DAYS
- [ ] Tích hợp với bảng HR (PA0001, PA0002)
- [ ] Triển khai logic tạo ID tự động
- [ ] Kiểm thử đơn vị các lớp cốt lõi

#### Tuần 5: Triển khai Quy trình Phê duyệt Workflow
- [ ] Phát triển phương thức tích hợp workflow
- [ ] Triển khai logic cập nhật trạng thái
- [ ] Phát triển ghi nhật ký lịch sử
- [ ] Tạo phương thức sự kiện workflow
- [ ] Tích hợp với workflow container

#### Tuần 6: Tra cứu Lịch sử & Lọc
- [ ] Phát triển lớp ZCL_LEAVE_HISTORY
  - Phương thức: GET_HISTORY
  - Phương thức: LOG_ACTION
- [ ] Triển khai logic truy xuất lịch sử
- [ ] Tối ưu hóa truy vấn cơ sở dữ liệu
- [ ] Thêm chỉ mục cho hiệu suất

#### Tuần 7: Báo cáo & Thống kê
- [ ] Phát triển lớp ZCL_LEAVE_REPORT
  - Phương thức: GET_STATISTICS
  - Phương thức: CALCULATE_METRICS
- [ ] Triển khai tổng hợp dữ liệu báo cáo
- [ ] Tối ưu hóa truy vấn báo cáo
- [ ] Thêm logic caching

#### Tuần 8: Biểu mẫu, Email & Tích hợp
- [ ] Hoàn thiện tất cả tích hợp
- [ ] Xem xét mã tất cả module
- [ ] Tối ưu hóa hiệu suất
- [ ] Cải thiện xử lý lỗi

**Sản phẩm Chính**: 4 bảng cơ sở dữ liệu, 5+ lớp ABAP, Mã tích hợp HR, Tài liệu kỹ thuật

---

### Giai đoạn 3: Kiểm thử & QA (Tuần 9-10)

#### Tuần 9: Kiểm thử Toàn diện
- [ ] Xem xét mã tất cả module
- [ ] Tối ưu hóa hiệu suất
- [ ] Sửa lỗi nghiêm trọng
- [ ] Tái cấu trúc mã nếu cần
- [ ] Kiểm thử đơn vị các thành phần của mình
- [ ] Kiểm thử tích hợp các thành phần của mình

#### Tuần 10: UAT & Tinh chỉnh
- [ ] Xử lý phản hồi UAT cho các thành phần của mình
- [ ] Triển khai các thay đổi được yêu cầu
- [ ] Sửa lỗi cuối cùng
- [ ] Kiểm thử cuối cùng

**Sản phẩm Chính**: Báo cáo xem xét mã, Tối ưu hóa hiệu suất, Lỗi nghiêm trọng đã sửa

---

### Giai đoạn 4: Tài liệu & Trình bày (Tuần 11-12)

#### Tuần 11: Tài liệu
- [ ] Tài liệu kỹ thuật (kiến trúc hệ thống, mô hình dữ liệu)
- [ ] Tài liệu lớp (các lớp của mình)
- [ ] Tài liệu API
- [ ] Tài liệu mã (nhận xét nội tuyến)
- [ ] Tài liệu tích hợp (tích hợp HR)

#### Tuần 12: Trình bày
- [ ] Chuẩn bị phần trình bày cho các thành phần của mình
- [ ] Tạo kịch bản demo cho các tính năng của mình
- [ ] Luyện tập trình bày

**Sản phẩm Chính**: Tài liệu thiết kế kỹ thuật, Tài liệu mô hình dữ liệu, Tài liệu lớp, Tài liệu API

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Table | ZLEAVE_REQ_HDR | Leave Request Header |
| Table | ZLEAVE_REQ_ITEM | Leave Request Items |
| Table | ZLEAVE_HISTORY | History/Audit Log |
| Table | ZLEAVE_CONFIG | Configuration Table |
| Class | ZCL_LEAVE_REQUEST | Main Request Management |
| Class | ZCL_LEAVE_VALIDATOR | Validation Logic |
| Class | ZCL_LEAVE_CALCULATOR | Date Calculations |
| Class | ZCL_LEAVE_HISTORY | History Management |
| Class | ZCL_LEAVE_REPORT | Reporting Logic |

---

## Thành viên Nhóm 2: Chuyên gia Workflow & Phê duyệt

### Tổng quan Vai trò

**Trọng tâm Chính**: SAP Workflow, Logic Phê duyệt, Phân quyền  
**Kỹ năng Chính**: SAP Workflow (SWDD), Workflow Builder, Xác định Đại lý, Phân quyền

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu workflow phê duyệt
- [ ] Ánh xạ cấp phê duyệt dựa trên loại/thời gian nghỉ phép
- [ ] Xác định yêu cầu phân quyền
- [ ] Thiết kế sơ đồ workflow
- [ ] Tài liệu hóa quy tắc phê duyệt

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế mẫu workflow (SWDD)
- [ ] Xác định nhiệm vụ workflow
- [ ] Thiết kế xác định đại lý phê duyệt
- [ ] Tạo phần tử workflow container
- [ ] Thiết kế kích hoạt sự kiện workflow
- [ ] Tài liệu hóa cấu hình workflow

**Sản phẩm Chính**: Yêu cầu workflow, Quy tắc phê duyệt, Sơ đồ thiết kế workflow, Ma trận phân quyền

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Thiết lập môi trường phát triển workflow
- [ ] Tạo mẫu workflow ZLEAVE_WF (SWDD)
- [ ] Xác định workflow container
- [ ] Tạo nhiệm vụ workflow cơ bản
- [ ] Kiểm thử cấu trúc workflow cơ bản

#### Tuần 4: Chức năng Yêu cầu Nghỉ phép Cốt lõi
- [ ] Phát triển nhiệm vụ workflow
  - Nhiệm vụ: ZLEAVE_APPROVE_TASK
  - Nhiệm vụ: ZLEAVE_REJECT_TASK
- [ ] Triển khai logic xác định đại lý
- [ ] Tạo phương thức workflow cho phê duyệt/từ chối
- [ ] Kiểm thử luồng workflow cơ bản

#### Tuần 5: Triển khai Quy trình Phê duyệt Workflow
- [ ] Hoàn thiện mẫu workflow
- [ ] Triển khai logic phê duyệt đa cấp
  - Cấp 1: Quản lý Trực tiếp (< 5 ngày)
  - Cấp 2: Trưởng Phòng (5-10 ngày)
  - Cấp 3: Giám đốc HR (> 10 ngày)
- [ ] Triển khai xác định đại lý phê duyệt
- [ ] Tạo workflow binding
- [ ] Kiểm thử workflow phê duyệt end-to-end
- [ ] Triển khai workflow từ chối
- [ ] Thêm giám sát workflow

#### Tuần 6-8: Cải thiện Workflow
- [ ] Cải thiện xử lý lỗi workflow
- [ ] Tối ưu hóa hiệu suất workflow
- [ ] Thêm logic leo thang workflow
- [ ] Kiểm thử tất cả kịch bản workflow

**Sản phẩm Chính**: Mẫu workflow (ZLEAVE_WF), Nhiệm vụ phê duyệt, Logic xác định đại lý, Tài liệu workflow

---

### Giai đoạn 3: Kiểm thử & QA (Tuần 9-10)

#### Tuần 9: Kiểm thử Toàn diện
- [ ] Kiểm thử tất cả kịch bản workflow
- [ ] Kiểm thử trường hợp biên
- [ ] Xác thực phân quyền
- [ ] Sửa vấn đề workflow
- [ ] Kiểm thử đơn vị thành phần workflow
- [ ] Kiểm thử tích hợp workflow

#### Tuần 10: UAT & Tinh chỉnh
- [ ] Xử lý phản hồi UAT cho workflow
- [ ] Triển khai các thay đổi được yêu cầu
- [ ] Sửa lỗi cuối cùng

**Sản phẩm Chính**: Kết quả kiểm thử workflow, Kết quả kiểm thử phân quyền, Vấn đề workflow đã sửa

---

### Giai đoạn 4: Tài liệu & Trình bày (Tuần 11-12)

#### Tuần 11: Tài liệu
- [ ] Tài liệu workflow
- [ ] Tài liệu quy trình phê duyệt
- [ ] Hướng dẫn cấu hình
- [ ] Tài liệu mã (phương thức workflow)

#### Tuần 12: Trình bày
- [ ] Chuẩn bị phần trình bày cho workflow
- [ ] Tạo kịch bản demo cho quy trình phê duyệt
- [ ] Luyện tập trình bày

**Sản phẩm Chính**: Tài liệu workflow, Tài liệu quy trình phê duyệt, Hướng dẫn cấu hình

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Workflow | ZLEAVE_WF | Approval Workflow Template |
| Task | ZLEAVE_APPROVE_TASK | Approval Task |
| Task | ZLEAVE_REJECT_TASK | Rejection Task |
| Method | ZLEAVE_APPROVE_METHOD | Approval Method |
| Method | ZLEAVE_REJECT_METHOD | Rejection Method |

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
- [ ] Tạo mockup bố cục báo cáo
- [ ] Thiết kế cấu trúc xuất Excel

**Sản phẩm Chính**: Yêu cầu UI, Mockup màn hình, Yêu cầu báo cáo, Thiết kế trải nghiệm người dùng

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Thiết lập môi trường phát triển
- [ ] Xem lại hướng dẫn lập trình ALV
- [ ] Tạo cấu trúc chương trình cơ bản ZLEAVE_CREATE
- [ ] Thiết kế bố cục màn hình lựa chọn

#### Tuần 4: Chức năng Yêu cầu Nghỉ phép Cốt lõi
- [ ] Phát triển chương trình ZLEAVE_CREATE
  - Màn hình lựa chọn (PARAMETERS, SELECT-OPTIONS)
  - Màn hình 0100 (Màn hình nhập chính)
  - Màn hình 0200 (Màn hình xác nhận)
- [ ] Triển khai logic luồng màn hình
- [ ] Thêm xác thực trường
- [ ] Triển khai logic PBO/PAI
- [ ] Kết nối với các lớp cốt lõi

#### Tuần 5: Triển khai Quy trình Phê duyệt Workflow
- [ ] Phát triển chương trình ZLEAVE_APPROVE
  - Màn hình phê duyệt
  - Trường nhận xét
  - Hiển thị trạng thái
- [ ] Triển khai nút hành động phê duyệt
- [ ] Thêm tích hợp hộp thư workflow
- [ ] Kiểm thử UI phê duyệt

#### Tuần 6: Tra cứu Lịch sử & Lọc
- [ ] Phát triển chương trình ZLEAVE_HISTORY
  - Màn hình lựa chọn với bộ lọc (ngày, trạng thái, loại nghỉ phép, nhân viên)
  - Hiển thị ALV
  - Xem chi tiết
- [ ] Triển khai logic lọc
- [ ] Thêm chức năng sắp xếp
- [ ] Triển khai chức năng tìm kiếm
- [ ] Kiểm thử kịch bản lọc

#### Tuần 7: Báo cáo & Thống kê
- [ ] Phát triển chương trình ZLEAVE_REPORT
  - Màn hình lựa chọn
  - Hiển thị ALV Grid
  - Tính toán thống kê (tổng yêu cầu, đã phê duyệt/từ chối/đang chờ, nghỉ phép theo loại, nghỉ phép theo phòng ban, thời gian xử lý trung bình)
  - Chức năng xuất Excel
- [ ] Triển khai thanh công cụ ALV
- [ ] Thêm xuất Excel (XLSX)
- [ ] Kiểm thử xuất Excel
- [ ] Tinh chỉnh bố cục báo cáo

#### Tuần 8: Biểu mẫu, Email & Tích hợp
- [ ] Kiểm thử tất cả màn hình
- [ ] Kiểm thử tất cả báo cáo
- [ ] Kiểm thử xuất Excel
- [ ] Cải thiện UI/UX
- [ ] Sửa lỗi UI

**Sản phẩm Chính**: 4 chương trình ABAP (Create, Approve, History, Report), Báo cáo ALV với xuất Excel, Màn hình giao diện người dùng, Hướng dẫn người dùng

---

### Giai đoạn 3: Kiểm thử & QA (Tuần 9-10)

#### Tuần 9: Kiểm thử Toàn diện
- [ ] Kiểm thử tất cả màn hình
- [ ] Kiểm thử tất cả báo cáo
- [ ] Kiểm thử xuất Excel
- [ ] Cải thiện UI/UX
- [ ] Sửa lỗi UI
- [ ] Kiểm thử đơn vị các thành phần của mình
- [ ] Kiểm thử tích hợp các thành phần của mình

#### Tuần 10: UAT & Tinh chỉnh
- [ ] Xử lý phản hồi UAT cho UI/báo cáo
- [ ] Triển khai các thay đổi được yêu cầu
- [ ] Sửa lỗi cuối cùng

**Sản phẩm Chính**: Kết quả kiểm thử màn hình, Kết quả kiểm thử báo cáo, Kết quả kiểm thử xuất Excel, Cải thiện UI

---

### Giai đoạn 4: Tài liệu & Trình bày (Tuần 11-12)

#### Tuần 11: Tài liệu
- [ ] Phần hướng dẫn người dùng (màn hình của mình)
- [ ] Hướng dẫn điều hướng màn hình (chương trình của mình)
- [ ] Hướng dẫn sử dụng báo cáo
- [ ] Tài liệu mã (chương trình màn hình, mã ALV)

#### Tuần 12: Trình bày
- [ ] Chuẩn bị phần trình bày cho UI/báo cáo
- [ ] Tạo kịch bản demo cho màn hình và báo cáo
- [ ] Luyện tập trình bày

**Sản phẩm Chính**: Hướng dẫn người dùng, Hướng dẫn điều hướng màn hình, Hướng dẫn sử dụng báo cáo

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Program | ZLEAVE_CREATE | Create Leave Request |
| Program | ZLEAVE_APPROVE | Approval Interface |
| Program | ZLEAVE_HISTORY | History Lookup |
| Program | ZLEAVE_REPORT | Statistics Report |
| Screen | 0100 | Main Input Screen |
| Screen | 0200 | Confirmation Screen |

---

## Thành viên Nhóm 4: Chuyên gia Biểu mẫu & Tích hợp

### Tổng quan Vai trò

**Trọng tâm Chính**: SmartForms, Tích hợp Email, Thông báo  
**Kỹ năng Chính**: SmartForms, Tích hợp Email (SO_DOCUMENT_SEND_API1), Chức năng In, Thiết kế Biểu mẫu

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu SmartForm
- [ ] Thiết kế bố cục biểu mẫu
- [ ] Xác định kích hoạt thông báo email
- [ ] Xác định mẫu thông báo
- [ ] Tài liệu hóa yêu cầu in

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế bố cục SmartForm (SMARTFORMS)
- [ ] Xác định trường biểu mẫu và nguồn dữ liệu
- [ ] Thiết kế mẫu email
- [ ] Xác định kích hoạt thông báo
- [ ] Tạo mockup biểu mẫu
- [ ] Tài liệu hóa cấu hình email

**Sản phẩm Chính**: Yêu cầu SmartForm, Thiết kế bố cục biểu mẫu, Đặc tả thông báo email, Yêu cầu in

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Thiết lập môi trường SmartForms
- [ ] Tạo cấu trúc SmartForm cơ bản ZLEAVE_FORM
- [ ] Xác định giao diện biểu mẫu
- [ ] Tạo bố cục cơ bản

#### Tuần 4: Chức năng Yêu cầu Nghỉ phép Cốt lõi
- [ ] Phát triển SmartForm ZLEAVE_FORM
  - Phần header
  - Chi tiết nhân viên
  - Chi tiết nghỉ phép
  - Phần phê duyệt
- [ ] Kiểm thử đầu ra biểu mẫu
- [ ] Tinh chỉnh bố cục

#### Tuần 5: Triển khai Quy trình Phê duyệt Workflow
- [ ] Triển khai kích hoạt thông báo email
- [ ] Tạo mẫu email cho yêu cầu phê duyệt
- [ ] Tạo mẫu email cho phê duyệt/từ chối
- [ ] Kiểm thử thông báo email
- [ ] Tích hợp với sự kiện workflow

#### Tuần 6-7: Cải thiện Biểu mẫu & Email
- [ ] Cải thiện bố cục SmartForm
- [ ] Thêm logo công ty
- [ ] Thêm phần chữ ký
- [ ] Thêm tem phê duyệt
- [ ] Tinh chỉnh mẫu email

#### Tuần 8: Biểu mẫu, Email & Tích hợp
- [ ] Hoàn thiện SmartForm ZLEAVE_FORM
- [ ] Triển khai chức năng in
- [ ] Kiểm thử đầu ra biểu mẫu
- [ ] Hoàn thiện hệ thống thông báo email
  - Email yêu cầu phê duyệt
  - Email xác nhận phê duyệt
  - Email từ chối
  - Thông báo thay đổi trạng thái
- [ ] Kiểm thử tất cả kịch bản email
- [ ] Cấu hình cài đặt email

**Sản phẩm Chính**: SmartForm (ZLEAVE_FORM), 4+ mẫu email, Chức năng in, Hướng dẫn cấu hình email

---

### Giai đoạn 3: Kiểm thử & QA (Tuần 9-10)

#### Tuần 9: Kiểm thử Toàn diện
- [ ] Kiểm thử SmartForm trong tất cả kịch bản
- [ ] Kiểm thử thông báo email
- [ ] Xác thực đầu ra in
- [ ] Sửa vấn đề biểu mẫu
- [ ] Kiểm thử đơn vị các thành phần của mình
- [ ] Kiểm thử tích hợp các thành phần của mình

#### Tuần 10: UAT & Tinh chỉnh
- [ ] Xử lý phản hồi UAT cho biểu mẫu/email
- [ ] Triển khai các thay đổi được yêu cầu
- [ ] Sửa lỗi cuối cùng

**Sản phẩm Chính**: Kết quả kiểm thử SmartForm, Kết quả kiểm thử thông báo email, Xác thực đầu ra in, Vấn đề biểu mẫu đã sửa

---

### Giai đoạn 4: Tài liệu & Trình bày (Tuần 11-12)

#### Tuần 11: Tài liệu
- [ ] Tài liệu SmartForm
- [ ] Hướng dẫn cấu hình email
- [ ] Hướng dẫn quy trình in
- [ ] Tài liệu mã (mã tích hợp email, mã tạo biểu mẫu)

#### Tuần 12: Trình bày
- [ ] Chuẩn bị phần trình bày cho biểu mẫu/email
- [ ] Tạo kịch bản demo cho in biểu mẫu và email
- [ ] Luyện tập trình bày

**Sản phẩm Chính**: Tài liệu SmartForm, Hướng dẫn cấu hình email, Hướng dẫn quy trình in

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| SmartForm | ZLEAVE_FORM | Leave Request Print Form |
| Email Template | ZLEAVE_EMAIL_APPROVAL | Approval Request Email |
| Email Template | ZLEAVE_EMAIL_CONFIRM | Approval Confirmation Email |
| Email Template | ZLEAVE_EMAIL_REJECT | Rejection Email |
| Email Template | ZLEAVE_EMAIL_STATUS | Status Change Email |

---

## Thành viên Nhóm 5: Chuyên gia Phát triển & Chất lượng

### Tổng quan Vai trò

**Trọng tâm Chính**: Hỗ trợ Phát triển, Kiểm thử, Tài liệu, Đảm bảo Chất lượng  
**Kỹ năng Chính**: Lập trình ABAP, Kiểm thử ABAP Unit, Thiết kế Trường hợp Kiểm thử, Viết Tài liệu, Đảm bảo Chất lượng

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

#### Nhiệm vụ Tuần 1
- [ ] Xác định yêu cầu thành phần tiện ích
- [ ] Xác định hàm tiện ích chung cần thiết
- [ ] Xác định yêu cầu lớp trợ giúp
- [ ] Tạo kế hoạch kiểm thử
- [ ] Xác định kịch bản kiểm thử
- [ ] Tạo ma trận truy vết yêu cầu
- [ ] Thiết lập môi trường kiểm thử
- [ ] Tài liệu hóa cách tiếp cận kiểm thử

#### Nhiệm vụ Tuần 2
- [ ] Thiết kế thành phần tiện ích (ZCL_LEAVE_UTILITIES)
- [ ] Thiết kế module hàm trợ giúp
- [ ] Thiết kế khung xử lý lỗi
- [ ] Tạo trường hợp kiểm thử chi tiết
- [ ] Thiết kế dữ liệu kiểm thử
- [ ] Tạo script kiểm thử
- [ ] Tạo kế hoạch thực thi kiểm thử
- [ ] Tài liệu hóa kịch bản kiểm thử

**Sản phẩm Chính**: Đặc tả thành phần tiện ích, Kế hoạch kiểm thử, Kịch bản kiểm thử, Ma trận truy vết yêu cầu, Thiết lập môi trường kiểm thử

---

### Giai đoạn 2: Phát triển (Tuần 3-8)

#### Tuần 3: Nền tảng & Mô hình Dữ liệu
- [ ] Phát triển lớp tiện ích (ZCL_LEAVE_UTILITIES)
  - Phương thức: FORMAT_DATE
  - Phương thức: GET_EMPLOYEE_NAME
  - Phương thức: VALIDATE_DATE_RANGE
  - Phương thức: GET_STATUS_TEXT
  - Phương thức: LOG_MESSAGE
- [ ] Phát triển hàm trợ giúp
  - Hàm: Z_LEAVE_GET_MANAGER
  - Hàm: Z_LEAVE_CHECK_HOLIDAY
- [ ] Tạo dữ liệu kiểm thử cho bảng
- [ ] Viết thiết lập khung kiểm thử đơn vị
- [ ] Tạo script dữ liệu kiểm thử
- [ ] Tài liệu hóa thiết lập môi trường kiểm thử

#### Tuần 4: Chức năng Yêu cầu Nghỉ phép Cốt lõi
- [ ] Cải thiện lớp tiện ích
- [ ] Phát triển khung xử lý lỗi
- [ ] Hỗ trợ hoạt động kiểm thử
- [ ] Tạo dữ liệu kiểm thử cho kịch bản tạo yêu cầu
- [ ] Viết kiểm thử đơn vị cho lớp tiện ích

#### Tuần 5: Triển khai Quy trình Phê duyệt Workflow
- [ ] Phát triển hàm trợ giúp workflow
  - Hàm: Z_LEAVE_GET_APPROVER
  - Hàm: Z_LEAVE_CHECK_AUTHORITY
  - Hàm: Z_LEAVE_SEND_WORKFLOW_EMAIL
- [ ] Hỗ trợ kiểm thử workflow
- [ ] Tạo kịch bản kiểm thử cho tất cả cấp phê duyệt

#### Tuần 6: Tra cứu Lịch sử & Lọc
- [ ] Phát triển hàm trợ giúp lịch sử
  - Hàm: Z_LEAVE_GET_HISTORY_SUMMARY
  - Hàm: Z_LEAVE_FILTER_HISTORY
- [ ] Hỗ trợ kiểm thử lịch sử
- [ ] Kiểm thử tra cứu lịch sử với các bộ lọc khác nhau

#### Tuần 7: Báo cáo & Thống kê
- [ ] Phát triển hàm trợ giúp báo cáo
  - Hàm: Z_LEAVE_AGGREGATE_DATA
  - Hàm: Z_LEAVE_FORMAT_REPORT_DATA
- [ ] Hỗ trợ kiểm thử báo cáo
- [ ] Kiểm thử tạo báo cáo với các bộ lọc khác nhau

#### Tuần 8: Biểu mẫu, Email & Tích hợp
- [ ] Phát triển hàm trợ giúp tích hợp
  - Hàm: Z_LEAVE_SEND_EMAIL
  - Hàm: Z_LEAVE_GENERATE_FORM
- [ ] Hỗ trợ kiểm thử tích hợp
- [ ] Kiểm thử tích hợp email end-to-end

**Sản phẩm Chính**: Lớp tiện ích, Hàm trợ giúp, Dữ liệu kiểm thử, Khung kiểm thử đơn vị, Script kiểm thử, Tài liệu môi trường kiểm thử

---

### Giai đoạn 3: Kiểm thử & QA (Tuần 9-10)

#### Tuần 9: Kiểm thử Toàn diện
- [ ] Tiếp tục hỗ trợ phát triển
- [ ] Điều phối hoạt động kiểm thử
- [ ] Thực thi trường hợp kiểm thử cho các thành phần của mình (lớp tiện ích)
- [ ] Tổng hợp kết quả kiểm thử từ tất cả thành viên
- [ ] Tài liệu hóa thực thi kiểm thử tổng thể
- [ ] Quản lý hệ thống theo dõi lỗi
- [ ] Chuẩn bị điều phối UAT

#### Tuần 10: UAT & Tinh chỉnh
- [ ] Tiếp tục hỗ trợ phát triển
- [ ] Điều phối phiên UAT
- [ ] Điều phối thu thập phản hồi người dùng
- [ ] Tổng hợp kết quả UAT
- [ ] Quản lý yêu cầu thay đổi

**Sản phẩm Chính**: Báo cáo điều phối kiểm thử, Kết quả kiểm thử tổng hợp, Hệ thống theo dõi lỗi, Tài liệu điều phối UAT

---

### Giai đoạn 4: Tài liệu & Trình bày (Tuần 11-12)

#### Tuần 11: Tài liệu
- [ ] Điều phối tài liệu (tổng hợp từ tất cả thành viên)
- [ ] Tổng hợp tài liệu kiểm thử
- [ ] Tóm tắt kết quả kiểm thử (từ tất cả thành viên)
- [ ] Tài liệu đào tạo người dùng (tổng hợp từ tất cả thành viên)
- [ ] Tài liệu FAQ
- [ ] Tài liệu mã (lớp tiện ích của mình)

#### Tuần 12: Trình bày
- [ ] Chuẩn bị điều phối trình bày tổng thể
- [ ] Tổng hợp kịch bản demo
- [ ] Luyện tập trình bày
- [ ] Chuẩn bị điều phối Q&A

**Sản phẩm Chính**: Tài liệu tổng hợp, Tóm tắt kết quả kiểm thử, Tài liệu đào tạo người dùng, Tài liệu FAQ

---

### Đối tượng Kỹ thuật Chính

| Loại Đối tượng | Tên Đối tượng | Mô tả |
|-------------|-------------|-------------|
| Class | ZCL_LEAVE_UTILITIES | Utility Functions Class |
| Function | Z_LEAVE_GET_MANAGER | Get Employee Manager |
| Function | Z_LEAVE_CHECK_HOLIDAY | Check Holiday |
| Function | Z_LEAVE_GET_APPROVER | Get Approver |
| Function | Z_LEAVE_CHECK_AUTHORITY | Check Authority |
| Function | Z_LEAVE_SEND_WORKFLOW_EMAIL | Send Workflow Email |
| Function | Z_LEAVE_GET_HISTORY_SUMMARY | Get History Summary |
| Function | Z_LEAVE_FILTER_HISTORY | Filter History |
| Function | Z_LEAVE_AGGREGATE_DATA | Aggregate Report Data |
| Function | Z_LEAVE_FORMAT_REPORT_DATA | Format Report Data |
| Function | Z_LEAVE_SEND_EMAIL | Send Email |
| Function | Z_LEAVE_GENERATE_FORM | Generate Form |

---

## Trách nhiệm Chung

### Tất cả Thành viên Nhóm

#### Trách nhiệm Kiểm thử (Trong suốt Dự án)

- [ ] **Kiểm thử Đơn vị**
  - Viết kiểm thử đơn vị cho các thành phần của mình
  - Thực thi kiểm thử đơn vị thường xuyên
  - Sửa kiểm thử thất bại ngay lập tức
  - Duy trì 80%+ phủ sóng mã cho các thành phần của mình

- [ ] **Kiểm thử Thành phần**
  - Kiểm thử kỹ lưỡng các thành phần của mình
  - Kiểm thử xử lý lỗi trong các thành phần của mình
  - Kiểm thử trường hợp biên cho các thành phần của mình
  - Tài liệu hóa kết quả kiểm thử thành phần

- [ ] **Kiểm thử Tích hợp**
  - Tham gia phiên kiểm thử tích hợp
  - Kiểm thử tích hợp các thành phần của mình với các thành phần khác
  - Sửa vấn đề tích hợp
  - Tài liệu hóa kết quả kiểm thử tích hợp

- [ ] **Xem xét Mã**
  - Tham gia xem xét mã đồng nghiệp
  - Xem xét mã từ các thành viên nhóm khác
  - Cung cấp phản hồi mang tính xây dựng
  - Tài liệu hóa phát hiện xem xét mã

#### Trách nhiệm Tài liệu (Trong suốt Dự án)

- [ ] **Tài liệu Mã**
  - Thêm nhận xét nội tuyến vào mã của mình
  - Tài liệu hóa logic phức tạp trong các thành phần của mình
  - Tài liệu hóa tham số phương thức
  - Tài liệu hóa giá trị trả về

- [ ] **Tài liệu Thành phần**
  - Tài liệu hóa các thành phần của mình
  - Tài liệu hóa giao diện thành phần
  - Tài liệu hóa ví dụ sử dụng
  - Cập nhật tài liệu khi mã thay đổi

- [ ] **Đóng góp Hướng dẫn Người dùng**
  - Đóng góp phần cho các thành phần của mình
  - Tài liệu hóa điều hướng màn hình cho màn hình của mình
  - Tài liệu hóa mô tả tính năng cho các tính năng của mình
  - Tài liệu hóa xử lý sự cố cho các thành phần của mình

#### Đảm bảo Chất lượng (Trong suốt Dự án)

- [ ] **Chất lượng Mã**
  - Tuân theo tiêu chuẩn mã hóa SAP
  - Đảm bảo khả năng đọc mã
  - Tối ưu hóa hiệu suất mã
  - Xử lý lỗi đúng cách

- [ ] **Chất lượng Kiểm thử**
  - Đảm bảo phủ sóng kiểm thử toàn diện
  - Kiểm thử tất cả đường dẫn mã
  - Kiểm thử kịch bản lỗi
  - Xác thực kết quả kiểm thử

---

## Tham khảo Nhanh: Nhiệm vụ theo Giai đoạn

### Giai đoạn 1: Yêu cầu & Thiết kế (Tuần 1-2)

| Thành viên | Trọng tâm Chính |
|--------|--------------|
| **Thành viên 1** | Thiết kế mô hình dữ liệu, Đặc tả kỹ thuật |
| **Thành viên 2** | Thiết kế workflow, Quy tắc phê duyệt |
| **Thành viên 3** | Thiết kế UI/UX, Yêu cầu báo cáo |
| **Thành viên 4** | Thiết kế SmartForm, Mẫu email |
| **Thành viên 5** | Thiết kế thành phần tiện ích, Lập kế hoạch kiểm thử |

### Giai đoạn 2: Phát triển (Tuần 3-8)

| Thành viên | Trọng tâm Chính |
|--------|--------------|
| **Thành viên 1** | Bảng cơ sở dữ liệu, Lớp ABAP cốt lõi |
| **Thành viên 2** | Triển khai workflow, Logic phê duyệt |
| **Thành viên 3** | Chương trình màn hình, Báo cáo ALV |
| **Thành viên 4** | SmartForms, Tích hợp email |
| **Thành viên 5** | Lớp tiện ích, Hàm trợ giúp, Hỗ trợ kiểm thử |

### Giai đoạn 3: Kiểm thử & QA (Tuần 9-10)

| Thành viên | Trọng tâm Chính |
|--------|--------------|
| **Thành viên 1** | Xem xét mã, Tối ưu hóa hiệu suất |
| **Thành viên 2** | Kiểm thử workflow, Kiểm thử phân quyền |
| **Thành viên 3** | Kiểm thử màn hình, Kiểm thử báo cáo |
| **Thành viên 4** | Kiểm thử biểu mẫu, Kiểm thử email |
| **Thành viên 5** | Điều phối kiểm thử, Theo dõi lỗi, Điều phối UAT |

### Giai đoạn 4: Tài liệu & Trình bày (Tuần 11-12)

| Thành viên | Trọng tâm Chính |
|--------|--------------|
| **Thành viên 1** | Tài liệu kỹ thuật, Tài liệu lớp |
| **Thành viên 2** | Tài liệu workflow, Hướng dẫn cấu hình |
| **Thành viên 3** | Hướng dẫn người dùng, Hướng dẫn điều hướng màn hình |
| **Thành viên 4** | Tài liệu SmartForm, Hướng dẫn email |
| **Thành viên 5** | Điều phối tài liệu, Tài liệu đào tạo, FAQ |

---

## Tóm tắt Phân phối Nhiệm vụ

### Nhiệm vụ Phát triển

| Thành viên | Trọng tâm Phát triển | Đối tượng Chính |
|--------|------------------|-------------|
| **Thành viên 1** | Logic Nghiệp vụ Cốt lõi | 4 Bảng, 5 Lớp |
| **Thành viên 2** | Workflow & Phê duyệt | 1 Workflow, 2 Nhiệm vụ |
| **Thành viên 3** | Giao diện Người dùng | 4 Chương trình, Nhiều Màn hình |
| **Thành viên 4** | Biểu mẫu & Email | 1 SmartForm, 4+ Mẫu Email |
| **Thành viên 5** | Tiện ích & Hỗ trợ | 1 Lớp, 10+ Hàm |

### Nhiệm vụ Kiểm thử

| Thành viên | Trọng tâm Kiểm thử |
|--------|--------------|
| **Tất cả Thành viên** | Kiểm thử đơn vị các thành phần của mình |
| **Tất cả Thành viên** | Kiểm thử thành phần |
| **Tất cả Thành viên** | Tham gia kiểm thử tích hợp |
| **Thành viên 5** | Điều phối & tổng hợp kiểm thử |

### Nhiệm vụ Tài liệu

| Thành viên | Trọng tâm Tài liệu |
|--------|-------------------|
| **Tất cả Thành viên** | Tài liệu hóa các thành phần của mình |
| **Tất cả Thành viên** | Tài liệu mã (nhận xét nội tuyến) |
| **Tất cả Thành viên** | Phần hướng dẫn người dùng |
| **Thành viên 5** | Điều phối & tổng hợp tài liệu |

---

## Tham khảo

- **[Tổng quan Dự án](00_Project_Overview.md)** - Mô tả vai trò chi tiết
- **[Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)** - Nhiệm vụ Giai đoạn 1 chi tiết
- **[Giai đoạn 2: Phát triển](Phase2_Development.md)** - Nhiệm vụ Giai đoạn 2 chi tiết
- **[Giai đoạn 3: Kiểm thử & QA](Phase3_Testing_QA.md)** - Nhiệm vụ Giai đoạn 3 chi tiết
- **[Giai đoạn 4: Tài liệu & Trình bày](Phase4_Documentation_Presentation.md)** - Nhiệm vụ Giai đoạn 4 chi tiết

---

**← [Quay lại README](README.md)**

