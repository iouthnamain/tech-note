# Exercise 1: Normalize a Database

## Objective
Take an unnormalized database and normalize it through 1NF, 2NF, and 3NF.

## Requirements

### Part 1: Analyze Unnormalized Database

Given this unnormalized table:
```sql
CREATE TABLE student_courses (
    student_id INT,
    student_name VARCHAR(100),
    student_email VARCHAR(255),
    course_id INT,
    course_name VARCHAR(100),
    instructor_name VARCHAR(100),
    instructor_email VARCHAR(255),
    grade CHAR(1),
    enrollment_date DATE
);
```

Identify normalization issues:
- 1NF violations
- 2NF violations
- 3NF violations

### Part 2: Normalize to 1NF

Create tables that satisfy 1NF:
- Atomic values only
- No repeating groups
- Unique rows

### Part 3: Normalize to 2NF

Ensure 2NF compliance:
- All non-key attributes fully depend on primary key
- No partial dependencies

### Part 4: Normalize to 3NF

Ensure 3NF compliance:
- No transitive dependencies
- Non-key attributes depend only on primary key

### Part 5: Create Final Schema

Create the normalized database schema with:
- Proper table structure
- Foreign key relationships
- Constraints
- Indexes

## Starter Code

```sql
-- Unnormalized table (for analysis)
CREATE TABLE student_courses_unnormalized (
    -- Your analysis here
);

-- Normalized tables
-- Your 1NF, 2NF, 3NF tables here
```

## Expected Structure

After normalization, you should have:
- students table
- courses table
- instructors table
- enrollments table (junction table)

## Testing

1. Verify no data redundancy
2. Test insert, update, delete operations
3. Check foreign key constraints
4. Verify queries work correctly

## Bonus Challenges

1. Identify when denormalization might be beneficial
2. Create views that combine normalized tables
3. Add indexes for performance
4. Document normalization decisions

## Solution

Check `solutions/solution-1.sql` after attempting the exercise.

