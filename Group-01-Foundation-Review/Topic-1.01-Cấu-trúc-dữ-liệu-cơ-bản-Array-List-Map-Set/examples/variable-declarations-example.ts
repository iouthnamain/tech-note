/**
 * TypeScript Variable Declarations - Comprehensive Guide
 * Cách khai báo biến trong TypeScript với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Use 'const' by default, 'let' when reassignment needed
 * - Avoid 'var' (legacy, function-scoped)
 * - Prefer explicit types for public APIs
 * - Use type inference for local variables
 * - Use 'readonly' for immutability
 * - Prefer 'unknown' over 'any' for type safety
 */

// ============================================================================
// 1. Basic Variable Declarations
// ============================================================================

// ✅ Best Practice: Use 'const' by default (immutable reference)
const PI: number = 3.14159;
const API_URL: string = "https://api.example.com";
const MAX_SIZE: number = 100;
const IS_PRODUCTION: boolean = true;

// ✅ Best Practice: Use 'let' when variable needs to be reassigned
let count: number = 0;
count = 10; // Valid - can be reassigned
count++;    // Valid - can be modified

let userName: string = "John";
userName = "Jane"; // Valid

// ❌ Avoid 'var' - it's function-scoped (legacy JavaScript)
// var oldStyle = "don't use this";

// ============================================================================
// 2. Type Inference (TypeScript automatically infers types)
// ============================================================================

// TypeScript infers the type from the value
const inferredNumber = 42;        // Type: number
const inferredString = "hello";  // Type: string
const inferredBoolean = true;    // Type: boolean
const inferredArray = [1, 2, 3]; // Type: number[]

// ✅ Best Practice: Let TypeScript infer types for local variables
// Explicit types are better for function parameters and return types

// ============================================================================
// 3. Array Declarations
// ============================================================================

// Array of strings
const fruits: string[] = ['apple', 'banana', 'orange'];

// Alternative generic syntax
const items: Array<string> = ['item1', 'item2', 'item3'];

// Array of numbers
const numbers: number[] = [1, 2, 3, 4, 5];

// Mixed type arrays (union types)
const mixed: (string | number)[] = ['hello', 42, 'world', 100];

// ✅ Best Practice: Readonly arrays for immutability
const readonlyFruits: readonly string[] = ['apple', 'banana', 'orange'];
// readonlyFruits.push('grape'); // ❌ Error: Cannot assign to 'push' because it is a read-only property

// ✅ Best Practice: Tuple types for fixed-length arrays
type Point = [number, number];
const point: Point = [10, 20];

type UserInfo = [string, number, boolean];
const userInfo: UserInfo = ['John', 30, true];

// Optional tuple elements
type OptionalTuple = [string, number?];
const optional1: OptionalTuple = ['hello'];
const optional2: OptionalTuple = ['hello', 42];

// Rest elements in tuples
type StringNumberBooleans = [string, number, ...boolean[]];
const tuple: StringNumberBooleans = ['hello', 1, true, false, true];

// ============================================================================
// 4. Object Declarations
// ============================================================================

// Inline type annotation
const user: { name: string; age: number } = {
    name: "John",
    age: 30
};

// Using interface
interface User {
    name: string;
    age: number;
    email?: string; // Optional property
}

const userWithInterface: User = {
    name: "John",
    age: 30
    // email is optional, so it can be omitted
};

// Using type alias
type Point2D = {
    x: number;
    y: number;
};

const point2D: Point2D = { x: 10, y: 20 };

// ✅ Best Practice: Use interfaces for objects, types for unions/primitives
interface Product {
    id: number;
    name: string;
    price: number;
}

const product: Product = {
    id: 1,
    name: "Laptop",
    price: 999.99
};

// ============================================================================
// 5. Union Types
// ============================================================================

// Variable can be one of several types
let value: string | number = "hello";
value = 42; // Also valid
// value = true; // ❌ Error: Type 'boolean' is not assignable to type 'string | number'

// Literal union types
let status: "pending" | "success" | "error" = "pending";
status = "success"; // Valid
// status = "failed"; // ❌ Error: Type '"failed"' is not assignable

// Union with null/undefined
let name: string | null = null;
name = "John"; // Valid

let value2: string | undefined = undefined;
value2 = "hello"; // Valid

// ============================================================================
// 6. Any vs Unknown
// ============================================================================

// ❌ Avoid 'any' - loses type safety
let data: any = "anything";
data = 42;
data = true;
data.foo.bar; // No type checking - dangerous!

// ✅ Use 'unknown' - requires type checking before use
let unknownData: unknown = getData();

// unknownData.toUpperCase(); // ❌ Error: Object is of type 'unknown'

// Type guard to safely use unknown data
if (typeof unknownData === 'string') {
    console.log(unknownData.toUpperCase()); // ✅ Safe now
}

function getData(): unknown {
    return "some data";
}

// ============================================================================
// 7. Type Guards and Type Narrowing
// ============================================================================

// Type guard function
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

// Using type guards
let value3: unknown = "hello";
if (isString(value3)) {
    console.log(value3.toUpperCase()); // TypeScript knows it's a string
}

// ============================================================================
// 8. Destructuring with Types
// ============================================================================

// Array destructuring
const [first, second, third]: [string, string, string] = ['a', 'b', 'c'];

// Object destructuring
const { name, age }: { name: string; age: number } = {
    name: "John",
    age: 30
};

// With interface
const { name: userName2, age: userAge }: User = {
    name: "Jane",
    age: 25
};

// ============================================================================
// 9. Function Parameters and Return Types
// ============================================================================

// Function with typed parameters
function greet(name: string, age: number): void {
    console.log(`Hello ${name}, age ${age}`);
}

// Function with return type
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Function with optional parameter
function greetOptional(name: string, age?: number): void {
    if (age !== undefined) {
        console.log(`Hello ${name}, age ${age}`);
    } else {
        console.log(`Hello ${name}`);
    }
}

// ============================================================================
// 10. Class Properties
// ============================================================================

class UserClass {
    // Public property
    public name: string;
    
    // Private property
    private age: number;
    
    // Protected property
    protected email: string;
    
    // Readonly property
    readonly id: number;
    
    constructor(name: string, age: number, email: string, id: number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.id = id;
    }
}

const userInstance = new UserClass("John", 30, "john@example.com", 1);
// userInstance.id = 2; // ❌ Error: Cannot assign to 'id' because it is a read-only property

// ============================================================================
// 11. Enums
// ============================================================================

// Numeric enum
enum Status {
    Pending,
    Success,
    Error
}

const currentStatus: Status = Status.Success;

// String enum
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}

const direction: Direction = Direction.Up;

// ============================================================================
// 12. Constants and Readonly
// ============================================================================

// Const assertion (makes object readonly)
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
} as const;

// config.apiUrl = "new url"; // ❌ Error: Cannot assign to 'apiUrl' because it is a read-only property

// Readonly modifier
interface ReadonlyConfig {
    readonly apiUrl: string;
    readonly timeout: number;
}

const readonlyConfig: ReadonlyConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

// ============================================================================
// 13. Generic Types
// ============================================================================

// Generic function
function identity<T>(arg: T): T {
    return arg;
}

const stringResult = identity<string>("hello"); // Type: string
const numberResult = identity<number>(42);      // Type: number

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const userObj = { name: "John", age: 30 };
const name = getProperty(userObj, "name"); // Type: string
const age = getProperty(userObj, "age");    // Type: number

// ============================================================================
// 14. Best Practices Summary
// ============================================================================

/**
 * ✅ DO:
 * - Use 'const' by default
 * - Use 'let' when reassignment is needed
 * - Prefer explicit types for function parameters and return types
 * - Use type inference for local variables
 * - Use 'readonly' for immutability
 * - Use 'unknown' instead of 'any'
 * - Use type guards for runtime type checking
 * - Use interfaces for object shapes
 * - Use type aliases for unions/primitives
 */

/**
 * ❌ DON'T:
 * - Don't use 'var' (legacy, function-scoped)
 * - Don't use 'any' unless absolutely necessary
 * - Don't omit types for public APIs
 * - Don't use type assertions without validation
 * - Don't ignore TypeScript errors
 */

// ============================================================================
// 15. Common Patterns
// ============================================================================

// Nullish coalescing
const apiUrl = process.env.API_URL ?? "https://default-api.com";

// Optional chaining
interface UserWithAddress {
    name: string;
    address?: {
        street?: string;
        city?: string;
    };
}

const userWithAddress: UserWithAddress = { name: "John" };
const city = userWithAddress.address?.city; // Type: string | undefined

// Type assertion (use sparingly)
const someValue: unknown = "hello";
const stringValue = someValue as string; // Assertion

// Better: Use type guard
if (typeof someValue === 'string') {
    const safeString = someValue; // Type-safe
}

// ============================================================================
// 16. Examples with Data Structures
// ============================================================================

// Array with type
const numbersArray: number[] = [1, 2, 3, 4, 5];

// Map with types
const userMap: Map<string, User> = new Map();
userMap.set("user1", { name: "John", age: 30 });

// Set with types
const uniqueNumbers: Set<number> = new Set([1, 2, 3, 3, 4]); // {1, 2, 3, 4}

// Object with index signature
interface StringDictionary {
    [key: string]: string;
}

const dictionary: StringDictionary = {
    hello: "xin chào",
    goodbye: "tạm biệt"
};

// ============================================================================
// Export for use in other files
// ============================================================================

export {
    User,
    Point2D,
    Status,
    Direction,
    UserClass,
    identity,
    getProperty
};

