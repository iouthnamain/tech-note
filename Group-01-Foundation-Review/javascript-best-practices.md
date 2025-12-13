# JavaScript Best Practices Guide

## Table of Contents
1. [Code Quality](#code-quality)
2. [Error Handling](#error-handling)
3. [Performance](#performance)
4. [Modern Features](#modern-features)
5. [Data Structures](#data-structures)
6. [OOP Principles](#oop-principles)
7. [Security](#security)
8. [Testing](#testing)

## Code Quality

### Variable Declarations

```javascript
// ✅ GOOD: Use const by default
const name = 'John';
const items = [];

// ✅ GOOD: Use let when reassignment is needed
let counter = 0;
counter++;

// ❌ BAD: Avoid var
var oldStyle = 'avoid this';
```

### Equality Checks

```javascript
// ✅ GOOD: Use strict equality (===)
if (value === 42) { }
if (value !== null) { }

// ❌ BAD: Avoid loose equality (==)
if (value == 42) { } // Can cause type coercion issues
```

### Naming Conventions

```javascript
// ✅ GOOD: Descriptive names
const userAccountBalance = 1000;
function calculateTotalPrice() { }

// ❌ BAD: Abbreviations and unclear names
const uab = 1000;
function calc() { }
```

### Code Organization

```javascript
// ✅ GOOD: Group related code, use comments
'use strict';

// Constants
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Helper functions
function validateInput(input) {
    // Implementation
}

// Main functions
function processData(data) {
    // Implementation
}
```

## Error Handling

### Always Handle Errors

```javascript
// ✅ GOOD: Try-catch for error handling
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw if needed
    }
}

// ❌ BAD: No error handling
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json(); // Can throw unhandled error
}
```

### Custom Error Classes

```javascript
// ✅ GOOD: Custom error classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

function validateUser(user) {
    if (!user.email) {
        throw new ValidationError('Email is required', 'email');
    }
}
```

### Error Logging

```javascript
// ✅ GOOD: Structured error logging
function logError(error, context = {}) {
    const errorLog = {
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        context: context
    };
    console.error('Error:', errorLog);
    // Send to logging service in production
}
```

## Performance

### Data Structure Selection

```javascript
// ✅ GOOD: Use Set for O(1) lookups
const allowedValues = new Set(['admin', 'user', 'guest']);
if (allowedValues.has(role)) { } // O(1)

// ❌ BAD: Array for repeated lookups
const allowedValues = ['admin', 'user', 'guest'];
if (allowedValues.includes(role)) { } // O(n)
```

### Immutable Operations

```javascript
// ✅ GOOD: Use immutable operations
const doubled = numbers.map(n => n * 2);
const filtered = numbers.filter(n => n > 0);
const newArray = [...oldArray, newItem];

// ❌ BAD: Mutating arrays
numbers.push(newItem); // Mutates original
```

### Avoid Premature Optimization

```javascript
// ✅ GOOD: Write clear code first
function processItems(items) {
    return items
        .filter(item => item.isActive)
        .map(item => transformItem(item))
        .sort((a, b) => a.priority - b.priority);
}

// Optimize only when performance is actually a problem
```

## Modern Features

### Arrow Functions

```javascript
// ✅ GOOD: Use arrow functions for callbacks
const doubled = numbers.map(n => n * 2);
const filtered = items.filter(item => item.isActive);

// ✅ GOOD: Preserve 'this' context
class MyClass {
    handleClick = () => {
        // 'this' is preserved
        this.doSomething();
    }
}
```

### Destructuring

```javascript
// ✅ GOOD: Object destructuring
const { name, email } = user;
const { name: userName, ...rest } = user;

// ✅ GOOD: Array destructuring
const [first, second, ...rest] = items;
const [first = 'default'] = items;
```

### Spread Operator

```javascript
// ✅ GOOD: Spread for copying and merging
const newArray = [...oldArray];
const merged = { ...obj1, ...obj2 };
const combined = [...arr1, ...arr2];
```

### Template Literals

```javascript
// ✅ GOOD: Template literals for strings
const message = `Hello, ${name}! You have ${count} items.`;
const html = `
    <div>
        <h1>${title}</h1>
        <p>${content}</p>
    </div>
`;
```

### Optional Chaining and Nullish Coalescing

```javascript
// ✅ GOOD: Optional chaining (ES2020)
const city = user?.address?.city;
const value = data?.items?.[0]?.name;

// ✅ GOOD: Nullish coalescing (ES2020)
const name = user?.name ?? 'Guest';
const count = items?.length ?? 0;
```

## Data Structures

### Arrays

```javascript
// ✅ GOOD: Use appropriate array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
const found = items.find(item => item.id === targetId);

// ✅ GOOD: Remove duplicates
const unique = [...new Set(items)];
```

### Maps

```javascript
// ✅ GOOD: Use Map for dynamic keys
const userMap = new Map();
userMap.set('name', 'John');
const name = userMap.get('name');

// ✅ GOOD: Use Map for frequency counting
const countMap = new Map();
items.forEach(item => {
    countMap.set(item, (countMap.get(item) ?? 0) + 1);
});
```

### Sets

```javascript
// ✅ GOOD: Use Set for unique values
const uniqueItems = new Set(items);
const hasItem = uniqueItems.has(item); // O(1) lookup
```

## OOP Principles

### Encapsulation

```javascript
// ✅ GOOD: Use private fields
class BankAccount {
    #balance = 0;
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }
    
    getBalance() {
        return this.#balance;
    }
}
```

### Composition over Inheritance

```javascript
// ✅ GOOD: Prefer composition
class Car {
    constructor(engine) {
        this.engine = engine;
    }
    
    start() {
        return this.engine.start();
    }
}

// ❌ BAD: Deep inheritance hierarchies
class Vehicle { }
class MotorVehicle extends Vehicle { }
class Car extends MotorVehicle { }
```

### SOLID Principles

```javascript
// Single Responsibility Principle
// ✅ GOOD: Each class has one responsibility
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class EmailValidator {
    static validate(email) {
        return email.includes('@');
    }
}

// Dependency Inversion Principle
// ✅ GOOD: Depend on abstractions
class PaymentService {
    constructor(processor) {
        this.processor = processor; // Interface, not concrete class
    }
}
```

## Security

### Input Validation

```javascript
// ✅ GOOD: Always validate input
function processUserInput(input) {
    if (typeof input !== 'string' || input.length === 0) {
        throw new Error('Invalid input');
    }
    // Process input
}
```

### Avoid Eval

```javascript
// ❌ BAD: Never use eval
eval(userInput); // Security risk!

// ✅ GOOD: Use safe alternatives
const result = JSON.parse(userInput); // If JSON is expected
```

### Environment Variables

```javascript
// ✅ GOOD: Use environment variables for secrets
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('API_KEY is required');
}

// ❌ BAD: Hardcode secrets
const apiKey = 'secret-key-123'; // Never do this!
```

## Testing

### Write Testable Code

```javascript
// ✅ GOOD: Pure functions are easy to test
function add(a, b) {
    return a + b;
}

// ✅ GOOD: Dependency injection for testing
class UserService {
    constructor(userRepository) {
        this.repository = userRepository;
    }
    
    getUser(id) {
        return this.repository.findById(id);
    }
}
```

### Error Handling in Tests

```javascript
// ✅ GOOD: Test error cases
test('should throw error for invalid input', () => {
    expect(() => {
        processUserInput(null);
    }).toThrow('Invalid input');
});
```

## Common Pitfalls

### 1. Mutating Arrays

```javascript
// ❌ BAD
const items = [1, 2, 3];
items.push(4); // Mutates original

// ✅ GOOD
const items = [1, 2, 3];
const newItems = [...items, 4]; // New array
```

### 2. Forgetting Return Statements

```javascript
// ❌ BAD
function processData(data) {
    data.map(item => item * 2); // No return!
}

// ✅ GOOD
function processData(data) {
    return data.map(item => item * 2);
}
```

### 3. Not Handling Async Errors

```javascript
// ❌ BAD
async function fetchData() {
    const data = await fetch(url);
    return data.json(); // Unhandled error
}

// ✅ GOOD
async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

## Summary

1. **Use const/let, avoid var**
2. **Use strict equality (===)**
3. **Always handle errors**
4. **Use appropriate data structures**
5. **Prefer immutable operations**
6. **Use modern ES6+ features**
7. **Follow SOLID principles**
8. **Validate all inputs**
9. **Never hardcode secrets**
10. **Write testable code**

