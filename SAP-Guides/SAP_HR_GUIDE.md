# SAP HR (Human Resources) Guide - Comprehensive

## Table of Contents
1. [Introduction](#introduction)
2. [HR Module Overview](#hr-module-overview)
3. [Organizational Management](#organizational-management)
4. [Personnel Administration](#personnel-administration)
5. [Payroll](#payroll)
6. [Time Management](#time-management)
7. [Recruitment](#recruitment)
8. [Training and Development](#training-and-development)
9. [Employee Self-Service](#employee-self-service)
10. [HR Reporting](#hr-reporting)
11. [Best Practices](#best-practices)
12. [Summary](#summary)

---

## Introduction

SAP HR manages human resources processes including personnel, payroll, and time management.

### Key Learning Objectives
- Understand HR module structure
- Master personnel administration
- Handle payroll processing
- Manage time records

---

## HR Module Overview

**SAP HR** manages human resources processes.

### Key Components
1. **Organizational Management**: Organizational structure
2. **Personnel Administration**: Employee data
3. **Payroll**: Salary processing
4. **Time Management**: Time recording
5. **Recruitment**: Hiring process

---

## Organizational Management

### Organizational Structure

```mermaid
graph TD
    A[Company] --> B[Organizational Unit 1<br/>Sales Department]
    A --> C[Organizational Unit 2<br/>Production Department]
    
    B --> D[Position 1<br/>Sales Manager]
    B --> E[Position 2<br/>Sales Representative]
    
    C --> F[Position 3<br/>Production Manager]
    C --> G[Position 4<br/>Production Worker]
    
    D --> H[Job: Manager]
    E --> I[Job: Sales]
    F --> H
    G --> J[Job: Production]
    
    D -.->|Assigned| K[Person: John]
    E -.->|Assigned| L[Person: Mary]
    
    style A fill:#e1f5ff
    style B fill:#fff4e6
    style C fill:#e1f5ff
    style D fill:#fff4e6
    style E fill:#e1f5ff
```

**Transaction**: **PPOME** (Maintain Organizational Structure)

**Components**:
- Organizational Units
- Positions
- Jobs
- Persons

---

## Personnel Administration

### Employee Master Data

**Transaction**: **PA30** (Maintain HR Master Data)

**Key Data**:
- Personal Data
- Address
- Bank Details
- Tax Information

---

## Payroll

### Payroll Process Flow

```mermaid
flowchart TD
    Start([Payroll Period Start]) --> CollectData[Collect Time Data]
    CollectData --> CollectAbsence[Collect Absence Data]
    CollectAbsence --> CollectBenefits[Collect Benefits Data]
    
    CollectBenefits --> RunPayroll[Run Payroll<br/>PC00_M99_CLSTR]
    RunPayroll --> Calculate[Calculate Salaries]
    
    Calculate --> CalculateTax[Calculate Tax]
    CalculateTax --> CalculateDeductions[Calculate Deductions]
    CalculateDeductions --> CalculateNet[Calculate Net Pay]
    
    CalculateNet --> GeneratePayslip[Generate Payslips]
    GeneratePayslip --> PostFI[Post to FI]
    PostFI --> BankTransfer[Bank Transfer]
    BankTransfer --> End([Payroll Complete])
    
    style Start fill:#e1f5ff
    style RunPayroll fill:#fff4e6
    style CalculateNet fill:#e1f5ff
    style PostFI fill:#fff4e6
    style End fill:#e1f5ff
```

### Payroll Run

**Transaction**: **PC00_M99_CLSTR** (Payroll)

**Process**:
1. Run payroll
2. Calculate salaries
3. Generate payslips
4. Post to FI

---

## Time Management

### Time Management Flow

```mermaid
flowchart TD
    Start([Employee Time Entry]) --> Record{Record Type}
    
    Record -->|Attendance| Attendance[Record Attendance<br/>PT60]
    Record -->|Absence| Absence[Record Absence]
    Record -->|Overtime| Overtime[Record Overtime]
    
    Attendance --> Validate[Validate Time Data]
    Absence --> Validate
    Overtime --> Validate
    
    Validate --> Approve{Manager Approval}
    Approve -->|Approve| Update[Update Time Account]
    Approve -->|Reject| Notify[Notify Employee]
    Notify --> Start
    
    Update --> Payroll[Send to Payroll]
    Payroll --> End([Time Recorded])
    
    style Start fill:#e1f5ff
    style Validate fill:#fff4e6
    style Update fill:#e1f5ff
    style End fill:#fff4e6
```

### Time Recording

**Transaction**: **PT60** (Time Entry)

**Types**:
- Attendance
- Absence
- Overtime

---

## Recruitment

### Job Posting

**Transaction**: **PB00** (Recruitment)

**Process**:
1. Create job posting
2. Receive applications
3. Process applications
4. Hire candidate

---

## Best Practices

1. **Data Quality**: Accurate employee data
2. **Payroll**: Timely payroll processing
3. **Compliance**: Legal compliance

---

## Summary

HR manages human resources processes including personnel, payroll, and time management.

---

**Related Guides**:
- [SAP ERP Fundamentals Guide](./SAP_ERP_FUNDAMENTALS_GUIDE.md)


