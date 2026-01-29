# Đặc tả Kỹ thuật Chi tiết: Hệ thống Quản lý Lỗi (ZBUG)

Tài liệu này cung cấp cái nhìn sâu sắc về cách thức 5 yêu cầu cốt lõi được triển khai trong hệ thống SAP ABAP ZBUG, bao gồm các sơ đồ quy trình và kiến trúc dữ liệu.

## 1. Cho phép người dùng ghi nhận lỗi (Bug Recording)
Quy trình ghi nhận lỗi được thiết kế với sự chú trọng vào tính toàn vẹn dữ liệu và phân quyền.

```mermaid
sequenceDiagram
    participant User as Người dùng (SAP GUI)
    participant Class as ZCL_BUG_REQUEST
    participant Validator as ZCL_BUG_VALIDATOR
    participant DB as Database (ZBUG_HEADER)

    User->>Class: create_bug(is_bug_data)
    Class->>Class: Kiểm tra AUTHORITY-CHECK
    Class->>Validator: validate_bug(is_bug_data)
    Validator-->>Class: Kết quả xác thực
    alt Dữ liệu hợp lệ
        Class->>Class: generate_bug_id() (Number Range)
        Class->>DB: INSERT ZBUG_HEADER
        Class->>DB: INSERT ZBUG_HISTORY
        Class-->>User: Trả về Bug ID & Thành công
    else Dữ liệu lỗi
        Class-->>User: Trả về thông báo lỗi
    end
```

- **Lớp Xử lý Chính (`ZCL_BUG_REQUEST`)**: 
    - **Kiểm tra Phân quyền**: Sử dụng Authorization Object `Z_BUG_AUTH` (Activity `01`).
    - **Tạo ID**: Sử dụng FM `NUMBER_GET_NEXT` để tạo ID định dạng `BUG-YYYYMMDD-XXX`.
- **Cơ sở Dữ liệu**: Thông tin chính lưu vào `ZBUG_HEADER`, nhật ký ghi vào `ZBUG_HISTORY`.

## 2. Gửi Email đến team Developer (Email Notification)
Thông báo được tích hợp sâu thông qua hệ thống Workflow và Email chuẩn của SAP.

```mermaid
graph TD
    A[Bug Created] --> B[Trigger Event: ZBUS_BUG.Created]
    B --> C{SAP Workflow: ZBUG_WF}
    C --> D[Xác định Developer từ ZBUG_CONFIG]
    D --> E[Gắn Developer vào Assigned_To]
    E --> F[Gửi Email qua SO_DOCUMENT_SEND_API1]
    F --> G[Developer nhận Email thông báo]
```

- **Kích hoạt**: Gọi `SWE_EVENT_CREATE` ngay khi tạo Bug thành công.
- **Email Content**: Chứa ID, Tiêu đề, Priority và link truy cập nhanh thông qua cấu hình SMTP chuẩn.

## 3. Hiển thị danh sách lỗi trong ALV và SmartForm
Hệ thống sử dụng `CL_SALV_TABLE` để cung cấp giao diện báo cáo mạnh mẽ.

```mermaid
graph LR
    Sub1[Màn hình Lọc] --> Sub2[SELECT Dữ liệu]
    Sub2 --> Sub3[Xử lý Màu sắc/Layout]
    Sub3 --> Sub4[Hiển thị ALV Grid]
    Sub4 -->|Double Click| Sub5[Xem Chi tiết Lỗi]
```

- **ALV Enhancements**: 
    - Tô màu Priority (Vàng: High, Đỏ: Critical).
    - Hỗ trợ đầy đủ chức năng Sort, Filter, Export Excel.
- **SmartForm (`ZBUG_FORM`)**: Dùng để xuất phiếu in chi tiết lỗi, bao gồm cả lịch sử thay đổi từ `ZBUG_ITEMS`.

## 4. Thống kê số lỗi (Bug Statistics)
Khả năng phân tích dữ liệu nhanh chóng thông qua truy vấn tập hợp.

```mermaid
graph TD
    A[Request Statistics] --> B["SELECT status, COUNT(*) GROUP BY status"]
    B --> C{Xử lý Logic Báo cáo}
    C -->|Status = N| D[Pending / Chờ duyệt]
    C -->|Status = A/I| E[Waiting / Đang xử lý]
    C -->|Status = F| F[Fixed / Đã sửa]
    D & E & F --> G[Hiển thị Bảng Tổng hợp]
```

- **Hiệu năng**: Thay vì đọc từng dòng, hệ thống sử dụng `GROUP BY` tại tầng Database để tối ưu tốc độ.

## 5. Đính kèm bằng chứng (Attachments)
Quản lý tệp tin binary trực tiếp trong SAP.

```mermaid
erDiagram
    ZBUG_HEADER ||--o{ ZBUG_ATTACHMENTS : "có"
    ZBUG_ATTACHMENTS {
        string BUG_ID FK
        int ATTACHMENT_ID PK
        raw FILE_CONTENT "RAWSTRING"
        string FILE_TYPE "Extension"
        int FILE_SIZE "Max 10MB"
    }
```

- **Kiểm soát**: 
    - **Dung lượng**: Check `FILE_SIZE` <= 10MB.
    - **Định dạng**: Whitelist (JPG, PNG, PDF, LOG...).
- **Xử lý**: Sử dụng `CL_GUI_FRONTEND_SERVICES` để hỗ trợ Upload/Download linh hoạt.

---
> [!IMPORTANT]
> Toàn bộ kiến trúc tuân thủ mô hình phân tầng, tách biệt Logic nghiệp vụ và Giao diện người dùng.
