/**
 * Map Examples - JavaScript
 * Cấu trúc dữ liệu Map (Key-Value pairs) với best practices
 * 
 * Best Practices:
 * - Use Map instead of Object when keys are dynamic or unknown at compile time
 * - Use Map for maintaining insertion order
 * - Use WeakMap for memory-efficient key-value storage
 * - Always validate Map operations
 * - Prefer Map for frequent additions/deletions
 */

'use strict';

// ============================================================================
// 1. Creating Maps
// ============================================================================

/**
 * Create an empty Map
 * ✅ Best Practice: Use Map constructor for empty maps
 */
const userMap = new Map();

/**
 * Create Map from iterable
 * ✅ Best Practice: Initialize with array of [key, value] pairs
 */
const productMap = new Map([
    ['laptop', 999],
    ['phone', 599],
    ['tablet', 399]
]);

/**
 * Create Map from Object
 * ✅ Best Practice: Use Object.entries() to convert Object to Map
 */
const userObject = { name: 'John', age: 30 };
const mapFromObject = new Map(Object.entries(userObject));

// ============================================================================
// 2. Adding Elements
// ============================================================================

/**
 * Set key-value pair in Map
 * Time Complexity: O(1) average
 * ✅ Best Practice: Chain set() calls for multiple additions
 * @param {Map} map - The Map instance
 * @param {*} key - The key
 * @param {*} value - The value
 * @returns {Map} The Map instance (for chaining)
 */
function setMapValue(map, key, value) {
    if (!(map instanceof Map)) {
        throw new TypeError('First argument must be a Map');
    }
    return map.set(key, value);
}

// ✅ Best Practice: Chain set() operations
userMap
    .set('name', 'John Doe')
    .set('age', 30)
    .set('email', 'john@example.com');

// ✅ Best Practice: Use meaningful keys
const configMap = new Map();
configMap.set('apiUrl', 'https://api.example.com');
configMap.set('timeout', 5000);
configMap.set('retries', 3);

// ============================================================================
// 3. Accessing Values
// ============================================================================

/**
 * Get value from Map
 * Time Complexity: O(1) average
 * ✅ Best Practice: Use nullish coalescing for default values
 * @param {Map} map - The Map instance
 * @param {*} key - The key to look up
 * @returns {*} The value, or undefined if key doesn't exist
 */
function getMapValue(map, key) {
    if (!(map instanceof Map)) {
        throw new TypeError('First argument must be a Map');
    }
    return map.get(key);
}

// ✅ Best Practice: Use nullish coalescing for defaults (ES2020)
const name = userMap.get('name') ?? 'Unknown';
const phone = userMap.get('phone') ?? 'Not provided';

// ✅ Best Practice: Safe access with optional chaining
const safeValue = userMap?.get('name') ?? 'default';

// ============================================================================
// 4. Checking Key Existence
// ============================================================================

/**
 * Check if key exists in Map
 * Time Complexity: O(1) average
 * ✅ Best Practice: Use has() instead of get() !== undefined
 * @param {Map} map - The Map instance
 * @param {*} key - The key to check
 * @returns {boolean} True if key exists
 */
function hasMapKey(map, key) {
    if (!(map instanceof Map)) {
        throw new TypeError('First argument must be a Map');
    }
    return map.has(key);
}

// ✅ Best Practice: Use has() for existence checks
if (userMap.has('email')) {
    console.log('Email exists');
}

// ❌ Anti-pattern: Don't use get() !== undefined
// if (userMap.get('email') !== undefined) { } // BAD

// ============================================================================
// 5. Map Size and Operations
// ============================================================================

/**
 * Get Map size
 * Time Complexity: O(1)
 * ✅ Best Practice: Use size property, not length
 */
const mapSize = userMap.size; // ✅ Correct
// const mapSize = userMap.length; // ❌ Wrong - Maps don't have length

/**
 * Clear all entries from Map
 * Time Complexity: O(n)
 * ⚠️ Mutates the Map
 */
function clearMap(map) {
    if (!(map instanceof Map)) {
        throw new TypeError('Argument must be a Map');
    }
    map.clear();
    return map;
}

/**
 * Delete key from Map
 * Time Complexity: O(1) average
 * @param {Map} map - The Map instance
 * @param {*} key - The key to delete
 * @returns {boolean} True if key existed and was deleted
 */
function deleteMapKey(map, key) {
    if (!(map instanceof Map)) {
        throw new TypeError('First argument must be a Map');
    }
    return map.delete(key);
}

// ============================================================================
// 6. Iteration (Best Practices)
// ============================================================================

/**
 * Iterate Map with forEach
 * Time Complexity: O(n)
 * ✅ Best Practice: forEach maintains insertion order
 */
function iterateMap(map, callback) {
    if (!(map instanceof Map)) {
        throw new TypeError('First argument must be a Map');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    map.forEach(callback);
}

// ✅ Best Practice: forEach with value, key, map signature
userMap.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});

/**
 * Iterate Map with for...of
 * Time Complexity: O(n)
 * ✅ Best Practice: Use destructuring for cleaner code
 */
function iterateMapEntries(map) {
    if (!(map instanceof Map)) {
        throw new TypeError('Argument must be a Map');
    }
    for (const [key, value] of map.entries()) {
    console.log(`${key} = ${value}`);
}
}

// ✅ Best Practice: Direct iteration (entries() is default)
for (const [key, value] of userMap) {
    console.log(`${key}: ${value}`);
}

// ✅ Best Practice: Iterate keys only
for (const key of userMap.keys()) {
    console.log(key);
}

// ✅ Best Practice: Iterate values only
for (const value of userMap.values()) {
    console.log(value);
}

// ============================================================================
// 7. Converting Map to Arrays
// ============================================================================

/**
 * Get all keys as array
 * ✅ Best Practice: Use Array.from() or spread operator
 */
const keys = Array.from(userMap.keys());
const keysSpread = [...userMap.keys()];

/**
 * Get all values as array
 */
const values = Array.from(userMap.values());
const valuesSpread = [...userMap.values()];

/**
 * Get all entries as array
 * ✅ Best Practice: Use Array.from() for entries
 */
const entries = Array.from(userMap.entries());
const entriesSpread = [...userMap];

// ============================================================================
// 8. WeakMap (Memory-Efficient Maps)
// ============================================================================

/**
 * WeakMap Examples
 * ✅ Best Practice: Use WeakMap when keys are objects and you want automatic garbage collection
 * - Keys must be objects (not primitives)
 * - Keys are weakly referenced (can be garbage collected)
 * - No iteration methods (keys(), values(), entries())
 * - No size property
 * - Use case: Private data, caching, DOM element metadata
 */
const weakMap = new WeakMap();

// ✅ Valid: Object keys
const objKey = { id: 1 };
weakMap.set(objKey, 'some value');

// ❌ Invalid: Primitive keys
// weakMap.set('string', 'value'); // TypeError

/**
 * Private data pattern with WeakMap
 * ✅ Best Practice: Use WeakMap for truly private class data
 */
const privateData = new WeakMap();

class User {
    constructor(name, age) {
        // Store private data in WeakMap
        privateData.set(this, { name, age });
    }
    
    getName() {
        return privateData.get(this)?.name;
    }
    
    getAge() {
        return privateData.get(this)?.age;
    }
}

// ============================================================================
// 9. Common Use Cases
// ============================================================================

/**
 * Counting occurrences
 * Time Complexity: O(n)
 * ✅ Best Practice: Use Map for frequency counting
 * @param {Array} items - Array of items to count
 * @returns {Map} Map with item counts
 */
function countOccurrences(items) {
    if (!Array.isArray(items)) {
        throw new TypeError('Argument must be an array');
    }
    const countMap = new Map();
    items.forEach(item => {
        countMap.set(item, (countMap.get(item) ?? 0) + 1);
    });
    return countMap;
}

const words = ['hello', 'world', 'hello', 'javascript'];
const wordCount = countOccurrences(words);

/**
 * Memoization/Caching
 * Time Complexity: O(1) for cached values
 * ✅ Best Practice: Use Map for function memoization
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 */
function memoize(fn) {
    if (typeof fn !== 'function') {
        throw new TypeError('Argument must be a function');
    }
const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
    if (cache.has(key)) {
        return cache.get(key);
    }
        const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
    };
}

const expensiveOperation = memoize((n) => {
    // Simulated expensive computation
    return n * n;
});

/**
 * Grouping data
 * Time Complexity: O(n)
 * ✅ Best Practice: Use Map for grouping operations
 * @param {Array} items - Array of items to group
 * @param {Function} keyFn - Function to extract group key
 * @returns {Map} Map with grouped items
 */
function groupByMap(items, keyFn) {
    if (!Array.isArray(items)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof keyFn !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    const grouped = new Map();
    items.forEach(item => {
        const key = keyFn(item);
        if (!grouped.has(key)) {
            grouped.set(key, []);
        }
        grouped.get(key).push(item);
    });
    return grouped;
}

const people = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 20 },
    { name: 'Bob', age: 30 }
];
const groupedByAge = groupByMap(people, person => person.age);

// ============================================================================
// 10. Map vs Object Comparison
// ============================================================================

/**
 * When to use Map:
 * ✅ Keys are unknown until runtime
 * ✅ Need to maintain insertion order
 * ✅ Need size property
 * ✅ Keys can be any type (objects, functions, primitives)
 * ✅ Frequent additions/deletions
 * ✅ Need to iterate efficiently
 * 
 * When to use Object:
 * ✅ Keys are known at compile time
 * ✅ Need JSON serialization
 * ✅ Need prototype inheritance
 * ✅ Working with object literals
 * ✅ Need to use Object methods (Object.keys, Object.values, etc.)
 */

// ============================================================================
// 11. Performance Considerations
// ============================================================================

/**
 * Time Complexity Summary:
 * - set(key, value): O(1) average
 * - get(key): O(1) average
 * - has(key): O(1) average
 * - delete(key): O(1) average
 * - clear(): O(n)
 * - size: O(1)
 * - Iteration: O(n)
 * 
 * Best Practices:
 * - Use Map for dynamic keys and frequent mutations
 * - Use WeakMap for object keys that should be garbage collected
 * - Prefer Map.has() over Map.get() !== undefined
 * - Use nullish coalescing (??) for default values
 * - Chain set() operations for multiple additions
 * - Use Array.from() or spread operator for conversions
 */

// ============================================================================
// 12. Error Handling
// ============================================================================

/**
 * Safe Map operation with error handling
 * @param {Map} map - Map to operate on
 * @param {Function} operation - Operation to perform
 * @returns {Object} Result object with success flag
 */
function safeMapOperation(map, operation) {
    try {
        if (!(map instanceof Map)) {
            throw new TypeError('First argument must be a Map');
        }
        if (typeof operation !== 'function') {
            throw new TypeError('Second argument must be a function');
        }
        const result = operation(map);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setMapValue,
        getMapValue,
        hasMapKey,
        clearMap,
        deleteMapKey,
        iterateMap,
        iterateMapEntries,
        countOccurrences,
        memoize,
        groupByMap,
        safeMapOperation,
        User
    };
}
