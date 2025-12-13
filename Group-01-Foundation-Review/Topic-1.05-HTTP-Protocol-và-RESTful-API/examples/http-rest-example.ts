/**
 * HTTP and RESTful API Examples - TypeScript
 * HTTP Protocol và RESTful API với type safety
 * 
 * TypeScript Best Practices:
 * - Use typed request/response objects
 * - Use generic API handlers
 * - Type-safe middleware
 * - API response types
 * - Validation with types
 */

import express, { Request, Response, NextFunction, Router } from 'express';

// ============================================================================
// 1. Type Definitions
// ============================================================================

/**
 * HTTP Status Codes
 */
enum HTTP_STATUS {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503
}

/**
 * User interface
 */
interface User {
    id: number;
    name: string;
    email: string;
    age: number | null;
    createdAt: string;
    updatedAt: string | null;
}

/**
 * Create user request
 */
interface CreateUserRequest {
    name: string;
    email: string;
    age?: number;
}

/**
 * Update user request
 */
interface UpdateUserRequest {
    name?: string;
    email?: string;
    age?: number;
}

/**
 * Pagination query parameters
 */
interface PaginationQuery {
    page?: string;
    limit?: string;
    search?: string;
}

/**
 * Pagination metadata
 */
interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

/**
 * API Response type
 * ✅ Best Practice: Use generic for type-safe responses
 */
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    pagination?: PaginationMeta;
    error?: string;
    details?: string[];
    timestamp: string;
}

/**
 * Typed Express Request with user
 */
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

// ============================================================================
// 2. Custom Error Classes
// ============================================================================

/**
 * API Error class
 * ✅ Best Practice: Typed error classes
 */
class ApiError extends Error {
    constructor(
        public readonly statusCode: number,
        message: string,
        public readonly details?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// ============================================================================
// 3. Validation
// ============================================================================

/**
 * Validation schema type
 */
type ValidationSchema<T> = {
    [K in keyof T]: {
        required?: boolean;
        type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
        validate?: (value: T[K]) => boolean;
    };
};

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Type-safe validation middleware
 * ✅ Best Practice: Generic validation function
 */
function validateBody<T extends Record<string, unknown>>(
    schema: ValidationSchema<T>
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const errors: string[] = [];
        const body = req.body as Partial<T>;
        
        for (const [field, validator] of Object.entries(schema)) {
            const value = body[field as keyof T];
            
            if (validator.required && (value === undefined || value === null || value === '')) {
                errors.push(`${field} is required`);
            } else if (value !== undefined && validator.type) {
                const expectedType = validator.type;
                const actualType = Array.isArray(value) ? 'array' : typeof value;
                
                if (actualType !== expectedType) {
                    errors.push(`${field} must be of type ${expectedType}`);
                }
            }
            
            if (value !== undefined && validator.validate && !validator.validate(value as T[Extract<keyof T, string>])) {
                errors.push(`${field} is invalid`);
            }
        }
        
        if (errors.length > 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                error: 'Validation failed',
                details: errors,
                timestamp: new Date().toISOString()
            } as ApiResponse<null>);
            return;
        }
        
        next();
    };
}

// Validation schemas
const createUserSchema: ValidationSchema<CreateUserRequest> = {
    name: {
        required: true,
        type: 'string',
        validate: (value) => typeof value === 'string' && value.length >= 2 && value.length <= 100
    },
    email: {
        required: true,
        type: 'string',
        validate: isValidEmail
    },
    age: {
        required: false,
        type: 'number',
        validate: (value) => value === undefined || (typeof value === 'number' && value >= 0 && value <= 150)
    }
};

// ============================================================================
// 4. Authentication & Authorization Middleware
// ============================================================================

/**
 * Authentication middleware
 * ✅ Best Practice: Type-safe authentication
 */
function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required');
    }
    
    const token = authHeader.substring(7);
    
    // Simplified token validation
    if (token === 'valid-token') {
        req.user = { id: 1, role: 'admin' };
        next();
    } else {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }
}

/**
 * Authorization middleware
 * ✅ Best Practice: Type-safe authorization
 */
function authorize(...allowedRoles: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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
// 5. Rate Limiting Middleware
// ============================================================================

/**
 * Rate limiter interface
 */
interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

/**
 * Type-safe rate limiter
 */
function rateLimit(config: RateLimitConfig = { maxRequests: 100, windowMs: 60000 }) {
    const requests = new Map<string, { count: number; resetTime: number }>();
    
    return (req: Request, res: Response, next: NextFunction): void => {
        const clientId = req.ip || req.connection.remoteAddress || 'unknown';
        const now = Date.now();
        
        if (!requests.has(clientId)) {
            requests.set(clientId, { count: 1, resetTime: now + config.windowMs });
            next();
            return;
        }
        
        const clientData = requests.get(clientId)!;
        
        if (now > clientData.resetTime) {
            clientData.count = 1;
            clientData.resetTime = now + config.windowMs;
            next();
            return;
        }
        
        if (clientData.count >= config.maxRequests) {
            res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
                success: false,
                error: 'Too many requests',
                timestamp: new Date().toISOString()
            } as ApiResponse<null>);
            return;
        }
        
        clientData.count++;
        next();
    };
}

// ============================================================================
// 6. Error Handling Middleware
// ============================================================================

/**
 * Error handling middleware
 * ✅ Best Practice: Type-safe error handling
 */
function errorHandler(
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error('Error:', err);
    
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
            details: err.details as string[],
            timestamp: new Date().toISOString()
        } as ApiResponse<null>);
        return;
    }
    
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message;
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: message,
        timestamp: new Date().toISOString()
    } as ApiResponse<null>);
}

// ============================================================================
// 7. Express App Setup
// ============================================================================

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rate limiting
app.use(rateLimit({ maxRequests: 100, windowMs: 60000 }));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// ============================================================================
// 8. Data Store (In-Memory)
// ============================================================================

let users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        createdAt: new Date().toISOString(),
        updatedAt: null
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 25,
        createdAt: new Date().toISOString(),
        updatedAt: null
    }
];

// ============================================================================
// 9. RESTful API Routes
// ============================================================================

/**
 * GET /api/users - Get all users
 * ✅ Best Practice: Typed route handlers
 */
app.get('/api/users', (req: Request<{}, ApiResponse<User[]>, {}, PaginationQuery>, res: Response) => {
    const { page = '1', limit = '10', search = '' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    let filteredUsers = users;
    if (search) {
        const searchLower = search.toLowerCase();
        filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
    }
    
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: paginatedUsers,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total: filteredUsers.length,
            totalPages: Math.ceil(filteredUsers.length / limitNum)
        },
        timestamp: new Date().toISOString()
    } as ApiResponse<User[]>);
});

/**
 * GET /api/users/:id - Get single user
 */
app.get('/api/users/:id', (req: Request<{ id: string }>, res: Response<ApiResponse<User>>) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
    }
    
    const user = users.find(u => u.id === id);
    
    if (!user) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }
    
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
        timestamp: new Date().toISOString()
    } as ApiResponse<User>);
});

/**
 * POST /api/users - Create new user
 */
app.post(
    '/api/users',
    validateBody(createUserSchema),
    (req: Request<{}, ApiResponse<User>, CreateUserRequest>, res: Response) => {
        const { name, email, age } = req.body;
        
        if (users.some(u => u.email === email)) {
            throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists');
        }
        
        const newUser: User = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            age: age ?? null,
            createdAt: new Date().toISOString(),
            updatedAt: null
        };
        
        users.push(newUser);
        
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: newUser,
            timestamp: new Date().toISOString()
        } as ApiResponse<User>);
    }
);

/**
 * PUT /api/users/:id - Update entire user
 */
app.put(
    '/api/users/:id',
    validateBody(createUserSchema),
    (req: Request<{ id: string }, ApiResponse<User>, CreateUserRequest>, res: Response) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
        }
        
        const { email } = req.body;
        if (users.some((u, index) => u.email === email && index !== userIndex)) {
            throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists');
        }
        
        users[userIndex] = {
            ...users[userIndex],
            ...req.body,
            id,
            updatedAt: new Date().toISOString()
        };
        
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'User updated successfully',
            data: users[userIndex],
            timestamp: new Date().toISOString()
        } as ApiResponse<User>);
    }
);

/**
 * PATCH /api/users/:id - Partial update
 */
app.patch(
    '/api/users/:id',
    (req: Request<{ id: string }, ApiResponse<User>, UpdateUserRequest>, res: Response) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
        }
        
        const userIndex = users.findIndex(u => u.id === id);
        
        if (userIndex === -1) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
        }
        
        const updates = req.body;
        if (updates.email && !isValidEmail(updates.email)) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid email format');
        }
        
        if (updates.email && users.some((u, index) => u.email === updates.email && index !== userIndex)) {
            throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already exists');
        }
        
        users[userIndex] = {
            ...users[userIndex],
            ...updates,
            id,
            updatedAt: new Date().toISOString()
        };
        
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'User updated successfully',
            data: users[userIndex],
            timestamp: new Date().toISOString()
        } as ApiResponse<User>);
    }
);

/**
 * DELETE /api/users/:id - Delete user
 */
app.delete(
    '/api/users/:id',
    authenticate,
    authorize('admin'),
    (req: AuthenticatedRequest<{ id: string }>, res: Response<ApiResponse<User>>) => {
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
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
            timestamp: new Date().toISOString()
        } as ApiResponse<User>);
    }
);

// ============================================================================
// 10. Health Check
// ============================================================================

app.get('/health', (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
            status: 'healthy',
            uptime: process.uptime()
        },
        timestamp: new Date().toISOString()
    } as ApiResponse<{ status: string; uptime: number }>);
});

// ============================================================================
// 11. 404 Handler
// ============================================================================

app.use((req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: 'Route not found',
        timestamp: new Date().toISOString()
    } as ApiResponse<null>);
});

// ============================================================================
// 12. Error Handler (Must be last)
// ============================================================================

app.use(errorHandler);

// Export
export { app, HTTP_STATUS, ApiError, User, CreateUserRequest, UpdateUserRequest, ApiResponse };

// Start server if running directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

