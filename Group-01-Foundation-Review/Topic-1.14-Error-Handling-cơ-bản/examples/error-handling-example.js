/**
 * Error Handling Examples - JavaScript
 * Error Handling cơ bản với best practices
 * 
 * Best Practices:
 * - Always handle errors appropriately
 * - Use specific error types
 * - Implement error recovery strategies
 * - Use structured error logging
 * - Provide user-friendly error messages
 * - Clean up resources in finally blocks
 */

'use strict';

// ============================================================================
// 1. Basic Try-Catch Block
// ============================================================================

/**
 * Basic error handling with try-catch
 * ✅ Best Practice: Always handle errors
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} Result of division
 * @throws {Error} If division by zero
 */
function divide(a, b) {
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('Both arguments must be numbers');
        }
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    } catch (error) {
        console.error('Error in divide:', error.message);
        throw error; // Re-throw if needed
    }
}

// ============================================================================
// 2. Error Type Checking
// ============================================================================

/**
 * Error type checking
 * ✅ Best Practice: Check error types for specific handling
 */
function handleError(error) {
    if (error instanceof TypeError) {
        console.error('Type error:', error.message);
        // Handle type errors
    } else if (error instanceof ReferenceError) {
        console.error('Reference error:', error.message);
        // Handle reference errors
    } else if (error instanceof RangeError) {
        console.error('Range error:', error.message);
        // Handle range errors
    } else if (error instanceof SyntaxError) {
        console.error('Syntax error:', error.message);
        // Handle syntax errors
    } else {
        console.error('Unknown error:', error.message);
        // Handle unknown errors
    }
}

// ============================================================================
// 3. Custom Error Classes
// ============================================================================

/**
 * Base Error class
 * ✅ Best Practice: Extend Error for custom errors
 */
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Validation Error
 * ✅ Best Practice: Specific error types for different scenarios
 */
class ValidationError extends AppError {
    constructor(message, field = null) {
        super(message, 400);
        this.field = field;
        this.name = 'ValidationError';
    }
}

/**
 * Database Error
 */
class DatabaseError extends AppError {
    constructor(message, code = null) {
        super(message, 500);
        this.code = code;
        this.name = 'DatabaseError';
    }
}

/**
 * Network Error
 */
class NetworkError extends AppError {
    constructor(message, url = null) {
        super(message, 503);
        this.url = url;
        this.name = 'NetworkError';
    }
}

/**
 * Permission Error
 */
class PermissionError extends AppError {
    constructor(message, resource = null) {
        super(message, 403);
        this.resource = resource;
        this.name = 'PermissionError';
    }
}

// ============================================================================
// 4. Error Recovery Strategies
// ============================================================================

/**
 * Retry with exponential backoff
 * ✅ Best Practice: Implement retry logic for transient errors
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in milliseconds
 * @returns {Promise<*>} Result of function
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            // Don't retry on certain errors
            if (error instanceof ValidationError || error instanceof PermissionError) {
                throw error;
            }
            
            if (attempt < maxRetries) {
                const delay = initialDelay * Math.pow(2, attempt);
                console.log(`Retry attempt ${attempt + 1} after ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

/**
 * Fallback value strategy
 * ✅ Best Practice: Provide fallback for non-critical operations
 * @param {Function} fn - Function to execute
 * @param {*} fallback - Fallback value
 * @returns {Promise<*>} Result or fallback
 */
async function withFallback(fn, fallback) {
    try {
        return await fn();
    } catch (error) {
        console.warn('Operation failed, using fallback:', error.message);
        return fallback;
    }
}

/**
 * Circuit breaker pattern
 * ✅ Best Practice: Prevent cascading failures
 */
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.failureCount = 0;
        this.threshold = threshold;
        this.timeout = timeout;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
    }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
}

// ============================================================================
// 5. Structured Error Logging
// ============================================================================

/**
 * Error log entry structure
 */
class ErrorLogger {
    /**
     * Log error with structured format
     * ✅ Best Practice: Structured logging for better analysis
     * @param {Error} error - Error to log
     * @param {Object} context - Additional context
     * @param {string} level - Log level (error, warn, info)
     */
    static log(error, context = {}, level = 'error') {
        const errorLog = {
            timestamp: new Date().toISOString(),
            level,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
                ...(error.statusCode && { statusCode: error.statusCode }),
                ...(error.field && { field: error.field }),
                ...(error.code && { code: error.code })
            },
            context: {
                ...context,
                environment: process.env.NODE_ENV || 'development',
                nodeVersion: process.version
            }
        };
        
        // Log to console (in production, send to logging service)
        if (level === 'error') {
            console.error('Error Log:', JSON.stringify(errorLog, null, 2));
        } else {
            console.warn('Warning Log:', JSON.stringify(errorLog, null, 2));
        }
        
        // In production, send to external service:
        // this.sendToLoggingService(errorLog);
        
        return errorLog;
    }
    
    /**
     * Send error to external logging service
     * @param {Object} errorLog - Error log entry
     */
    static async sendToLoggingService(errorLog) {
        // Example: Send to Sentry, LogRocket, etc.
        // await fetch('https://logs.example.com/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(errorLog)
        // });
    }
}

// ============================================================================
// 6. Error Monitoring
// ============================================================================

/**
 * Error Monitor class
 * ✅ Best Practice: Track error rates and patterns
 */
class ErrorMonitor {
    constructor() {
        this.errors = [];
        this.errorCounts = new Map();
        this.maxErrors = 1000; // Keep last 1000 errors
    }
    
    /**
     * Record an error
     * @param {Error} error - Error to record
     * @param {Object} context - Additional context
     */
    record(error, context = {}) {
        const errorKey = `${error.name}:${error.message}`;
        this.errorCounts.set(errorKey, (this.errorCounts.get(errorKey) || 0) + 1);
        
        this.errors.push({
            error: {
                name: error.name,
                message: error.message
            },
            context,
            timestamp: new Date().toISOString()
        });
        
        // Keep only recent errors
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }
        
        // Alert if error rate is high
        this.checkErrorRate();
    }
    
    /**
     * Check if error rate exceeds threshold
     */
    checkErrorRate() {
        const recentErrors = this.errors.filter(
            e => Date.now() - new Date(e.timestamp).getTime() < 60000 // Last minute
        );
        
        if (recentErrors.length > 10) {
            console.warn('High error rate detected:', recentErrors.length, 'errors in the last minute');
        }
    }
    
    /**
     * Get error statistics
     * @returns {Object} Error statistics
     */
    getStats() {
        return {
            totalErrors: this.errors.length,
            errorCounts: Object.fromEntries(this.errorCounts),
            recentErrors: this.errors.slice(-10)
        };
    }
}

// Global error monitor instance
const errorMonitor = new ErrorMonitor();

// ============================================================================
// 7. Error Handling in Async Functions
// ============================================================================

/**
 * Async error handling
 * ✅ Best Practice: Always handle errors in async functions
 * @param {string} url - URL to fetch
 * @returns {Promise<Object>} Fetched data
 */
async function fetchData(url) {
    try {
        if (!url || typeof url !== 'string') {
            throw new ValidationError('URL must be a non-empty string');
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new NetworkError(
                `HTTP error! status: ${response.status}`,
                url
            );
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        // Log error
        ErrorLogger.log(error, { url }, 'error');
        errorMonitor.record(error, { url });
        throw error;
    }
}

/**
 * Promise error handling
 * ✅ Best Practice: Always include catch handler
 */
function fetchDataWithPromise(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new NetworkError(`HTTP error! status: ${response.status}`, url);
            }
            return response.json();
    })
    .catch(error => {
            ErrorLogger.log(error, { url }, 'error');
            throw error;
    });
}

// ============================================================================
// 8. Error Boundary Pattern
// ============================================================================

/**
 * Error Boundary class
 * ✅ Best Practice: Catch and handle errors at boundaries
 */
class ErrorBoundary {
    constructor() {
        this.hasError = false;
        this.error = null;
        this.errorCount = 0;
    }
    
    /**
     * Execute function within error boundary
     * @param {Function} fn - Function to execute
     * @param {Function} fallback - Fallback function
     * @returns {*} Result or fallback result
     */
    execute(fn, fallback = null) {
        try {
            const result = fn();
            this.reset();
            return result;
        } catch (error) {
            this.catchError(error);
            
            if (fallback) {
                return fallback(error);
            }
            
            throw error;
        }
    }
    
    /**
     * Execute async function within error boundary
     * @param {Function} fn - Async function to execute
     * @param {Function} fallback - Fallback function
     * @returns {Promise<*>} Result or fallback result
     */
    async executeAsync(fn, fallback = null) {
        try {
            const result = await fn();
            this.reset();
            return result;
} catch (error) {
            this.catchError(error);
            
            if (fallback) {
                return fallback(error);
            }
            
            throw error;
        }
    }
    
    catchError(error) {
        this.hasError = true;
        this.error = error;
        this.errorCount++;
        ErrorLogger.log(error, { boundary: true });
    }
    
    reset() {
        this.hasError = false;
        this.error = null;
    }
    
    getError() {
        return this.error;
    }
}

// ============================================================================
// 9. User-Friendly Error Messages
// ============================================================================

/**
 * Get user-friendly error message
 * ✅ Best Practice: Don't expose technical details to users
 * @param {Error} error - Error object
 * @returns {string} User-friendly message
 */
function getUserFriendlyError(error) {
    const errorMessages = {
        'NetworkError': 'Please check your internet connection and try again',
        'ValidationError': 'Please check your input and try again',
        'DatabaseError': 'Service temporarily unavailable. Please try again later',
        'PermissionError': 'You do not have permission to perform this action',
        'TypeError': 'Invalid data provided. Please check your input',
        'ReferenceError': 'An error occurred. Please refresh the page',
        'RangeError': 'Invalid value provided. Please check your input'
    };
    
    return errorMessages[error.name] || 'An unexpected error occurred. Please try again';
}

/**
 * Format error for API response
 * ✅ Best Practice: Consistent error response format
 * @param {Error} error - Error object
 * @param {boolean} includeDetails - Include error details (development only)
 * @returns {Object} Formatted error response
 */
function formatErrorResponse(error, includeDetails = false) {
    const response = {
                success: false,
        error: getUserFriendlyError(error),
        timestamp: new Date().toISOString()
    };

    // Include details only in development
    if (includeDetails || process.env.NODE_ENV === 'development') {
        response.details = {
            name: error.name,
            message: error.message,
            ...(error.field && { field: error.field }),
            ...(error.code && { code: error.code })
        };
    }
    
    return response;
}

// ============================================================================
// 10. Finally Block and Resource Cleanup
// ============================================================================

/**
 * Process file with resource cleanup
 * ✅ Best Practice: Always clean up resources in finally block
 * @param {string} filename - File to process
 * @returns {Promise<*>} Processed data
 */
async function processFile(filename) {
    let fileHandle = null;
    let stream = null;
    
    try {
        // Simulated file operations
        fileHandle = await openFile(filename);
        stream = await createStream(fileHandle);
        const data = await readStream(stream);
        return processData(data);
    } catch (error) {
        ErrorLogger.log(error, { filename }, 'error');
        throw error;
    } finally {
        // Always executed, even if error occurs
        if (stream) {
            await closeStream(stream).catch(err => {
                console.error('Error closing stream:', err);
            });
        }
        if (fileHandle) {
            await closeFile(fileHandle).catch(err => {
                console.error('Error closing file:', err);
            });
        }
    }
}

// Simulated file operations
async function openFile(filename) {
    return { name: filename };
}

async function createStream(fileHandle) {
    return { handle: fileHandle };
}

async function readStream(stream) {
    return 'file content';
}

function processData(data) {
    return { processed: data };
}

async function closeStream(stream) {
    // Close stream
}

async function closeFile(fileHandle) {
    // Close file
}

// ============================================================================
// 11. Error Handling in Express.js
// ============================================================================

/**
 * Express error handling middleware
 * ✅ Best Practice: Centralized error handling
 */
function expressErrorHandler(err, req, res, next) {
    // Log error
    ErrorLogger.log(err, {
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('user-agent')
    }, 'error');
    
    // Record in monitor
    errorMonitor.record(err, {
        method: req.method,
        path: req.path
    });
    
    // Determine status code
    const statusCode = err.statusCode || err.status || 500;
    
    // Format response
    const response = formatErrorResponse(
        err,
        process.env.NODE_ENV === 'development'
    );
    
    res.status(statusCode).json(response);
    }
    
/**
 * Async error wrapper for Express routes
 * ✅ Best Practice: Wrap async route handlers
 * @param {Function} fn - Async route handler
 * @returns {Function} Wrapped handler
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Usage example:
// app.get('/api/users/:id', asyncHandler(async (req, res) => {
//     const user = await getUserById(req.params.id);
//     res.json({ success: true, data: user });
// }));

// ============================================================================
// 12. Error Recovery Examples
// ============================================================================

/**
 * Validate user with recovery
 * ✅ Best Practice: Provide helpful error messages
 * @param {Object} user - User object to validate
 * @throws {ValidationError} If validation fails
 */
function validateUser(user) {
    const errors = [];
    
    if (!user.email) {
        errors.push(new ValidationError('Email is required', 'email'));
    } else if (!user.email.includes('@')) {
        errors.push(new ValidationError('Invalid email format', 'email'));
    }
    
    if (!user.name) {
        errors.push(new ValidationError('Name is required', 'name'));
    } else if (user.name.length < 2) {
        errors.push(new ValidationError('Name must be at least 2 characters', 'name'));
    }
    
    if (errors.length > 0) {
        // Throw first error or aggregate errors
        throw errors[0];
    }
}

// ============================================================================
// 13. Best Practices Summary
// ============================================================================

/**
 * Error Handling Best Practices:
 * 
 * ✅ DO:
 * - Always handle errors appropriately
 * - Use specific error types (ValidationError, NetworkError, etc.)
 * - Log errors with context
 * - Provide user-friendly error messages
 * - Clean up resources in finally blocks
 * - Implement retry logic for transient errors
 * - Use error boundaries for critical sections
 * - Monitor error rates
 * - Use structured logging
 * 
 * ❌ DON'T:
 * - Swallow errors silently (console.error is not enough)
 * - Expose sensitive information in error messages
 * - Ignore error handling
 * - Use generic error messages everywhere
 * - Catch errors without handling them
 * - Re-throw errors without adding context
 * - Forget to clean up resources
 */

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
    divide,
        handleError,
        AppError,
    ValidationError,
    DatabaseError,
        NetworkError,
        PermissionError,
        retryWithBackoff,
        withFallback,
        CircuitBreaker,
        ErrorLogger,
        ErrorMonitor,
    fetchData,
        fetchDataWithPromise,
        ErrorBoundary,
        getUserFriendlyError,
        formatErrorResponse,
        processFile,
        expressErrorHandler,
        asyncHandler,
        validateUser
};
}
