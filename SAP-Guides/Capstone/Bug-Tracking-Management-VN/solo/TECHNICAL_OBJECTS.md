# Technical Objects for ZBUG Project

This document lists all the technical objects that need to be created for the Bug Tracking Management System (ZBUG). This information is extracted from the main development plan.

---

## 1. Database Tables

These objects are created and maintained using the ABAP Dictionary.

| Table Name | Description | Creation T-Code(s) |
| :--- | :--- | :--- |
| `ZBUG_HEADER` | Main table, stores general information for each bug. | `SE11` |
| `ZBUG_ITEMS` | Stores the detailed change history for each field. | `SE11` |
| `ZBUG_HISTORY` | Audit trail log for key actions. | `SE11` |
| `ZBUG_CONFIG` | System configuration table, especially for automatic assignment rules. | `SE11` |
| `ZBUG_ATTACHMENTS` | Stores attached files (binary). | `SE11` |

---

## 2. ABAP Classes

These objects are created and maintained using the Class Builder or the Object Navigator.

| Class Name | Description | Creation T-Code(s) |
| :--- | :--- | :--- |
| `ZCL_BUG_REQUEST` | Central class for handling business logic: `create_bug`, `update_bug`, `reassign_bug`. | `SE24`, `SE80` |
| `ZCL_BUG_VALIDATOR` | Utility class containing data validation logic. | `SE24`, `SE80` |
| `ZCL_BUG_STATISTICS` | Class for calculating and aggregating statistical data for reports. | `SE24`, `SE80` |
| `ZCL_BUG_ATTACHMENT` | Class for handling attachment upload/download logic. | `SE24`, `SE80` |
| `ZCL_BUG_REPORT` | Helper class for common ALV report logic (e.g., building field catalogs). | `SE24`, `SE80` |
| `ZCL_BUG_UTILITIES` | Class containing common utility functions (e.g., date formatting, string handling). | `SE24`, `SE80` |

---

## 3. Programs and Screens

These objects are created and maintained using the ABAP Editor or the Object Navigator. The planned T-Codes are for executing the finished program.

| Program Name | T-Code (planned) | Description | Creation T-Code(s) |
| :--- | :--- | :--- | :--- |
| `ZRPG_ZBUG_LOG` | `ZBUG_LOG` | Interface for logging and updating bugs. | `SE38`, `SE80` |
| `ZRPG_ZBUG_LIST` | `ZBUG_LIST` | ALV report listing bugs with filters, using `ZCL_BUG_REPORT`. | `SE38`, `SE80` |
| `ZRPG_ZBUG_STATISTICS`| `ZBUG_STATS` | ALV report displaying bug statistics, using `ZCL_BUG_STATISTICS`. | `SE38`, `SE80` |
| `ZRPG_ZBUG_ASSIGN` | `ZBUG_ASSIGN`| Interface for Admin to re-assign bugs, calls `reassign_bug` method of `ZCL_BUG_REQUEST`. | `SE38`, `SE80` |

---

## 4. Authorization Objects

These objects are created using transaction `SU21` and assigned to roles via `PFCG`.

| Object Name | Description |
| :--- | :--- |
| `Z_BUG_CREATE` | Controls authorization for creating new bugs. |
| `Z_BUG_VIEW` | Controls authorization for viewing bugs (with different levels of access). |
| `Z_BUG_UPDATE` | Controls authorization for updating existing bugs. |
| `Z_BUG_ASSIGN` | Controls authorization for assigning/re-assigning bugs. |
| `Z_BUG_ADMIN` | Controls authorization for administrative functions within the ZBUG system. |

---

## 5. Workflow

These objects are created and maintained using the Workflow Builder.

| Workflow Name | Description | Creation T-Code(s) |
| :--- | :--- | :--- |
| `ZBUG_WF` | Main workflow template that handles the automatic assignment process. | `SWDD` |

---

## 6. Forms

These objects are created and maintained using the Smart Forms transaction.

| Form Name | Description | Creation T-Code(s) |
| :--- | :--- | :--- |
| `ZBUG_FORM` | SmartForm for printing the details of a bug. | `SMARTFORMS` |

---

## 7. References

The information in this document is based on the comprehensive development plan:
- [SOLO_DEVELOPMENT_PLAN.md](SOLO_DEVELOPMENT_PLAN.md)
- [Technical Architecture](https://github.com/iouthna/SAP-Guides/blob/main/Capstone/Bug-Tracking-Management-VN/Docs/Technical_Architecture.md) (specifically the Security Architecture section)
