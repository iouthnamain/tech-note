/**
 * Error Handling Examples - TypeScript
 * Error Handling với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Typed error classes
 * - Result/Either types
 * - Error type narrowing
 * - Custom error types with discriminated unions
 */

// ============================================================================
// 1. Base Error Classes
// ============================================================================

/**
 * Base Application Error
 * ✅ Best Practice: Extend Error for custom errors
 */
class AppError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = 500,
        public readonly isOperational: boolean = true
    ) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace?.(this, this.constructor);
    }
}

/**
 * Validation Error
 * ✅ Best Practice: Specific error types
 */
class ValidationError extends AppError {
    constructor(
        message: string,
        public readonly field: string | null = null
    ) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

/**
 * Database Error
 */
class DatabaseError extends AppError {
    constructor(
        message: string,
        public readonly code: string | null = null
    ) {
        super(message, 500);
        this.name = 'DatabaseError';
    }
}

/**
 * Network Error
 */
class NetworkError extends AppError {
    constructor(
        message: string,
        public readonly url: string | null = null
    ) {
        super(message, 503);
        this.name = 'NetworkError';
    }
}

/**
 * Permission Error
 */
class PermissionError extends AppError {
    constructor(
        message: string,
        public readonly resource: string | null = null
    ) {
        super(message, 403);
        this.name = 'PermissionError';
    }
}

// ============================================================================
// 2. Result Type Pattern
// ============================================================================

/**
 * Result type for error handling
 * ✅ Best Practice: Use Result type instead of throwing
 * @template T - Success type
 * @template E - Error type
 */
type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

/**
 * Safe operation with Result type
 * ✅ Best Practice: Return Result instead of throwing
 */
function safeOperation<T>(operation: () => T): Result<T> {
    try {
        const data = operation();
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

/**
 * Safe async operation
 */
async function safeAsyncOperation<T>(
    operation: () => Promise<T>
): Promise<Result<T>> {
    try {
        const data = await operation();
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

// ============================================================================
// 3. Discriminated Union for Errors
// ============================================================================

/**
 * Error types with discriminated union
 * ✅ Best Practice: Use discriminated unions for type safety
 */
type AppErrorType =
    | { type: 'ValidationError'; field: string | null; message: string }
    | { type: 'DatabaseError'; code: string | null; message: string }
    | { type: 'NetworkError'; url: string | null; message: string }
    | { type: 'PermissionError'; resource: string | null; message: string }
    | { type: 'UnknownError'; message: string };

/**
 * Convert Error to AppErrorType
 */
function toAppErrorType(error: Error): AppErrorType {
    if (error instanceof ValidationError) {
        return {
            type: 'ValidationError',
            field: error.field,
            message: error.message
        };
    }
    if (error instanceof DatabaseError) {
        return {
            type: 'DatabaseError',
            code: error.code,
            message: error.message
        };
    }
    if (error instanceof NetworkError) {
        return {
            type: 'NetworkError',
            url: error.url,
            message: error.message
        };
    }
    if (error instanceof PermissionError) {
        return {
            type: 'PermissionError',
            resource: error.resource,
            message: error.message
        };
    }
    return {
        type: 'UnknownError',
        message: error.message
    };
}

/**
 * Handle error based on type
 * ✅ Best Practice: Type narrowing with discriminated unions
 */
function handleError(error: AppErrorType): void {
    switch (error.type) {
        case 'ValidationError':
            console.error(`Validation error in field ${error.field}: ${error.message}`);
            break;
        case 'DatabaseError':
            console.error(`Database error (${error.code}): ${error.message}`);
            break;
        case 'NetworkError':
            console.error(`Network error for ${error.url}: ${error.message}`);
            break;
        case 'PermissionError':
            console.error(`Permission error for ${error.resource}: ${error.message}`);
            break;
        case 'UnknownError':
            console.error(`Unknown error: ${error.message}`);
            break;
    }
}

// ============================================================================
// 4. Type Guards for Error Checking
// ============================================================================

/**
 * Type guard for ValidationError
 * ✅ Best Practice: Use type guards for type narrowing
 */
function isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
}

/**
 * Type guard for NetworkError
 */
function isNetworkError(error: unknown): error is NetworkError {
    return error instanceof NetworkError;
}

/**
 * Type guard for AppError
 */
function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}

// ============================================================================
// 5. Error Recovery with Types
// ============================================================================

/**
 * Retry with exponential backoff
 * ✅ Best Practice: Type-safe retry logic
 * @template T - Return type
 */
async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 1000
): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            
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
    
    throw lastError!;
}

/**
 * Fallback value with type safety
 * @template T - Value type
 */
async function withFallback<T>(
    fn: () => Promise<T>,
    fallback: T
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        console.warn('Operation failed, using fallback:', error);
        return fallback;
    }
}

// ============================================================================
// 6. Circuit Breaker with Types
// ============================================================================

/**
 * Circuit breaker state
 */
type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

/**
 * Circuit breaker with type safety
 */
class CircuitBreaker {
    private failureCount = 0;
    private state: CircuitState = 'CLOSED';
    private nextAttempt = Date.now();
    
    constructor(
        private readonly threshold: number = 5,
        private readonly timeout: number = 60000
    ) {}
    
    async execute<T>(fn: () => Promise<T>): Promise<T> {
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
    
    private onSuccess(): void {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    private onFailure(): void {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
    
    getState(): CircuitState {
        return this.state;
    }
}

// ============================================================================
// 7. Structured Error Logging
// ============================================================================

/**
 * Error log entry interface
 */
interface ErrorLogEntry {
    timestamp: string;
    level: 'error' | 'warn' | 'info';
    error: {
        name: string;
        message: string;
        stack?: string;
        statusCode?: number;
        field?: string | null;
        code?: string | null;
    };
    context: Record<string, unknown>;
}

/**
 * Error Logger class
 */
class ErrorLogger {
    static log(
        error: Error,
        context: Record<string, unknown> = {},
        level: 'error' | 'warn' | 'info' = 'error'
    ): ErrorLogEntry {
        const errorLog: ErrorLogEntry = {
            timestamp: new Date().toISOString(),
            level,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
                ...(error instanceof AppError && { statusCode: error.statusCode }),
                ...(error instanceof ValidationError && { field: error.field }),
                ...(error instanceof DatabaseError && { code: error.code })
            },
            context: {
                ...context,
                environment: process.env.NODE_ENV || 'development',
                nodeVersion: process.version
            }
        };
        
        if (level === 'error') {
            console.error('Error Log:', JSON.stringify(errorLog, null, 2));
        } else {
            console.warn('Warning Log:', JSON.stringify(errorLog, null, 2));
        }
        
        return errorLog;
    }
}

// ============================================================================
// 8. Error Boundary with Types
// ============================================================================

/**
 * Error Boundary class
 */
class ErrorBoundary {
    private hasError = false;
    private error: Error | null = null;
    private errorCount = 0;
    
    execute<T>(fn: () => T, fallback?: (error: Error) => T): T {
        try {
            const result = fn();
            this.reset();
            return result;
        } catch (error) {
            this.catchError(error instanceof Error ? error : new Error(String(error)));
            
            if (fallback) {
                return fallback(this.error!);
            }
            
            throw error;
        }
    }
    
    async executeAsync<T>(
        fn: () => Promise<T>,
        fallback?: (error: Error) => Promise<T>
    ): Promise<T> {
        try {
            const result = await fn();
            this.reset();
            return result;
        } catch (error) {
            this.catchError(error instanceof Error ? error : new Error(String(error)));
            
            if (fallback) {
                return await fallback(this.error!);
            }
            
            throw error;
        }
    }
    
    private catchError(error: Error): void {
        this.hasError = true;
        this.error = error;
        this.errorCount++;
        ErrorLogger.log(error, { boundary: true });
    }
    
    reset(): void {
        this.hasError = false;
        this.error = null;
    }
    
    getError(): Error | null {
        return this.error;
    }
    
    hasErrorOccurred(): boolean {
        return this.hasError;
    }
}

// ============================================================================
// 9. Type-Safe Error Handling
// ============================================================================

/**
 * Type-safe error handler
 * ✅ Best Practice: Use type guards for error handling
 */
function handleTypedError(error: unknown): void {
    if (isValidationError(error)) {
        console.error('Validation error:', error.field, error.message);
    } else if (isNetworkError(error)) {
        console.error('Network error:', error.url, error.message);
    } else if (isAppError(error)) {
        console.error('App error:', error.statusCode, error.message);
    } else if (error instanceof Error) {
        console.error('Generic error:', error.message);
    } else {
        console.error('Unknown error:', error);
    }
}

/**
 * Fetch data with type-safe error handling
 * @template T - Response type
 */
async function fetchDataSafe<T>(url: string): Promise<Result<T>> {
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
        
        const data = await response.json() as T;
        return { success: true, data };
    } catch (error) {
        const appError = error instanceof AppError
            ? error
            : new AppError(
                  error instanceof Error ? error.message : 'Unknown error',
                  500
              );
        
        ErrorLogger.log(appError, { url });
        return { success: false, error: appError };
    }
}

// ============================================================================
// 10. User-Friendly Error Messages
// ============================================================================

/**
 * Error message mapping
 */
const ERROR_MESSAGES: Record<string, string> = {
    'NetworkError': 'Please check your internet connection and try again',
    'ValidationError': 'Please check your input and try again',
    'DatabaseError': 'Service temporarily unavailable. Please try again later',
    'PermissionError': 'You do not have permission to perform this action',
    'TypeError': 'Invalid data provided. Please check your input',
    'ReferenceError': 'An error occurred. Please refresh the page',
    'RangeError': 'Invalid value provided. Please check your input'
};

/**
 * Get user-friendly error message
 * ✅ Best Practice: Type-safe error message retrieval
 */
function getUserFriendlyError(error: Error): string {
    return ERROR_MESSAGES[error.name] || 'An unexpected error occurred. Please try again';
}

/**
 * Error response interface
 */
interface ErrorResponse {
    success: false;
    error: string;
    timestamp: string;
    details?: {
        name: string;
        message: string;
        field?: string | null;
        code?: string | null;
    };
}

/**
 * Format error for API response
 * ✅ Best Practice: Type-safe error formatting
 */
function formatErrorResponse(
    error: Error,
    includeDetails: boolean = false
): ErrorResponse {
    const response: ErrorResponse = {
        success: false,
        error: getUserFriendlyError(error),
        timestamp: new Date().toISOString()
    };
    
    if (includeDetails || process.env.NODE_ENV === 'development') {
        response.details = {
            name: error.name,
            message: error.message,
            ...(error instanceof ValidationError && { field: error.field }),
            ...(error instanceof DatabaseError && { code: error.code })
        };
    }
    
    return response;
}

// ============================================================================
// 11. Either Type Pattern
// ============================================================================

/**
 * Either type (alternative to Result)
 * ✅ Best Practice: Use for functional error handling
 * @template L - Left type (error)
 * @template R - Right type (success)
 */
type Either<L, R> = { left: L } | { right: R };

/**
 * Create Left (error)
 */
function left<L>(value: L): Either<L, never> {
    return { left: value };
}

/**
 * Create Right (success)
 */
function right<R>(value: R): Either<never, R> {
    return { right: value };
}

/**
 * Check if Either is Left
 */
function isLeft<L, R>(either: Either<L, R>): either is { left: L } {
    return 'left' in either;
}

/**
 * Check if Either is Right
 */
function isRight<L, R>(either: Either<L, R>): either is { right: R } {
    return 'right' in either;
}

// ============================================================================
// 12. Best Practices Summary
// ============================================================================

/**
 * TypeScript Error Handling Best Practices:
 * 
 * 1. Type Safety:
 *    - Use typed error classes
 *    - Use type guards for error checking
 *    - Use discriminated unions for error types
 * 
 * 2. Result Types:
 *    - Use Result<T, E> instead of throwing
 *    - Use Either<L, R> for functional style
 *    - Type-safe error handling
 * 
 * 3. Error Classes:
 *    - Extend Error for custom errors
 *    - Include relevant properties
 *    - Use instanceof for type checking
 * 
 * 4. Error Handling:
 *    - Always handle errors
 *    - Use type narrowing
 *    - Provide fallback values
 *    - Implement retry logic
 * 
 * 5. Logging:
 *    - Use structured logging
 *    - Include context
 *    - Type-safe log entries
 */

export {
    AppError,
    ValidationError,
    DatabaseError,
    NetworkError,
    PermissionError,
    safeOperation,
    safeAsyncOperation,
    toAppErrorType,
    handleError,
    isValidationError,
    isNetworkError,
    isAppError,
    retryWithBackoff,
    withFallback,
    CircuitBreaker,
    ErrorLogger,
    ErrorBoundary,
    handleTypedError,
    fetchDataSafe,
    getUserFriendlyError,
    formatErrorResponse,
    left,
    right,
    isLeft,
    isRight,
    type Result,
    type AppErrorType,
    type ErrorLogEntry,
    type ErrorResponse,
    type Either,
    type CircuitState
};

