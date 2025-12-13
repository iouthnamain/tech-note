/**
 * Map Examples - TypeScript
 * Cấu trúc dữ liệu Map với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Use generic types for Map<K, V>
 * - Use readonly Map for immutability
 * - Use type-safe key-value pairs
 * - Use WeakMap for object keys with garbage collection
 * - Avoid 'any' type - use generics instead
 */

// ============================================================================
// 1. Basic Map Types
// ============================================================================

// ✅ Best Practice: Explicit generic types
const userMap: Map<string, string> = new Map();
const productMap: Map<string, number> = new Map([
    ['laptop', 999],
    ['phone', 599],
    ['tablet', 399]
]);

// ✅ Best Practice: Type inference from initial values
const inferredMap = new Map([
    ['key1', 'value1'],
    ['key2', 'value2']
]); // Type: Map<string, string>

// ✅ Best Practice: Complex value types
interface User {
    id: number;
    name: string;
    email: string;
}

const usersMap: Map<number, User> = new Map();
usersMap.set(1, { id: 1, name: 'John', email: 'john@example.com' });

// ============================================================================
// 2. Generic Map Functions
// ============================================================================

/**
 * Generic Map setter with type safety
 * ✅ Best Practice: Use generics for reusable functions
 * @template K - Key type
 * @template V - Value type
 * @param map - Map instance
 * @param key - Key to set
 * @param value - Value to set
 * @returns Map instance for chaining
 */
function setMapValue<K, V>(map: Map<K, V>, key: K, value: V): Map<K, V> {
    if (!(map instanceof Map)) {
        throw new TypeError('First argument must be a Map');
    }
    return map.set(key, value);
}

/**
 * Generic Map getter with default value
 * ✅ Best Practice: Use nullish coalescing for defaults
 * @template K - Key type
 * @template V - Value type
 * @param map - Map instance
 * @param key - Key to get
 * @param defaultValue - Default value if key doesn't exist
 * @returns Value or default
 */
function getMapValue<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
    return map.get(key) ?? defaultValue;
}

// ✅ Best Practice: Type-safe access with defaults
const name = getMapValue(userMap, 'name', 'Unknown');

/**
 * Generic Map has check
 * @template K - Key type
 * @param map - Map instance
 * @param key - Key to check
 * @returns True if key exists
 */
function hasMapKey<K>(map: Map<K, unknown>, key: K): boolean {
    return map.has(key);
}

// ============================================================================
// 3. Type-Safe Map Operations
// ============================================================================

/**
 * Convert Object to Map with type safety
 * ✅ Best Practice: Use Object.entries() with proper typing
 * @template K extends string | number | symbol
 * @template V
 * @param obj - Object to convert
 * @returns Typed Map
 */
function objectToMap<K extends string | number | symbol, V>(
    obj: Record<K, V>
): Map<K, V> {
    return new Map(Object.entries(obj) as [K, V][]);
}

/**
 * Convert Map to Object with type safety
 * @template K extends string | number | symbol
 * @template V
 * @param map - Map to convert
 * @returns Typed object
 */
function mapToObject<K extends string | number | symbol, V>(
    map: Map<K, V>
): Record<K, V> {
    const obj = {} as Record<K, V>;
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

// ============================================================================
// 4. Readonly Map
// ============================================================================

/**
 * Readonly Map type
 * ✅ Best Practice: Use ReadonlyMap for immutability
 */
type ReadonlyMap<K, V> = {
    readonly get: (key: K) => V | undefined;
    readonly has: (key: K) => boolean;
    readonly size: number;
    readonly forEach: (callback: (value: V, key: K) => void) => void;
    readonly entries: () => IterableIterator<[K, V]>;
    readonly keys: () => IterableIterator<K>;
    readonly values: () => IterableIterator<V>;
};

/**
 * Create readonly view of Map
 * @template K - Key type
 * @template V - Value type
 * @param map - Map to make readonly
 * @returns Readonly view
 */
function asReadonlyMap<K, V>(map: Map<K, V>): ReadonlyMap<K, V> {
    return {
        get: (key: K) => map.get(key),
        has: (key: K) => map.has(key),
        get size() { return map.size; },
        forEach: (callback: (value: V, key: K) => void) => map.forEach(callback),
        entries: () => map.entries(),
        keys: () => map.keys(),
        values: () => map.values()
    };
}

// ============================================================================
// 5. WeakMap with Type Safety
// ============================================================================

/**
 * WeakMap with typed keys and values
 * ✅ Best Practice: Use WeakMap for object keys with garbage collection
 * @template K extends object - Key must be object
 * @template V - Value type
 */
class TypedWeakMap<K extends object, V> {
    private map = new WeakMap<K, V>();

    set(key: K, value: V): void {
        this.map.set(key, value);
    }

    get(key: K): V | undefined {
        return this.map.get(key);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    delete(key: K): boolean {
        return this.map.delete(key);
    }
}

// Usage example
const privateData = new TypedWeakMap<object, { name: string; age: number }>();

class User {
    constructor(name: string, age: number) {
        privateData.set(this, { name, age });
    }

    getName(): string {
        return privateData.get(this)?.name ?? 'Unknown';
    }

    getAge(): number {
        return privateData.get(this)?.age ?? 0;
    }
}

// ============================================================================
// 6. Common Use Cases with Types
// ============================================================================

/**
 * Count occurrences with type safety
 * ✅ Best Practice: Generic function for any type
 * @template T - Item type
 * @param items - Array of items to count
 * @returns Map with counts
 */
function countOccurrences<T>(items: readonly T[]): Map<T, number> {
    const countMap = new Map<T, number>();
    items.forEach(item => {
        countMap.set(item, (countMap.get(item) ?? 0) + 1);
    });
    return countMap;
}

const words = ['hello', 'world', 'hello', 'javascript'];
const wordCount = countOccurrences(words); // Map<string, number>

/**
 * Memoization with type safety
 * ✅ Best Practice: Generic memoization function
 * @template TArgs - Argument types (as tuple)
 * @template TReturn - Return type
 * @param fn - Function to memoize
 * @returns Memoized function
 */
function memoize<TArgs extends readonly unknown[], TReturn>(
    fn: (...args: TArgs) => TReturn
): (...args: TArgs) => TReturn {
    const cache = new Map<string, TReturn>();
    
    return (...args: TArgs): TReturn => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const expensiveOperation = memoize((n: number): number => {
    return n * n;
});

/**
 * Group by key with type safety
 * ✅ Best Practice: Generic key extraction
 * @template T - Item type
 * @template K - Key type
 * @param items - Array to group
 * @param keyFn - Key extraction function
 * @returns Map with grouped arrays
 */
function groupByMap<T, K extends string | number | symbol>(
    items: readonly T[],
    keyFn: (item: T) => K
): Map<K, T[]> {
    const grouped = new Map<K, T[]>();
    items.forEach(item => {
        const key = keyFn(item);
        const group = grouped.get(key) ?? [];
        group.push(item);
        grouped.set(key, group);
    });
    return grouped;
}

// Usage
const people: User[] = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
];

const groupedById = groupByMap(people, person => person.id);

// ============================================================================
// 7. Map Operations with Types
// ============================================================================

/**
 * Map union operation
 * ✅ Best Practice: Type-safe set operations
 * @template K - Key type
 * @template V - Value type
 * @param map1 - First map
 * @param map2 - Second map
 * @param mergeFn - Function to merge values for duplicate keys
 * @returns Union map
 */
function mapUnion<K, V>(
    map1: Map<K, V>,
    map2: Map<K, V>,
    mergeFn: (v1: V, v2: V) => V = (v1) => v1
): Map<K, V> {
    const union = new Map<K, V>(map1);
    map2.forEach((value, key) => {
        if (union.has(key)) {
            union.set(key, mergeFn(union.get(key)!, value));
        } else {
            union.set(key, value);
        }
    });
    return union;
}

/**
 * Map intersection operation
 * @template K - Key type
 * @template V - Value type
 * @param map1 - First map
 * @param map2 - Second map
 * @param mergeFn - Function to merge values
 * @returns Intersection map
 */
function mapIntersection<K, V>(
    map1: Map<K, V>,
    map2: Map<K, V>,
    mergeFn: (v1: V, v2: V) => V = (v1) => v1
): Map<K, V> {
    const intersection = new Map<K, V>();
    map1.forEach((value, key) => {
        if (map2.has(key)) {
            intersection.set(key, mergeFn(value, map2.get(key)!));
        }
    });
    return intersection;
}

// ============================================================================
// 8. Type-Safe Configuration Maps
// ============================================================================

/**
 * Typed configuration map
 * ✅ Best Practice: Use interfaces for configuration
 */
interface AppConfig {
    apiUrl: string;
    timeout: number;
    retries: number;
    debug: boolean;
}

type ConfigKey = keyof AppConfig;

class ConfigManager {
    private config = new Map<ConfigKey, AppConfig[ConfigKey]>();

    set<K extends ConfigKey>(key: K, value: AppConfig[K]): void {
        this.config.set(key, value);
    }

    get<K extends ConfigKey>(key: K): AppConfig[K] | undefined {
        return this.config.get(key) as AppConfig[K] | undefined;
    }

    getWithDefault<K extends ConfigKey>(key: K, defaultValue: AppConfig[K]): AppConfig[K] {
        return this.config.get(key) as AppConfig[K] ?? defaultValue;
    }

    getAll(): Partial<AppConfig> {
        return Object.fromEntries(this.config) as Partial<AppConfig>;
    }
}

// ============================================================================
// 9. Error Handling with Types
// ============================================================================

/**
 * Result type for Map operations
 */
type MapResult<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

/**
 * Safe Map operation
 * @template K - Key type
 * @template V - Value type
 * @template R - Result type
 * @param map - Map to operate on
 * @param operation - Operation function
 * @returns Result with success flag
 */
function safeMapOperation<K, V, R>(
    map: Map<K, V>,
    operation: (map: Map<K, V>) => R
): MapResult<R> {
    try {
        if (!(map instanceof Map)) {
            throw new TypeError('First argument must be a Map');
        }
        const result = operation(map);
        return { success: true, data: result };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new Error(String(error))
        };
    }
}

// ============================================================================
// 10. Advanced Type Patterns
// ============================================================================

/**
 * Map with default values
 * ✅ Best Practice: Extend Map class for custom behavior
 * @template K - Key type
 * @template V - Value type
 */
class DefaultMap<K, V> extends Map<K, V> {
    constructor(
        private defaultValue: V | (() => V),
        entries?: readonly (readonly [K, V])[] | null
    ) {
        super(entries);
    }

    get(key: K): V {
        if (!this.has(key)) {
            const value = typeof this.defaultValue === 'function'
                ? (this.defaultValue as () => V)()
                : this.defaultValue;
            this.set(key, value);
        }
        return super.get(key)!;
    }
}

// Usage
const defaultMap = new DefaultMap<string, number>(0);
const count = defaultMap.get('key'); // Returns 0 if key doesn't exist

/**
 * Bidirectional Map
 * ✅ Best Practice: Custom Map implementation for two-way lookups
 * @template K - Key type
 * @template V - Value type
 */
class BiMap<K, V> {
    private forward = new Map<K, V>();
    private reverse = new Map<V, K>();

    set(key: K, value: V): void {
        // Remove old reverse mapping if key exists
        const oldValue = this.forward.get(key);
        if (oldValue !== undefined) {
            this.reverse.delete(oldValue);
        }
        
        // Remove old forward mapping if value exists
        const oldKey = this.reverse.get(value);
        if (oldKey !== undefined) {
            this.forward.delete(oldKey);
        }
        
        this.forward.set(key, value);
        this.reverse.set(value, key);
    }

    get(key: K): V | undefined {
        return this.forward.get(key);
    }

    getKey(value: V): K | undefined {
        return this.reverse.get(value);
    }

    has(key: K): boolean {
        return this.forward.has(key);
    }

    hasValue(value: V): boolean {
        return this.reverse.has(value);
    }

    delete(key: K): boolean {
        const value = this.forward.get(key);
        if (value !== undefined) {
            this.forward.delete(key);
            this.reverse.delete(value);
            return true;
        }
        return false;
    }

    get size(): number {
        return this.forward.size;
    }
}

// ============================================================================
// 11. Best Practices Summary
// ============================================================================

/**
 * TypeScript Map Best Practices:
 * 
 * 1. Type Safety:
 *    - Always specify generic types: Map<K, V>
 *    - Use type inference when types are clear
 *    - Use readonly Map for immutability
 * 
 * 2. Generics:
 *    - Use generics for reusable Map functions
 *    - Use constraints when needed
 *    - Use type parameters for complex operations
 * 
 * 3. WeakMap:
 *    - Use for object keys only
 *    - Automatic garbage collection
 *    - No iteration support
 * 
 * 4. Error Handling:
 *    - Use Result types for operations that can fail
 *    - Use type guards for validation
 *    - Never use 'any' - use 'unknown' instead
 * 
 * 5. Performance:
 *    - Use Map for dynamic keys
 *    - Use Map for frequent additions/deletions
 *    - Use WeakMap to prevent memory leaks
 */

export {
    setMapValue,
    getMapValue,
    hasMapKey,
    objectToMap,
    mapToObject,
    asReadonlyMap,
    TypedWeakMap,
    User,
    countOccurrences,
    memoize,
    groupByMap,
    mapUnion,
    mapIntersection,
    ConfigManager,
    safeMapOperation,
    DefaultMap,
    BiMap,
    type ReadonlyMap,
    type MapResult,
    type AppConfig
};

