# Tham khảo & Tài nguyên

**← [Quay lại README](README.md)**

---

## Mục lục

1. [Hướng dẫn SAP](#sap-guides)
2. [Mã Giao dịch SAP](#sap-transaction-codes)
3. [Bảng SAP Tiêu chuẩn](#standard-sap-tables)
4. [BAPI/Function Modules](#bapifunction-modules)
5. [Ví dụ Mã](#code-examples)
6. [Thực hành Tốt nhất](#best-practices)
7. [Cạm bẫy Thường gặp](#common-pitfalls)
8. [Tài nguyên Bên ngoài](#external-resources)
9. [Công cụ Kiểm thử](#testing-tools)

---

## Hướng dẫn SAP

### Hướng dẫn ABAP Cốt lõi

| Hướng dẫn | Đường dẫn | Phần Chính | Khi nào Sử dụng |
|-------|------|--------------|-------------|
| **Hướng dẫn Cơ bản ABAP** | [01_SAP_ABAP_BASICS_GUIDE.md](../../ABAP-Guides/01_SAP_ABAP_BASICS_GUIDE.md) | Kiểu Dữ liệu, Cấu trúc Điều khiển, Quy ước Đặt tên | Học kiến thức cơ bản ABAP |
| **Hướng dẫn Data Dictionary** | [02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md](../../ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md) | Tạo Bảng, Domains, Data Elements | Tạo bảng cơ sở dữ liệu |
| **Hướng dẫn Internal Tables** | [03_SAP_ABAP_INTERNAL_TABLES_GUIDE.md](../../ABAP-Guides/03_SAP_ABAP_INTERNAL_TABLES_GUIDE.md) | Thao tác Internal Table | Làm việc với internal tables |
| **Hướng dẫn Reports** | [04_SAP_ABAP_REPORTS_GUIDE.md](../../ABAP-Guides/04_SAP_ABAP_REPORTS_GUIDE.md) | Lập trình Report | Tạo báo cáo |
| **Hướng dẫn Function Modules** | [05_SAP_ABAP_FUNCTION_MODULES_GUIDE.md](../../ABAP-Guides/05_SAP_ABAP_FUNCTION_MODULES_GUIDE.md) | Phát triển Function Module | Tạo hàm có thể tái sử dụng |
| **Hướng dẫn Lập trình Màn hình** | [06_SAP_ABAP_SCREEN_PROGRAMMING_GUIDE.md](../../ABAP-Guides/06_SAP_ABAP_SCREEN_PROGRAMMING_GUIDE.md) | Screen Painter, PBO/PAI | Tạo màn hình giao diện người dùng |
| **Hướng dẫn Lập trình ALV** | [07_SAP_ABAP_ALV_PROGRAMMING_GUIDE.md](../../ABAP-Guides/07_SAP_ABAP_ALV_PROGRAMMING_GUIDE.md) | ALV Grid, Báo cáo ALV, Xuất Excel | Tạo báo cáo ALV |
| **Hướng dẫn ABAP Objects** | [08_SAP_ABAP_OBJECTS_GUIDE.md](../../ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md) | Lớp, Giao diện, Kế thừa | Lập trình hướng đối tượng |
| **Hướng dẫn Gỡ lỗi** | [09_SAP_ABAP_DEBUGGING_GUIDE.md](../../ABAP-Guides/09_SAP_ABAP_DEBUGGING_GUIDE.md) | Kỹ thuật Gỡ lỗi | Xử lý sự cố |
| **Hướng dẫn Hiệu suất** | [10_SAP_ABAP_PERFORMANCE_GUIDE.md](../../ABAP-Guides/10_SAP_ABAP_PERFORMANCE_GUIDE.md) | Tối ưu hóa Hiệu suất | Tối ưu hóa mã |
| **Hướng dẫn Kiểm thử Đơn vị** | [14_SAP_ABAP_UNIT_TESTING_GUIDE.md](../../ABAP-Guides/14_SAP_ABAP_UNIT_TESTING_GUIDE.md) | ABAP Unit, Trường hợp Kiểm thử | Viết kiểm thử đơn vị |

### Hướng dẫn Theo Module

| Hướng dẫn | Đường dẫn | Phần Chính | Khi nào Sử dụng |
|-------|------|--------------|-------------|
| **Hướng dẫn Dự án Capstone** | [SAP_CAPSTONE_PROJECT_GUIDE.md](../../SAP_CAPSTONE_PROJECT_GUIDE.md) | Lập kế hoạch Dự án, Phát triển, Kiểm thử | Hướng dẫn dự án tổng thể |
| **Hướng dẫn Workflow** | [SAP_WORKFLOW_GUIDE.md](../../SAP_WORKFLOW_GUIDE.md) | Thiết kế Workflow, Triển khai | Tạo quy trình phân công workflow |
| **Hướng dẫn Biểu mẫu** | [SAP_FORMS_GUIDE.md](../../SAP_FORMS_GUIDE.md) | SmartForms, Biểu mẫu In | Tạo biểu mẫu có thể in |
| **Hướng dẫn Tích hợp** | [SAP_INTEGRATION_GUIDE.md](../../SAP_INTEGRATION_GUIDE.md) | Tích hợp Hệ thống | Tích hợp với hệ thống bên ngoài |
| **Hướng dẫn Bảo mật** | [SAP_SECURITY_AUTHORIZATION_GUIDE.md](../../SAP_SECURITY_AUTHORIZATION_GUIDE.md) | Phân quyền, Bảo mật | Triển khai bảo mật |

---

## Mã Giao dịch SAP

### Giao dịch Phát triển

| Giao dịch | Mục đích | Được Sử dụng Bởi | Tham khảo Hướng dẫn |
|-------------|---------|---------|-----------------|
| **SE11** | Data Dictionary | Thành viên Nhóm 1 | [Hướng dẫn Data Dictionary](../../ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md) |
| **SE24** | Class Builder | Thành viên Nhóm 1 | [Hướng dẫn ABAP Objects](../../ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md) |
| **SE38** | ABAP Editor | Tất cả Nhà phát triển | [Hướng dẫn Cơ bản ABAP](../../ABAP-Guides/01_SAP_ABAP_BASICS_GUIDE.md) |
| **SE37** | Function Builder | Tất cả Nhà phát triển | [Hướng dẫn Function Modules](../../ABAP-Guides/05_SAP_ABAP_FUNCTION_MODULES_GUIDE.md) |
| **SE51** | Screen Painter | Thành viên Nhóm 3 | [Hướng dẫn Lập trình Màn hình](../../ABAP-Guides/06_SAP_ABAP_SCREEN_PROGRAMMING_GUIDE.md) |
| **SE80** | Object Navigator | Tất cả Nhà phát triển | [Hướng dẫn Cơ bản ABAP](../../ABAP-Guides/01_SAP_ABAP_BASICS_GUIDE.md) |
| **SE93** | Maintain Transaction | Tất cả Nhà phát triển | Tạo mã giao dịch |

### Giao dịch Workflow

| Giao dịch | Mục đích | Được Sử dụng Bởi | Tham khảo Hướng dẫn |
|-------------|---------|---------|-----------------|
| **SWDD** | Workflow Builder | Thành viên Nhóm 2 | [Hướng dẫn Workflow](../../SAP_WORKFLOW_GUIDE.md) |
| **SWDD_HEAD** | Workflow Header | Thành viên Nhóm 2 | [Hướng dẫn Workflow](../../SAP_WORKFLOW_GUIDE.md) |
| **SWI1** | Workflow Inbox | Thành viên Nhóm 2 | [Hướng dẫn Workflow](../../SAP_WORKFLOW_GUIDE.md) |
| **SWI2** | Workflow Log | Thành viên Nhóm 2 | [Hướng dẫn Workflow](../../SAP_WORKFLOW_GUIDE.md) |

### Giao dịch Biểu mẫu

| Giao dịch | Mục đích | Được Sử dụng Bởi | Tham khảo Hướng dẫn |
|-------------|---------|---------|-----------------|
| **SMARTFORMS** | SmartForms Builder | Thành viên Nhóm 4 | [Hướng dẫn Biểu mẫu](../../SAP_FORMS_GUIDE.md) |
| **NACE** | Form Output | Thành viên Nhóm 4 | [Hướng dẫn Biểu mẫu](../../SAP_FORMS_GUIDE.md) |

### Kiểm thử & Gỡ lỗi

| Giao dịch | Mục đích | Được Sử dụng Bởi | Tham khảo Hướng dẫn |
|-------------|---------|---------|-----------------|
| **SE80** | Debugger | Tất cả Nhà phát triển | [Hướng dẫn Gỡ lỗi](../../ABAP-Guides/09_SAP_ABAP_DEBUGGING_GUIDE.md) |
| **SAT** | Phân tích Hiệu suất | Thành viên Nhóm 1 | [Hướng dẫn Hiệu suất](../../ABAP-Guides/10_SAP_ABAP_PERFORMANCE_GUIDE.md) |
| **ST05** | SQL Trace | Thành viên Nhóm 1 | [Hướng dẫn Hiệu suất](../../ABAP-Guides/10_SAP_ABAP_PERFORMANCE_GUIDE.md) |

---

## Bảng SAP Tiêu chuẩn

### Bảng User Management

| Bảng | Mô tả | Trường Sử dụng | Mục đích |
|-------|-------------|-------------|---------|
| **USR21** | User Address | BNAME, ADDRNUMBER | Thông tin người dùng |
| **USR02** | User Master Data | BNAME, USTYP | Dữ liệu chủ người dùng |

### Bảng Workflow

| Bảng | Mô tả | Trường Sử dụng | Mục đích |
|-------|-------------|-------------|---------|
| **SWW_WIHEAD** | Work Item Header | WI_ID, TOPWI_ID | Work item workflow |
| **SWW_WI2OBJ** | Work Item to Object | WI_ID, OBJKEY | Liên kết đối tượng workflow |
| **SWW_USERWI** | User Work Items | USER, WI_ID | Work item của người dùng |

### Bảng Email

| Bảng | Mô tả | Trường Sử dụng | Mục đích |
|-------|-------------|-------------|---------|
| **SOOD** | Document Objects | OBJID, OBJTP | Đối tượng tài liệu email |
| **SOOS** | Document Data | OBJID, OBJTP | Dữ liệu tài liệu email |

---

## BAPI/Function Modules

### Function Module Tiêu chuẩn Sử dụng

| Function Module | Mục đích | Tham số | Sử dụng Trong |
|----------------|---------|------------|---------|
| **NUMBER_GET_NEXT** | Lấy số tiếp theo từ dải số | NR_RANGE_NR, OBJECT, NUMBER | Tạo ID lỗi |
| **SO_DOCUMENT_SEND_API1** | Gửi email | DOCUMENT_DATA, RECEIVERS | Thông báo email |
| **DATE_GET_WEEK** | Lấy ngày trong tuần | DATE, WEEKDAY | Tính toán ngày |

### Function Module Tùy chỉnh

| Function Module | Mục đích | Tham số | Được Tạo Bởi |
|----------------|---------|------------|------------|
| **Z_BUG_GENERATE_ID** | Tạo ID lỗi | IV_REPORTER_ID, EV_BUG_ID | Thành viên Nhóm 1 |
| **Z_BUG_SEND_EMAIL** | Gửi thông báo lỗi | IV_BUG_ID, IV_RECIPIENT | Thành viên Nhóm 4 |

---

## Ví dụ Mã

### Ví dụ 1: Tạo Bảng

**Tham khảo**: [Hướng dẫn Data Dictionary](../../ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md)

```abap
" Create table ZBUG_HEADER
" Transaction: SE11

" Steps:
" 1. Enter table name: ZBUG_HEADER
" 2. Click Create
" 3. Enter description
" 4. Go to Fields tab
" 5. Add fields as per design
" 6. Activate table
```

### Ví dụ 2: Định nghĩa Lớp

**Tham khảo**: [Hướng dẫn ABAP Objects](../../ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md)

```abap
CLASS zcl_bug_request DEFINITION
  PUBLIC
  FINAL
  CREATE PRIVATE.

  PUBLIC SECTION.
    CLASS-METHODS get_instance
      RETURNING VALUE(ro_instance) TYPE REF TO zcl_bug_request.

    METHODS create_bug
      IMPORTING is_bug_data TYPE zst_bug_data
      EXPORTING ev_bug_id TYPE zbug_bug_id
                et_messages TYPE bapiret2_t.

  PRIVATE SECTION.
    CLASS-DATA: go_instance TYPE REF TO zcl_bug_request.

ENDCLASS.
```

### Ví dụ 3: Báo cáo ALV

**Tham khảo**: [Hướng dẫn Lập trình ALV](../../ABAP-Guides/07_SAP_ABAP_ALV_PROGRAMMING_GUIDE.md)

```abap
DATA: lo_alv TYPE REF TO cl_salv_table,
      lo_functions TYPE REF TO cl_salv_functions.

cl_salv_table=>factory(
  IMPORTING r_salv_table = lo_alv
  CHANGING t_table = lt_data
).

lo_functions = lo_alv->get_functions( ).
lo_functions->set_all( abap_true ).

lo_alv->display( ).
```

### Ví dụ 4: Xử lý Đính kèm File

```abap
" Upload file to table ZBUG_ATTACHMENTS
DATA: ls_attachment TYPE zbug_attachments.

ls_attachment-bug_id = lv_bug_id.
ls_attachment-attachment_id = lv_attachment_id.
ls_attachment-file_name = lv_file_name.
ls_attachment-file_type = lv_file_type.
ls_attachment-file_size = lv_file_size.
ls_attachment-file_content = lv_file_content.
ls_attachment-upload_date = sy-datum.
ls_attachment-upload_by = sy-uname.

INSERT zbug_attachments FROM ls_attachment.
```

---

## Thực hành Tốt nhất

### Tiêu chuẩn Mã hóa

**Tham khảo**: [Hướng dẫn Thực hành Tốt nhất](../../ABAP-Guides/12_SAP_ABAP_BEST_PRACTICES_GUIDE.md)

1. **Quy ước Đặt tên**
   - Sử dụng tiền tố Z cho đối tượng tùy chỉnh
   - Sử dụng tên mô tả
   - Tuân theo tiêu chuẩn đặt tên SAP
   - Sử dụng tiền tố: lv_, ls_, lt_, gv_, etc.

2. **Tổ chức Mã**
   - Cấu trúc mã một cách logic
   - Sử dụng nhận xét có ý nghĩa
   - Nhóm mã liên quan
   - Tuân theo nguyên tắc trách nhiệm đơn lẻ

3. **Xử lý Lỗi**
   - Luôn kiểm tra sy-subrc
   - Sử dụng thông báo trả về BAPI
   - Cung cấp thông báo lỗi có ý nghĩa

4. **Hiệu suất**
   - Tránh SELECT trong vòng lặp
   - Sử dụng FOR ALL ENTRIES
   - Chọn chỉ các trường cần thiết
   - Sử dụng chỉ mục phù hợp

### Thực hành Tốt nhất Xử lý File

1. **Validation File**
   - Kiểm tra loại file được phép
   - Kiểm tra kích thước file (tối đa 10MB)
   - Kiểm tra tên file

2. **Lưu trữ File**
   - Lưu trữ file trong bảng RAW
   - Lưu metadata (tên, loại, kích thước)
   - Ghi nhận người upload và ngày upload

---

## Cạm bẫy Thường gặp

### Cạm bẫy Phát triển

1. **Quên Kiểm tra sy-subrc**
   ```abap
   " Bad
   SELECT SINGLE * FROM zbug_header INTO ls_bug
     WHERE bug_id = lv_bug_id.
   " No check - may crash if not found
   
   " Good
   SELECT SINGLE * FROM zbug_header INTO ls_bug
     WHERE bug_id = lv_bug_id.
   IF sy-subrc = 0.
     " Process bug
   ELSE.
     MESSAGE 'Bug not found' TYPE 'E'.
   ENDIF.
   ```

2. **SELECT trong Vòng lặp**
   ```abap
   " Bad
   LOOP AT lt_bugs INTO ls_bug.
     SELECT SINGLE * FROM zbug_header INTO ls_header
       WHERE bug_id = ls_bug-bug_id.
   ENDLOOP.
   
   " Good
   SELECT * FROM zbug_header INTO TABLE lt_header
     FOR ALL ENTRIES IN lt_bugs
     WHERE bug_id = lt_bugs-bug_id.
   ```

### Cạm bẫy Xử lý File

1. **Không Kiểm tra Kích thước File**
   - Luôn kiểm tra kích thước file trước khi upload
   - Giới hạn kích thước file (10MB)

2. **Không Validation Loại File**
   - Kiểm tra loại file được phép
   - Chặn các loại file nguy hiểm

---

## Tài nguyên Bên ngoài

### Tài nguyên Chính thức SAP

- **SAP Help Portal**: https://help.sap.com
- **SAP Community**: https://community.sap.com
- **SAP Learning Hub**: https://learninghub.sap.com
- **openSAP**: https://open.sap.com

### Tài nguyên ABAP

- **Tài liệu Từ khóa ABAP**: https://help.sap.com/doc/abapdoc
- **Công cụ Phát triển ABAP**: https://tools.hana.ondemand.com/#abap
- **Blog SAP ABAP**: https://blogs.sap.com/tag/abap/

### Tài nguyên Workflow

- **Tài liệu SAP Workflow**: https://help.sap.com/viewer/workflow
- **Thực hành Tốt nhất Workflow**: Bài viết SAP Community

---

## Công cụ Kiểm thử

### Kiểm thử Đơn vị ABAP

**Tham khảo**: [Hướng dẫn Kiểm thử Đơn vị](../../ABAP-Guides/14_SAP_ABAP_UNIT_TESTING_GUIDE.md)

- **Khung Kiểm thử ABAP Unit**: Khung kiểm thử tích hợp SAP
- **Lớp Kiểm thử**: Sử dụng CL_AUNIT_ASSERT cho assertions
- **Phân tích Phủ sóng**: Sử dụng giao dịch SAT cho phủ sóng

### Kiểm thử Hiệu suất

**Tham khảo**: [Hướng dẫn Hiệu suất](../../ABAP-Guides/10_SAP_ABAP_PERFORMANCE_GUIDE.md)

- **SAT (Phân tích Hiệu suất)**: Giao dịch SAT
- **SQL Trace**: Giao dịch ST05
- **Phân tích Thời gian Chạy**: Công cụ hiệu suất tích hợp

### Công cụ Gỡ lỗi

**Tham khảo**: [Hướng dẫn Gỡ lỗi](../../ABAP-Guides/09_SAP_ABAP_DEBUGGING_GUIDE.md)

- **ABAP Debugger**: Debugger tích hợp
- **Watchpoints**: Giám sát giá trị biến
- **Breakpoints**: Dừng thực thi tại điểm cụ thể

---

## Tham khảo Nhanh

### Mẫu Mã Thường dùng

**Mẫu 1: Lớp Singleton**
```abap
CLASS-METHODS get_instance
  RETURNING VALUE(ro_instance) TYPE REF TO zcl_bug_request.

METHOD get_instance.
  IF go_instance IS INITIAL.
    CREATE OBJECT go_instance.
  ENDIF.
  ro_instance = go_instance.
ENDMETHOD.
```

**Mẫu 2: Xử lý Lỗi**
```abap
DATA: lt_messages TYPE bapiret2_t.

" Perform operation
IF sy-subrc <> 0.
  APPEND VALUE #( type = 'E' id = 'ZBUG' number = '001'
                  message = 'Error occurred' ) TO lt_messages.
ENDIF.
```

**Mẫu 3: Tạo Bug ID**
```abap
DATA: lv_bug_id TYPE zbug_bug_id.

lv_bug_id = |BUG-{ sy-datum }-{ lv_sequence }|.
```

---

## Tham khảo Theo Dự án

### Tài liệu Dự án Nội bộ

- **[Tổng quan Dự án](00_Project_Overview.md)** - Ngữ cảnh dự án và cấu trúc nhóm
- **[Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)** - Tài liệu giai đoạn thiết kế
- **[Giai đoạn 2: Phát triển](Phase2_Development.md)** - Tài liệu giai đoạn phát triển
- **[Giai đoạn 3: Kiểm thử & QA](Phase3_Testing_QA.md)** - Tài liệu giai đoạn kiểm thử
- **[Giai đoạn 4: Tài liệu & Trình bày](Phase4_Documentation_Presentation.md)** - Giai đoạn tài liệu
- **[Kiến trúc Kỹ thuật](Technical_Architecture.md)** - Đặc tả kỹ thuật

### Yêu cầu Gốc

- **[Yêu cầu Dự án](../Abap-8.md)** - Đặc tả dự án gốc

---

**← [Quay lại README](README.md)**

