# SAP MM (Materials Management) Guide - Comprehensive

## Table of Contents
1. [Introduction](#introduction)
2. [MM Module Overview](#mm-module-overview)
3. [Material Master](#material-master)
4. [Vendor Master](#vendor-master)
5. [Procurement Process](#procurement-process)
6. [Purchase Requisition](#purchase-requisition)
7. [Purchase Order](#purchase-order)
8. [Goods Receipt](#goods-receipt)
9. [Invoice Verification](#invoice-verification)
10. [Inventory Management](#inventory-management)
11. [Material Valuation](#material-valuation)
12. [Physical Inventory](#physical-inventory)
13. [Integration with Other Modules](#integration-with-other-modules)
14. [Best Practices](#best-practices)
15. [Summary](#summary)

---

## Introduction

SAP MM (Materials Management) handles procurement, inventory management, and material master data.

### Key Learning Objectives
- Master Material Master data
- Handle procurement process
- Process Purchase Orders
- Manage inventory
- Perform invoice verification

---

## MM Module Overview

**SAP MM** manages materials, procurement, and inventory.

### Key Components
1. **Material Master**: Material data
2. **Vendor Master**: Supplier data
3. **Procurement**: Purchasing process
4. **Inventory Management**: Stock management
5. **Invoice Verification**: Invoice processing

---

## Material Master

### Material Master Data Structure

```mermaid
graph TB
    A[Material Master] --> B[Basic Data View]
    A --> C[Purchasing View]
    A --> D[Sales View]
    A --> E[Accounting View]
    A --> F[Warehouse Management View]
    A --> G[Production View]
    
    B --> B1[Material Number]
    B --> B2[Description]
    B --> B3[Material Type]
    B --> B4[Base Unit]
    
    C --> C1[Purchasing Group]
    C --> C2[Vendor Data]
    C --> C3[Purchase Price]
    
    D --> D1[Sales Organization]
    D --> D2[Sales Price]
    D --> D3[Shipping Data]
    
    E --> E1[Valuation Class]
    E --> E2[Price Control]
    E --> E3[Standard Price]
    
    style A fill:#e1f5ff
    style B fill:#fff4e6
    style C fill:#e1f5ff
    style D fill:#fff4e6
    style E fill:#e1f5ff
```

### Creating Material

**Transaction**: **MM01** (Create), **MM02** (Change), **MM03** (Display)

**Key Views**:
- Basic Data
- Purchasing
- Sales
- Accounting
- Warehouse Management

**Example**:
```
Material: MAT-001
Description: Office Chair
Material Type: FERT (Finished Product)
Base Unit: EA (Each)
```

---

## Vendor Master

### Creating Vendor

**Transaction**: **XK01** (Create), **XK02** (Change), **XK03** (Display)

**Key Data**:
- Vendor Number
- Name and Address
- Payment Terms
- Purchasing Organization Data

---

## Procurement Process

### Complete Procurement Process Flow

```mermaid
flowchart TD
    Start([Material Requirement]) --> CreatePR[Create Purchase Requisition<br/>ME51N]
    CreatePR --> ApprovePR{Approve PR?}
    
    ApprovePR -->|No| Reject[Reject PR]
    Reject --> End([End])
    ApprovePR -->|Yes| CreatePO[Create Purchase Order<br/>ME21N]
    
    CreatePO --> SendPO[Send PO to Vendor]
    SendPO --> VendorDelivers[Vendor Delivers Materials]
    
    VendorDelivers --> GoodsReceipt[Goods Receipt<br/>MIGO]
    GoodsReceipt --> UpdateInventory[Update Inventory]
    
    UpdateInventory --> ReceiveInvoice[Receive Vendor Invoice]
    ReceiveInvoice --> InvoiceVerification[Invoice Verification<br/>MIRO]
    
    InvoiceVerification --> ThreeWay{3-Way Match}
    ThreeWay -->|Match| PostInvoice[Post Invoice to FI]
    ThreeWay -->|No Match| Error[Error Handling]
    Error --> InvoiceVerification
    
    PostInvoice --> Payment[Payment Processing]
    Payment --> End
    
    style Start fill:#e1f5ff
    style CreatePO fill:#fff4e6
    style GoodsReceipt fill:#e1f5ff
    style InvoiceVerification fill:#fff4e6
    style Payment fill:#e1f5ff
    style End fill:#fff4e6
```

---

## Purchase Requisition

**Transaction**: **ME51N** (Create), **ME52N** (Change), **ME53N** (Display)

**Purpose**: Internal request for materials

---

## Purchase Order

**Transaction**: **ME21N** (Create), **ME22N** (Change), **ME23N** (Display)

**Key Fields**:
- Vendor
- Material
- Quantity
- Price
- Delivery Date

**Example**:
```
PO: 4500000123
Vendor: 100001
Material: MAT-001
Quantity: 100
Price: 50.00
```

---

## Goods Receipt

**Transaction**: **MIGO** (Goods Movement)

**Process**:
1. Enter Purchase Order
2. Enter quantity received
3. Post goods receipt
4. Update inventory

---

## Invoice Verification

**Transaction**: **MIRO** (Invoice Verification)

**3-Way Match Diagram**:

```mermaid
graph TB
    subgraph Documents[Source Documents]
        A[Purchase Order<br/>PO Number: 4500000123<br/>Amount: 5,000<br/>Quantity: 100]
        B[Goods Receipt<br/>GR Number: 5000000123<br/>Quantity: 100<br/>Date: 2024-01-15]
    end
    
    subgraph Invoice[Invoice Verification]
        C[Vendor Invoice<br/>Invoice Number: INV-001<br/>Amount: 5,000<br/>Quantity: 100]
    end
    
    subgraph Match[3-Way Match Validation]
        D{PO Amount =<br/>Invoice Amount?}
        E{GR Quantity =<br/>Invoice Quantity?}
        F{All Match?}
    end
    
    subgraph Result[Result]
        G[Match Success<br/>Post to FI]
        H[Match Failure<br/>Block Invoice]
    end
    
    A --> D
    B --> E
    C --> D
    C --> E
    
    D -->|Yes| E
    D -->|No| H
    E -->|Yes| F
    E -->|No| H
    F -->|Yes| G
    F -->|No| H
    
    style Documents fill:#e1f5ff
    style Invoice fill:#fff4e6
    style Match fill:#e1f5ff
    style G fill:#90EE90
    style H fill:#FFB6C1
```

**3-Way Match**:
1. Purchase Order
2. Goods Receipt
3. Invoice

**Process**:
1. Enter invoice
2. Match with PO and GR
3. Post invoice
4. Create accounting document

---

## Inventory Management

### Goods Movements

**Types**:
- **101**: Goods Receipt
- **102**: Goods Issue
- **201**: Goods Receipt for Production Order
- **261**: Goods Issue for Production Order

**Transaction**: **MIGO** (Goods Movement)

---

## Material Valuation

### Valuation Methods

**Types**:
- **Standard Price**: Fixed price
- **Moving Average Price**: Average price
- **FIFO**: First In First Out
- **LIFO**: Last In First Out

---

## Physical Inventory

**Transaction**: **MI01** (Create Physical Inventory Document)

**Process**:
1. Create inventory document
2. Count materials
3. Enter count results
4. Post differences

---

## Integration with Other Modules

### FI Integration
- Invoice posting → FI
- Payment → FI

### SD Integration
- Material availability → SD
- Sales order → Material requirement

### PP Integration
- Production order → Material issue
- Material receipt → Production order

---

## Best Practices

1. **Master Data**: Accurate material master
2. **Procurement**: Follow procurement process
3. **Inventory**: Regular inventory checks
4. **Valuation**: Proper valuation methods

---

## Summary

MM manages materials, procurement, and inventory integrated with FI, SD, and PP.

---

**Related Guides**:
- [SAP FI Guide](./SAP_FI_GUIDE.md)
- [SAP SD Guide](./SAP_SD_GUIDE.md)
- [SAP PP Guide](./SAP_PP_GUIDE.md)


