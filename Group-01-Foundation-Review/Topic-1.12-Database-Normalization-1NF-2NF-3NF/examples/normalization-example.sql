-- Database Normalization Examples
-- Database Normalization: 1NF, 2NF, 3NF

-- BEFORE NORMALIZATION (Unnormalized)
-- Problems: Redundancy, Update anomalies, Insert anomalies, Delete anomalies
CREATE TABLE orders_unnormalized (
    order_id INT,
    customer_name VARCHAR(100),
    customer_email VARCHAR(255),
    customer_address VARCHAR(255),
    product_name VARCHAR(100),
    product_price DECIMAL(10, 2),
    quantity INT,
    order_date DATE,
    total DECIMAL(10, 2)
);

-- Issues:
-- 1. Multiple values in one cell (violates 1NF)
-- 2. Customer info repeated for each order (violates 2NF)
-- 3. Product info repeated (violates 2NF)
-- 4. Transitive dependencies (violates 3NF)

-- AFTER NORMALIZATION

-- 1NF: First Normal Form
-- - Each column contains atomic values
-- - No repeating groups
-- - Each row is unique

CREATE TABLE customers_1nf (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    customer_address VARCHAR(255)
);

CREATE TABLE products_1nf (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders_1nf (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers_1nf(customer_id)
);

CREATE TABLE order_items_1nf (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders_1nf(order_id),
    FOREIGN KEY (product_id) REFERENCES products_1nf(product_id)
);

-- 2NF: Second Normal Form
-- - Must be in 1NF
-- - All non-key attributes fully dependent on primary key
-- - No partial dependencies

-- Example: If we had order_total in order_items, it would violate 2NF
-- because total depends on order_id, not order_item_id

-- Current structure is already in 2NF:
-- - order_items: quantity depends on (order_id, product_id) - full dependency
-- - orders: order_date depends on order_id - full dependency

-- 3NF: Third Normal Form
-- - Must be in 2NF
-- - No transitive dependencies
-- - Non-key attributes depend only on primary key

-- Example of 3NF violation:
CREATE TABLE orders_3nf_violation (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_city VARCHAR(100), -- Depends on customer_id, not order_id (transitive)
    order_date DATE
);

-- Fixed 3NF:
-- Customer city should be in customers table, not orders table
CREATE TABLE customers_3nf (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(255),
    city_id INT, -- Reference to cities table
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE cities (
    city_id INT PRIMARY KEY,
    city_name VARCHAR(100),
    country VARCHAR(100)
);

-- PRACTICAL EXAMPLE: E-commerce Database

-- Step 1: Identify entities and attributes
-- Entities: Customer, Product, Order, OrderItem, Category

-- Step 2: Create 1NF tables (atomic values, no repeating groups)
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    UNIQUE KEY unique_order_product (order_id, product_id)
);

-- Step 3: Verify 2NF
-- All non-key attributes fully depend on primary key ✓

-- Step 4: Verify 3NF
-- No transitive dependencies ✓
-- (If we had customer_city in orders, it would violate 3NF)

-- NORMALIZATION CHECKLIST

-- 1NF Checklist:
-- ✓ Each column has atomic values
-- ✓ No repeating groups
-- ✓ Each row is unique

-- 2NF Checklist:
-- ✓ In 1NF
-- ✓ All non-key attributes fully depend on primary key
-- ✓ No partial dependencies

-- 3NF Checklist:
-- ✓ In 2NF
-- ✓ No transitive dependencies
-- ✓ Non-key attributes depend only on primary key

-- WHEN TO DENORMALIZE

-- Sometimes denormalization is acceptable for performance:
-- Example: Add calculated field to orders table
ALTER TABLE orders ADD COLUMN total_amount DECIMAL(10, 2);

-- This violates normalization but improves query performance
-- Trade-off: Must maintain consistency manually or with triggers

