# Tham khảo & Tài nguyên (Solo Developer)

**← [Quay lại README](README.md)**

---

## Mục lục

1. [Hướng dẫn SAP](#hướng-dẫn-sap)
2. [Mã Giao dịch SAP](#mã-giao-dịch-sap)
3. [Bảng SAP Tiêu chuẩn](#bảng-sap-tiêu-chuẩn)
4. [BAPI/Function Modules](#bapifunction-modules)
5. [Thực hành Tốt nhất](#thực-hành-tốt-nhất)
6. [Tài nguyên Bên ngoài](#tài-nguyên-bên-ngoài)

---

## Hướng dẫn SAP

Đây là danh sách các hướng dẫn kỹ thuật và nghiệp vụ quan trọng được sử dụng trong suốt dự án.

### Hướng dẫn ABAP Cốt lõi

| Hướng dẫn | Đường dẫn | Mục đích |
|---|---|---|
| **Cơ bản ABAP** | [../../ABAP-Guides/01_SAP_ABAP_BASICS_GUIDE.md](...)| Nắm vững cú pháp và cấu trúc cơ bản. |
| **Data Dictionary**| [../../ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md](...)| Thiết kế và tạo các đối tượng CSDL. |
| **Internal Tables**| [../../ABAP-Guides/03_SAP_ABAP_INTERNAL_TABLES_GUIDE.md](...)| Xử lý dữ liệu hiệu quả trong bộ nhớ. |
| **Reports** | [../../ABAP-Guides/04_SAP_ABAP_REPORTS_GUIDE.md](...)| Xây dựng các báo cáo cổ điển và ALV. |
| **Function Modules**| [../../ABAP-Guides/05_SAP_ABAP_FUNCTION_MODULES_GUIDE.md](...)| Đóng gói logic để tái sử dụng. |
| **Lập trình Màn hình**| [../../ABAP-Guides/06_SAP_ABAP_SCREEN_PROGRAMMING_GUIDE.md](...)| Xây dựng giao diện người dùng với Screen Painter. |
| **Lập trình ALV** | [../../ABAP-Guides/07_SAP_ABAP_ALV_PROGRAMMING_GUIDE.md](...)| Tạo các báo cáo dạng lưới mạnh mẽ. |
| **ABAP Objects** | [../../ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md](...)| Áp dụng lập trình hướng đối tượng. |
| **Gỡ lỗi** | [../../ABAP-Guides/09_SAP_ABAP_DEBUGGING_GUIDE.md](...)| Tìm và sửa lỗi hiệu quả. |
| **Hiệu suất** | [../../ABAP-Guides/10_SAP_ABAP_PERFORMANCE_GUIDE.md](...)| Tối ưu hóa hiệu năng mã nguồn. |
| **Kiểm thử Đơn vị** | [../../ABAP-Guides/14_SAP_ABAP_UNIT_TESTING_GUIDE.md](...)| Viết và chạy kiểm thử tự động. |

### Hướng dẫn Theo Module

| Hướng dẫn | Đường dẫn | Mục đích |
|---|---|---|
| **Dự án Capstone** | [../../SAP-General-Guides/SAP_CAPSTONE_PROJECT_GUIDE.md](...)| Hướng dẫn tổng thể về cấu trúc và yêu cầu. |
| **Workflow** | [../../SAP-General-Guides/SAP_WORKFLOW_GUIDE.md](...)| Thiết kế và triển khai quy trình tự động. |
| **Biểu mẫu (Forms)** | [../../SAP-General-Guides/SAP_FORMS_GUIDE.md](...)| Tạo các biểu mẫu in ấn (SmartForms). |
| **Tích hợp** | [../../SAP-General-Guides/SAP_INTEGRATION_GUIDE.md](...)| Tích hợp với các hệ thống khác (email). |
| **Bảo mật** | [../../SAP-General-Guides/SAP_SECURITY_AUTHORIZATION_GUIDE.md](...)| Triển khai các khía cạnh bảo mật và phân quyền. |

---

## Mã Giao dịch SAP

| Giao dịch | Mục đích | Lĩnh vực |
|---|---|---|
| **SE11** | Data Dictionary | Data Modeling |
| **SE24** | Class Builder | Backend (ABAP Objects) |
| **SE38** | ABAP Editor | Backend & Reports |
| **SE51** | Screen Painter | Frontend (UI) |
| **SE80** | Object Navigator | Development (Tổng hợp) |
| **SWDD** | Workflow Builder | Workflow |
| **SMARTFORMS**| SmartForms Builder| Forms |
| **SE37** | Function Builder | Backend (Function Modules) |
| **SNRO** | Number Range Objects | Backend (ID Generation) |
| **PFCG** | Role Maintenance | Security |
| **SU21** | Authorization Objects | Security |
| **SAT** | Performance Analysis | Performance Tuning |
| **ST05** | SQL Trace | Performance Tuning |

---

## Bảng SAP Tiêu chuẩn

| Bảng | Mô tả | Mục đích |
|---|---|---|
| **USR21** | User Address | Lấy thông tin người dùng. |
| **USR02** | User Master Data | Xác thực và kiểm tra trạng thái người dùng. |
| **SWW_WIHEAD** | Work Item Header | Theo dõi các work item của workflow. |
| **SOOD** | Document Objects | Quản lý các đối tượng email. |

---

## BAPI/Function Modules

| Function Module | Mục đích | Sử dụng trong |
|---|---|---|
| **NUMBER_GET_NEXT** | Lấy số tiếp theo từ dải số. | Tạo `BUG_ID` tự động. |
| **SO_DOCUMENT_SEND_API1**| Gửi email thông báo. | Tích hợp email. |
| **CL_SALV_TABLE=>FACTORY**| Tạo báo cáo ALV. | Hiển thị danh sách lỗi và thống kê. |

---

## Thực hành Tốt nhất

- **Quy ước Đặt tên**: Luôn sử dụng tiền tố `Z` hoặc `Y` cho các đối tượng tùy chỉnh. Sử dụng tiền tố `lv_`, `ls_`, `lt_`, `go_` cho biến.
- **Xử lý Lỗi**: Luôn kiểm tra `sy-subrc` sau mỗi câu lệnh gọi CSDL, FM, hoặc BAPI.
- **Hiệu suất**: Tránh `SELECT` trong vòng lặp. Sử dụng `FOR ALL ENTRIES` và các chỉ mục CSDL hợp lý.
- **Bảo mật**: Sử dụng `AUTHORITY-CHECK` trước các hành động nhạy cảm.
- **Tài liệu hóa Mã**: Viết nhận xét rõ ràng cho các đoạn mã phức tạp.

---

## Tài nguyên Bên ngoài

- **SAP Help Portal**: `https://help.sap.com`
- **SAP Community**: `https://community.sap.com`
- **Tài liệu Từ khóa ABAP**: `https://help.sap.com/doc/abapdoc`

---

**← [Quay lại README](README.md)**
