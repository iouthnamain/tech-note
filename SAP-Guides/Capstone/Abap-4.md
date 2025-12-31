# ABAP4 - Employee Leave Request and Approval System

**Hệ thống yêu cầu và phê duyệt nghỉ phép nhân viên**

---

## Project Overview

This ABAP project implements a comprehensive employee leave management system with request creation, approval workflow, history tracking, reporting, and notification capabilities.

---

## Features

### 1. Create Leave Request
**Tạo yêu cầu nghỉ phép**
- Input leave details
- Auto-generate request ID
- **Vietnamese**: Nhập thông tin nghỉ phép, tự động tạo ID yêu cầu

### 2. Approve/Reject Requests
**Phê duyệt/Từ chối yêu cầu**
   - Manager approval workflow
- **Vietnamese**: Workflow phê duyệt của quản lý

### 3. Leave History Lookup
**Tra cứu lịch sử nghỉ phép**
- Filter by date
- Filter by status
- Filter by leave type
- **Vietnamese**: Lọc theo ngày, trạng thái, loại nghỉ

### 4. Leave Statistics & Reporting
**Thống kê & Báo cáo nghỉ phép**
   - ALV report with export to Excel
- **Vietnamese**: ALV report với xuất Excel

### 5. Email Notifications & Print Form
**Thông báo Email & In đơn**
- SmartForm for leave request
- **Vietnamese**: SmartForm cho đơn nghỉ phép

---

## Technical Components

- **ABAP Development**: Core programming logic
- **Workflow**: Manager approval process
- **ALV Reports**: Data display and export functionality
- **SmartForms**: Print form generation
- **Email Integration**: Notification system
- **Database Tables**: Leave request storage and tracking

---

## Project Structure

```
ZLEAVE_* (Custom Objects)
├── Tables
│   ├── ZLEAVE_REQ_HDR    (Leave Request Header)
│   ├── ZLEAVE_REQ_ITEM   (Leave Request Items)
│   └── ZLEAVE_HISTORY    (Leave History Log)
├── Programs
│   ├── ZLEAVE_CREATE     (Create Leave Request)
│   ├── ZLEAVE_APPROVE    (Approval Workflow)
│   ├── ZLEAVE_HISTORY    (History Lookup)
│   └── ZLEAVE_REPORT     (Statistics & Reporting)
├── SmartForms
│   └── ZLEAVE_FORM       (Print Form)
└── Workflow
    └── ZLEAVE_WF         (Approval Workflow)
```

---

## Key Functionality

1. **Request Management**: Create and manage leave requests with unique IDs
2. **Approval Process**: Multi-level approval workflow for managers
3. **History Tracking**: Complete audit trail of all leave requests
4. **Reporting**: Comprehensive ALV reports with Excel export
5. **Notifications**: Automated email notifications for status changes
6. **Documentation**: SmartForm-based printable leave request forms
