# Exercise 1: Build a RESTful API

## Objective
Create a complete RESTful API for managing books with proper HTTP methods and status codes.

## Requirements

### Part 1: Create RESTful Endpoints

1. **GET /api/books**
   - Return all books
   - Support pagination: ?page=1&limit=10
   - Support filtering: ?author=John&genre=Fiction
   - Status: 200

2. **GET /api/books/:id**
   - Return single book by ID
   - Status: 200 if found, 404 if not found

3. **POST /api/books**
   - Create new book
   - Required fields: title, author, isbn
   - Optional fields: genre, year, pages
   - Status: 201 if created

4. **PUT /api/books/:id**
   - Update entire book
   - Status: 200 if updated, 404 if not found

5. **PATCH /api/books/:id**
   - Partial update
   - Status: 200 if updated, 404 if not found

6. **DELETE /api/books/:id**
   - Delete book
   - Status: 200 if deleted, 404 if not found

### Part 2: HTTP Best Practices

- Use proper HTTP status codes
- Return consistent JSON response format
- Include error messages for failures
- Add request validation
- Handle edge cases

### Part 3: Response Format

All responses should follow this format:
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "code": 400
}
```

## Starter Code

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890' }
];

// Your implementations here

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## Testing

Test all endpoints using:
- Postman
- curl commands
- Or write unit tests

Example curl commands:
```bash
# GET all books
curl http://localhost:3000/api/books

# GET single book
curl http://localhost:3000/api/books/1

# POST new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author","isbn":"9876543210"}'
```

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

