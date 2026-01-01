# Technical Architecture

**← [Back to README](SAP-Guides/Capstone/Employee-Leave-System/README.md)**

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Data Model](#data-model)
3. [Sequence Diagrams](#sequence-diagrams)
4. [Class Diagrams](#class-diagrams)
5. [Integration Architecture](#integration-architecture)
6. [Database Specifications](#database-specifications)
7. [API/Interface Specifications](#apiinterface-specifications)
8. [Workflow Architecture](#workflow-architecture)
9. [Security Architecture](#security-architecture)

---

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph UserLayer[User Layer]
        Employee[Employee Users]
        Manager[Manager Users]
        HR[HR Administrators]
    end
    
    subgraph PresentationLayer[Presentation Layer]
        CreateScreen[ZLEAVE_CREATE<br/>Create Leave Request]
        ApproveScreen[ZLEAVE_APPROVE<br/>Approval Interface]
        HistoryScreen[ZLEAVE_HISTORY<br/>History Lookup]
        ReportScreen[ZLEAVE_REPORT<br/>Statistics Report]
    end
    
    subgraph BusinessLayer[Business Logic Layer]
        RequestClass[ZCL_LEAVE_REQUEST<br/>Request Management]
        ValidatorClass[ZCL_LEAVE_VALIDATOR<br/>Validation Logic]
        CalculatorClass[ZCL_LEAVE_CALCULATOR<br/>Date Calculations]
        HistoryClass[ZCL_LEAVE_HISTORY<br/>History Management]
        ReportClass[ZCL_LEAVE_REPORT<br/>Reporting Logic]
    end
    
    subgraph WorkflowLayer[Workflow Layer]
        Workflow[ZLEAVE_WF<br/>Approval Workflow]
        WorkflowTasks[Workflow Tasks<br/>Approve/Reject]
    end
    
    subgraph DataLayer[Data Layer]
        HeaderTable[ZLEAVE_REQ_HDR<br/>Header Table]
        ItemTable[ZLEAVE_REQ_ITEM<br/>Items Table]
        HistoryTable[ZLEAVE_HISTORY<br/>History Table]
        ConfigTable[ZLEAVE_CONFIG<br/>Config Table]
    end
    
    subgraph IntegrationLayer[Integration Layer]
        HRModule[HR Module<br/>PA0001, PA0002]
        EmailSystem[Email System<br/>SO_DOCUMENT_SEND]
        SmartForm[ZLEAVE_FORM<br/>SmartForm]
    end
    
    Employee --> CreateScreen
    Manager --> ApproveScreen
    HR --> ReportScreen
    Employee --> HistoryScreen
    
    CreateScreen --> RequestClass
    ApproveScreen --> Workflow
    HistoryScreen --> HistoryClass
    ReportScreen --> ReportClass
    
    RequestClass --> ValidatorClass
    RequestClass --> CalculatorClass
    RequestClass --> HeaderTable
    RequestClass --> ItemTable
    RequestClass --> Workflow
    
    Workflow --> WorkflowTasks
    WorkflowTasks --> RequestClass
    
    HistoryClass --> HistoryTable
    ReportClass --> HeaderTable
    ReportClass --> HistoryTable
    
    RequestClass --> HRModule
    RequestClass --> EmailSystem
    RequestClass --> SmartForm
    
    style UserLayer fill:#e1f5ff
    style PresentationLayer fill:#fff4e6
    style BusinessLayer fill:#e1f5ff
    style WorkflowLayer fill:#fff4e6
    style DataLayer fill:#e1f5ff
    style IntegrationLayer fill:#fff4e6
```

### Component Architecture

```mermaid
graph LR
    subgraph Components[System Components]
        A[Request Management]
        B[Validation Engine]
        C[Workflow Engine]
        D[Reporting Engine]
        E[Notification Service]
    end
    
    subgraph Services[Supporting Services]
        F[ID Generation Service]
        G[Date Calculation Service]
        H[Email Service]
        I[Form Service]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    C --> H
    D --> I
    
    style Components fill:#e1f5ff
    style Services fill:#fff4e6
```

---

## Data Model

### Complete Entity Relationship Diagram

```mermaid
erDiagram
    ZLEAVE_REQ_HDR ||--o{ ZLEAVE_REQ_ITEM : "has items"
    ZLEAVE_REQ_HDR ||--o{ ZLEAVE_HISTORY : "has history"
    ZLEAVE_REQ_HDR }o--|| PA0001 : "references employee"
    ZLEAVE_REQ_HDR }o--|| ZLEAVE_CONFIG : "uses config"
    
    ZLEAVE_REQ_HDR {
        string REQ_ID PK "Request ID (Auto-generated)"
        string EMPLOYEE_ID FK "Employee Number"
        string LEAVE_TYPE "Leave Type (Annual, Sick, etc.)"
        date START_DATE "Leave Start Date"
        date END_DATE "Leave End Date"
        decimal DAYS "Number of Days"
        string STATUS "Status (P/A/R/C)"
        string CREATED_BY "Created By User"
        timestamp CREATED_DATE "Creation Date/Time"
        string APPROVED_BY "Approved By User"
        timestamp APPROVED_DATE "Approval Date/Time"
        string COMMENTS "Comments"
    }
    
    ZLEAVE_REQ_ITEM {
        string REQ_ID PK,FK "Request ID"
        int ITEM_NO PK "Item Number"
        date DATE "Leave Date"
        string DAY_TYPE "Full Day / Half Day"
        string REMARKS "Remarks"
    }
    
    ZLEAVE_HISTORY {
        string REQ_ID PK,FK "Request ID"
        int SEQUENCE_NO PK "Sequence Number"
        string ACTION "Action (Created, Approved, Rejected)"
        timestamp ACTION_DATE "Action Date/Time"
        string ACTION_BY "Action By User"
        string OLD_STATUS "Previous Status"
        string NEW_STATUS "New Status"
        string COMMENTS "Comments"
    }
    
    ZLEAVE_CONFIG {
        string LEAVE_TYPE PK "Leave Type"
        int MIN_DAYS "Minimum Days"
        int MAX_DAYS "Maximum Days"
        int APPROVAL_LEVEL "Approval Level Required"
        string DESCRIPTION "Description"
    }
    
    PA0001 {
        string PERNR PK "Personnel Number"
        string ENAME "Employee Name"
        string ORGEH "Organizational Unit"
        string VORGES "Direct Manager"
    }
```

### Table Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| ZLEAVE_REQ_HDR → ZLEAVE_REQ_ITEM | One-to-Many | One header can have multiple items (for partial days) |
| ZLEAVE_REQ_HDR → ZLEAVE_HISTORY | One-to-Many | One request can have multiple history entries |
| ZLEAVE_REQ_HDR → PA0001 | Many-to-One | Multiple requests belong to one employee |
| ZLEAVE_REQ_HDR → ZLEAVE_CONFIG | Many-to-One | Multiple requests use same leave type config |

---

## Sequence Diagrams

### Leave Request Creation Flow

```mermaid
sequenceDiagram
    participant User as Employee
    participant Screen as ZLEAVE_CREATE
    participant Validator as ZCL_LEAVE_VALIDATOR
    participant Request as ZCL_LEAVE_REQUEST
    participant Calculator as ZCL_LEAVE_CALCULATOR
    participant HR as HR Module
    participant DB as Database
    participant Workflow as ZLEAVE_WF
    
    User->>Screen: Enter Leave Details
    Screen->>Validator: Validate Request
    Validator->>HR: Check Employee Exists
    HR-->>Validator: Employee Data
    Validator->>Validator: Validate Dates
    Validator->>DB: Check Overlapping Requests
    DB-->>Validator: Overlap Status
    Validator-->>Screen: Validation Result
    
    alt Valid Request
        Screen->>Request: Create Request
        Request->>Calculator: Calculate Days
        Calculator-->>Request: Number of Days
        Request->>Request: Generate Request ID
        Request->>DB: Save Request Header
        DB-->>Request: Success
        Request->>DB: Save Request Items
        DB-->>Request: Success
        Request->>Workflow: Trigger Approval Workflow
        Workflow-->>Request: Workflow Triggered
        Request-->>Screen: Request Created
        Screen->>User: Success Message with Request ID
    else Invalid Request
        Screen->>User: Display Validation Errors
    end
```

### Approval Workflow Flow

```mermaid
sequenceDiagram
    participant Request as Leave Request
    participant Workflow as ZLEAVE_WF
    participant Agent as Agent Determination
    participant HR as HR Module
    participant Manager as Manager
    participant Email as Email System
    participant History as ZLEAVE_HISTORY
    participant DB as Database
    
    Request->>Workflow: Trigger Workflow Event
    Workflow->>Agent: Determine Approval Level
    Agent->>DB: Get Request Days
    DB-->>Agent: Leave Days
    Agent->>Agent: Calculate Approval Level
    Agent->>HR: Get Manager Info
    HR-->>Agent: Manager Details
    Agent-->>Workflow: Approver ID
    
    Workflow->>Email: Send Approval Notification
    Email->>Manager: Approval Request Email
    Manager->>Workflow: Open Approval Task
    Manager->>Workflow: Approve/Reject
    
    alt Approved
        Workflow->>Request: Update Status to Approved
        Request->>DB: Update Request Status
        Request->>History: Log Approval Action
        History->>DB: Save History Entry
        Request->>Email: Send Confirmation
        Email->>Manager: Approval Confirmation
        Email->>Employee: Status Update Email
    else Rejected
        Workflow->>Request: Update Status to Rejected
        Request->>DB: Update Request Status
        Request->>History: Log Rejection Action
        History->>DB: Save History Entry
        Request->>Email: Send Rejection Notification
        Email->>Employee: Rejection Email
    end
```

### History Lookup Flow

```mermaid
sequenceDiagram
    participant User
    participant Screen as ZLEAVE_HISTORY
    participant History as ZCL_LEAVE_HISTORY
    participant DB as Database
    participant ALV as ALV Display
    
    User->>Screen: Enter Filter Criteria
    Screen->>History: Get History Data
    History->>DB: Query History Table
    DB-->>History: History Records
    History->>DB: Query Request Header
    DB-->>History: Request Details
    History-->>Screen: Combined Data
    Screen->>ALV: Display Results
    ALV->>User: Show Filtered Results
    
    User->>ALV: Apply Additional Filters
    ALV->>History: Refine Query
    History->>DB: Query with Filters
    DB-->>History: Filtered Records
    History-->>ALV: Updated Results
    ALV->>User: Updated Display
```

### Reporting Flow

```mermaid
sequenceDiagram
    participant User
    participant Screen as ZLEAVE_REPORT
    participant Report as ZCL_LEAVE_REPORT
    participant DB as Database
    participant ALV as ALV Report
    participant Excel as Excel Export
    
    User->>Screen: Enter Report Parameters
    Screen->>Report: Generate Report
    Report->>DB: Query Request Data
    DB-->>Report: Request Records
    Report->>Report: Calculate Statistics
    Report->>Report: Aggregate Data
    Report-->>Screen: Report Data
    Screen->>ALV: Display Report
    ALV->>User: Show Statistics
    
    User->>ALV: Export to Excel
    ALV->>Excel: Generate Excel File
    Excel->>User: Download File
```

---

## Class Diagrams

### Class Structure

```mermaid
classDiagram
    class ZCL_LEAVE_REQUEST {
        -mv_request_id
        +get_instance()
        +create_request()
        +update_request()
        +get_request()
        -generate_request_id()
        -save_to_database()
    }
    
    class ZCL_LEAVE_VALIDATOR {
        +validate_request()
        -validate_employee()
        -validate_dates()
        -validate_leave_balance()
        -check_overlapping()
    }
    
    class ZCL_LEAVE_CALCULATOR {
        +calculate_days()
        +get_working_days()
        -exclude_weekends()
        -exclude_holidays()
    }
    
    class ZCL_LEAVE_HISTORY {
        +get_history()
        +log_action()
        -format_history_entry()
    }
    
    class ZCL_LEAVE_REPORT {
        +get_statistics()
        +calculate_metrics()
        +generate_report_data()
        -aggregate_data()
    }
    
    ZCL_LEAVE_REQUEST --> ZCL_LEAVE_VALIDATOR
    ZCL_LEAVE_REQUEST --> ZCL_LEAVE_CALCULATOR
    ZCL_LEAVE_REQUEST --> ZCL_LEAVE_HISTORY
    ZCL_LEAVE_REPORT --> ZCL_LEAVE_HISTORY
```

### Class Relationships

| Relationship | Type | Description |
|--------------|------|-------------|
| ZCL_LEAVE_REQUEST → ZCL_LEAVE_VALIDATOR | Uses | Request class uses validator for validation |
| ZCL_LEAVE_REQUEST → ZCL_LEAVE_CALCULATOR | Uses | Request class uses calculator for date calculations |
| ZCL_LEAVE_REQUEST → ZCL_LEAVE_HISTORY | Uses | Request class uses history for logging |
| ZCL_LEAVE_REPORT → ZCL_LEAVE_HISTORY | Uses | Report class uses history for reporting |

---

## Integration Architecture

### Integration Points

```mermaid
graph TB
    subgraph LeaveSystem[Leave Management System]
        A[ZLEAVE Components]
    end
    
    subgraph HRSystem[HR Module]
        B[PA0001 - Employee Master]
        C[PA0002 - Personal Data]
    end
    
    subgraph WorkflowSystem[Workflow System]
        D[ZLEAVE_WF]
        E[Workflow Tasks]
    end
    
    subgraph EmailSystem[Email System]
        F[SO_DOCUMENT_SEND]
        G[Email Templates]
    end
    
    subgraph FormSystem[Form System]
        H[ZLEAVE_FORM]
        I[SmartForms Engine]
    end
    
    A --> B
    A --> C
    A --> D
    D --> E
    A --> F
    F --> G
    A --> H
    H --> I
    
    style LeaveSystem fill:#e1f5ff
    style HRSystem fill:#fff4e6
    style WorkflowSystem fill:#e1f5ff
    style EmailSystem fill:#fff4e6
    style FormSystem fill:#e1f5ff
```

### Integration Details

| Integration Point | Method | Purpose | Data Exchanged |
|-------------------|--------|---------|----------------|
| HR Module | SELECT | Get employee data | Employee ID, Name, Manager |
| Workflow | Event Trigger | Trigger approval | Request ID, Approver |
| Email System | Function Call | Send notifications | Email content, Recipients |
| SmartForms | Form Call | Generate print form | Request data |

---

## Database Specifications

### ZLEAVE_REQ_HDR Table

**Table Name**: ZLEAVE_REQ_HDR  
**Description**: Leave Request Header Table  
**Delivery Class**: A (Application table)  
**Data Browser**: Display/Maintenance Allowed

**Fields**:

| Field Name | Data Element | Data Type | Length | Key | Not Null | Description |
|------------|--------------|-----------|--------|-----|----------|-------------|
| MANDT | MANDT | CLNT | 3 | X | X | Client |
| REQ_ID | ZLEAVE_REQ_ID | CHAR | 10 | X | X | Request ID |
| EMPLOYEE_ID | PERNR_D | NUMC | 8 | | X | Employee Number |
| LEAVE_TYPE | ZLEAVE_TYPE | CHAR | 4 | | X | Leave Type |
| START_DATE | DATUM | DATS | 8 | | X | Start Date |
| END_DATE | DATUM | DATS | 8 | | X | End Date |
| DAYS | ZLEAVE_DAYS | DEC | 5,2 | | X | Number of Days |
| STATUS | ZLEAVE_STATUS | CHAR | 1 | | X | Status |
| CREATED_BY | SYUNAME | CHAR | 12 | | X | Created By |
| CREATED_DATE | TIMESTAMP | TIMESTAMP | 15 | | X | Creation Date |
| APPROVED_BY | SYUNAME | CHAR | 12 | | | Approved By |
| APPROVED_DATE | TIMESTAMP | TIMESTAMP | 15 | | | Approval Date |
| COMMENTS | ZLEAVE_COMMENTS | CHAR | 255 | | | Comments |

**Primary Key**: MANDT, REQ_ID  
**Foreign Keys**: EMPLOYEE_ID → PA0001-PERNR  
**Indexes**: 
- Secondary index on EMPLOYEE_ID
- Secondary index on STATUS
- Secondary index on CREATED_DATE

### ZLEAVE_REQ_ITEM Table

**Table Name**: ZLEAVE_REQ_ITEM  
**Description**: Leave Request Items Table  
**Delivery Class**: A  
**Data Browser**: Display/Maintenance Allowed

**Fields**:

| Field Name | Data Element | Data Type | Length | Key | Not Null | Description |
|------------|--------------|-----------|--------|-----|----------|-------------|
| MANDT | MANDT | CLNT | 3 | X | X | Client |
| REQ_ID | ZLEAVE_REQ_ID | CHAR | 10 | X | X | Request ID |
| ITEM_NO | ZLEAVE_ITEM_NO | NUMC | 4 | X | X | Item Number |
| DATE | DATUM | DATS | 8 | | X | Leave Date |
| DAY_TYPE | ZLEAVE_DAY_TYPE | CHAR | 1 | | X | Full/Half Day |
| REMARKS | ZLEAVE_REMARKS | CHAR | 100 | | | Remarks |

**Primary Key**: MANDT, REQ_ID, ITEM_NO  
**Foreign Keys**: REQ_ID → ZLEAVE_REQ_HDR-REQ_ID

### ZLEAVE_HISTORY Table

**Table Name**: ZLEAVE_HISTORY  
**Description**: Leave Request History/Audit Log  
**Delivery Class**: A  
**Data Browser**: Display Only

**Fields**:

| Field Name | Data Element | Data Type | Length | Key | Not Null | Description |
|------------|--------------|-----------|--------|-----|----------|-------------|
| MANDT | MANDT | CLNT | 3 | X | X | Client |
| REQ_ID | ZLEAVE_REQ_ID | CHAR | 10 | X | X | Request ID |
| SEQUENCE_NO | ZLEAVE_SEQ_NO | NUMC | 6 | X | X | Sequence Number |
| ACTION | ZLEAVE_ACTION | CHAR | 1 | | X | Action |
| ACTION_DATE | TIMESTAMP | TIMESTAMP | 15 | | X | Action Date |
| ACTION_BY | SYUNAME | CHAR | 12 | | X | Action By |
| OLD_STATUS | ZLEAVE_STATUS | CHAR | 1 | | | Old Status |
| NEW_STATUS | ZLEAVE_STATUS | CHAR | 1 | | | New Status |
| COMMENTS | ZLEAVE_COMMENTS | CHAR | 255 | | | Comments |

**Primary Key**: MANDT, REQ_ID, SEQUENCE_NO  
**Foreign Keys**: REQ_ID → ZLEAVE_REQ_HDR-REQ_ID

### ZLEAVE_CONFIG Table

**Table Name**: ZLEAVE_CONFIG  
**Description**: Leave Configuration Table  
**Delivery Class**: C (Customizing table)  
**Data Browser**: Display/Maintenance Allowed

**Fields**:

| Field Name | Data Element | Data Type | Length | Key | Not Null | Description |
|------------|--------------|-----------|--------|-----|----------|-------------|
| MANDT | MANDT | CLNT | 3 | X | X | Client |
| LEAVE_TYPE | ZLEAVE_TYPE | CHAR | 4 | X | X | Leave Type |
| MIN_DAYS | ZLEAVE_MIN_DAYS | INT1 | 3 | | | Minimum Days |
| MAX_DAYS | ZLEAVE_MAX_DAYS | INT1 | 3 | | | Maximum Days |
| APPROVAL_LEVEL | ZLEAVE_APPROVAL_LEVEL | INT1 | 3 | | | Approval Level |
| DESCRIPTION | ZLEAVE_DESC | CHAR | 50 | | | Description |

**Primary Key**: MANDT, LEAVE_TYPE

---

## API/Interface Specifications

### ZCL_LEAVE_REQUEST - Public Methods

#### CREATE_REQUEST

**Method Signature**:
```abap
METHODS create_request
  IMPORTING is_request_data TYPE zst_leave_request
  EXPORTING ev_request_id TYPE zleave_req_id
            et_messages TYPE bapiret2_t.
```

**Parameters**:
- `is_request_data`: Request data structure
- `ev_request_id`: Generated request ID
- `et_messages`: Return messages

**Return Values**:
- Success: Request ID generated, messages with type 'S'
- Error: Empty request ID, messages with type 'E'

#### GET_REQUEST

**Method Signature**:
```abap
METHODS get_request
  IMPORTING iv_request_id TYPE zleave_req_id
  EXPORTING es_request_data TYPE zst_leave_request
            et_messages TYPE bapiret2_t.
```

**Parameters**:
- `iv_request_id`: Request ID to retrieve
- `es_request_data`: Retrieved request data
- `et_messages`: Return messages

---

## Workflow Architecture

### Workflow Template Structure

```mermaid
flowchart TD
    Start([Start Event:<br/>Leave Request Created]) --> CheckDays{Check Leave Days}
    
    CheckDays -->|"< 5 days"| Level1[Level 1:<br/>Direct Manager]
    CheckDays -->|"5-10 days"| Level2[Level 2:<br/>Department Head]
    CheckDays -->|"> 10 days"| Level3[Level 3:<br/>HR Director]
    
    Level1 --> Task1[Task: ZLEAVE_APPROVE_TASK]
    Level2 --> Task2[Task: ZLEAVE_APPROVE_TASK]
    Level3 --> Task3[Task: ZLEAVE_APPROVE_TASK]
    
    Task1 --> Decision{Approved?}
    Task2 --> Decision
    Task3 --> Decision
    
    Decision -->|Yes| UpdateStatus1[Update Status: Approved]
    Decision -->|No| UpdateStatus2[Update Status: Rejected]
    
    UpdateStatus1 --> SendEmail1[Send Confirmation Email]
    UpdateStatus2 --> SendEmail2[Send Rejection Email]
    
    SendEmail1 --> End([End Event])
    SendEmail2 --> End
    
    style Start fill:#e1f5ff
    style Level1 fill:#fff4e6
    style Level2 fill:#fff4e6
    style Level3 fill:#fff4e6
    style End fill:#e1f5ff
```

### Workflow Container Elements

| Element Name | Type | Description |
|--------------|------|-------------|
| REQ_ID | ZLEAVE_REQ_ID | Request ID |
| EMPLOYEE_ID | PERNR_D | Employee Number |
| LEAVE_DAYS | ZLEAVE_DAYS | Number of Leave Days |
| APPROVAL_LEVEL | INT1 | Required Approval Level |
| APPROVER_ID | PERNR_D | Approver Employee ID |
| STATUS | ZLEAVE_STATUS | Request Status |

---

## Security Architecture

### Authorization Concept

```mermaid
graph TB
    subgraph Roles[User Roles]
        Employee[Employee Role]
        Manager[Manager Role]
        HR[HR Admin Role]
    end
    
    subgraph Permissions[Permissions]
        Create[Create Request]
        ViewOwn[View Own Requests]
        Approve[Approve Requests]
        ViewAll[View All Requests]
        Configure[Configure System]
    end
    
    Employee --> Create
    Employee --> ViewOwn
    Manager --> ViewOwn
    Manager --> Approve
    HR --> ViewAll
    HR --> Approve
    HR --> Configure
    
    style Roles fill:#e1f5ff
    style Permissions fill:#fff4e6
```

### Authorization Objects

| Authorization Object | Field | Values | Description |
|---------------------|-------|--------|-------------|
| Z_LEAVE_REQ | ACTVT | 01 (Create), 02 (Change), 03 (Display) | Leave Request Authorization |
| Z_LEAVE_REQ | REQ_TYPE | * (All), ANNU, SICK, etc. | Leave Type Restriction |
| Z_LEAVE_APPROVE | ACTVT | 02 (Approve) | Approval Authorization |
| Z_LEAVE_APPROVE | ORG_UNIT | * (All), specific org unit | Organizational Unit Restriction |

---

## References

- **[Project Overview](00_Project_Overview.md)** - Project context
- **[Phase 1: Requirements & Design](Phase1_Requirements_Design.md)** - Design details
- **[Phase 2: Development](Phase2_Development.md)** - Implementation details
- **[Data Dictionary Guide](../../ABAP-Guides/02_SAP_ABAP_DATA_DICTIONARY_GUIDE.md)** - Table design
- **[ABAP Objects Guide](../../ABAP-Guides/08_SAP_ABAP_OBJECTS_GUIDE.md)** - Class design

---

**← [Back to README](SAP-Guides/Capstone/Employee-Leave-System/README.md)**




