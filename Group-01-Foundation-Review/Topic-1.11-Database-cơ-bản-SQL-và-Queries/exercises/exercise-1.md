# Exercise 1: SQL Database Practice

## Objective
Create a database schema and write SQL queries to practice database operations.

## Requirements

### Part 1: Create Database Schema

Create tables for an e-commerce system:
1. **products** table
   - id (PRIMARY KEY)
   - name (VARCHAR, NOT NULL)
   - description (TEXT)
   - price (DECIMAL)
   - stock (INT)
   - category_id (FOREIGN KEY)
   - created_at (TIMESTAMP)

2. **categories** table
   - id (PRIMARY KEY)
   - name (VARCHAR, UNIQUE)
   - description (TEXT)

3. **orders** table
   - id (PRIMARY KEY)
   - user_id (FOREIGN KEY)
   - total (DECIMAL)
   - status (VARCHAR)
   - created_at (TIMESTAMP)

4. **order_items** table
   - id (PRIMARY KEY)
   - order_id (FOREIGN KEY)
   - product_id (FOREIGN KEY)
   - quantity (INT)
   - price (DECIMAL)

### Part 2: Insert Sample Data

Insert at least:
- 5 categories
- 10 products
- 3 orders
- 5+ order items

### Part 3: Write Queries

1. **Basic Queries**
   - Select all products
   - Select products with price > 50
   - Select products by category

2. **JOIN Queries**
   - Products with their categories
   - Orders with user information
   - Order items with product details

3. **Aggregate Queries**
   - Total revenue
   - Average order value
   - Products by category count
   - Top selling products

4. **Complex Queries**
   - Products that have never been ordered
   - Users who placed orders > $100
   - Monthly sales report

## Starter Code

```sql
-- Create database
CREATE DATABASE ecommerce;
USE ecommerce;

-- Your table definitions here

-- Your INSERT statements here

-- Your SELECT queries here
```

## Expected Results

- All tables created with proper relationships
- Sample data inserted successfully
- Queries return expected results
- Proper use of JOINs, aggregates, and subqueries

## Testing

1. Verify all tables are created
2. Check foreign key relationships
3. Test all queries
4. Verify data integrity

## Bonus Challenges

1. Add indexes for performance
2. Create views for common queries
3. Write stored procedures
4. Add triggers for audit logging
5. Normalize the database to 3NF

## Solution

Check `solutions/solution-1.sql` after attempting the exercise.

