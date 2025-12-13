# TypeScript Best Practices Guide

## Table of Contents
1. [Type Safety](#type-safety)
2. [Type Definitions](#type-definitions)
3. [Generics](#generics)
4. [Interfaces and Types](#interfaces-and-types)
5. [Classes](#classes)
6. [Error Handling](#error-handling)
7. [Performance](#performance)
8. [Common Patterns](#common-patterns)

## Type Safety

### Avoid 'any' Type

```typescript
// ❌ BAD: Using 'any' defeats the purpose of TypeScript
function processData(data: any) {
    return data.value;
}

// ✅ GOOD: Use 'unknown' for truly unknown types
function processData(data: unknown) {
    if (typeof data === 'object' && data !== null && 'value' in data) {
        return (data as { value: number }).value;
    }
    throw new Error('Invalid data');
}

// ✅ BETTER: Use proper types
interface Data {
    value: number;
}
function processData(data: Data) {
    return data.value;
}
```

### Use Type Guards

```typescript
// ✅ GOOD: Type guards for type narrowing
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
    }
}
```

### Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

## Type Definitions

### Use Interfaces for Objects

```typescript
// ✅ GOOD: Use interfaces for object shapes
interface User {
    id: string;
    name: string;
    email: string;
    age?: number; // Optional
}

// ✅ GOOD: Use types for unions/intersections
type Status = 'active' | 'inactive' | 'pending';
type UserWithStatus = User & { status: Status };
```

### Readonly Properties

```typescript
// ✅ GOOD: Use readonly for immutability
interface Point {
    readonly x: number;
    readonly y: number;
}

class Point {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}
}
```

### Const Assertions

```typescript
// ✅ GOOD: Use 'as const' for literal types
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'

// ✅ GOOD: Readonly tuple
const coordinates = [10, 20] as const;
```

## Generics

### Generic Functions

```typescript
// ✅ GOOD: Use generics for reusable functions
function identity<T>(value: T): T {
    return value;
}

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
    return arr.map(fn);
}
```

### Generic Constraints

```typescript
// ✅ GOOD: Use constraints when needed
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

### Generic Classes

```typescript
// ✅ GOOD: Generic classes for reusable data structures
class Repository<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}
```

## Interfaces and Types

### Interface vs Type

```typescript
// ✅ GOOD: Use interfaces for object shapes
interface User {
    id: string;
    name: string;
}

// ✅ GOOD: Use types for unions/intersections
type Status = 'active' | 'inactive';
type UserWithStatus = User & { status: Status };
```

### Interface Inheritance

```typescript
// ✅ GOOD: Interface inheritance
interface Animal {
    name: string;
    makeSound(): string;
}

interface Dog extends Animal {
    breed: string;
    fetch(): void;
}
```

### Index Signatures

```typescript
// ✅ GOOD: Index signatures for dynamic properties
interface Dictionary<T> {
    [key: string]: T;
}

const wordCount: Dictionary<number> = {
    'hello': 2,
    'world': 1
};
```

## Classes

### Access Modifiers

```typescript
// ✅ GOOD: Use access modifiers appropriately
class BankAccount {
    private balance: number = 0;
    protected accountNumber: string;
    public readonly owner: string;
    
    constructor(owner: string, accountNumber: string) {
        this.owner = owner;
        this.accountNumber = accountNumber;
    }
    
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public getBalance(): number {
        return this.balance;
    }
}
```

### Abstract Classes

```typescript
// ✅ GOOD: Use abstract classes for base implementations
abstract class Shape {
    protected readonly color: string;
    
    constructor(color: string) {
        this.color = color;
    }
    
    abstract calculateArea(): number;
    
    getColor(): string {
        return this.color;
    }
}

class Circle extends Shape {
    constructor(color: string, private readonly radius: number) {
        super(color);
    }
    
    override calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}
```

### Interface Implementation

```typescript
// ✅ GOOD: Implement interfaces
interface IPaymentProcessor {
    processPayment(amount: number): string;
    refundPayment(transactionId: string): boolean;
}

class CreditCardProcessor implements IPaymentProcessor {
    processPayment(amount: number): string {
        return `Processing $${amount}`;
    }
    
    refundPayment(transactionId: string): boolean {
        return true;
    }
}
```

## Error Handling

### Typed Errors

```typescript
// ✅ GOOD: Typed error classes
class ValidationError extends Error {
    constructor(
        message: string,
        public readonly field: string
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

class DatabaseError extends Error {
    constructor(
        message: string,
        public readonly code: string
    ) {
        super(message);
        this.name = 'DatabaseError';
    }
}
```

### Result Type Pattern

```typescript
// ✅ GOOD: Result type for error handling
type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

function safeOperation<T>(
    operation: () => T
): Result<T> {
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

// Usage
const result = safeOperation(() => riskyOperation());
if (result.success) {
    console.log(result.data); // TypeScript knows data exists
} else {
    console.error(result.error); // TypeScript knows error exists
}
```

### Discriminated Unions

```typescript
// ✅ GOOD: Discriminated unions for type safety
type ApiResponse<T> =
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };

function handleResponse<T>(response: ApiResponse<T>): void {
    if (response.status === 'success') {
        console.log(response.data); // TypeScript knows data exists
    } else {
        console.error(response.message); // TypeScript knows message exists
    }
}
```

## Performance

### Type Inference

```typescript
// ✅ GOOD: Let TypeScript infer types when clear
const numbers = [1, 2, 3]; // Type: number[]
const name = 'John'; // Type: string

// ✅ GOOD: Explicit types when needed
function processData<T>(data: T[]): T[] {
    return data;
}
```

### Readonly Arrays

```typescript
// ✅ GOOD: Use readonly arrays for immutability
function processItems(items: readonly number[]): number[] {
    // Cannot mutate items
    return items.map(n => n * 2);
}
```

### Utility Types

```typescript
// ✅ GOOD: Use utility types
interface User {
    id: string;
    name: string;
    email: string;
    age?: number;
}

type PartialUser = Partial<User>; // All properties optional
type RequiredUser = Required<User>; // All properties required
type UserName = Pick<User, 'name' | 'email'>; // Pick specific properties
type UserWithoutEmail = Omit<User, 'email'>; // Omit specific properties
```

## Common Patterns

### Function Overloads

```typescript
// ✅ GOOD: Function overloads for different signatures
function search<T>(arr: T[], target: T): number;
function search<T>(arr: T[], target: T, useBinary: boolean): number;
function search<T>(
    arr: T[],
    target: T,
    useBinary = false
): number {
    if (useBinary) {
        return binarySearch(arr, target);
    }
    return linearSearch(arr, target);
}
```

### Conditional Types

```typescript
// ✅ GOOD: Conditional types for advanced patterns
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

### Template Literal Types

```typescript
// ✅ GOOD: Template literal types
type EventName = `on${Capitalize<string>}`;
type ApiEndpoint = `/api/${string}`;
```

### Mapped Types

```typescript
// ✅ GOOD: Mapped types for transformations
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};
```

## Best Practices Summary

1. **Avoid 'any' - use 'unknown' instead**
2. **Use strict mode in tsconfig.json**
3. **Use interfaces for object shapes**
4. **Use types for unions/intersections**
5. **Use generics for reusable code**
6. **Use access modifiers appropriately**
7. **Use abstract classes for base implementations**
8. **Use type guards for type narrowing**
9. **Use Result types for error handling**
10. **Use utility types (Partial, Required, Pick, Omit)**
11. **Use readonly for immutability**
12. **Use const assertions for literal types**
13. **Document complex types**
14. **Use function overloads when needed**
15. **Prefer composition over inheritance**

## Common Pitfalls

### 1. Overusing 'any'

```typescript
// ❌ BAD
function process(data: any) { }

// ✅ GOOD
function process<T>(data: T) { }
```

### 2. Not Using Type Guards

```typescript
// ❌ BAD
function process(value: unknown) {
    return value.toUpperCase(); // Error!
}

// ✅ GOOD
function process(value: unknown) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    throw new Error('Expected string');
}
```

### 3. Ignoring Null Checks

```typescript
// ❌ BAD
function getName(user: User | null): string {
    return user.name; // Error if user is null
}

// ✅ GOOD
function getName(user: User | null): string {
    return user?.name ?? 'Unknown';
}
```

