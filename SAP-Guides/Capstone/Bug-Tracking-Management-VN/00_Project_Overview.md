# Tổng quan Dự án - Hệ thống Quản lý theo dõi Lỗi

**← [Quay lại README](README.md)**

---

## Mục lục

1. [Thông tin Dự án](#project-information)
2. [Cấu trúc Nhóm & Vai trò](#team-structure--roles)
3. [Tiến độ Dự án](#project-timeline)
4. [Công nghệ Sử dụng](#technology-stack)
5. [Ánh xạ Yêu cầu](#requirements-mapping)
6. [Kiến trúc Cấp cao](#high-level-architecture)
7. [Quản lý Rủi ro](#risk-management)
8. [Tiêu chí Thành công](#success-criteria)

---

## Thông tin Dự án

**Tên Dự án**: Hệ thống Quản lý theo dõi Lỗi (ZBUG)  
**Mã Dự án**: ABAP8  
**Thời gian**: 12 tuần  
**Quy mô Nhóm**: 5 thành viên  
**Loại Dự án**: Phát triển ABAP Tùy chỉnh SAP  
**Hệ thống Mục tiêu**: SAP ECC / S/4HANA

### Mục tiêu Dự án

1. **Tự động hóa Quản lý Lỗi**: Tối ưu hóa quy trình ghi nhận và xử lý lỗi
2. **Phân công Developer**: Triển khai quy trình phân công developer linh hoạt dựa trên loại/độ ưu tiên lỗi
3. **Báo cáo Toàn diện**: Cung cấp khả năng phân tích và báo cáo thống kê
4. **Trải nghiệm Người dùng**: Tạo giao diện trực quan cho người báo lỗi và developer
5. **Tích hợp**: Tích hợp liền mạch với hệ thống quản lý người dùng của SAP

### Giá trị Kinh doanh

- **Hiệu quả**: Giảm 70% thời gian xử lý lỗi thủ công
- **Minh bạch**: Khả năng hiển thị theo thời gian thực về trạng thái và tiến độ xử lý lỗi
- **Tuân thủ**: Đảm bảo phân quyền phù hợp và dấu vết kiểm tra
- **Sự hài lòng Người dùng**: Cải thiện trải nghiệm người dùng với khả năng theo dõi lỗi

---

## Cấu trúc Nhóm & Vai trò

### Thành viên Nhóm 1: Trưởng Nhóm Phát triển / Chuyên gia Mô hình Dữ liệu

**Trọng tâm Chính**: Data Dictionary, Logic ABAP Cốt lõi, Tích hợp

**Trách nhiệm Chính**:
- Thiết kế và tạo tất cả các bảng cơ sở dữ liệu (ZBUG_*)
- Phát triển các lớp ABAP cốt lõi cho logic nghiệp vụ
- Tích hợp với hệ thống quản lý người dùng
- Xem xét mã và lãnh đạo kỹ thuật
- Tối ưu hóa hiệu suất
- Khung xử lý lỗi

**Kỹ năng Kỹ thuật Yêu cầu**:
- Lập trình ABAP nâng cao
- Data Dictionary (SE11)
- ABAP Objects
- Tích hợp hệ thống người dùng
- Tối ưu hóa cơ sở dữ liệu

**Sản phẩm Chính**:
- 5 bảng cơ sở dữ liệu (Header, Items, History, Config, Attachments)
- 5+ lớp ABAP
- Mã tích hợp với hệ thống người dùng
- Tài liệu kỹ thuật

---

### Thành viên Nhóm 2: Chuyên gia Workflow & Phân công

**Trọng tâm Chính**: SAP Workflow, Logic Phân công, Phân quyền

**Trách nhiệm Chính**:
- Thiết kế và triển khai mẫu SAP Workflow
- Phát triển logic phân công developer
- Quy tắc xác định developer
- Kiểm tra phân quyền
- Giám sát và xử lý sự cố workflow
- Phát triển UI phân công

**Kỹ năng Kỹ thuật Yêu cầu**:
- SAP Workflow (SWDD, SWDD_HEAD)
- Workflow Builder
- Xác định đại lý
- Khái niệm phân quyền
- Gỡ lỗi workflow

**Sản phẩm Chính**:
- Mẫu workflow (ZBUG_WF)
- Nhiệm vụ và phương thức phân công
- Logic xác định developer
- Tài liệu workflow

---

### Thành viên Nhóm 3: Chuyên gia UI & Báo cáo

**Trọng tâm Chính**: Màn hình, Báo cáo ALV, Giao diện Người dùng

**Trách nhiệm Chính**:
- Lập trình màn hình (SE51) để ghi nhận lỗi
- Phát triển báo cáo ALV với xuất Excel
- Thiết kế và khả năng sử dụng giao diện người dùng
- Chức năng lọc và tìm kiếm
- Bố cục và định dạng báo cáo
- Tối ưu hóa trải nghiệm người dùng

**Kỹ năng Kỹ thuật Yêu cầu**:
- Screen Painter (SE51)
- Lập trình ALV (CL_SALV_TABLE, CL_SALV_GRID)
- Màn hình lựa chọn
- Chức năng xuất Excel
- Nguyên tắc thiết kế UI/UX

**Sản phẩm Chính**:
- 4 chương trình ABAP (Log, List, Statistics, Assign)
- Báo cáo ALV với xuất Excel
- Màn hình giao diện người dùng
- Hướng dẫn người dùng

---

### Thành viên Nhóm 4: Chuyên gia Biểu mẫu & Tích hợp

**Trọng tâm Chính**: SmartForms, Tích hợp Email, Xử lý Đính kèm

**Trách nhiệm Chính**:
- Phát triển SmartForm (SMARTFORMS)
- Hệ thống thông báo email
- Chức năng in
- Thiết kế mẫu email
- Kích hoạt và logic thông báo
- Xử lý đính kèm file bằng chứng

**Kỹ năng Kỹ thuật Yêu cầu**:
- SmartForms
- Tích hợp email (SO_DOCUMENT_SEND_API1)
- Chức năng in
- Thiết kế bố cục biểu mẫu
- Quy trình thông báo
- Xử lý file đính kèm

**Sản phẩm Chính**:
- SmartForm (ZBUG_FORM)
- 4+ mẫu email
- Chức năng in
- Hướng dẫn cấu hình email
- Xử lý đính kèm file

---

### Thành viên Nhóm 5: Chuyên gia Phát triển & Chất lượng

**Trọng tâm Chính**: Hỗ trợ Phát triển, Kiểm thử, Tài liệu, Đảm bảo Chất lượng

**Trách nhiệm Chính**:
- Hỗ trợ phát triển trên tất cả các module
- Phát triển các lớp tiện ích và hàm trợ giúp
- Kiểm thử đơn vị (ABAP Unit) cho các thành phần của mình
- Điều phối kiểm thử tích hợp
- Điều phối kiểm thử chấp nhận người dùng
- Phát triển và thực thi trường hợp kiểm thử
- Theo dõi và quản lý lỗi
- Tài liệu kỹ thuật và người dùng
- Tạo tài liệu đào tạo

**Kỹ năng Kỹ thuật Yêu cầu**:
- Lập trình ABAP
- Kiểm thử ABAP Unit
- Thiết kế trường hợp kiểm thử
- Viết tài liệu
- Quy trình đảm bảo chất lượng
- Đào tạo người dùng
- Xem xét mã

**Sản phẩm Chính**:
- Các lớp tiện ích và hàm trợ giúp
- Kế hoạch kiểm thử và trường hợp kiểm thử
- Tài liệu kết quả kiểm thử
- Hướng dẫn người dùng
- Tài liệu đào tạo
- Tài liệu FAQ

---

### Trách nhiệm Chung: Kiểm thử & Tài liệu

**Tất cả Thành viên Nhóm** tham gia vào:
- **Kiểm thử**: Mỗi thành viên kiểm thử các thành phần của mình và tham gia kiểm thử tích hợp
- **Tài liệu**: Mỗi thành viên tài liệu hóa công việc của mình và đóng góp vào tài liệu tổng thể
- **Xem xét Mã**: Tất cả thành viên tham gia xem xét mã đồng nghiệp
- **Đảm bảo Chất lượng**: Tất cả thành viên đảm bảo chất lượng sản phẩm của mình

---

## Tiến độ Dự án

### Tổng quan Lịch trình 12 Tuần

```mermaid
gantt
    title Bug Tracking Management System - 12 Week Project Timeline
    dateFormat YYYY-MM-DD
    section Phase 1: Requirements
    Week 1: Requirements Gathering    :a1, 2026-01-05, 7d
    Week 2: Detailed Design           :a2, after a1, 7d
    section Phase 2: Development
    Week 3: Foundation & Data Model    :b1, after a2, 7d
    Week 4: Core Functionality         :b2, after b1, 7d
    Week 5: Workflow Implementation    :b3, after b2, 7d
    Week 6: List & Filtering           :b4, after b3, 7d
    Week 7: Statistics & Reporting     :b5, after b4, 7d
    Week 8: Forms & Integration         :b6, after b5, 7d
    section Phase 3: Testing
    Week 9: Comprehensive Testing      :c1, after b6, 7d
    Week 10: UAT & Refinement          :c2, after c1, 7d
    section Phase 4: Documentation
    Week 11: Documentation              :d1, after c2, 7d
    Week 12: Presentation              :d2, after d1, 7d
```

### Cột mốc

| Tuần | Cột mốc | Sản phẩm |
|------|-----------|--------------|
| **Tuần 2** | Thiết kế Hoàn thành | Thiết kế kỹ thuật, Mô hình dữ liệu, Thiết kế workflow |
| **Tuần 4** | Chức năng Cốt lõi | Ghi nhận lỗi hoạt động |
| **Tuần 5** | Workflow Hoàn thành | Quy trình phân công developer hoạt động |
| **Tuần 7** | Báo cáo Hoàn thành | Báo cáo và thống kê hoạt động |
| **Tuần 8** | Phát triển Hoàn thành | Tất cả tính năng được triển khai |
| **Tuần 10** | Kiểm thử Hoàn thành | Tất cả kiểm thử đạt, UAT được phê duyệt |
| **Tuần 12** | Dự án Hoàn thành | Tài liệu và trình bày sẵn sàng |

### Phân tích Giai đoạn

1. **Giai đoạn 1: Yêu cầu & Thiết kế** (Tuần 1-2)
   - Thu thập và phân tích yêu cầu
   - Thiết kế và kiến trúc kỹ thuật
   - Thiết kế mô hình dữ liệu
   - Thiết kế workflow

2. **Giai đoạn 2: Phát triển** (Tuần 3-8)
   - Thiết lập nền tảng
   - Phát triển chức năng cốt lõi
   - Triển khai workflow
   - Báo cáo và biểu mẫu

3. **Giai đoạn 3: Kiểm thử & QA** (Tuần 9-10)
   - Kiểm thử đơn vị
   - Kiểm thử tích hợp
   - Kiểm thử chấp nhận người dùng

4. **Giai đoạn 4: Tài liệu & Trình bày** (Tuần 11-12)
   - Tài liệu kỹ thuật
   - Tài liệu người dùng
   - Chuẩn bị trình bày

---

## Công nghệ Sử dụng

### Thành phần SAP

| Thành phần | Công nghệ | Mục đích |
|-----------|-----------|---------|
| **Cơ sở Dữ liệu** | ABAP Data Dictionary (SE11) | Lưu trữ dữ liệu lỗi |
| **Lập trình** | ABAP Objects | Triển khai logic nghiệp vụ |
| **Workflow** | SAP Workflow (SWDD) | Tự động hóa quy trình phân công |
| **UI** | Screen Painter (SE51) | Màn hình giao diện người dùng |
| **Báo cáo** | ALV (CL_SALV_*) | Hiển thị và xuất dữ liệu |
| **Biểu mẫu** | SmartForms | Biểu mẫu báo cáo lỗi có thể in |
| **Email** | SO_DOCUMENT_SEND_API1 | Thông báo email |
| **Tích hợp** | User Management | Dữ liệu người dùng |
| **Đính kèm** | File Handling | Xử lý file bằng chứng |

### Công cụ Phát triển

- **SAP GUI**: Môi trường phát triển chính
- **ABAP Development Tools (ADT)**: IDE dựa trên Eclipse hiện đại (tùy chọn)
- **SE11**: Data Dictionary
- **SE24**: Class Builder
- **SE38**: ABAP Editor
- **SE51**: Screen Painter
- **SWDD**: Workflow Builder
- **SMARTFORMS**: Form Builder

### Tiêu chuẩn & Hướng dẫn

**Tham khảo**: 
- **[Hướng dẫn Thực hành Tốt nhất](../../ABAP-Guides/12_SAP_ABAP_BEST_PRACTICES_GUIDE.md)** - Coding standards và naming conventions
- **[Hướng dẫn Kiểm thử Đơn vị](../../ABAP-Guides/14_SAP_ABAP_UNIT_TESTING_GUIDE.md)** - ABAP Unit framework

- **Quy ước Đặt tên**: Tiền tố Z cho tất cả đối tượng tùy chỉnh (ZBUG_*)
- **Tiêu chuẩn Mã**: Tuân theo hướng dẫn mã hóa SAP
- **Tài liệu**: Nhận xét nội tuyến và tài liệu kỹ thuật
- **Kiểm thử**: ABAP Unit cho kiểm thử đơn vị

---

## Ánh xạ Yêu cầu

### Tính năng 1: Ghi nhận Lỗi

**Yêu cầu**: Cho phép người dùng ghi nhận lỗi trong hệ thống SAP

**Triển khai**:
- Chương trình màn hình: `ZBUG_LOG`
- Bảng: `ZBUG_HEADER` (header), `ZBUG_ITEMS` (items)
- Lớp: `ZCL_BUG_REQUEST` (phương thức CREATE_BUG)
- Logic tạo ID tự động

**Thành viên Nhóm**: Thành viên Nhóm 1 (Trưởng Nhóm Phát triển) + Thành viên Nhóm 3 (Chuyên gia UI)

---

### Tính năng 2: Thông báo Email

**Yêu cầu**: Gửi email đến team Developer sau khi ghi nhận lỗi

**Triển khai**:
- Kích hoạt email khi tạo lỗi mới
- Mẫu email thông báo
- Logic gửi email tự động
- Tích hợp với SO_DOCUMENT_SEND_API1

**Thành viên Nhóm**: Thành viên Nhóm 4 (Chuyên gia Biểu mẫu)

---

### Tính năng 3: Hiển thị Danh sách Lỗi

**Yêu cầu**: Hiển thị danh sách lỗi trong ALV và SmartForm với bộ lọc (trạng thái, loại, độ ưu tiên, developer)

**Triển khai**:
- Chương trình: `ZBUG_LIST`
- Bảng: `ZBUG_HEADER` (dữ liệu lỗi)
- Hiển thị ALV với lọc
- SmartForm: `ZBUG_FORM`
- Lớp: `ZCL_BUG_REPORT`

**Thành viên Nhóm**: Thành viên Nhóm 3 (Chuyên gia UI) + Thành viên Nhóm 4 (Chuyên gia Biểu mẫu)

---

### Tính năng 4: Thống kê Lỗi

**Yêu cầu**: Thống kê số lỗi (đã sửa, chờ duyệt, đang xử lý)

**Triển khai**:
- Chương trình: `ZBUG_STATISTICS`
- ALV Grid với thống kê
- Chức năng xuất Excel
- Lớp: `ZCL_BUG_STATISTICS`

**Thành viên Nhóm**: Thành viên Nhóm 3 (Chuyên gia UI)

---

### Tính năng 5: Đính kèm Bằng chứng

**Yêu cầu**: Đính kèm bằng chứng vào Bug System

**Triển khai**:
- Bảng: `ZBUG_ATTACHMENTS` (lưu trữ file)
- Lớp: `ZCL_BUG_ATTACHMENT` (xử lý file)
- Chức năng upload/download
- Validation file type và size

**Thành viên Nhóm**: Thành viên Nhóm 4 (Chuyên gia Biểu mẫu) + Thành viên Nhóm 1 (Trưởng Nhóm Phát triển)

---

## Kiến trúc Cấp cao

### Sơ đồ Kiến trúc Hệ thống

```mermaid
graph TB
    subgraph UserLayer[User Layer]
        Reporter[Reporter]
        Developer[Developer]
        Admin[Admin]
    end
    
    subgraph PresentationLayer[Presentation Layer]
        LogScreen[ZBUG_LOG<br/>Bug Logging Screen]
        ListScreen[ZBUG_LIST<br/>Bug List Screen]
        StatsScreen[ZBUG_STATISTICS<br/>Statistics Screen]
        AssignScreen[ZBUG_ASSIGN<br/>Assignment Screen]
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
    Admin --> StatsScreen
    Reporter --> ListScreen
    
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

### Tổng quan Luồng Dữ liệu

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
    BL->>Attach: Store Evidence
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

## Quản lý Rủi ro

### Ma trận Rủi ro

| Rủi ro | Xác suất | Tác động | Chiến lược Giảm thiểu | Chủ sở hữu |
|------|------------|--------|-------------------|-------|
| **Độ phức tạp Workflow** | Trung bình | Cao | Bắt đầu với workflow đơn giản, lặp lại. Tạo mẫu sớm. | Thành viên Nhóm 2 |
| **Vấn đề Xử lý File** | Trung bình | Cao | Kiểm thử tích hợp sớm. Giới hạn kích thước file. | Thành viên Nhóm 4 |
| **Vấn đề Hiệu suất** | Thấp | Trung bình | Kiểm thử hiệu suất thường xuyên. Tối ưu hóa cơ sở dữ liệu. | Thành viên Nhóm 1 |
| **Mở rộng Phạm vi** | Trung bình | Trung bình | Kiểm soát thay đổi nghiêm ngặt. Xem xét thường xuyên. | Tất cả |
| **Khả dụng Tài nguyên** | Thấp | Trung bình | Đồng bộ nhóm thường xuyên. Thời gian đệm trong lịch trình. | Tất cả |
| **Thách thức Kỹ thuật** | Trung bình | Trung bình | Thăm dò kỹ thuật sớm. Chia sẻ kiến thức. | Tất cả |
| **Thiếu thời gian Kiểm thử** | Thấp | Cao | Kiểm thử song song trong quá trình phát triển. | Thành viên Nhóm 5 |

### Chiến lược Giảm thiểu

1. **Tạo mẫu Sớm**: Xây dựng bằng chứng khái niệm cho các thành phần phức tạp
2. **Xem xét Thường xuyên**: Cuộc họp nhóm hàng tuần và xem xét mã
3. **Thời gian Đệm**: 10% đệm trong mỗi giai đoạn cho các vấn đề không mong đợi
4. **Chia sẻ Kiến thức**: Tài liệu hóa những gì đã học và chia sẻ với nhóm
5. **Phát triển Tăng dần**: Xây dựng và kiểm thử tăng dần

---

## Tiêu chí Thành công

### Tiêu chí Thành công Chức năng

- [x] Tất cả 5 tính năng được triển khai và hoạt động
- [x] Quy trình phân công developer hoạt động cho tất cả kịch bản
- [x] Hiển thị danh sách lỗi với tất cả tùy chọn lọc hoạt động
- [x] Báo cáo thống kê tạo đúng với xuất Excel
- [x] Thông báo email được gửi cho tất cả thay đổi trạng thái
- [x] SmartForm in đúng
- [x] Đính kèm file hoạt động đúng

### Tiêu chí Thành công Kỹ thuật

- [x] Tất cả bảng cơ sở dữ liệu được tạo và kích hoạt
- [x] Tất cả lớp ABAP tuân theo tiêu chuẩn mã hóa
- [x] Tất cả chương trình được kiểm thử và hoạt động
- [x] Workflow được kiểm thử cho tất cả đường dẫn phân công
- [x] Hiệu suất đáp ứng yêu cầu (< 2 giây cho báo cáo)
- [x] Không có lỗi nghiêm trọng trong mã sản xuất

### Tiêu chí Thành công Chất lượng

- [x] Tất cả kiểm thử đơn vị đạt (mục tiêu: 80% phủ sóng mã)
- [x] Tất cả kiểm thử tích hợp đạt
- [x] Kiểm thử chấp nhận người dùng được phê duyệt
- [x] Xem xét mã hoàn thành
- [x] Tài liệu hoàn chỉnh

### Tiêu chí Thành công Dự án

- [x] Dự án hoàn thành trong 12 tuần
- [x] Tất cả sản phẩm được nộp
- [x] Trình bày thành công
- [x] Đào tạo người dùng hoàn thành
- [x] Bàn giao dự án hoàn thành

---

## Tham khảo

### Tài liệu Dự án
- **[Yêu cầu Dự án](../Abap-8.md)** - Đặc tả gốc
- **[Kiến trúc Kỹ thuật](Technical_Architecture.md)** - Đặc tả kỹ thuật chi tiết
- **[Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)** - Nhiệm vụ giai đoạn chi tiết

### Hướng dẫn Dự án
- **[Hướng dẫn Capstone SAP](../../SAP-General-Guides/SAP_CAPSTONE_PROJECT_GUIDE.md)** - Architecture patterns, risk management, và project guidelines

### Hướng dẫn Kỹ thuật
- **[Hướng dẫn Thực hành Tốt nhất](../../ABAP-Guides/12_SAP_ABAP_BEST_PRACTICES_GUIDE.md)** - Coding standards
- **[Hướng dẫn Kiểm thử Đơn vị](../../ABAP-Guides/14_SAP_ABAP_UNIT_TESTING_GUIDE.md)** - Testing framework
- **[Tham khảo & Tài nguyên](References_Resources.md)** - Comprehensive guide references

---

**← [Quay lại README](README.md)** | **Tiếp theo: [Giai đoạn 1: Yêu cầu & Thiết kế](Phase1_Requirements_Design.md)**

