# Kiến trúc Kỹ thuật (Solo Developer)

**← [Quay lại README](README.md)**

---

## Mục lục

1. [Kiến trúc Hệ thống](#kiến-trúc-hệ-thống)
2. [Mô hình Dữ liệu](#mô-hình-dữ-liệu)
3. [Sơ đồ Trình tự](#sơ-đồ-trình-tự)
4. [Sơ đồ Lớp](#sơ-đồ-lớp)
5. [Đặc tả Cơ sở Dữ liệu](#đặc-tả-cơ-sở-dữ-liệu)
6. [Đặc tả API/Giao diện](#đặc-tả-apigiao-diện)
7. [Kiến trúc Workflow](#kiến-trúc-workflow)
8. [Kiến trúc Bảo mật](#kiến-trúc-bảo-mật)
9. [Kiến trúc Tích hợp](#kiến-trúc-tích-hợp)

---

## Kiến trúc Hệ thống

### Kiến trúc Cấp cao

```mermaid
graph TB
    subgraph UserLayer[User Layer]
        Reporter[Reporter<br/>BUG_BASIC]
        Developer[Developer<br/>BUG_BASIC + BUG_WORK]
        LeadDev[Lead Developer<br/>BUG_BASIC + BUG_WORK + BUG_ADMIN]
    end
    
    subgraph PresentationLayer[Presentation Layer]
        LogScreen[ZBUG_LOG<br/>Bug Logging]
        ListScreen[ZBUG_LIST<br/>Bug List]
        StatsScreen[ZBUG_STATISTICS<br/>Statistics Report]
        AssignScreen[ZBUG_ASSIGN<br/>Assignment Interface]
    end
    
    subgraph BusinessLayer[Business Logic Layer]
        BugClass[ZCL_BUG_REQUEST<br/>Bug Management]
        ValidatorClass[ZCL_BUG_VALIDATOR<br/>Validation Logic]
        StatsClass[ZCL_BUG_STATISTICS<br/>Statistics Logic]
        ReportClass[ZCL_BUG_REPORT<br/>Reporting Logic]
        AttachClass[ZCL_BUG_ATTACHMENT<br/>Attachment Handling]
    end
    
    subgraph WorkflowLayer[Workflow Layer]
        Workflow[ZBUG_WF<br/>Assignment Workflow]
        WorkflowTasks[Workflow Tasks<br/>Assign/Fix]
    end
    
    subgraph DataLayer[Data Layer]
        HeaderTable[ZBUG_HEADER<br/>Header Table]
        ItemTable[ZBUG_ITEMS<br/>Items Table]
        HistoryTable[ZBUG_HISTORY<br/>History Table]
        ConfigTable[ZBUG_CONFIG<br/>Config Table]
        AttachTable[ZBUG_ATTACHMENTS<br/>Attachments Table]
    end
    
    subgraph IntegrationLayer[Integration Layer]
        UserModule[User Management]
        EmailSystem[Email System<br/>SO_DOCUMENT_SEND]
        SmartForm[ZBUG_FORM<br/>SmartForm]
        FileSystem[File System]
    end
    
    Reporter --> LogScreen
    Developer --> AssignScreen
    LeadDev --> StatsScreen
    Reporter --> ListScreen
    Developer --> ListScreen
    LeadDev --> ListScreen
    
    LogScreen --> BugClass
    AssignScreen --> Workflow
    ListScreen --> ReportClass
    StatsScreen --> StatsClass
    
    BugClass --> ValidatorClass
    BugClass --> HeaderTable
    BugClass --> ItemTable
    BugClass --> Workflow
    BugClass --> AttachClass
    
    Workflow --> WorkflowTasks
    WorkflowTasks --> BugClass
    
    ReportClass --> HeaderTable
    StatsClass --> HeaderTable
    AttachClass --> AttachTable
    
    BugClass --> UserModule
    BugClass --> EmailSystem
    BugClass --> SmartForm
    AttachClass --> FileSystem
    
    style UserLayer fill:#e1f5ff
    style PresentationLayer fill:#fff4e6
    style BusinessLayer fill:#e1f5ff
    style WorkflowLayer fill:#fff4e6
    style DataLayer fill:#e1f5ff
    style IntegrationLayer fill:#fff4e6
```

---

## Mô hình Dữ liệu

### Sơ đồ Quan hệ Thực thể

```mermaid
erDiagram
    ZBUG_HEADER ||--o{ ZBUG_ITEMS : "has items"
    ZBUG_HEADER ||--o{ ZBUG_HISTORY : "has history"
    ZBUG_HEADER ||--o{ ZBUG_ATTACHMENTS : "has attachments"
    ZBUG_HEADER }o--|| ZBUG_CONFIG : "uses config"
    
    ZBUG_HEADER {
        string BUG_ID PK "Bug ID (Auto-generated)"
        string REPORTER_ID "Reporter User ID"
        string BUG_TITLE "Bug Title"
        string BUG_TYPE "Bug Type"
        string PRIORITY "Priority"
        string STATUS "Status"
        string ASSIGNED_TO "Assigned Developer"
        date CREATED_DATE "Creation Date"
    }
    
    ZBUG_ITEMS {
        string BUG_ID FK "Bug ID"
        int ITEM_NO PK "Item Number"
        string FIELD_NAME "Field Name"
        string OLD_VALUE "Old Value"
        string NEW_VALUE "New Value"
    }
    
    ZBUG_HISTORY {
        string BUG_ID FK "Bug ID"
        int SEQUENCE_NO PK "Sequence Number"
        string ACTION "Action"
        date ACTION_DATE "Action Date"
        string ACTION_BY "Action By"
    }
    
    ZBUG_ATTACHMENTS {
        string BUG_ID FK "Bug ID"
        int ATTACHMENT_ID PK "Attachment ID"
        string FILE_NAME "File Name"
        raw FILE_CONTENT "File Content"
    }
    
    ZBUG_CONFIG {
        string CONFIG_KEY PK "Config Key"
        string CONFIG_VALUE "Config Value"
    }
```

---

## Sơ đồ Trình tự

### Quy trình Ghi nhận và Xử lý Lỗi

```mermaid
sequenceDiagram
    participant R as Reporter
    participant UI as ZBUG_LOG
    participant BL as Business Logic
    participant DB as Database
    participant WF as Workflow
    participant D as Developer
    participant Email as Email System
    
    R->>UI: Log Bug
    UI->>BL: Validate & Save
    BL->>DB: Store Bug
    BL->>WF: Trigger Workflow
    WF->>Email: Notify Developer
    Email->>D: Bug Assignment
    
    D->>WF: Accept/Reject
    WF->>BL: Update Status
    BL->>DB: Update Record
    BL->>Email: Send Notification
    Email->>R: Status Update
```

---

## Sơ đồ Lớp

```mermaid
classDiagram
    class ZCL_BUG_REQUEST {
        +create_bug()
        +update_bug()
        +get_bug()
        -generate_bug_id()
    }
    
    class ZCL_BUG_VALIDATOR {
        +validate_bug()
        +validate_reporter()
        +validate_description()
    }
    
    class ZCL_BUG_STATISTICS {
        +get_statistics()
        +calculate_metrics()
    }
    
    class ZCL_BUG_ATTACHMENT {
        +upload_file()
        +download_file()
        +validate_file()
    }
    
    ZCL_BUG_REQUEST --> ZCL_BUG_VALIDATOR
    ZCL_BUG_REQUEST --> ZCL_BUG_ATTACHMENT
    ZCL_BUG_STATISTICS --> ZCL_BUG_REQUEST
```

---

## Đặc tả Cơ sở Dữ liệu

*(Đặc tả chi tiết cho các bảng ZBUG_HEADER, ZBUG_ITEMS, ZBUG_HISTORY, ZBUG_CONFIG, ZBUG_ATTACHMENTS được giữ nguyên như trong tài liệu gốc. Các thiết kế này là cốt lõi và không thay đổi.)*

---

## Đặc tả API/Giao diện

### Class ZCL_BUG_REQUEST
- **Method: CREATE_BUG**: Nhận dữ liệu lỗi, trả về ID lỗi và thông báo.
- **Method: UPDATE_BUG**: Cập nhật dữ liệu một lỗi đã có.
- **Method: GET_BUG**: Lấy thông tin chi tiết một lỗi.

### Class ZCL_BUG_ATTACHMENT
- **Method: UPLOAD_FILE**: Upload file đính kèm cho một lỗi.
- **Method: DOWNLOAD_FILE**: Tải file đính kèm của một lỗi.

*(Chữ ký chi tiết của các phương thức được giữ nguyên như trong tài liệu gốc.)*

---

## Kiến trúc Workflow

- **Workflow Template**: `ZBUG_WF`
- **Logic**: Khi một lỗi được tạo, workflow được kích hoạt. Dựa trên các quy tắc trong `ZBUG_CONFIG`, một developer sẽ được tự động phân công. Các thông báo email sẽ được gửi ở các bước quan trọng (tạo, phân công, hoàn thành).

---

## Kiến trúc Bảo mật

- **Đối tượng Phân quyền**: `Z_BUG_CREATE`, `Z_BUG_VIEW`, `Z_BUG_UPDATE`, `Z_BUG_ASSIGN`, `Z_BUG_ADMIN`.
- **Role-Based Access Control (RBAC)**:
  - **BUG_BASIC**: Tạo và xem lỗi của chính mình.
  - **BUG_WORK**: Xử lý các lỗi được phân công.
  - **BUG_ADMIN**: Quản trị toàn bộ hệ thống (xem/sửa mọi lỗi, quản lý cấu hình).
- **Audit Trail**: Mọi thay đổi quan trọng đều được ghi lại trong bảng `ZBUG_HISTORY` và không thể xóa.

---

## Kiến trúc Tích hợp

- **User Management**: Tích hợp với bảng `USR02`, `USR21` để xác thực người dùng.
- **Email System**: Sử dụng Function Module `SO_DOCUMENT_SEND_API1` để gửi thông báo.
- **SmartForm**: Sử dụng `ZBUG_FORM` để in báo cáo chi tiết lỗi.

---

## Tham khảo

- **[Tổng quan Dự án](00_Project_Overview.md)**
- **[Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)**
- **[Hướng dẫn Kỹ thuật từ SAP](../../ABAP-Guides/)**

---

**← [Quay lại README](README.md)**
