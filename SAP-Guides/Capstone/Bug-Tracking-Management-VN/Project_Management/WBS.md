# Work Breakdown Structure (WBS)
# Hệ thống Quản lý theo dõi Lỗi

**← [Quay lại Project Management](README.md)**

---

## Mục lục

1. [Tổng quan WBS](#wbs-overview)
2. [Cấu trúc WBS Phân cấp](#hierarchical-wbs-structure)
3. [Ma trận Phụ thuộc](#dependency-matrix)
4. [Ma trận Phân bổ Tài nguyên](#resource-allocation-matrix)
5. [Từ điển WBS](#wbs-dictionary)

---

## Tổng quan WBS

### Mục đích và Phạm vi

Work Breakdown Structure (WBS) này cung cấp phân tích công việc đầy đủ cho dự án Hệ thống Quản lý theo dõi Lỗi, chia nhỏ dự án thành các gói công việc và nhiệm vụ có thể quản lý được.

### Quy ước Đánh số WBS

- **Level 1**: Project (1.0)
- **Level 2**: Phases (1.1, 1.2, 1.3, 1.4)
- **Level 3**: Sprints (1.1.1, 1.1.2, etc.)
- **Level 4**: Work Packages (1.1.1.1, 1.1.1.2, etc.)
- **Level 5**: Tasks (1.1.1.1.1, 1.1.1.1.2, etc.)

### Chú giải

| Ký hiệu | Ý nghĩa |
|---------|---------|
| **FS** | Finish-to-Start (Phụ thuộc kết thúc-bắt đầu) |
| **SS** | Start-to-Start (Phụ thuộc bắt đầu-bắt đầu) |
| **FF** | Finish-to-Finish (Phụ thuộc kết thúc-kết thúc) |
| **TM1** | Team Member 1 (Trưởng Nhóm Phát triển) |
| **TM2** | Team Member 2 (Chuyên gia Workflow) |
| **TM3** | Team Member 3 (Chuyên gia UI & Báo cáo) |
| **TM4** | Team Member 4 (Chuyên gia Biểu mẫu & Tích hợp) |
| **TM5** | Team Member 5 (Chuyên gia Phát triển & Chất lượng) |

### Trạng thái

- **NS**: Not Started (Chưa bắt đầu)
- **IP**: In Progress (Đang tiến hành)
- **C**: Complete (Hoàn thành)
- **B**: Blocked (Bị chặn)
- **OH**: On Hold (Tạm dừng)

---

## Cấu trúc WBS Phân cấp

### 1.0 Bug Tracking Management System Project

**Mô tả**: Dự án phát triển hệ thống quản lý theo dõi lỗi trong SAP  
**Thời gian**: 12 tuần (5 tháng 1 - 27 tháng 3, 2026)  
**Quy mô Nhóm**: 5 thành viên  
**Tổng Story Points**: 290-350 điểm

---

### 1.1 Phase 1: Requirements & Design

**Thời gian**: Tuần 1-2 (5-16 tháng 1, 2026)  
**Story Points**: 40-50 điểm  
**Mục tiêu**: Thu thập yêu cầu và thiết kế hệ thống

#### 1.1.1 Sprint 1: Requirements Gathering

**Thời gian**: Tuần 1 (5-9 tháng 1, 2026)  
**Story Points**: 20-25 điểm

##### 1.1.1.1 Work Package: Business Requirements Analysis

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-05  
**Ngày kết thúc**: 2026-01-09

**Deliverables**:
- Tài liệu đặc tả yêu cầu nghiệp vụ
- Ma trận truy vết yêu cầu
- Tài liệu yêu cầu phi chức năng

**Tasks**:
- 1.1.1.1.1: Review project requirements document (Abap-8.md)
- 1.1.1.1.2: Document functional requirements
- 1.1.1.1.3: Document non-functional requirements
- 1.1.1.1.4: Create requirements traceability matrix

**Dependencies**: None

##### 1.1.1.2 Work Package: Data Model Requirements

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-05  
**Ngày kết thúc**: 2026-01-09

**Deliverables**:
- Tài liệu yêu cầu mô hình dữ liệu
- Xác định các thực thể dữ liệu
- Sơ đồ quan hệ thực thể

**Tasks**:
- 1.1.1.2.1: Identify all data entities required
- 1.1.1.2.2: Map business requirements to data structures
- 1.1.1.2.3: Identify relationships between entities
- 1.1.1.2.4: Document data storage requirements

**Dependencies**: 1.1.1.1.2 (FS)

##### 1.1.1.3 Work Package: UI/UX Requirements

**Gán cho**: TM3  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-05  
**Ngày kết thúc**: 2026-01-09

**Deliverables**:
- Tài liệu yêu cầu giao diện người dùng
- User personas
- Luồng tương tác người dùng

**Tasks**:
- 1.1.1.3.1: Document screen requirements
- 1.1.1.3.2: Identify user interaction flows
- 1.1.1.3.3: Document usability requirements
- 1.1.1.3.4: Create user personas

**Dependencies**: 1.1.1.1.2 (FS)

##### 1.1.1.4 Work Package: Workflow Requirements

**Gán cho**: TM2  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-05  
**Ngày kết thúc**: 2026-01-09

**Deliverables**:
- Tài liệu yêu cầu workflow phân công
- Quy tắc phân công developer
- Ma trận phân quyền

**Tasks**:
- 1.1.1.4.1: Document assignment logic requirements
- 1.1.1.4.2: Identify assignment rules based on bug type/priority
- 1.1.1.4.3: Document routing logic
- 1.1.1.4.4: Identify assigned developers

**Dependencies**: 1.1.1.1.2 (FS)

##### 1.1.1.5 Work Package: Integration Requirements

**Gán cho**: TM4  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-05  
**Ngày kết thúc**: 2026-01-09

**Deliverables**:
- Tài liệu yêu cầu tích hợp User Management
- Tài liệu yêu cầu tích hợp Email
- Tài liệu yêu cầu xử lý đính kèm file

**Tasks**:
- 1.1.1.5.1: Review SAP user management system structure
- 1.1.1.5.2: Identify standard tables to use
- 1.1.1.5.3: Document integration requirements
- 1.1.1.5.4: Identify data mapping requirements

**Dependencies**: 1.1.1.1.2 (FS)

##### 1.1.1.6 Work Package: Test Planning

**Gán cho**: TM5  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-05  
**Ngày kết thúc**: 2026-01-09

**Deliverables**:
- Kế hoạch kiểm thử
- Kịch bản kiểm thử
- Ma trận truy vết yêu cầu

**Tasks**:
- 1.1.1.6.1: Define testing strategy
- 1.1.1.6.2: Document test levels (Unit, Integration, UAT)
- 1.1.1.6.3: Identify test environment requirements
- 1.1.1.6.4: Create test schedule

**Dependencies**: 1.1.1.1.2 (FS)

#### 1.1.2 Sprint 2: Detailed Design

**Thời gian**: Tuần 2 (12-16 tháng 1, 2026)  
**Story Points**: 20-25 điểm

##### 1.1.2.1 Work Package: Data Dictionary Design

**Gán cho**: TM1  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-12  
**Ngày kết thúc**: 2026-01-16

**Deliverables**:
- Thiết kế chi tiết 5 bảng cơ sở dữ liệu
- Thiết kế domains và data elements
- Thiết kế search helps
- Thiết kế indexes

**Tasks**:
- 1.1.2.1.1: Complete ZBUG_HEADER table design
- 1.1.2.1.2: Complete ZBUG_ITEMS table design
- 1.1.2.1.3: Complete ZBUG_HISTORY table design
- 1.1.2.1.4: Complete ZBUG_CONFIG table design
- 1.1.2.1.5: Complete ZBUG_ATTACHMENTS table design
- 1.1.2.1.6: Design domains and data elements
- 1.1.2.1.7: Design search helps
- 1.1.2.1.8: Design indexes

**Dependencies**: 1.1.1.2.4 (FS)

##### 1.1.2.2 Work Package: Class Design

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-12  
**Ngày kết thúc**: 2026-01-16

**Deliverables**:
- Thiết kế cấu trúc lớp ABAP
- Đặc tả phương thức
- Sơ đồ lớp

**Tasks**:
- 1.1.2.2.1: Design ZCL_BUG_REQUEST class structure
- 1.1.2.2.2: Design ZCL_BUG_VALIDATOR class structure
- 1.1.2.2.3: Design ZCL_BUG_STATISTICS class structure
- 1.1.2.2.4: Design ZCL_BUG_ATTACHMENT class structure
- 1.1.2.2.5: Document class interfaces and methods

**Dependencies**: 1.1.1.2.4 (FS)

##### 1.1.2.3 Work Package: Workflow Design

**Gán cho**: TM2  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-12  
**Ngày kết thúc**: 2026-01-16

**Deliverables**:
- Sơ đồ workflow
- Tài liệu nhiệm vụ workflow
- Tài liệu sự kiện workflow
- Tài liệu container elements

**Tasks**:
- 1.1.2.3.1: Create workflow process flow
- 1.1.2.3.2: Document workflow tasks
- 1.1.2.3.3: Identify workflow events
- 1.1.2.3.4: Document workflow container elements

**Dependencies**: 1.1.1.4.4 (FS)

##### 1.1.2.4 Work Package: Screen Design

**Gán cho**: TM3  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-12  
**Ngày kết thúc**: 2026-01-16

**Deliverables**:
- Mockup/wireframe màn hình
- Thiết kế bố cục màn hình
- Thiết kế luồng điều hướng

**Tasks**:
- 1.1.2.4.1: Create mockup for ZBUG_LOG screen
- 1.1.2.4.2: Create mockup for ZBUG_LIST screen
- 1.1.2.4.3: Create mockup for ZBUG_STATISTICS screen
- 1.1.2.4.4: Design screen navigation flow

**Dependencies**: 1.1.1.3.4 (FS)

##### 1.1.2.5 Work Package: SmartForm Design

**Gán cho**: TM4  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-12  
**Ngày kết thúc**: 2026-01-16

**Deliverables**:
- Thiết kế bố cục SmartForm
- Thiết kế phần header
- Thiết kế phần chi tiết lỗi
- Thiết kế phần footer

**Tasks**:
- 1.1.2.5.1: Design SmartForm header section
- 1.1.2.5.2: Design bug details section
- 1.1.2.5.3: Design developer information section
- 1.1.2.5.4: Design status and history section
- 1.1.2.5.5: Design footer section

**Dependencies**: 1.1.1.5.4 (FS)

##### 1.1.2.6 Work Package: Utility Classes Design

**Gán cho**: TM5  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-12  
**Ngày kết thúc**: 2026-01-16

**Deliverables**:
- Thiết kế lớp tiện ích
- Đặc tả phương thức tiện ích
- Kiến trúc thành phần tiện ích

**Tasks**:
- 1.1.2.6.1: Identify common utility functions needed
- 1.1.2.6.2: Design helper class requirements
- 1.1.2.6.3: Document utility function specifications
- 1.1.2.6.4: Plan utility component architecture

**Dependencies**: 1.1.2.2.5 (FS)

---

### 1.2 Phase 2: Development

**Thời gian**: Tuần 3-8 (19 tháng 1 - 27 tháng 2, 2026)  
**Story Points**: 180-210 điểm  
**Mục tiêu**: Phát triển tất cả các thành phần hệ thống

#### 1.2.1 Sprint 3: Foundation & Data Model

**Thời gian**: Tuần 3 (19-23 tháng 1, 2026)  
**Story Points**: 25-30 điểm

##### 1.2.1.1 Work Package: Database Tables Creation

**Gán cho**: TM1  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- 5 bảng cơ sở dữ liệu được tạo và kích hoạt
- Foreign keys được thiết lập
- Indexes được tạo

**Tasks**:
- 1.2.1.1.1: Create ZBUG_HEADER table (SE11)
- 1.2.1.1.2: Create ZBUG_ITEMS table (SE11)
- 1.2.1.1.3: Create ZBUG_HISTORY table (SE11)
- 1.2.1.1.4: Create ZBUG_CONFIG table (SE11)
- 1.2.1.1.5: Create ZBUG_ATTACHMENTS table (SE11)
- 1.2.1.1.6: Setup foreign keys
- 1.2.1.1.7: Create indexes
- 1.2.1.1.8: Activate all tables

**Dependencies**: 1.1.2.1.8 (FS)

##### 1.2.1.2 Work Package: Domains & Data Elements

**Gán cho**: TM1  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Domains được tạo
- Data elements được tạo
- Fixed values được thiết lập

**Tasks**:
- 1.2.1.2.1: Create ZBUG_BUG_ID domain
- 1.2.1.2.2: Create ZBUG_STATUS domain with fixed values
- 1.2.1.2.3: Create ZBUG_TYPE domain
- 1.2.1.2.4: Create ZBUG_PRIORITY domain
- 1.2.1.2.5: Create all data elements
- 1.2.1.2.6: Link data elements to domains

**Dependencies**: 1.2.1.1.8 (FS)

##### 1.2.1.3 Work Package: Search Helps

**Gán cho**: TM1  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Search helps được tạo
- Search helps được gán cho các trường

**Tasks**:
- 1.2.1.3.1: Create search help for BUG_TYPE
- 1.2.1.3.2: Create search help for REPORTER_ID
- 1.2.1.3.3: Create search help for ASSIGNED_TO
- 1.2.1.3.4: Assign search helps to fields

**Dependencies**: 1.2.1.2.6 (FS)

##### 1.2.1.4 Work Package: Number Range Setup

**Gán cho**: TM1  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Number range object được tạo
- Number range interval được thiết lập

**Tasks**:
- 1.2.1.4.1: Create number range object ZBUG_ID (SNRO)
- 1.2.1.4.2: Setup interval: 001-999
- 1.2.1.4.3: Setup reset: Daily
- 1.2.1.4.4: Test number range

**Dependencies**: None (can start in parallel)

##### 1.2.1.5 Work Package: Workflow Environment Setup

**Gán cho**: TM2  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Môi trường workflow được thiết lập
- Workflow template cơ bản được tạo

**Tasks**:
- 1.2.1.5.1: Setup workflow environment (SWDD)
- 1.2.1.5.2: Create basic workflow template structure
- 1.2.1.5.3: Configure workflow settings

**Dependencies**: 1.1.2.3.4 (FS)

##### 1.2.1.6 Work Package: Development Environment Setup

**Gán cho**: TM3  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Môi trường phát triển được thiết lập
- Cấu trúc chương trình được tạo

**Tasks**:
- 1.2.1.6.1: Setup development environment
- 1.2.1.6.2: Create program structure for ZBUG_LOG
- 1.2.1.6.3: Create program structure for ZBUG_LIST
- 1.2.1.6.4: Create program structure for ZBUG_STATISTICS

**Dependencies**: None (can start in parallel)

##### 1.2.1.7 Work Package: SmartForms Environment Setup

**Gán cho**: TM4  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Môi trường SmartForms được thiết lập
- Cấu trúc form được tạo

**Tasks**:
- 1.2.1.7.1: Setup SmartForms environment (SMARTFORMS)
- 1.2.1.7.2: Create form structure for ZBUG_FORM
- 1.2.1.7.3: Configure form settings

**Dependencies**: 1.1.2.5.5 (FS)

##### 1.2.1.8 Work Package: Utility Classes Foundation

**Gán cho**: TM5  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-19  
**Ngày kết thúc**: 2026-01-23

**Deliverables**:
- Lớp tiện ích được tạo
- Hàm trợ giúp cơ bản được triển khai
- Dữ liệu kiểm thử được tạo

**Tasks**:
- 1.2.1.8.1: Create ZCL_BUG_UTILITIES class structure
- 1.2.1.8.2: Implement basic helper functions
- 1.2.1.8.3: Create test data
- 1.2.1.8.4: Setup test framework

**Dependencies**: 1.1.2.6.4 (FS)

#### 1.2.2 Sprint 4: Core Bug Logging

**Thời gian**: Tuần 4 (26-30 tháng 1, 2026)  
**Story Points**: 30-35 điểm

##### 1.2.2.1 Work Package: ZCL_BUG_REQUEST Class

**Gán cho**: TM1  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-26  
**Ngày kết thúc**: 2026-01-30

**Deliverables**:
- Lớp ZCL_BUG_REQUEST hoàn chỉnh
- Tất cả phương thức được triển khai
- Unit tests được viết

**Tasks**:
- 1.2.2.1.1: Create ZCL_BUG_REQUEST class (SE24)
- 1.2.2.1.2: Implement CREATE_BUG method
- 1.2.2.1.3: Implement UPDATE_BUG method
- 1.2.2.1.4: Implement GET_BUG method
- 1.2.2.1.5: Implement GENERATE_BUG_ID private method
- 1.2.2.1.6: Implement LOG_HISTORY method
- 1.2.2.1.7: Integrate with number range
- 1.2.2.1.8: Write unit tests

**Dependencies**: 1.2.1.1.8, 1.2.1.4.4 (FS)

##### 1.2.2.2 Work Package: ZCL_BUG_VALIDATOR Class

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-26  
**Ngày kết thúc**: 2026-01-30

**Deliverables**:
- Lớp ZCL_BUG_VALIDATOR hoàn chỉnh
- Tất cả phương thức validation được triển khai

**Tasks**:
- 1.2.2.2.1: Create ZCL_BUG_VALIDATOR class (SE24)
- 1.2.2.2.2: Implement VALIDATE_BUG method
- 1.2.2.2.3: Implement VALIDATE_REPORTER method
- 1.2.2.2.4: Implement VALIDATE_DESCRIPTION method
- 1.2.2.2.5: Implement VALIDATE_TYPE method
- 1.2.2.2.6: Write unit tests

**Dependencies**: 1.2.2.1.1 (SS)

##### 1.2.2.3 Work Package: ZBUG_LOG Program

**Gán cho**: TM3  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-26  
**Ngày kết thúc**: 2026-01-30

**Deliverables**:
- Chương trình ZBUG_LOG hoạt động
- Màn hình selection screen
- Màn hình 0100 với Screen Painter

**Tasks**:
- 1.2.2.3.1: Create ZBUG_LOG program (SE38)
- 1.2.2.3.2: Create selection screen
- 1.2.2.3.3: Create screen 0100 (SE51)
- 1.2.2.3.4: Design screen layout with fields
- 1.2.2.3.5: Implement PBO/PAI logic
- 1.2.2.3.6: Connect with ZCL_BUG_REQUEST
- 1.2.2.3.7: Connect with ZCL_BUG_VALIDATOR
- 1.2.2.3.8: Implement message handling

**Dependencies**: 1.2.2.1.8, 1.2.2.2.6 (FS)

##### 1.2.2.4 Work Package: User Integration

**Gán cho**: TM1  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-26  
**Ngày kết thúc**: 2026-01-30

**Deliverables**:
- Tích hợp với hệ thống quản lý người dùng SAP
- Validation người dùng hoạt động

**Tasks**:
- 1.2.2.4.1: Integrate with USR02 table
- 1.2.2.4.2: Implement user validation
- 1.2.2.4.3: Implement user name retrieval
- 1.2.2.4.4: Test user integration

**Dependencies**: 1.2.2.2.3 (FS)

##### 1.2.2.5 Work Package: Email Template Design

**Gán cho**: TM4  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-26  
**Ngày kết thúc**: 2026-01-30

**Deliverables**:
- Email template cơ bản được thiết kế
- Cấu trúc email template

**Tasks**:
- 1.2.2.5.1: Design email template structure
- 1.2.2.5.2: Create subject line format
- 1.2.2.5.3: Create body content structure
- 1.2.2.5.4: Define variable placeholders

**Dependencies**: 1.1.2.5.5 (FS)

##### 1.2.2.6 Work Package: Utility Methods

**Gán cho**: TM5  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-01-26  
**Ngày kết thúc**: 2026-01-30

**Deliverables**:
- Phương thức tiện ích được triển khai
- Hàm trợ giúp hoạt động

**Tasks**:
- 1.2.2.6.1: Implement FORMAT_DATE method
- 1.2.2.6.2: Implement GET_USER_NAME method
- 1.2.2.6.3: Implement GET_STATUS_TEXT method
- 1.2.2.6.4: Implement GET_TYPE_TEXT method
- 1.2.2.6.5: Implement GET_PRIORITY_TEXT method

**Dependencies**: 1.2.1.8.4 (FS)

#### 1.2.3 Sprint 5: Workflow Implementation

**Thời gian**: Tuần 5 (2-6 tháng 2, 2026)  
**Story Points**: 30-35 điểm

##### 1.2.3.1 Work Package: Workflow Template ZBUG_WF

**Gán cho**: TM2  
**Story Points**: 13 điểm  
**Giờ**: 52-78 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-02  
**Ngày kết thúc**: 2026-02-06

**Deliverables**:
- Mẫu workflow ZBUG_WF hoàn chỉnh
- Workflow tasks được tạo
- Workflow binding được thiết lập

**Tasks**:
- 1.2.3.1.1: Complete workflow template ZBUG_WF (SWDD)
- 1.2.3.1.2: Create workflow tasks
- 1.2.3.1.3: Create workflow methods
- 1.2.3.1.4: Setup workflow container
- 1.2.3.1.5: Configure workflow binding
- 1.2.3.1.6: Test workflow end-to-end

**Dependencies**: 1.2.1.5.3, 1.2.2.1.8 (FS)

##### 1.2.3.2 Work Package: Assignment Logic

**Gán cho**: TM2  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-02  
**Ngày kết thúc**: 2026-02-06

**Deliverables**:
- Logic phân công developer hoạt động
- Quy tắc phân công được triển khai

**Tasks**:
- 1.2.3.2.1: Implement assignment by bug type
- 1.2.3.2.2: Implement assignment by priority
- 1.2.3.2.3: Implement assignment by developer skills
- 1.2.3.2.4: Implement automatic assignment rules

**Dependencies**: 1.2.3.1.1 (SS)

##### 1.2.3.3 Work Package: Agent Determination

**Gán cho**: TM2  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-02  
**Ngày kết thúc**: 2026-02-06

**Deliverables**:
- Agent determination logic hoạt động
- Developer được xác định tự động

**Tasks**:
- 1.2.3.3.1: Implement agent determination logic
- 1.2.3.3.2: Configure agent assignment rules
- 1.2.3.3.3: Test agent determination

**Dependencies**: 1.2.3.2.4 (FS)

##### 1.2.3.4 Work Package: Workflow Integration

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-02  
**Ngày kết thúc**: 2026-02-06

**Deliverables**:
- Workflow được tích hợp với bug creation
- Workflow trigger hoạt động

**Tasks**:
- 1.2.3.4.1: Integrate workflow trigger in ZCL_BUG_REQUEST
- 1.2.3.4.2: Pass bug data to workflow container
- 1.2.3.4.3: Handle workflow errors
- 1.2.3.4.4: Test workflow integration

**Dependencies**: 1.2.3.1.6 (FS)

#### 1.2.4 Sprint 6: Bug List & Filtering

**Thời gian**: Tuần 6 (9-13 tháng 2, 2026)  
**Story Points**: 25-30 điểm

##### 1.2.4.1 Work Package: ZBUG_LIST Program

**Gán cho**: TM3  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-09  
**Ngày kết thúc**: 2026-02-13

**Deliverables**:
- Chương trình ZBUG_LIST hoạt động
- Selection screen với bộ lọc

**Tasks**:
- 1.2.4.1.1: Create ZBUG_LIST program (SE38)
- 1.2.4.1.2: Create selection screen with filters
- 1.2.4.1.3: Implement filter parameters
- 1.2.4.1.4: Connect with data retrieval logic

**Dependencies**: 1.2.2.1.8 (FS)

##### 1.2.4.2 Work Package: ALV Grid Implementation

**Gán cho**: TM3  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-09  
**Ngày kết thúc**: 2026-02-13

**Deliverables**:
- ALV Grid được triển khai
- Hiển thị danh sách lỗi trong ALV

**Tasks**:
- 1.2.4.2.1: Implement ALV Grid (CL_SALV_TABLE)
- 1.2.4.2.2: Configure field catalog
- 1.2.4.2.3: Configure column display
- 1.2.4.2.4: Implement color coding for Priority/Status
- 1.2.4.2.5: Configure toolbar
- 1.2.4.2.6: Configure context menu

**Dependencies**: 1.2.4.1.4 (FS)

##### 1.2.4.3 Work Package: Filtering Logic

**Gán cho**: TM3  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-09  
**Ngày kết thúc**: 2026-02-13

**Deliverables**:
- Logic lọc hoạt động
- Bộ lọc theo status, type, priority, developer

**Tasks**:
- 1.2.4.3.1: Implement filter by status
- 1.2.4.3.2: Implement filter by bug type
- 1.2.4.3.3: Implement filter by priority
- 1.2.4.3.4: Implement filter by developer
- 1.2.4.3.5: Implement date range filter
- 1.2.4.3.6: Implement search functionality

**Dependencies**: 1.2.4.2.6 (FS)

##### 1.2.4.4 Work Package: Export to Excel

**Gán cho**: TM3  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-09  
**Ngày kết thúc**: 2026-02-13

**Deliverables**:
- Chức năng xuất Excel hoạt động
- Xuất XLSX format

**Tasks**:
- 1.2.4.4.1: Implement Excel export functionality
- 1.2.4.4.2: Configure export to XLSX format
- 1.2.4.4.3: Test Excel export

**Dependencies**: 1.2.4.2.6 (FS)

#### 1.2.5 Sprint 7: Statistics & Reporting

**Thời gian**: Tuần 7 (16-20 tháng 2, 2026)  
**Story Points**: 25-30 điểm

##### 1.2.5.1 Work Package: ZCL_BUG_STATISTICS Class

**Gán cho**: TM1  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-16  
**Ngày kết thúc**: 2026-02-20

**Deliverables**:
- Lớp ZCL_BUG_STATISTICS hoàn chỉnh
- Phương thức tính toán thống kê

**Tasks**:
- 1.2.5.1.1: Create ZCL_BUG_STATISTICS class (SE24)
- 1.2.5.1.2: Implement GET_STATISTICS method
- 1.2.5.1.3: Implement CALCULATE_METRICS method
- 1.2.5.1.4: Implement statistics by type
- 1.2.5.1.5: Implement statistics by priority
- 1.2.5.1.6: Implement statistics by developer
- 1.2.5.1.7: Write unit tests

**Dependencies**: 1.2.2.1.8 (FS)

##### 1.2.5.2 Work Package: ZBUG_STATISTICS Program

**Gán cho**: TM3  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-16  
**Ngày kết thúc**: 2026-02-20

**Deliverables**:
- Chương trình ZBUG_STATISTICS hoạt động
- Selection screen với date range

**Tasks**:
- 1.2.5.2.1: Create ZBUG_STATISTICS program (SE38)
- 1.2.5.2.2: Create selection screen with date range
- 1.2.5.2.3: Implement ALV Grid display
- 1.2.5.2.4: Connect with ZCL_BUG_STATISTICS
- 1.2.5.2.5: Implement statistics display

**Dependencies**: 1.2.5.1.7 (FS)

##### 1.2.5.3 Work Package: Statistics Calculations

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-16  
**Ngày kết thúc**: 2026-02-20

**Deliverables**:
- Tính toán thống kê chính xác
- Fixed, Waiting, Pending counts

**Tasks**:
- 1.2.5.3.1: Implement total bugs calculation
- 1.2.5.3.2: Implement fixed bugs calculation
- 1.2.5.3.3: Implement waiting bugs calculation
- 1.2.5.3.4: Implement pending bugs calculation
- 1.2.5.3.5: Implement percentage calculations

**Dependencies**: 1.2.5.1.2 (SS)

##### 1.2.5.4 Work Package: Statistics Export

**Gán cho**: TM3  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-16  
**Ngày kết thúc**: 2026-02-20

**Deliverables**:
- Xuất Excel cho thống kê hoạt động

**Tasks**:
- 1.2.5.4.1: Implement Excel export for statistics
- 1.2.5.4.2: Format statistics export
- 1.2.5.4.3: Test statistics export

**Dependencies**: 1.2.5.2.5 (FS)

#### 1.2.6 Sprint 8: Forms & Integration

**Thời gian**: Tuần 8 (23-27 tháng 2, 2026)  
**Story Points**: 25-30 điểm

##### 1.2.6.1 Work Package: SmartForm ZBUG_FORM

**Gán cho**: TM4  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-23  
**Ngày kết thúc**: 2026-02-27

**Deliverables**:
- SmartForm ZBUG_FORM hoàn chỉnh
- Form có thể in được

**Tasks**:
- 1.2.6.1.1: Complete SmartForm ZBUG_FORM (SMARTFORMS)
- 1.2.6.1.2: Implement header section
- 1.2.6.1.3: Implement bug details section
- 1.2.6.1.4: Implement developer information section
- 1.2.6.1.5: Implement status and history section
- 1.2.6.1.6: Implement footer section
- 1.2.6.1.7: Configure form interface
- 1.2.6.1.8: Test form printing

**Dependencies**: 1.2.1.7.3, 1.2.2.1.8 (FS)

##### 1.2.6.2 Work Package: Email Integration

**Gán cho**: TM4  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-23  
**Ngày kết thúc**: 2026-02-27

**Deliverables**:
- Tích hợp email hoạt động
- 4+ email templates được triển khai

**Tasks**:
- 1.2.6.2.1: Implement email integration (SO_DOCUMENT_SEND_API1)
- 1.2.6.2.2: Create Bug Logged email template
- 1.2.6.2.3: Create Bug Assigned email template
- 1.2.6.2.4: Create Bug Fixed email template
- 1.2.6.2.5: Create Bug Rejected email template
- 1.2.6.2.6: Configure email server settings
- 1.2.6.2.7: Implement email error handling
- 1.2.6.2.8: Test email sending

**Dependencies**: 1.2.2.5.4, 1.2.3.4.4 (FS)

##### 1.2.6.3 Work Package: File Attachment Handling

**Gán cho**: TM4  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-23  
**Ngày kết thúc**: 2026-02-27

**Deliverables**:
- Xử lý đính kèm file hoạt động
- Upload/download file hoạt động

**Tasks**:
- 1.2.6.3.1: Implement file upload functionality
- 1.2.6.3.2: Implement file download functionality
- 1.2.6.3.3: Implement file validation (type, size)
- 1.2.6.3.4: Implement file storage in ZBUG_ATTACHMENTS
- 1.2.6.3.5: Test file attachment handling

**Dependencies**: 1.2.1.1.5 (FS)

##### 1.2.6.4 Work Package: ZCL_BUG_ATTACHMENT Class

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-02-23  
**Ngày kết thúc**: 2026-02-27

**Deliverables**:
- Lớp ZCL_BUG_ATTACHMENT hoàn chỉnh
- Phương thức upload/download được triển khai

**Tasks**:
- 1.2.6.4.1: Create ZCL_BUG_ATTACHMENT class (SE24)
- 1.2.6.4.2: Implement UPLOAD_FILE method
- 1.2.6.4.3: Implement DOWNLOAD_FILE method
- 1.2.6.4.4: Implement VALIDATE_FILE method
- 1.2.6.4.5: Write unit tests

**Dependencies**: 1.2.6.3.1 (SS)

---

### 1.3 Phase 3: Testing & QA

**Thời gian**: Tuần 9-10 (2-13 tháng 3, 2026)  
**Story Points**: 35-45 điểm  
**Mục tiêu**: Kiểm thử toàn diện và UAT

#### 1.3.1 Sprint 9: Comprehensive Testing

**Thời gian**: Tuần 9 (2-6 tháng 3, 2026)  
**Story Points**: 20-25 điểm

##### 1.3.1.1 Work Package: Unit Testing

**Gán cho**: All Team Members  
**Story Points**: 8 điểm  
**Giờ**: 32-48 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-02  
**Ngày kết thúc**: 2026-03-06

**Deliverables**:
- Unit tests cho tất cả classes
- 80%+ code coverage
- Tất cả unit tests pass

**Tasks**:
- 1.3.1.1.1: Complete unit tests for ZCL_BUG_REQUEST (TM1)
- 1.3.1.1.2: Complete unit tests for ZCL_BUG_VALIDATOR (TM1)
- 1.3.1.1.3: Complete unit tests for ZCL_BUG_STATISTICS (TM1)
- 1.3.1.1.4: Complete unit tests for ZCL_BUG_ATTACHMENT (TM1)
- 1.3.1.1.5: Complete unit tests for workflow (TM2)
- 1.3.1.1.6: Complete unit tests for programs (TM3)
- 1.3.1.1.7: Complete unit tests for SmartForms (TM4)
- 1.3.1.1.8: Complete unit tests for utilities (TM5)
- 1.3.1.1.9: Achieve 80%+ code coverage
- 1.3.1.1.10: Fix failing unit tests

**Dependencies**: 1.2.6.4.5 (FS)

##### 1.3.1.2 Work Package: Integration Testing

**Gán cho**: TM5  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-02  
**Ngày kết thúc**: 2026-03-06

**Deliverables**:
- Integration tests hoàn chỉnh
- Tất cả integration tests pass

**Tasks**:
- 1.3.1.2.1: Test workflow integration
- 1.3.1.2.2: Test email integration
- 1.3.1.2.3: Test file attachment integration
- 1.3.1.2.4: Test user management integration
- 1.3.1.2.5: Document integration test results

**Dependencies**: 1.3.1.1.10 (FS)

##### 1.3.1.3 Work Package: System Testing

**Gán cho**: TM5  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-02  
**Ngày kết thúc**: 2026-03-06

**Deliverables**:
- System tests hoàn chỉnh
- End-to-end scenarios tested

**Tasks**:
- 1.3.1.3.1: Test bug logging end-to-end
- 1.3.1.3.2: Test assignment workflow end-to-end
- 1.3.1.3.3: Test bug list with filters end-to-end
- 1.3.1.3.4: Test statistics report end-to-end
- 1.3.1.3.5: Test file attachment end-to-end
- 1.3.1.3.6: Document system test results

**Dependencies**: 1.3.1.2.5 (FS)

##### 1.3.1.4 Work Package: Performance Testing

**Gán cho**: TM1  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-02  
**Ngày kết thúc**: 2026-03-06

**Deliverables**:
- Performance tests hoàn chỉnh
- Performance requirements met

**Tasks**:
- 1.3.1.4.1: Test statistics report performance (< 2 seconds)
- 1.3.1.4.2: Test bug list performance (< 3 seconds)
- 1.3.1.4.3: Test file upload performance (< 5 seconds)
- 1.3.1.4.4: Run SQL trace (ST05)
- 1.3.1.4.5: Run performance analysis (SAT)
- 1.3.1.4.6: Optimize performance issues

**Dependencies**: 1.3.1.3.6 (FS)

##### 1.3.1.5 Work Package: Security Testing

**Gán cho**: TM2  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-02  
**Ngày kết thúc**: 2026-03-06

**Deliverables**:
- Security tests hoàn chỉnh
- Authorization checks verified

**Tasks**:
- 1.3.1.5.1: Test reporter authorization
- 1.3.1.5.2: Test developer authorization
- 1.3.1.5.3: Test admin authorization
- 1.3.1.5.4: Test data access control
- 1.3.1.5.5: Document security test results

**Dependencies**: 1.3.1.3.6 (FS)

#### 1.3.2 Sprint 10: UAT & Refinement

**Thời gian**: Tuần 10 (9-13 tháng 3, 2026)  
**Story Points**: 15-20 điểm

##### 1.3.2.1 Work Package: UAT Preparation

**Gán cho**: TM5  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-09  
**Ngày kết thúc**: 2026-03-13

**Deliverables**:
- UAT scenarios prepared
- Test scripts created
- Test data prepared

**Tasks**:
- 1.3.2.1.1: Prepare UAT scenarios for all components
- 1.3.2.1.2: Create test scripts for all features
- 1.3.2.1.3: Prepare test data
- 1.3.2.1.4: Setup UAT environment

**Dependencies**: 1.3.1.5.5 (FS)

##### 1.3.2.2 Work Package: UAT Execution

**Gán cho**: All Team Members  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-09  
**Ngày kết thúc**: 2026-03-13

**Deliverables**:
- UAT executed
- UAT results documented
- User feedback collected

**Tasks**:
- 1.3.2.2.1: Execute UAT Script 1: Bug Logging
- 1.3.2.2.2: Execute UAT Script 2: Developer Assignment
- 1.3.2.2.3: Execute UAT Script 3: Bug List with Filters
- 1.3.2.2.4: Execute UAT Script 4: Statistics Report
- 1.3.2.2.5: Execute UAT Script 5: File Attachment
- 1.3.2.2.6: Support users during UAT
- 1.3.2.2.7: Collect user feedback
- 1.3.2.2.8: Document UAT results

**Dependencies**: 1.3.2.1.4 (FS)

##### 1.3.2.3 Work Package: Bug Fixes

**Gán cho**: All Team Members  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-09  
**Ngày kết thúc**: 2026-03-13

**Deliverables**:
- UAT bugs fixed
- System refined

**Tasks**:
- 1.3.2.3.1: Process UAT feedback for each component
- 1.3.2.3.2: Implement requested changes
- 1.3.2.3.3: Fix final bugs
- 1.3.2.3.4: Re-test fixed issues

**Dependencies**: 1.3.2.2.8 (FS)

##### 1.3.2.4 Work Package: Refinement

**Gán cho**: All Team Members  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-09  
**Ngày kết thúc**: 2026-03-13

**Deliverables**:
- System refined
- Ready for production

**Tasks**:
- 1.3.2.4.1: Final code review
- 1.3.2.4.2: Final testing
- 1.3.2.4.3: System optimization
- 1.3.2.4.4: Prepare for production

**Dependencies**: 1.3.2.3.4 (FS)

---

### 1.4 Phase 4: Documentation & Presentation

**Thời gian**: Tuần 11-12 (16-27 tháng 3, 2026)  
**Story Points**: 35-45 điểm  
**Mục tiêu**: Tài liệu hóa và trình bày dự án

#### 1.4.1 Sprint 11: Documentation

**Thời gian**: Tuần 11 (16-20 tháng 3, 2026)  
**Story Points**: 20-25 điểm

##### 1.4.1.1 Work Package: Technical Documentation

**Gán cho**: TM1  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-16  
**Ngày kết thúc**: 2026-03-20

**Deliverables**:
- Tài liệu kiến trúc hệ thống
- Tài liệu mô hình dữ liệu
- Tài liệu lớp ABAP
- Tài liệu API

**Tasks**:
- 1.4.1.1.1: Document system architecture
- 1.4.1.1.2: Document data model
- 1.4.1.1.3: Document ABAP classes
- 1.4.1.1.4: Document API
- 1.4.1.1.5: Add inline code comments

**Dependencies**: 1.3.2.4.4 (FS)

##### 1.4.1.2 Work Package: User Manual

**Gán cho**: TM3  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-16  
**Ngày kết thúc**: 2026-03-20

**Deliverables**:
- Hướng dẫn người dùng hoàn chỉnh
- Hướng dẫn điều hướng màn hình
- Hướng dẫn sử dụng báo cáo

**Tasks**:
- 1.4.1.2.1: Document screen navigation guide
- 1.4.1.2.2: Document report usage guide
- 1.4.1.2.3: Document filter usage guide
- 1.4.1.2.4: Create user manual

**Dependencies**: 1.3.2.4.4 (FS)

##### 1.4.1.3 Work Package: Admin Guide

**Gán cho**: TM2  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-16  
**Ngày kết thúc**: 2026-03-20

**Deliverables**:
- Hướng dẫn quản trị viên
- Hướng dẫn cấu hình workflow
- Hướng dẫn phân quyền

**Tasks**:
- 1.4.1.3.1: Document workflow configuration guide
- 1.4.1.3.2: Document assignment process guide
- 1.4.1.3.3: Document authorization guide
- 1.4.1.3.4: Create admin guide

**Dependencies**: 1.3.2.4.4 (FS)

##### 1.4.1.4 Work Package: API Documentation

**Gán cho**: TM1  
**Story Points**: 2 điểm  
**Giờ**: 8-12 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-16  
**Ngày kết thúc**: 2026-03-20

**Deliverables**:
- Tài liệu API hoàn chỉnh
- Tài liệu interface

**Tasks**:
- 1.4.1.4.1: Document API interfaces
- 1.4.1.4.2: Document method signatures
- 1.4.1.4.3: Document parameters and return values
- 1.4.1.4.4: Create API documentation

**Dependencies**: 1.4.1.1.4 (FS)

##### 1.4.1.5 Work Package: Test Documentation

**Gán cho**: TM5  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-16  
**Ngày kết thúc**: 2026-03-20

**Deliverables**:
- Tài liệu kiểm thử hoàn chỉnh
- Test cases documented
- Test results documented

**Tasks**:
- 1.4.1.5.1: Document test cases
- 1.4.1.5.2: Document test results
- 1.4.1.5.3: Document test coverage
- 1.4.1.5.4: Create test documentation

**Dependencies**: 1.3.2.4.4 (FS)

#### 1.4.2 Sprint 12: Presentation

**Thời gian**: Tuần 12 (23-27 tháng 3, 2026)  
**Story Points**: 15-20 điểm

##### 1.4.2.1 Work Package: Presentation Preparation

**Gán cho**: All Team Members  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-23  
**Ngày kết thúc**: 2026-03-27

**Deliverables**:
- Trình bày được chuẩn bị
- Slides được tạo

**Tasks**:
- 1.4.2.1.1: Prepare presentation section for each component
- 1.4.2.1.2: Create presentation slides
- 1.4.2.1.3: Review presentation
- 1.4.2.1.4: Practice presentation

**Dependencies**: 1.4.1.5.4 (FS)

##### 1.4.2.2 Work Package: Demo Preparation

**Gán cho**: All Team Members  
**Story Points**: 5 điểm  
**Giờ**: 20-30 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-23  
**Ngày kết thúc**: 2026-03-27

**Deliverables**:
- Demo được chuẩn bị
- Demo scenarios được tạo

**Tasks**:
- 1.4.2.2.1: Create demo scenarios for all features
- 1.4.2.2.2: Prepare demo data
- 1.4.2.2.3: Test demo scenarios
- 1.4.2.2.4: Practice demo

**Dependencies**: 1.4.2.1.4 (FS)

##### 1.4.2.3 Work Package: Q&A Preparation

**Gán cho**: All Team Members  
**Story Points**: 3 điểm  
**Giờ**: 12-18 giờ  
**Trạng thái**: NS  
**Ngày bắt đầu**: 2026-03-23  
**Ngày kết thúc**: 2026-03-27

**Deliverables**:
- Q&A được chuẩn bị
- Câu trả lời cho câu hỏi thường gặp

**Tasks**:
- 1.4.2.3.1: Prepare answers for common questions
- 1.4.2.3.2: Prepare technical explanations
- 1.4.2.3.3: Review Q&A preparation

**Dependencies**: 1.4.2.2.4 (FS)

---

## Ma trận Phụ thuộc

| WBS Code | Work Package/Task | Phụ thuộc vào | Loại Phụ thuộc | Tác động nếu Trễ |
|----------|-------------------|---------------|----------------|------------------|
| 1.1.1.2 | Data Model Requirements | 1.1.1.1.2 | FS | Trễ thiết kế data dictionary |
| 1.1.2.1 | Data Dictionary Design | 1.1.1.2.4 | FS | Trễ phát triển bảng |
| 1.2.1.1 | Database Tables Creation | 1.1.2.1.8 | FS | Chặn tất cả phát triển |
| 1.2.2.1 | ZCL_BUG_REQUEST Class | 1.2.1.1.8, 1.2.1.4.4 | FS | Chặn bug logging |
| 1.2.2.3 | ZBUG_LOG Program | 1.2.2.1.8, 1.2.2.2.6 | FS | Chặn UI bug logging |
| 1.2.3.1 | Workflow Template | 1.2.1.5.3, 1.2.2.1.8 | FS | Chặn workflow |
| 1.2.3.4 | Workflow Integration | 1.2.3.1.6 | FS | Chặn workflow trigger |
| 1.2.4.2 | ALV Grid Implementation | 1.2.4.1.4 | FS | Chặn bug list display |
| 1.2.5.2 | ZBUG_STATISTICS Program | 1.2.5.1.7 | FS | Chặn statistics report |
| 1.2.6.2 | Email Integration | 1.2.2.5.4, 1.2.3.4.4 | FS | Chặn email notifications |
| 1.2.6.4 | ZCL_BUG_ATTACHMENT Class | 1.2.6.3.1 | SS | Có thể song song |
| 1.3.1.1 | Unit Testing | 1.2.6.4.5 | FS | Chặn testing |
| 1.3.1.2 | Integration Testing | 1.3.1.1.10 | FS | Chặn integration tests |
| 1.3.2.1 | UAT Preparation | 1.3.1.5.5 | FS | Chặn UAT |
| 1.4.1.1 | Technical Documentation | 1.3.2.4.4 | FS | Có thể song song |

---

## Ma trận Phân bổ Tài nguyên

| Thành viên Nhóm | Work Packages | Tổng Story Points | Tổng Giờ | Workload theo Sprint |
|-----------------|---------------|-------------------|----------|---------------------|
| **TM1** | 25 work packages | 95-115 điểm | 380-690 giờ | Sprint 3: 15-18 SP<br>Sprint 4: 16-21 SP<br>Sprint 5: 5 SP<br>Sprint 7: 13-18 SP<br>Sprint 8: 5 SP |
| **TM2** | 8 work packages | 35-45 điểm | 140-270 giờ | Sprint 1: 5 SP<br>Sprint 2: 5 SP<br>Sprint 3: 3 SP<br>Sprint 5: 26-31 SP<br>Sprint 9: 2 SP<br>Sprint 11: 3 SP |
| **TM3** | 12 work packages | 50-65 điểm | 200-390 giờ | Sprint 1: 3 SP<br>Sprint 2: 3 SP<br>Sprint 3: 2 SP<br>Sprint 4: 8 SP<br>Sprint 6: 21-26 SP<br>Sprint 7: 8-13 SP<br>Sprint 11: 5 SP |
| **TM4** | 10 work packages | 30-40 điểm | 120-240 giờ | Sprint 1: 2 SP<br>Sprint 2: 2 SP<br>Sprint 3: 2 SP<br>Sprint 4: 3 SP<br>Sprint 8: 21-26 SP |
| **TM5** | 11 work packages | 30-40 điểm | 120-240 giờ | Sprint 1: 3 SP<br>Sprint 2: 2 SP<br>Sprint 3: 3 SP<br>Sprint 4: 3 SP<br>Sprint 9: 15-20 SP<br>Sprint 10: 10-12 SP<br>Sprint 11: 5 SP |

**Tổng**: 66 work packages, 290-350 story points, 1160-2100 giờ

---

## Từ điển WBS

### 1.1.1.1 Business Requirements Analysis

**Mục đích**: Phân tích và tài liệu hóa yêu cầu nghiệp vụ từ đặc tả dự án

**Phạm vi**: 
- Review tài liệu yêu cầu dự án
- Xác định yêu cầu chức năng và phi chức năng
- Tạo ma trận truy vết yêu cầu

**Deliverables**:
- Tài liệu đặc tả yêu cầu nghiệp vụ
- Ma trận truy vết yêu cầu
- Tài liệu yêu cầu phi chức năng

**Tiêu chí Chấp nhận**:
- Tất cả yêu cầu được tài liệu hóa
- Ma trận truy vết hoàn chỉnh
- Yêu cầu được phê duyệt

**Giả định**:
- Tài liệu yêu cầu dự án có sẵn và đầy đủ

**Ràng buộc**:
- Phải hoàn thành trong Sprint 1
- Phải được phê duyệt trước khi bắt đầu thiết kế

---

### 1.2.1.1 Database Tables Creation

**Mục đích**: Tạo và kích hoạt 5 bảng cơ sở dữ liệu cho hệ thống

**Phạm vi**:
- Tạo ZBUG_HEADER table
- Tạo ZBUG_ITEMS table
- Tạo ZBUG_HISTORY table
- Tạo ZBUG_CONFIG table
- Tạo ZBUG_ATTACHMENTS table
- Thiết lập foreign keys
- Tạo indexes
- Kích hoạt tất cả bảng

**Deliverables**:
- 5 bảng được tạo và kích hoạt
- Foreign keys được thiết lập
- Indexes được tạo

**Tiêu chí Chấp nhận**:
- Tất cả bảng được kích hoạt thành công
- Foreign keys hoạt động đúng
- Indexes được tạo đúng
- Không có lỗi activation

**Giả định**:
- Thiết kế data dictionary đã hoàn thành
- Domains và data elements đã được tạo

**Ràng buộc**:
- Phải hoàn thành trước khi phát triển classes
- Phải tuân theo thiết kế data dictionary

---

### 1.2.2.1 ZCL_BUG_REQUEST Class

**Mục đích**: Phát triển lớp chính quản lý bug với các phương thức CRUD

**Phạm vi**:
- Tạo class ZCL_BUG_REQUEST
- Triển khai CREATE_BUG method
- Triển khai UPDATE_BUG method
- Triển khai GET_BUG method
- Triển khai GENERATE_BUG_ID private method
- Triển khai LOG_HISTORY method
- Tích hợp với number range
- Viết unit tests

**Deliverables**:
- Lớp ZCL_BUG_REQUEST hoàn chỉnh
- Tất cả phương thức được triển khai
- Unit tests được viết

**Tiêu chí Chấp nhận**:
- Tất cả phương thức hoạt động đúng
- Unit tests pass
- Code coverage >= 80%
- Tích hợp với number range hoạt động
- History logging hoạt động

**Giả định**:
- Bảng cơ sở dữ liệu đã được tạo
- Number range đã được thiết lập

**Ràng buộc**:
- Phải tuân theo thiết kế class
- Phải xử lý lỗi đúng cách

---

### 1.2.3.1 Workflow Template ZBUG_WF

**Mục đích**: Tạo và triển khai mẫu workflow phân công developer

**Phạm vi**:
- Hoàn thiện workflow template ZBUG_WF
- Tạo workflow tasks
- Tạo workflow methods
- Thiết lập workflow container
- Cấu hình workflow binding
- Kiểm thử workflow end-to-end

**Deliverables**:
- Mẫu workflow ZBUG_WF hoàn chỉnh
- Workflow tasks được tạo
- Workflow binding được thiết lập

**Tiêu chí Chấp nhận**:
- Workflow được kích hoạt thành công
- Workflow tasks hoạt động đúng
- Workflow binding hoạt động đúng
- End-to-end test pass

**Giả định**:
- Thiết kế workflow đã hoàn thành
- Môi trường workflow đã được thiết lập

**Ràng buộc**:
- Phải tuân theo thiết kế workflow
- Phải tích hợp với bug creation

---

### 1.3.1.1 Unit Testing

**Mục đích**: Viết và thực thi unit tests cho tất cả classes và components

**Phạm vi**:
- Unit tests cho tất cả classes
- Unit tests cho workflow
- Unit tests cho programs
- Unit tests cho SmartForms
- Unit tests cho utilities
- Đạt 80%+ code coverage
- Sửa unit tests thất bại

**Deliverables**:
- Unit tests cho tất cả classes
- 80%+ code coverage
- Tất cả unit tests pass

**Tiêu chí Chấp nhận**:
- Tất cả unit tests pass
- Code coverage >= 80%
- Unit tests được tài liệu hóa

**Giả định**:
- Tất cả components đã được phát triển
- Test framework đã được thiết lập

**Ràng buộc**:
- Phải hoàn thành trước integration testing
- Phải đạt code coverage tối thiểu 80%

---

### 1.3.2.2 UAT Execution

**Mục đích**: Thực thi User Acceptance Testing với end users

**Phạm vi**:
- Thực thi tất cả UAT scripts
- Hỗ trợ người dùng trong UAT
- Thu thập phản hồi người dùng
- Tài liệu hóa kết quả UAT

**Deliverables**:
- UAT được thực thi
- Kết quả UAT được tài liệu hóa
- Phản hồi người dùng được thu thập

**Tiêu chí Chấp nhận**:
- Tất cả UAT scenarios pass
- Người dùng chấp nhận hệ thống
- Phản hồi được tài liệu hóa

**Giả định**:
- UAT scenarios đã được chuẩn bị
- Test data đã được chuẩn bị
- End users sẵn sàng tham gia UAT

**Ràng buộc**:
- Phải hoàn thành trong Sprint 10
- Phải có sự chấp nhận của người dùng

---

**← [Quay lại Project Management](README.md)**

**Cập nhật lần cuối**: 2026  
**Trạng thái**: Hoạt động

