/**
 * Array Examples - TypeScript
 * Cấu trúc dữ liệu Array với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Use generic types for reusable array functions
 * - Use readonly arrays for immutability
 * - Use tuple types for fixed-length arrays
 * - Use type guards for runtime type checking
 * - Avoid 'any' type - use 'unknown' instead
 * - Use utility types (Partial, Required, Pick, Omit)
 */

// ============================================================================
// 1. Basic Array Types
// ============================================================================

// ✅ Best Practice: Explicit type annotations
const fruits: string[] = ['apple', 'banana', 'orange'];
const numbers: number[] = [1, 2, 3, 4, 5];

// ✅ Best Practice: Generic Array type (alternative syntax)
const items: Array<string> = ['item1', 'item2'];

// ✅ Best Practice: Readonly arrays for immutability
const readonlyFruits: readonly string[] = ['apple', 'banana', 'orange'];
// readonlyFruits.push('grape'); // ❌ Error: Cannot assign to 'push' because it is a read-only property

// ✅ Best Practice: Tuple types for fixed-length arrays
type Point = [number, number];
const point: Point = [10, 20];

type UserInfo = [string, number, boolean];
const userInfo: UserInfo = ['John', 30, true];

// ✅ Best Practice: Optional tuple elements
type OptionalTuple = [string, number?];
const optional: OptionalTuple = ['hello'];
const optional2: OptionalTuple = ['hello', 42];

// ✅ Best Practice: Rest elements in tuples
type StringNumberBooleans = [string, number, ...boolean[]];
const tuple: StringNumberBooleans = ['hello', 1, true, false, true];

// ============================================================================
// 2. Generic Array Functions
// ============================================================================

/**
 * Generic array transformation function
 * ✅ Best Practice: Use generics for type-safe reusable functions
 * @template T - Element type
 * @param arr - Array to transform
 * @param transformFn - Transformation function
 * @returns New array with transformed elements
 */
function transformArray<T>(arr: T[], transformFn: (item: T) => T): T[] {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof transformFn !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    return arr.map(transformFn);
}

const doubled = transformArray(numbers, n => n * 2);
const upper = transformArray(fruits, f => f.toUpperCase());

/**
 * Generic filter function with type predicate
 * ✅ Best Practice: Use type predicates for type narrowing
 * @template T - Element type
 * @param arr - Array to filter
 * @param predicate - Type guard function
 * @returns Filtered array
 */
function filterArray<T>(
    arr: T[],
    predicate: (item: T) => item is T
): T[] {
    return arr.filter(predicate);
}

// ✅ Best Practice: Type guard for filtering
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

const mixed: (string | number)[] = ['hello', 42, 'world', 100];
const strings = mixed.filter(isString); // Type: string[]

/**
 * Generic reduce function
 * ✅ Best Practice: Generic accumulator type
 * @template T - Element type
 * @template U - Accumulator type
 * @param arr - Array to reduce
 * @param reducer - Reduction function
 * @param initialValue - Initial accumulator value
 * @returns Reduced value
 */
function reduceArray<T, U>(
    arr: T[],
    reducer: (acc: U, item: T) => U,
    initialValue: U
): U {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    return arr.reduce(reducer, initialValue);
}

const sum = reduceArray(numbers, (acc, n) => acc + n, 0);
const product = reduceArray(numbers, (acc, n) => acc * n, 1);

// ============================================================================
// 3. Type-Safe Array Operations
// ============================================================================

/**
 * Safe array access with bounds checking
 * ✅ Best Practice: Return undefined for out-of-bounds access
 * @template T - Element type
 * @param arr - Array to access
 * @param index - Index to access
 * @returns Element or undefined
 */
function safeArrayAccess<T>(arr: readonly T[], index: number): T | undefined {
    if (index < 0 || index >= arr.length) {
        return undefined;
    }
    return arr[index];
}

/**
 * Type-safe array element finder
 * ✅ Best Practice: Use generic constraints
 * @template T - Element type
 * @param arr - Array to search
 * @param predicate - Search predicate
 * @returns Found element or undefined
 */
function findElement<T>(
    arr: readonly T[],
    predicate: (item: T) => boolean
): T | undefined {
    return arr.find(predicate);
}

// ============================================================================
// 4. Utility Types with Arrays
// ============================================================================

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// ✅ Best Practice: Use Partial for optional updates
function updateUsers(users: User[], updates: Partial<User>[]): User[] {
    return users.map((user, index) => ({
        ...user,
        ...updates[index]
    }));
}

// ✅ Best Practice: Use Required for mandatory fields
type RequiredUser = Required<User>;
const requiredUsers: RequiredUser[] = [
    { id: 1, name: 'John', email: 'john@example.com', age: 30 }
];

// ✅ Best Practice: Use Pick for selecting specific fields
type UserSummary = Pick<User, 'id' | 'name'>;
const summaries: UserSummary[] = users.map(u => ({ id: u.id, name: u.name }));

// ✅ Best Practice: Use Omit for excluding fields
type UserWithoutEmail = Omit<User, 'email'>;
const usersWithoutEmail: UserWithoutEmail[] = users.map(({ email, ...rest }) => rest);

// ============================================================================
// 5. Readonly Arrays and Immutability
// ============================================================================

/**
 * Immutable array operations
 * ✅ Best Practice: Return new arrays instead of mutating
 * @template T - Element type
 * @param arr - Array to operate on
 * @param item - Item to add
 * @returns New array with item added
 */
function addItemImmutable<T>(arr: readonly T[], item: T): T[] {
    return [...arr, item];
}

/**
 * Immutable array removal
 * @template T - Element type
 * @param arr - Array to operate on
 * @param index - Index to remove
 * @returns New array without item at index
 */
function removeItemImmutable<T>(arr: readonly T[], index: number): T[] {
    if (index < 0 || index >= arr.length) {
        return [...arr];
    }
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

// ✅ Best Practice: Use readonly for function parameters
function processReadonlyArray(arr: readonly number[]): number {
    // arr.push(1); // ❌ Error: Cannot assign to 'push'
    return arr.reduce((sum, n) => sum + n, 0);
}

// ============================================================================
// 6. Type Guards and Narrowing
// ============================================================================

/**
 * Type guard for array of strings
 * ✅ Best Practice: Use type guards for runtime type checking
 * @param value - Value to check
 * @returns True if value is string array
 */
function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
}

/**
 * Type guard for non-empty array
 * @template T - Element type
 * @param arr - Array to check
 * @returns True if array is non-empty
 */
function isNonEmptyArray<T>(arr: T[]): arr is [T, ...T[]] {
    return arr.length > 0;
}

// Usage with type narrowing
function processArray(arr: unknown): void {
    if (isStringArray(arr)) {
        // TypeScript knows arr is string[] here
        arr.forEach(s => console.log(s.toUpperCase()));
    }
    
    if (isNonEmptyArray(arr)) {
        // TypeScript knows arr has at least one element
        const first = arr[0]; // No undefined check needed
    }
}

// ============================================================================
// 7. Branded Types for Type Safety
// ============================================================================

/**
 * Branded type for validated arrays
 * ✅ Best Practice: Use branded types for additional type safety
 */
type ValidatedArray<T> = T[] & { readonly __brand: 'ValidatedArray' };

function validateArray<T>(arr: T[], validator: (item: T) => boolean): ValidatedArray<T> {
    if (!arr.every(validator)) {
        throw new Error('Array validation failed');
    }
    return arr as ValidatedArray<T>;
}

// ============================================================================
// 8. Advanced Generic Patterns
// ============================================================================

/**
 * Flatten nested arrays
 * ✅ Best Practice: Recursive generic types
 * @template T - Element type
 * @param arr - Nested array
 * @returns Flattened array
 */
function flatten<T>(arr: (T | T[])[]): T[] {
    return arr.reduce<T[]>((acc, item) => {
        return acc.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

/**
 * Group array by key
 * ✅ Best Practice: Generic key extraction
 * @template T - Element type
 * @template K - Key type
 * @param arr - Array to group
 * @param keyFn - Key extraction function
 * @returns Map with grouped arrays
 */
function groupBy<T, K extends string | number | symbol>(
    arr: readonly T[],
    keyFn: (item: T) => K
): Map<K, T[]> {
    const grouped = new Map<K, T[]>();
    arr.forEach(item => {
        const key = keyFn(item);
        const group = grouped.get(key) ?? [];
        group.push(item);
        grouped.set(key, group);
    });
    return grouped;
}

// ============================================================================
// 9. Const Assertions
// ============================================================================

// ✅ Best Practice: Use 'as const' for literal types
const colors = ['red', 'green', 'blue'] as const;
type Color = typeof colors[number]; // 'red' | 'green' | 'blue'

// ✅ Best Practice: Readonly tuple with const assertion
const coordinates = [10, 20] as const;
// coordinates[0] = 5; // ❌ Error: Cannot assign to '0' because it is a read-only property

// ============================================================================
// 10. Array Method Overloads
// ============================================================================

/**
 * Type-safe array chunking
 * ✅ Best Practice: Function overloads for different return types
 * @template T - Element type
 */
function chunk<T>(arr: readonly T[], size: 1): T[][];
function chunk<T>(arr: readonly T[], size: 2): [T, T][];
function chunk<T>(arr: readonly T[], size: number): T[][];
function chunk<T>(arr: readonly T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size) as T[]);
    }
    return chunks;
}

const pairs = chunk([1, 2, 3, 4, 5], 2); // Type: [number, number][]

// ============================================================================
// 11. Error Handling with Types
// ============================================================================

/**
 * Result type for error handling
 * ✅ Best Practice: Use discriminated unions for error handling
 */
type Result<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

/**
 * Safe array operation with Result type
 * @template T - Element type
 * @template U - Result type
 * @param arr - Array to operate on
 * @param operation - Operation function
 * @returns Result with success flag
 */
function safeArrayOperation<T, U>(
    arr: readonly T[],
    operation: (arr: readonly T[]) => U
): Result<U> {
    try {
        if (!Array.isArray(arr)) {
            throw new TypeError('First argument must be an array');
        }
        const result = operation(arr);
        return { success: true, data: result };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

// Usage with type narrowing
const result = safeArrayOperation(numbers, arr => arr.map(n => n * 2));
if (result.success) {
    console.log(result.data); // TypeScript knows data exists
} else {
    console.error(result.error); // TypeScript knows error exists
}

// ============================================================================
// 12. Performance and Best Practices
// ============================================================================

/**
 * TypeScript Array Best Practices:
 * 
 * 1. Type Safety:
 *    - Always use explicit types or let TypeScript infer
 *    - Use readonly arrays for immutability
 *    - Use type guards for runtime validation
 * 
 * 2. Generics:
 *    - Use generics for reusable functions
 *    - Use constraints when needed (extends keyword)
 *    - Use type parameters for complex operations
 * 
 * 3. Utility Types:
 *    - Use Partial<T> for optional updates
 *    - Use Required<T> for mandatory fields
 *    - Use Pick<T, K> and Omit<T, K> for field selection
 * 
 * 4. Immutability:
 *    - Prefer readonly arrays
 *    - Use spread operator for copying
 *    - Return new arrays instead of mutating
 * 
 * 5. Type Guards:
 *    - Use type predicates (value is Type)
 *    - Narrow types for better type safety
 *    - Validate at runtime when needed
 * 
 * 6. Error Handling:
 *    - Use Result types for operations that can fail
 *    - Use discriminated unions
 *    - Never use 'any' - use 'unknown' instead
 */

// Example usage
const users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
];

const userNames = users.map(u => u.name); // string[]
const adults = users.filter(u => (u.age ?? 0) >= 18); // User[]
const totalAge = users.reduce((sum, u) => sum + (u.age ?? 0), 0); // number

export {
    transformArray,
    filterArray,
    reduceArray,
    safeArrayAccess,
    findElement,
    addItemImmutable,
    removeItemImmutable,
    isStringArray,
    isNonEmptyArray,
    validateArray,
    flatten,
    groupBy,
    chunk,
    safeArrayOperation,
    type Result,
    type User,
    type Color,
    type Point
};

