-- SQL Examples - Database Basics
-- Database cơ bản: SQL và Queries

-- 1. CREATE TABLE
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 2. INSERT - Add data
INSERT INTO users (name, email, age) VALUES
    ('John Doe', 'john@example.com', 30),
    ('Jane Smith', 'jane@example.com', 25),
    ('Bob Johnson', 'bob@example.com', 35);

-- 3. SELECT - Query data
-- Basic SELECT
SELECT * FROM users;

-- SELECT specific columns
SELECT name, email FROM users;

-- SELECT with WHERE
SELECT * FROM users WHERE age > 25;

-- SELECT with multiple conditions
SELECT * FROM users 
WHERE age > 25 AND email LIKE '%@example.com';

-- 4. UPDATE - Modify data
UPDATE users 
SET age = 31 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET name = 'John Updated', age = 32 
WHERE id = 1;

-- 5. DELETE - Remove data
DELETE FROM users WHERE id = 3;

-- 6. JOIN - Combine tables
-- INNER JOIN
SELECT u.name, o.total, o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN (all users, even without orders)
SELECT u.name, o.total, o.status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN (all orders, even without users)
SELECT u.name, o.total, o.status
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- 7. Aggregate Functions
SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age,
    MIN(age) as min_age,
    MAX(age) as max_age,
    SUM(age) as sum_age
FROM users;

-- 8. GROUP BY
SELECT status, COUNT(*) as count
FROM orders
GROUP BY status;

-- GROUP BY with HAVING
SELECT status, COUNT(*) as count
FROM orders
GROUP BY status
HAVING count > 5;

-- 9. ORDER BY
SELECT * FROM users
ORDER BY age DESC;

-- Multiple sort criteria
SELECT * FROM users
ORDER BY age DESC, name ASC;

-- 10. Subqueries
SELECT name, email
FROM users
WHERE id IN (
    SELECT user_id 
    FROM orders 
    WHERE total > 100
);

-- 11. Common Table Expressions (CTE)
WITH high_value_orders AS (
    SELECT user_id, total
    FROM orders
    WHERE total > 100
)
SELECT u.name, hvo.total
FROM users u
INNER JOIN high_value_orders hvo ON u.id = hvo.user_id;

-- 12. Constraints
-- Primary Key
ALTER TABLE users ADD PRIMARY KEY (id);

-- Foreign Key
ALTER TABLE orders 
ADD CONSTRAINT fk_user 
FOREIGN KEY (user_id) REFERENCES users(id);

-- Unique Constraint
ALTER TABLE users ADD UNIQUE (email);

-- Check Constraint
ALTER TABLE users 
ADD CONSTRAINT check_age 
CHECK (age >= 18 AND age <= 100);

-- 13. Indexes
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_age ON users(age);

-- Composite Index
CREATE INDEX idx_name_email ON users(name, email);

-- 14. Common SQL Patterns
-- Pagination
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 20; -- Skip 20, take 10

-- Search with LIKE
SELECT * FROM users
WHERE name LIKE '%John%';

-- Date filtering
SELECT * FROM users
WHERE created_at >= '2024-01-01'
AND created_at < '2024-02-01';

-- NULL handling
SELECT * FROM users
WHERE age IS NULL;

SELECT COALESCE(age, 0) as age FROM users;

