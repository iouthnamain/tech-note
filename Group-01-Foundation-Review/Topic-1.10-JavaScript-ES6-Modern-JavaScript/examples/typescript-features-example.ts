/**
 * TypeScript Advanced Features Examples
 * TypeScript-specific features với best practices
 * 
 * TypeScript Best Practices:
 * - Discriminated unions
 * - Conditional types
 * - Template literal types
 * - Recursive types
 * - Module augmentation
 * - Type inference
 * - Type assertions
 */

// ============================================================================
// 1. Type Inference
// ============================================================================

/**
 * Type Inference
 * ✅ Best Practice: Let TypeScript infer types when clear
 */
const name = 'John'; // Type: string
const age = 30; // Type: number
const isActive = true; // Type: boolean

// Function return type inference
function add(a: number, b: number) {
    return a + b; // Return type inferred as number
}

// Array type inference
const numbers = [1, 2, 3]; // Type: number[]
const mixed = [1, 'hello', true]; // Type: (string | number | boolean)[]

// ============================================================================
// 2. Type Assertions
// ============================================================================

/**
 * Type Assertions
 * ✅ Best Practice: Use when you know more about the type than TypeScript
 */
const value: unknown = 'hello';
const str = value as string; // Type assertion

// Angle bracket syntax (not recommended in JSX)
const str2 = <string>value;

// ✅ Best Practice: Use type guards instead when possible
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
}

// ============================================================================
// 3. Discriminated Unions
// ============================================================================

/**
 * Discriminated Unions
 * ✅ Best Practice: Use for type-safe state management
 */
type LoadingState = {
    status: 'loading';
};

type SuccessState<T> = {
    status: 'success';
    data: T;
};

type ErrorState = {
    status: 'error';
    error: string;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleState<T>(state: AsyncState<T>): void {
    switch (state.status) {
        case 'loading':
            console.log('Loading...');
            break;
        case 'success':
            console.log('Data:', state.data); // TypeScript knows data exists
            break;
        case 'error':
            console.error('Error:', state.error); // TypeScript knows error exists
            break;
    }
}

// ============================================================================
// 4. Conditional Types
// ============================================================================

/**
 * Conditional Types
 * ✅ Best Practice: Use for type transformations
 */

// Basic conditional type
type IsArray<T> = T extends any[] ? true : false;
type Test1 = IsArray<number[]>; // true
type Test2 = IsArray<number>; // false

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type Element = ArrayElement<number[]>; // number

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type FuncReturn = ReturnType<() => string>; // string

// Non-nullable type
type NonNullable<T> = T extends null | undefined ? never : T;
type NonNull = NonNullable<string | null>; // string

// ============================================================================
// 5. Template Literal Types
// ============================================================================

/**
 * Template Literal Types
 * ✅ Best Practice: Use for string manipulation at type level
 */
type EventName = `on${Capitalize<string>}`;
type OnClick = `on${'Click'}`; // 'onClick'
type OnChange = `on${'Change'}`; // 'onChange'

// API endpoint types
type ApiEndpoint = `/api/${string}`;
type UserEndpoint = `/api/users/${number}`;

// CSS property types
type CssProperty = `margin-${'top' | 'bottom' | 'left' | 'right'}`;

// ============================================================================
// 6. Mapped Types
// ============================================================================

/**
 * Mapped Types
 * ✅ Best Practice: Use for transforming object types
 */

// Make all properties optional
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// Make all properties required
type Required<T> = {
    [P in keyof T]-?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Example usage
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type UserName = Pick<User, 'name' | 'email'>;
type UserWithoutEmail = Omit<User, 'email'>;

// ============================================================================
// 7. Recursive Types
// ============================================================================

/**
 * Recursive Types
 * ✅ Best Practice: Use for nested data structures
 */
type JsonValue =
    | string
    | number
    | boolean
    | null
    | { [key: string]: JsonValue }
    | JsonValue[];

// Tree structure
interface TreeNode<T> {
    value: T;
    children?: TreeNode<T>[];
}

// Linked list
type LinkedList<T> = {
    value: T;
    next: LinkedList<T> | null;
};

// ============================================================================
// 8. Utility Types
// ============================================================================

/**
 * Utility Types
 * ✅ Best Practice: Use built-in utility types
 */

// Record - create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// Exclude - exclude types from union
type NonString = Exclude<string | number | boolean, string>; // number | boolean

// Extract - extract types from union
type OnlyStrings = Extract<string | number | boolean, string>; // string

// Parameters - extract function parameters
type FuncParams = Parameters<(a: number, b: string) => void>; // [number, string]

// ConstructorParameters - extract constructor parameters
type ConstructorParams = ConstructorParameters<typeof Date>; // [value: string | number | Date]

// InstanceType - extract instance type
type DateInstance = InstanceType<typeof Date>; // Date

// ============================================================================
// 9. Branded Types
// ============================================================================

/**
 * Branded Types
 * ✅ Best Practice: Use for additional type safety
 */
type UserId = number & { readonly __brand: 'UserId' };
type ProductId = number & { readonly __brand: 'ProductId' };

function createUserId(id: number): UserId {
    return id as UserId;
}

function getUserById(id: UserId): User {
    // Implementation
    return {} as User;
}

// Prevents mixing up IDs
const userId = createUserId(1);
const productId = 2 as ProductId;
// getUserById(productId); // Error: Type 'ProductId' is not assignable to type 'UserId'

// ============================================================================
// 10. Type Predicates
// ============================================================================

/**
 * Type Predicates
 * ✅ Best Practice: Use for type narrowing
 */
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value &&
        'email' in value
    );
}

// Usage with type narrowing
function processValue(value: unknown): void {
    if (isString(value)) {
        console.log(value.toUpperCase()); // TypeScript knows value is string
    } else if (isNumber(value)) {
        console.log(value.toFixed(2)); // TypeScript knows value is number
    }
}

// ============================================================================
// 11. Function Overloads
// ============================================================================

/**
 * Function Overloads
 * ✅ Best Practice: Use for different function signatures
 */
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value * 2;
}

// ============================================================================
// 12. Generic Constraints
// ============================================================================

/**
 * Generic Constraints
 * ✅ Best Practice: Use extends for type constraints
 */
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// Multiple constraints
function combine<T extends object, U extends object>(a: T, b: U): T & U {
    return { ...a, ...b };
}

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// ============================================================================
// 13. Index Signatures
// ============================================================================

/**
 * Index Signatures
 * ✅ Best Practice: Use for dynamic property access
 */
interface Dictionary<T> {
    [key: string]: T;
}

const wordCount: Dictionary<number> = {
    'hello': 2,
    'world': 1
};

// Readonly index signature
interface ReadonlyDictionary<T> {
    readonly [key: string]: T;
}

// ============================================================================
// 14. Module Augmentation
// ============================================================================

/**
 * Module Augmentation
 * ✅ Best Practice: Use for extending third-party types
 */

// Augment global types
declare global {
    interface Window {
        customProperty: string;
    }
}

// Augment module types
declare module 'express' {
    interface Request {
        user?: User;
    }
}

// ============================================================================
// 15. Const Assertions
// ============================================================================

/**
 * Const Assertions
 * ✅ Best Practice: Use for literal types
 */
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'

const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
} as const;

// ============================================================================
// 16. Satisfies Operator (TypeScript 4.9+)
// ============================================================================

/**
 * Satisfies Operator
 * ✅ Best Practice: Use for type checking without widening
 */
const theme = {
    colors: {
        primary: '#ff0000',
        secondary: '#00ff00'
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24
    }
} satisfies {
    colors: Record<string, string>;
    spacing: Record<string, number>;
};

// Type is inferred but satisfies the constraint
type Theme = typeof theme;

// ============================================================================
// 17. Advanced Generic Patterns
// ============================================================================

/**
 * Advanced Generic Patterns
 */

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]

// Non-distributive conditional types
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type StrOrNumArr = ToArrayNonDist<string | number>; // (string | number)[]

// Flatten array type
type Flatten<T> = T extends (infer U)[] ? U : T;
type Flattened = Flatten<number[][]>; // number[]

// ============================================================================
// 18. Type-Level Programming
// ============================================================================

/**
 * Type-Level Programming Examples
 */

// String manipulation
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

type Upper = Uppercase<'hello'>; // 'HELLO'
type Lower = Lowercase<'WORLD'>; // 'world'

// Tuple manipulation
type First<T extends readonly unknown[]> = T extends readonly [infer F, ...unknown[]] ? F : never;
type Rest<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : never;

type FirstElement = First<[1, 2, 3]>; // 1
type RestElements = Rest<[1, 2, 3]>; // [2, 3]

// ============================================================================
// 19. Best Practices Summary
// ============================================================================

/**
 * TypeScript Advanced Features Best Practices:
 * 
 * 1. Type Inference:
 *    - Let TypeScript infer when types are clear
 *    - Add explicit types for public APIs
 * 
 * 2. Discriminated Unions:
 *    - Use for type-safe state management
 *    - Include discriminant property
 * 
 * 3. Conditional Types:
 *    - Use for type transformations
 *    - Understand distributive behavior
 * 
 * 4. Template Literal Types:
 *    - Use for string manipulation
 *    - Combine with utility types
 * 
 * 5. Mapped Types:
 *    - Use for transforming object types
 *    - Leverage built-in utility types
 * 
 * 6. Type Guards:
 *    - Use for runtime type checking
 *    - Prefer over type assertions
 * 
 * 7. Generics:
 *    - Use constraints appropriately
 *    - Keep generic parameters meaningful
 * 
 * 8. Module Augmentation:
 *    - Use for extending third-party types
 *    - Declare in separate .d.ts files
 */

export {
    handleState,
    type AsyncState,
    type LoadingState,
    type SuccessState,
    type ErrorState,
    type JsonValue,
    type TreeNode,
    type LinkedList,
    type UserId,
    type ProductId,
    createUserId,
    getUserById,
    isString,
    isNumber,
    isUser,
    process,
    logLength,
    combine,
    getProperty,
    type Dictionary,
    type Color,
    type Theme
};

