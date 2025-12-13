/**
 * Set Examples - TypeScript
 * Cấu trúc dữ liệu Set với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Use generic types for Set<T>
 * - Use readonly Set for immutability
 * - Use type-safe set operations
 * - Use WeakSet for object values with garbage collection
 * - Avoid 'any' type - use generics instead
 */

// ============================================================================
// 1. Basic Set Types
// ============================================================================

// ✅ Best Practice: Explicit generic types
const numberSet: Set<number> = new Set();
const fruitSet: Set<string> = new Set(['apple', 'banana', 'orange']);

// ✅ Best Practice: Type inference from initial values
const inferredSet = new Set([1, 2, 3]); // Type: Set<number>

// ✅ Best Practice: Complex value types
interface User {
    id: number;
    name: string;
}

const usersSet: Set<User> = new Set();
usersSet.add({ id: 1, name: 'John' });

// ✅ Best Practice: Readonly Set for immutability
type ReadonlySet<T> = {
    readonly has: (value: T) => boolean;
    readonly size: number;
    readonly forEach: (callback: (value: T) => void) => void;
    readonly values: () => IterableIterator<T>;
    readonly [Symbol.iterator]: () => IterableIterator<T>;
};

/**
 * Create readonly view of Set
 * @template T - Value type
 * @param set - Set to make readonly
 * @returns Readonly view
 */
function asReadonlySet<T>(set: Set<T>): ReadonlySet<T> {
    return {
        has: (value: T) => set.has(value),
        get size() { return set.size; },
        forEach: (callback: (value: T) => void) => set.forEach(callback),
        values: () => set.values(),
        [Symbol.iterator]: () => set[Symbol.iterator]()
    };
}

// ============================================================================
// 2. Generic Set Functions
// ============================================================================

/**
 * Generic Set adder
 * ✅ Best Practice: Use generics for reusable functions
 * @template T - Value type
 * @param set - Set instance
 * @param value - Value to add
 * @returns Set instance for chaining
 */
function addToSet<T>(set: Set<T>, value: T): Set<T> {
    if (!(set instanceof Set)) {
        throw new TypeError('First argument must be a Set');
    }
    return set.add(value);
}

/**
 * Generic Set membership check
 * @template T - Value type
 * @param set - Set instance
 * @param value - Value to check
 * @returns True if value exists
 */
function hasInSet<T>(set: Set<T>, value: T): boolean {
    return set.has(value);
}

/**
 * Remove duplicates with type safety
 * ✅ Best Practice: Generic function for any type
 * @template T - Element type
 * @param arr - Array with potential duplicates
 * @returns Array with unique elements
 */
function removeDuplicates<T>(arr: readonly T[]): T[] {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }
    return [...new Set(arr)];
}

/**
 * Check for duplicates
 * @template T - Element type
 * @param arr - Array to check
 * @returns True if array has duplicates
 */
function hasDuplicates<T>(arr: readonly T[]): boolean {
    return arr.length !== new Set(arr).size;
}

// ============================================================================
// 3. Type-Safe Set Operations
// ============================================================================

/**
 * Set union operation
 * ✅ Best Practice: Type-safe set operations
 * @template T - Value type
 * @param set1 - First set
 * @param set2 - Second set
 * @returns Union of both sets
 */
function setUnion<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    return new Set([...set1, ...set2]);
}

/**
 * Set intersection operation
 * @template T - Value type
 * @param set1 - First set
 * @param set2 - Second set
 * @returns Intersection of both sets
 */
function setIntersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    // Use smaller set for iteration
    const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1];
    return new Set([...smaller].filter(x => larger.has(x)));
}

/**
 * Set difference operation (set1 - set2)
 * @template T - Value type
 * @param set1 - First set
 * @param set2 - Second set
 * @returns Elements in set1 but not in set2
 */
function setDifference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    return new Set([...set1].filter(x => !set2.has(x)));
}

/**
 * Symmetric difference
 * @template T - Value type
 * @param set1 - First set
 * @param set2 - Second set
 * @returns Elements in either set, but not both
 */
function setSymmetricDifference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    const diff1 = setDifference(set1, set2);
    const diff2 = setDifference(set2, set1);
    return setUnion(diff1, diff2);
}

/**
 * Check if set1 is subset of set2
 * @template T - Value type
 * @param set1 - Potential subset
 * @param set2 - Potential superset
 * @returns True if set1 is subset of set2
 */
function isSubset<T>(set1: Set<T>, set2: Set<T>): boolean {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    if (set1.size > set2.size) {
        return false;
    }
    return [...set1].every(x => set2.has(x));
}

/**
 * Check if set1 is superset of set2
 * @template T - Value type
 * @param set1 - Potential superset
 * @param set2 - Potential subset
 * @returns True if set1 is superset of set2
 */
function isSuperset<T>(set1: Set<T>, set2: Set<T>): boolean {
    return isSubset(set2, set1);
}

// ============================================================================
// 4. WeakSet with Type Safety
// ============================================================================

/**
 * WeakSet with typed values
 * ✅ Best Practice: Use WeakSet for object values with garbage collection
 * @template T extends object - Value must be object
 */
class TypedWeakSet<T extends object> {
    private set = new WeakSet<T>();

    add(value: T): void {
        this.set.add(value);
    }

    has(value: T): boolean {
        return this.set.has(value);
    }

    delete(value: T): boolean {
        return this.set.delete(value);
    }
}

// Usage example
const processedObjects = new TypedWeakSet<object>();

function processObject<T extends object>(obj: T): string {
    if (processedObjects.has(obj)) {
        return 'Already processed';
    }
    processedObjects.add(obj);
    return 'Processing...';
}

// ============================================================================
// 5. Common Use Cases with Types
// ============================================================================

/**
 * Create lookup Set from array
 * ✅ Best Practice: Type-safe lookup creation
 * @template T - Element type
 * @param items - Array of items
 * @returns Set for O(1) lookups
 */
function createLookupSet<T>(items: readonly T[]): Set<T> {
    return new Set(items);
}

/**
 * Fast membership testing
 * @template T - Element type
 * @param allowedValues - Set of allowed values
 * @param value - Value to check
 * @returns True if value is allowed
 */
function isAllowed<T>(allowedValues: Set<T>, value: T): boolean {
    return allowedValues.has(value);
}

// Usage
const allowedRoles = createLookupSet(['admin', 'user', 'guest'] as const);
type Role = typeof allowedRoles extends Set<infer T> ? T : never;

function checkRole(role: string): role is Role {
    return isAllowed(allowedRoles, role as Role);
}

// ============================================================================
// 6. Type Guards for Sets
// ============================================================================

/**
 * Type guard for Set of strings
 * @param value - Value to check
 * @returns True if value is Set<string>
 */
function isStringSet(value: unknown): value is Set<string> {
    return value instanceof Set && [...value].every(item => typeof item === 'string');
}

/**
 * Type guard for non-empty Set
 * @template T - Value type
 * @param set - Set to check
 * @returns True if set is non-empty
 */
function isNonEmptySet<T>(set: Set<T>): boolean {
    return set.size > 0;
}

// ============================================================================
// 7. Set with Custom Equality
// ============================================================================

/**
 * Set with custom equality function
 * ✅ Best Practice: Extend Set for custom behavior
 * @template T - Value type
 */
class CustomEqualitySet<T> {
    private map = new Map<string, T>();
    private keyFn: (value: T) => string;

    constructor(keyFn: (value: T) => string, values?: readonly T[]) {
        this.keyFn = keyFn;
        values?.forEach(value => this.add(value));
    }

    add(value: T): this {
        const key = this.keyFn(value);
        this.map.set(key, value);
        return this;
    }

    has(value: T): boolean {
        const key = this.keyFn(value);
        return this.map.has(key);
    }

    delete(value: T): boolean {
        const key = this.keyFn(value);
        return this.map.delete(key);
    }

    get size(): number {
        return this.map.size;
    }

    forEach(callback: (value: T) => void): void {
        this.map.forEach(callback);
    }

    values(): IterableIterator<T> {
        return this.map.values();
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this.map.values();
    }
}

// Usage: Set with object equality by id
interface Item {
    id: number;
    name: string;
}

const itemSet = new CustomEqualitySet<Item>(
    item => item.id.toString(),
    [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
    ]
);

// ============================================================================
// 8. Error Handling with Types
// ============================================================================

/**
 * Result type for Set operations
 */
type SetResult<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

/**
 * Safe Set operation
 * @template T - Value type
 * @template R - Result type
 * @param set - Set to operate on
 * @param operation - Operation function
 * @returns Result with success flag
 */
function safeSetOperation<T, R>(
    set: Set<T>,
    operation: (set: Set<T>) => R
): SetResult<R> {
    try {
        if (!(set instanceof Set)) {
            throw new TypeError('First argument must be a Set');
        }
        const result = operation(set);
        return { success: true, data: result };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

// ============================================================================
// 9. Advanced Type Patterns
// ============================================================================

/**
 * Set operations with type narrowing
 * ✅ Best Practice: Use discriminated unions
 */
type SetOperation<T> =
    | { type: 'union'; set1: Set<T>; set2: Set<T> }
    | { type: 'intersection'; set1: Set<T>; set2: Set<T> }
    | { type: 'difference'; set1: Set<T>; set2: Set<T> };

function performSetOperation<T>(operation: SetOperation<T>): Set<T> {
    switch (operation.type) {
        case 'union':
            return setUnion(operation.set1, operation.set2);
        case 'intersection':
            return setIntersection(operation.set1, operation.set2);
        case 'difference':
            return setDifference(operation.set1, operation.set2);
    }
}

/**
 * Typed Set builder pattern
 * ✅ Best Practice: Fluent interface with type safety
 * @template T - Value type
 */
class SetBuilder<T> {
    private set = new Set<T>();

    add(value: T): this {
        this.set.add(value);
        return this;
    }

    addAll(values: readonly T[]): this {
        values.forEach(value => this.set.add(value));
        return this;
    }

    remove(value: T): this {
        this.set.delete(value);
        return this;
    }

    build(): Set<T> {
        return new Set(this.set);
    }

    get size(): number {
        return this.set.size;
    }
}

// Usage
const builtSet = new SetBuilder<number>()
    .add(1)
    .add(2)
    .addAll([3, 4, 5])
    .remove(3)
    .build();

// ============================================================================
// 10. Best Practices Summary
// ============================================================================

/**
 * TypeScript Set Best Practices:
 * 
 * 1. Type Safety:
 *    - Always specify generic types: Set<T>
 *    - Use type inference when types are clear
 *    - Use readonly Set for immutability
 * 
 * 2. Generics:
 *    - Use generics for reusable Set functions
 *    - Use constraints when needed
 *    - Use type parameters for complex operations
 * 
 * 3. WeakSet:
 *    - Use for object values only
 *    - Automatic garbage collection
 *    - No iteration support
 * 
 * 4. Set Operations:
 *    - Use union, intersection, difference for set math
 *    - Use isSubset/isSuperset for set relationships
 *    - Consider performance (use smaller set for iteration)
 * 
 * 5. Error Handling:
 *    - Use Result types for operations that can fail
 *    - Use type guards for validation
 *    - Never use 'any' - use 'unknown' instead
 * 
 * 6. Performance:
 *    - Use Set for O(1) membership testing
 *    - Convert array to Set for multiple lookups
 *    - Use WeakSet to prevent memory leaks
 */

export {
    addToSet,
    hasInSet,
    removeDuplicates,
    hasDuplicates,
    asReadonlySet,
    setUnion,
    setIntersection,
    setDifference,
    setSymmetricDifference,
    isSubset,
    isSuperset,
    TypedWeakSet,
    processObject,
    createLookupSet,
    isAllowed,
    isStringSet,
    isNonEmptySet,
    CustomEqualitySet,
    safeSetOperation,
    performSetOperation,
    SetBuilder,
    type ReadonlySet,
    type SetResult,
    type SetOperation
};

