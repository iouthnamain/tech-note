# Exercise 1: Implement Comprehensive Error Handling

## Objective
Build error handling system with try-catch, custom errors, logging, and user-friendly messages.

## Requirements

### Part 1: Basic Error Handling

1. **Try-Catch Implementation**
   - Create functions that can throw errors
   - Implement try-catch blocks
   - Handle different error types
   - Use finally blocks for cleanup

2. **Custom Error Classes**
   - Create ValidationError class
   - Create DatabaseError class
   - Create NetworkError class
   - Each with specific properties

### Part 2: Error Handling in Functions

1. **Synchronous Functions**
   - Validate input parameters
   - Throw appropriate errors
   - Handle errors gracefully

2. **Asynchronous Functions**
   - Handle errors in async/await
   - Handle errors in Promises
   - Implement retry logic

### Part 3: Error Logging

1. **Error Logger**
   - Create error logging function
   - Log error message, stack trace, context
   - Format errors for different environments

2. **Error Context**
   - Include user information
   - Include request details
   - Include operation context

### Part 4: User-Friendly Errors

1. **Error Messages**
   - Convert technical errors to user-friendly messages
   - Provide actionable error messages
   - Handle different error scenarios

2. **Error Response Format**
   - Consistent error response structure
   - Appropriate HTTP status codes
   - Error codes for client handling

## Starter Code

```javascript
// Custom error classes
class ValidationError extends Error {
    // Your implementation
}

// Functions with error handling
function validateEmail(email) {
    // Your implementation with error handling
}

async function fetchUserData(userId) {
    // Your implementation with error handling
}

// Error logger
class ErrorLogger {
    static log(error, context) {
        // Your implementation
    }
}
```

## Expected Output

```
Validation Error: Email is required (field: email)
Error Log: {
  timestamp: "2024-01-15T10:00:00Z",
  message: "Email is required",
  context: { userId: 123, operation: "validateUser" }
}
User-friendly: "Please check your input and try again"
```

## Testing

1. Test with valid inputs
2. Test with invalid inputs (trigger errors)
3. Test error logging
4. Test error recovery
5. Test async error handling

## Bonus Challenges

1. Implement error retry mechanism
2. Create error monitoring dashboard
3. Add error rate limiting
4. Implement circuit breaker pattern
5. Create error notification system

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

