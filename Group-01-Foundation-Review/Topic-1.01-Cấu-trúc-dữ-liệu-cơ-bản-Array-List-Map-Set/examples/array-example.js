/**
 * Array Examples - JavaScript
 * Cấu trúc dữ liệu Array cơ bản với best practices
 * 
 * Best Practices:
 * - Use const for arrays (arrays are mutable, but reference is constant)
 * - Prefer immutable operations (map, filter, reduce) over mutations
 * - Use modern array methods for better readability
 * - Always validate array operations
 * - Consider performance implications of operations
 */

'use strict';

// ============================================================================
// 1. Creating Arrays
// ============================================================================

// ✅ Best Practice: Use const for array declarations
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null];

// ✅ Best Practice: Use Array.from() for array-like objects
const arrayFromString = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arrayFromSet = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

// ✅ Best Practice: Use spread operator for copying
const fruitsCopy = [...fruits]; // Immutable copy
const numbersCopy = Array.from(numbers); // Alternative immutable copy

// ============================================================================
// 2. Accessing Elements
// ============================================================================

/**
 * Access array element by index
 * Time Complexity: O(1)
 * @param {Array} arr - The array to access
 * @param {number} index - The index to access
 * @returns {*} The element at the specified index, or undefined if out of bounds
 */
function safeArrayAccess(arr, index) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof index !== 'number' || index < 0) {
        throw new TypeError('Index must be a non-negative number');
    }
    return arr[index];
}

// ✅ Best Practice: Use optional chaining and nullish coalescing (ES2020)
const firstFruit = fruits?.[0] ?? 'default';
const lastFruit = fruits?.[fruits.length - 1] ?? null;

// ✅ Best Practice: Safe access with bounds checking
function getElementSafely(arr, index) {
    if (index < 0 || index >= arr.length) {
        return undefined;
    }
    return arr[index];
}

// ============================================================================
// 3. Array Mutations (Use Sparingly - Prefer Immutable Operations)
// ============================================================================

/**
 * Add element to end of array
 * Time Complexity: O(1) amortized
 * ⚠️ Mutates original array - use spread operator for immutability
 */
const fruitsMutable = [...fruits];
fruitsMutable.push('grape'); // Mutates array

// ✅ Best Practice: Prefer immutable operations
const fruitsWithGrape = [...fruits, 'grape']; // Creates new array

/**
 * Remove element from end of array
 * Time Complexity: O(1)
 * ⚠️ Mutates original array
 */
const lastItem = fruitsMutable.pop();

// ✅ Best Practice: Use slice for immutable removal
const fruitsWithoutLast = fruits.slice(0, -1); // Immutable

/**
 * Add element to beginning of array
 * Time Complexity: O(n) - all elements must shift
 * ⚠️ Avoid for large arrays - use reverse + push or spread
 */
fruitsMutable.unshift('mango'); // O(n) operation

// ✅ Best Practice: Use spread for immutable prepend
const fruitsWithMango = ['mango', ...fruits]; // O(n) but immutable

/**
 * Remove element from beginning of array
 * Time Complexity: O(n)
 * ⚠️ Avoid for large arrays
 */
const firstItem = fruitsMutable.shift();

// ============================================================================
// 4. Immutable Array Operations (Best Practice)
// ============================================================================

/**
 * Transform array elements
 * Time Complexity: O(n)
 * ✅ Best Practice: Creates new array, doesn't mutate original
 * @param {Array} arr - Array to transform
 * @param {Function} transformFn - Transformation function
 * @returns {Array} New array with transformed elements
 */
function transformArray(arr, transformFn) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof transformFn !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    return arr.map(transformFn);
}

const upperFruits = fruits.map(fruit => fruit.toUpperCase());
const doubledNumbers = numbers.map(n => n * 2);

/**
 * Filter array elements
 * Time Complexity: O(n)
 * ✅ Best Practice: Creates new array with filtered elements
 * @param {Array} arr - Array to filter
 * @param {Function} predicate - Filter function
 * @returns {Array} New array with filtered elements
 */
function filterArray(arr, predicate) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    return arr.filter(predicate);
}

const longFruits = fruits.filter(fruit => fruit.length > 5);
const evenNumbers = numbers.filter(n => n % 2 === 0);

/**
 * Reduce array to single value
 * Time Complexity: O(n)
 * ✅ Best Practice: Powerful for aggregations and transformations
 * @param {Array} arr - Array to reduce
 * @param {Function} reducer - Reduction function
 * @param {*} initialValue - Initial accumulator value
 * @returns {*} Reduced value
 */
function reduceArray(arr, reducer, initialValue) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof reducer !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    return arr.reduce(reducer, initialValue);
}

const sum = numbers.reduce((acc, n) => acc + n, 0);
const product = numbers.reduce((acc, n) => acc * n, 1);

// ============================================================================
// 5. Finding Elements
// ============================================================================

/**
 * Find index of element
 * Time Complexity: O(n)
 * @param {Array} arr - Array to search
 * @param {*} element - Element to find
 * @returns {number} Index of element, or -1 if not found
 */
function findIndex(arr, element) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    return arr.indexOf(element);
}

/**
 * Check if array includes element
 * Time Complexity: O(n)
 * ✅ Best Practice: Use Set for O(1) lookups if checking multiple times
 * @param {Array} arr - Array to check
 * @param {*} element - Element to check for
 * @returns {boolean} True if element exists in array
 */
function includesElement(arr, element) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    return arr.includes(element);
}

// ✅ Best Practice: Use Set for repeated lookups
const fruitsSet = new Set(fruits);
const hasApple = fruitsSet.has('apple'); // O(1) instead of O(n)

/**
 * Find first element matching predicate
 * Time Complexity: O(n) worst case
 * @param {Array} arr - Array to search
 * @param {Function} predicate - Predicate function
 * @returns {*} First matching element, or undefined
 */
function findElement(arr, predicate) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    return arr.find(predicate);
}

const found = fruits.find(fruit => fruit.startsWith('b'));

/**
 * Find index of first element matching predicate
 * Time Complexity: O(n)
 * @param {Array} arr - Array to search
 * @param {Function} predicate - Predicate function
 * @returns {number} Index of first matching element, or -1
 */
function findIndexByPredicate(arr, predicate) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    return arr.findIndex(predicate);
}

// ============================================================================
// 6. Modern Array Methods (ES2020+)
// ============================================================================

/**
 * Check if all elements match predicate
 * Time Complexity: O(n)
 * @param {Array} arr - Array to check
 * @param {Function} predicate - Predicate function
 * @returns {boolean} True if all elements match
 */
function allMatch(arr, predicate) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    return arr.every(predicate);
}

const allPositive = numbers.every(n => n > 0);

/**
 * Check if any element matches predicate
 * Time Complexity: O(n) worst case
 * @param {Array} arr - Array to check
 * @param {Function} predicate - Predicate function
 * @returns {boolean} True if any element matches
 */
function anyMatch(arr, predicate) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    return arr.some(predicate);
}

const hasEven = numbers.some(n => n % 2 === 0);

/**
 * Flatten nested arrays
 * Time Complexity: O(n * m) where m is nesting depth
 * ✅ Best Practice: Use flat() or flatMap() for nested arrays
 */
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.flat(); // [1, 2, 3, 4, 5, 6]
const deepNested = [1, [2, [3, [4]]]];
const deepFlattened = deepNested.flat(Infinity); // [1, 2, 3, 4]

/**
 * Map and flatten in one operation
 * Time Complexity: O(n)
 * ✅ Best Practice: More efficient than map().flat()
 */
const words = ['hello world', 'foo bar'];
const letters = words.flatMap(word => word.split(' ')); // ['hello', 'world', 'foo', 'bar']

// ============================================================================
// 7. Array Utility Functions
// ============================================================================

/**
 * Remove duplicates from array
 * Time Complexity: O(n)
 * ✅ Best Practice: Use Set for O(n) deduplication
 * @param {Array} arr - Array with potential duplicates
 * @returns {Array} New array with unique elements
 */
function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }
    return [...new Set(arr)];
}

const withDuplicates = [1, 2, 2, 3, 3, 4];
const unique = removeDuplicates(withDuplicates); // [1, 2, 3, 4]

/**
 * Chunk array into smaller arrays
 * Time Complexity: O(n)
 * @param {Array} arr - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Array of chunks
 */
function chunkArray(arr, size) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof size !== 'number' || size <= 0) {
        throw new TypeError('Size must be a positive number');
    }
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

const chunked = chunkArray(numbers, 2); // [[1, 2], [3, 4], [5]]

/**
 * Group array elements by key
 * Time Complexity: O(n)
 * @param {Array} arr - Array to group
 * @param {Function|string} keyFn - Key function or property name
 * @returns {Object} Object with grouped arrays
 */
function groupBy(arr, keyFn) {
    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }
    const keyGetter = typeof keyFn === 'function' 
        ? keyFn 
        : (item) => item[keyFn];
    
    return arr.reduce((groups, item) => {
        const key = keyGetter(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}

const people = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 20 },
    { name: 'Bob', age: 30 }
];
const groupedByAge = groupBy(people, 'age');

// ============================================================================
// 8. Performance Considerations
// ============================================================================

/**
 * Time Complexity Summary:
 * - Access by index: O(1)
 * - Search (indexOf, includes, find): O(n)
 * - Insert at end (push): O(1) amortized
 * - Insert at beginning (unshift): O(n)
 * - Delete by index (splice): O(n)
 * - Delete at end (pop): O(1)
 * - Delete at beginning (shift): O(n)
 * - Iteration (forEach, map, filter): O(n)
 * - Sort: O(n log n)
 * 
 * Best Practices:
 * - Use Set/Map for O(1) lookups instead of array.includes()
 * - Prefer immutable operations (map, filter, reduce) over mutations
 * - Use spread operator for copying: [...arr]
 * - Use slice() for immutable slicing: arr.slice(start, end)
 * - Avoid unshift/shift for large arrays - use reverse + push/pop
 * - Use flatMap() instead of map().flat()
 * - Use Array.from() for array-like objects
 */

// ============================================================================
// 9. Error Handling Examples
// ============================================================================

/**
 * Safe array operation with error handling
 * @param {Array} arr - Array to operate on
 * @param {Function} operation - Operation to perform
 * @returns {Object} Result object with success flag and data/error
 */
function safeArrayOperation(arr, operation) {
    try {
        if (!Array.isArray(arr)) {
            throw new TypeError('First argument must be an array');
        }
        if (typeof operation !== 'function') {
            throw new TypeError('Second argument must be a function');
        }
        const result = operation(arr);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

const result = safeArrayOperation(numbers, arr => arr.map(n => n * 2));

// ============================================================================
// 10. Modern ES2020+ Features
// ============================================================================

// Optional chaining with arrays
const maybeArray = null;
const firstElement = maybeArray?.[0] ?? 'default';

// Nullish coalescing for default values
const items = [];
const count = items?.length ?? 0;

// Array destructuring with defaults
const [first = 'default', second = 'default', ...rest] = fruits;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        safeArrayAccess,
        getElementSafely,
        transformArray,
        filterArray,
        reduceArray,
        findIndex,
        includesElement,
        findElement,
        findIndexByPredicate,
        allMatch,
        anyMatch,
        removeDuplicates,
        chunkArray,
        groupBy,
        safeArrayOperation
    };
}
