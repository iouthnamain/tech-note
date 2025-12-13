// Solution: RESTful API for Books

const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genre: 'Fiction', year: 1925 }
];
let nextId = 2;

// Helper function to find book by ID
function findBookById(id) {
    return books.findIndex(b => b.id === parseInt(id));
}

// GET /api/books - Get all books with pagination and filtering
app.get('/api/books', (req, res) => {
    const { page = 1, limit = 10, author, genre } = req.query;
    
    let filteredBooks = [...books];
    
    // Filter by author
    if (author) {
        filteredBooks = filteredBooks.filter(b => 
            b.author.toLowerCase().includes(author.toLowerCase())
        );
    }
    
    // Filter by genre
    if (genre) {
        filteredBooks = filteredBooks.filter(b => 
            b.genre && b.genre.toLowerCase() === genre.toLowerCase()
        );
    }
    
    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    
    res.status(200).json({
        success: true,
        data: paginatedBooks,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filteredBooks.length,
            totalPages: Math.ceil(filteredBooks.length / parseInt(limit))
        }
    });
});

// GET /api/books/:id - Get single book
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = findBookById(id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Book not found',
            code: 404
        });
    }
    
    res.status(200).json({
        success: true,
        data: books[bookIndex]
    });
});

// POST /api/books - Create new book
app.post('/api/books', (req, res) => {
    const { title, author, isbn, genre, year, pages } = req.body;
    
    // Validation
    if (!title || !author || !isbn) {
        return res.status(400).json({
            success: false,
            error: 'Title, author, and ISBN are required',
            code: 400
        });
    }
    
    // Check if ISBN already exists
    if (books.some(b => b.isbn === isbn)) {
        return res.status(409).json({
            success: false,
            error: 'Book with this ISBN already exists',
            code: 409
        });
    }
    
    const newBook = {
        id: nextId++,
        title,
        author,
        isbn,
        genre: genre || null,
        year: year || null,
        pages: pages || null,
        createdAt: new Date().toISOString()
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        data: newBook,
        message: 'Book created successfully'
    });
});

// PUT /api/books/:id - Update entire book
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, genre, year, pages } = req.body;
    
    const bookIndex = findBookById(id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Book not found',
            code: 404
        });
    }
    
    // Validation
    if (!title || !author || !isbn) {
        return res.status(400).json({
            success: false,
            error: 'Title, author, and ISBN are required',
            code: 400
        });
    }
    
    // Replace entire resource
    books[bookIndex] = {
        id: parseInt(id),
        title,
        author,
        isbn,
        genre: genre || null,
        year: year || null,
        pages: pages || null,
        updatedAt: new Date().toISOString()
    };
    
    res.status(200).json({
        success: true,
        data: books[bookIndex],
        message: 'Book updated successfully'
    });
});

// PATCH /api/books/:id - Partial update
app.patch('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    const bookIndex = findBookById(id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Book not found',
            code: 404
        });
    }
    
    // Update only provided fields
    books[bookIndex] = {
        ...books[bookIndex],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    
    res.status(200).json({
        success: true,
        data: books[bookIndex],
        message: 'Book updated successfully'
    });
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = findBookById(id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Book not found',
            code: 404
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.status(200).json({
        success: true,
        data: deletedBook,
        message: 'Book deleted successfully'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        code: 500
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        code: 404
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Book API server running on port ${PORT}`);
});

module.exports = app;

