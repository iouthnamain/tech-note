/**
 * HTTP and RESTful API Examples - JavaScript
 * HTTP Protocol và RESTful API với best practices
 * 
 * Best Practices:
 * - Use proper HTTP methods and status codes
 * - Implement request/response validation
 * - Add error handling middleware
 * - Include rate limiting
 * - Implement authentication/authorization
 * - Use consistent response formats
 */

'use strict';

const express = require('express');

// ============================================================================
// 1. HTTP Methods and Status Codes
// ============================================================================

/**
 * HTTP Methods
 * GET    - Retrieve data (idempotent, safe)
 * POST   - Create new resource (not idempotent)
 * PUT    - Update entire resource (idempotent)
 * PATCH  - Partial update (not idempotent)
 * DELETE - Remove resource (idempotent)
 */

/**
 * HTTP Status Codes
 * ✅ Best Practice: Use appropriate status codes
 */
const HTTP_STATUS = {
    // Success (2xx)
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    
    // Client Error (4xx)
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    
    // Server Error (5xx)
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
};

// ============================================================================
// 2. Express App Setup
// ============================================================================

const app = express();

// ✅ Best Practice: Use middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Best Practice: Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ============================================================================
// 3. Request Validation Middleware
// ============================================================================

/**
 * Validate request body
 * ✅ Best Practice: Validate all inputs
 * @param {Object} schema - Validation schema
 * @returns {Function} Express middleware
 */
function validateBody(schema) {
    return (req, res, next) => {
        const errors = [];
        
        for (const [field, validator] of Object.entries(schema)) {
            const value = req.body[field];
            
            if (validator.required && (value === undefined || value === null || value === '')) {
                errors.push(`${field} is required`);
            } else if (value !== undefined && validator.type && typeof value !== validator.type) {
                errors.push(`${field} must be of type ${validator.type}`);
            } else if (value !== undefined && validator.validate && !validator.validate(value)) {
                errors.push(`${field} is invalid`);
            }
        }
        
        if (errors.length > 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: 'Validation failed',
                details: errors
            });
        }
        
        next();
    };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation schemas
const createUserSchema = {
    name: {
        required: true,
        type: 'string',
        validate: (value) => value.length >= 2 && value.length <= 100
    },
    email: {
        required: true,
        type: 'string',
        validate: isValidEmail
    },
    age: {
        required: false,
        type: 'number',
        validate: (value) => value >= 0 && value <= 150
    }
};

// ============================================================================
// 4. Error Handling Middleware
// ============================================================================

/**
 * Custom error class for API errors
 * ✅ Best Practice: Use custom error classes
 */
class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.details = details;
    }
}

/**
 * Error handling middleware
 * ✅ Best Practice: Centralized error handling
 */
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
            details: err.details
        });
    }
    
    // Don't leak error details in production
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message;
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: message
    });
}

// Register error handler (must be last)
app.use(errorHandler);

// ============================================================================
// 5. Authentication Middleware
// ============================================================================

/**
 * Simple authentication middleware
 * ✅ Best Practice: Extract authentication logic
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required');
    }
    
    const token = authHeader.substring(7);
    
    // ✅ Best Practice: Validate token (simplified example)
    if (token === 'valid-token') {
        req.user = { id: 1, role: 'admin' }; // Attach user to request
        next();
    } else {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }
}

/**
 * Authorization middleware
 * ✅ Best Practice: Check user permissions
 * @param {Array<string>} allowedRoles - Allowed roles
 * @returns {Function} Express middleware
 */
function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required');
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Insufficient permissions');
        }
        
        next();
    };
}

// ============================================================================
// 6. Rate Limiting Middleware
// ============================================================================

/**
 * Simple rate limiter
 * ✅ Best Practice: Prevent abuse with rate limiting
 * @param {number} maxRequests - Maximum requests per window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Function} Express middleware
 */
function rateLimit(maxRequests = 100, windowMs = 60000) {
    const requests = new Map();
    
    return (req, res, next) => {
        const clientId = req.ip || req.connection.remoteAddress;
        const now = Date.now();
        
        if (!requests.has(clientId)) {
            requests.set(clientId, { count: 1, resetTime: now + windowMs });
            return next();
        }
        
        const clientData = requests.get(clientId);
        
        if (now > clientData.resetTime) {
            clientData.count = 1;
            clientData.resetTime = now + windowMs;
            return next();
        }
        
        if (clientData.count >= maxRequests) {
            return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
                success: false,
                error: 'Too many requests',
                retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
            });
        }
        
        clientData.count++;
        next();
    };
}

// Apply rate limiting
app.use(rateLimit(100, 60000)); // 100 requests per minute

// ============================================================================
// 7. CORS Middleware
// ============================================================================

/**
 * CORS middleware
 * ✅ Best Practice: Configure CORS properly
 */
function corsMiddleware(req, res, next) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(HTTP_STATUS.NO_CONTENT);
    }
    
    next();
}

app.use(corsMiddleware);

// ============================================================================
// 8. Response Formatting Middleware
// ============================================================================

/**
 * Consistent response format
 * ✅ Best Practice: Use consistent response structure
 */
function formatResponse(req, res, next) {
    const originalJson = res.json;
    
    res.json = function(data) {
        const formatted = {
            success: res.statusCode >= 200 && res.statusCode < 300,
            data: data?.data || data,
            message: data?.message,
            pagination: data?.pagination,
            timestamp: new Date().toISOString()
        };
        
        return originalJson.call(this, formatted);
    };
    
    next();
}

app.use(formatResponse);

// ============================================================================
// 9. RESTful API Routes
// ============================================================================

// In-memory data store (for demonstration)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, createdAt: new Date().toISOString() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, createdAt: new Date().toISOString() }
];

/**
 * GET /api/users - Get all users
 * ✅ Best Practice: Support pagination and filtering
 */
app.get('/api/users', (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        
        // Filter users
        let filteredUsers = users;
        if (search) {
            filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // Paginate
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
        res.status(HTTP_STATUS.OK).json({
            data: paginatedUsers,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: filteredUsers.length,
                totalPages: Math.ceil(filteredUsers.length / limitNum)
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/users/:id - Get single user
 * ✅ Best Practice: Validate path parameters
 */
app.get('/api/users/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
        }
        
        const user = users.find(u => u.id === id);
        
        if (!user) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
        }
        
        res.status(HTTP_STATUS.OK).json({ data: user });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/users - Create new user
 * ✅ Best Practice: Validate input, return created resource
 */
app.post('/api/users', validateBody(createUserSchema), (req, res, next) => {
    try {
        const { name, email, age } = req.body;
        
        // Check for duplicate email
        if (users.some(u => u.email === email)) {
            throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists');
        }
        
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            age: age || null,
            createdAt: new Date().toISOString(),
            updatedAt: null
        };
        
        users.push(newUser);
        
        res.status(HTTP_STATUS.CREATED).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/users/:id - Update entire user
 * ✅ Best Practice: Replace entire resource
 */
app.put('/api/users/:id', validateBody(createUserSchema), (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
        }
        
        // Check for duplicate email (excluding current user)
        const { email } = req.body;
        if (users.some((u, index) => u.email === email && index !== userIndex)) {
            throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists');
        }
        
        // Replace entire resource
        users[userIndex] = {
            ...users[userIndex],
            ...req.body,
            id, // Preserve ID
            updatedAt: new Date().toISOString()
        };
        
        res.status(HTTP_STATUS.OK).json({
            message: 'User updated successfully',
            data: users[userIndex]
        });
    } catch (error) {
        next(error);
    }
});

/**
 * PATCH /api/users/:id - Partial update
 * ✅ Best Practice: Update only provided fields
 */
app.patch('/api/users/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
        }
        
        // Validate partial updates
        const updates = req.body;
        if (updates.email && !isValidEmail(updates.email)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid email format');
        }
        
        // Check for duplicate email
        if (updates.email && users.some((u, index) => u.email === updates.email && index !== userIndex)) {
            throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists');
        }
        
        // Update only provided fields
        users[userIndex] = {
            ...users[userIndex],
            ...updates,
            id, // Preserve ID
            updatedAt: new Date().toISOString()
        };
        
        res.status(HTTP_STATUS.OK).json({
            message: 'User updated successfully',
            data: users[userIndex]
        });
    } catch (error) {
        next(error);
    }
});

/**
 * DELETE /api/users/:id - Delete user
 * ✅ Best Practice: Return deleted resource or 204 No Content
 */
app.delete('/api/users/:id', authenticate, authorize('admin'), (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
        }
        
        const deletedUser = users.splice(userIndex, 1)[0];
        
        res.status(HTTP_STATUS.OK).json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        next(error);
    }
});

// ============================================================================
// 10. Health Check Endpoint
// ============================================================================

/**
 * GET /health - Health check endpoint
 * ✅ Best Practice: Include health check for monitoring
 */
app.get('/health', (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ============================================================================
// 11. 404 Handler
// ============================================================================

/**
 * 404 handler for undefined routes
 * ✅ Best Practice: Handle undefined routes
 */
app.use((req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: 'Route not found',
        path: req.path
    });
});

// ============================================================================
// 12. RESTful API Best Practices Summary
// ============================================================================

/**
 * RESTful API Best Practices:
 * 
 * 1. Use proper HTTP methods:
 *    - GET: Retrieve data (idempotent, safe)
 *    - POST: Create new resource
 *    - PUT: Update entire resource (idempotent)
 *    - PATCH: Partial update
 *    - DELETE: Remove resource (idempotent)
 * 
 * 2. Use appropriate status codes:
 *    - 200: OK (successful GET, PUT, PATCH)
 *    - 201: Created (successful POST)
 *    - 204: No Content (successful DELETE)
 *    - 400: Bad Request (validation errors)
 *    - 401: Unauthorized (authentication required)
 *    - 403: Forbidden (insufficient permissions)
 *    - 404: Not Found
 *    - 409: Conflict (duplicate resource)
 *    - 500: Internal Server Error
 * 
 * 3. URL Design:
 *    - Use nouns, not verbs: /users not /getUsers
 *    - Use plural nouns: /users not /user
 *    - Use hierarchical structure: /users/:id/posts
 *    - Use query parameters for filtering, pagination, sorting
 *    - Use path parameters for resource identification
 * 
 * 4. Request/Response:
 *    - Always validate input
 *    - Use consistent response format
 *    - Include pagination for list endpoints
 *    - Return created/updated resource
 *    - Use proper Content-Type headers
 * 
 * 5. Security:
 *    - Implement authentication
 *    - Use authorization middleware
 *    - Add rate limiting
 *    - Validate all inputs
 *    - Sanitize user input
 *    - Use HTTPS in production
 * 
 * 6. Error Handling:
 *    - Use consistent error format
 *    - Don't leak sensitive information
 *    - Log errors with context
 *    - Return appropriate status codes
 */

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        app,
        HTTP_STATUS,
        ApiError,
        validateBody,
        authenticate,
        authorize,
        rateLimit,
        isValidEmail
    };
}

// Start server (if running directly)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
