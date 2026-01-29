# ABAP Class: ZCL_BUG_REPORT

This file contains the ABAP source code for the ALV Report helper class. It provides reusable methods to support the creation of ALV reports for the ZBUG application.

---

````abap
CLASS zcl_bug_report DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    " Builds the field catalog required for an ALV grid.
    " This centralizes the logic for defining columns, headers, and formats.
    CLASS-METHODS build_field_catalog
      IMPORTING
        iv_report_name     TYPE sy-repid
      RETURNING
        VALUE(rt_fieldcat) TYPE slis_t_fieldcat_alv
      EXCEPTIONS
        cx_salv_msg.

  PRIVATE SECTION.

ENDCLASS.



CLASS zcl_bug_report IMPLEMENTATION.

  METHOD build_field_catalog.
    " This method constructs the field catalog for different ALV reports
    " in the ZBUG application. The field catalog defines the properties of
    " the columns in the ALV grid (e.g., order, text, format).

    " Example: Based on the report name, we can build different catalogs.
    CASE iv_report_name.
      WHEN 'ZRPG_ZBUG_LIST'.
        " Field catalog for the main bug list report
        rt_fieldcat = VALUE #(
          ( fieldname = 'BUG_ID'        coltext = 'Bug ID' )
          ( fieldname = 'BUG_TITLE'     coltext = 'Title' )
          ( fieldname = 'PRIORITY'      coltext = 'Priority' )
          ( fieldname = 'STATUS'        coltext = 'Status' )
          ( fieldname = 'ASSIGNED_TO'   coltext = 'Assigned To' )
          ( fieldname = 'REPORTER_ID'   coltext = 'Reporter' )
          ( fieldname = 'CREATED_DATE'  coltext = 'Created On' )
        ).

      WHEN 'ZRPG_ZBUG_STATISTICS'.
        " Field catalog for the statistics report
        rt_fieldcat = VALUE #(
          ( fieldname = 'GROUP_KEY'     coltext = 'Group' )
          ( fieldname = 'BUG_COUNT'     coltext = 'Number of Bugs' )
          ( fieldname = 'AVG_FIX_TIME'  coltext = 'Avg. Fix Time (Days)' )
        ).

      WHEN OTHERS.
        " Report not recognized, raise an exception or return empty catalog
        RAISE EXCEPTION TYPE cx_salv_msg.
    ENDCASE.

  ENDMETHOD.

ENDCLASS.
````