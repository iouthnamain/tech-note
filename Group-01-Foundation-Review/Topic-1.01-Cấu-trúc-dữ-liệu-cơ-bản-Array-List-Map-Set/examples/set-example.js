/**
 * Set Examples - JavaScript
 * Cấu trúc dữ liệu Set (Unique values) với best practices
 * 
 * Best Practices:
 * - Use Set for unique value collections
 * - Use Set for O(1) membership testing
 * - Use WeakSet for object-only collections with garbage collection
 * - Prefer Set over Array for uniqueness checks
 * - Use Set operations (union, intersection, difference) efficiently
 */

'use strict';

// ============================================================================
// 1. Creating Sets
// ============================================================================

/**
 * Create an empty Set
 * ✅ Best Practice: Use Set constructor for empty sets
 */
const numberSet = new Set();

/**
 * Create Set from iterable
 * ✅ Best Practice: Initialize with array or other iterable
 */
const fruitSet = new Set(['apple', 'banana', 'orange']);

/**
 * Create Set from string (iterates characters)
 * ✅ Best Practice: Useful for unique character extraction
 */
const charSet = new Set('hello'); // Set { 'h', 'e', 'l', 'o' }

// ============================================================================
// 2. Adding Elements
// ============================================================================

/**
 * Add element to Set
 * Time Complexity: O(1) average
 * ✅ Best Practice: Chain add() calls for multiple additions
 * @param {Set} set - The Set instance
 * @param {*} value - The value to add
 * @returns {Set} The Set instance (for chaining)
 */
function addToSet(set, value) {
    if (!(set instanceof Set)) {
        throw new TypeError('First argument must be a Set');
    }
    return set.add(value);
}

// ✅ Best Practice: Chain add() operations
numberSet
    .add(1)
    .add(2)
    .add(3)
    .add(2); // Duplicate - won't be added

// ✅ Best Practice: Set automatically handles duplicates
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]); // Set { 1, 2, 3, 4 }

// ============================================================================
// 3. Checking Membership
// ============================================================================

/**
 * Check if value exists in Set
 * Time Complexity: O(1) average
 * ✅ Best Practice: Use has() for membership testing (much faster than Array.includes)
 * @param {Set} set - The Set instance
 * @param {*} value - The value to check
 * @returns {boolean} True if value exists
 */
function hasInSet(set, value) {
    if (!(set instanceof Set)) {
        throw new TypeError('First argument must be a Set');
    }
    return set.has(value);
}

// ✅ Best Practice: O(1) lookup vs O(n) for arrays
const hasApple = fruitSet.has('apple'); // O(1) - FAST
// const hasApple = ['apple', 'banana'].includes('apple'); // O(n) - SLOW

// ============================================================================
// 4. Set Size and Operations
// ============================================================================

/**
 * Get Set size
 * Time Complexity: O(1)
 * ✅ Best Practice: Use size property, not length
 */
const setSize = fruitSet.size; // ✅ Correct
// const setSize = fruitSet.length; // ❌ Wrong - Sets don't have length

/**
 * Clear all elements from Set
 * Time Complexity: O(n)
 * ⚠️ Mutates the Set
 */
function clearSet(set) {
    if (!(set instanceof Set)) {
        throw new TypeError('Argument must be a Set');
    }
    set.clear();
    return set;
}

/**
 * Delete element from Set
 * Time Complexity: O(1) average
 * @param {Set} set - The Set instance
 * @param {*} value - The value to delete
 * @returns {boolean} True if value existed and was deleted
 */
function deleteFromSet(set, value) {
    if (!(set instanceof Set)) {
        throw new TypeError('First argument must be a Set');
    }
    return set.delete(value);
}

// ============================================================================
// 5. Iteration (Best Practices)
// ============================================================================

/**
 * Iterate Set with forEach
 * Time Complexity: O(n)
 * ✅ Best Practice: forEach maintains insertion order
 */
function iterateSet(set, callback) {
    if (!(set instanceof Set)) {
        throw new TypeError('First argument must be a Set');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    set.forEach(callback);
}

// ✅ Best Practice: forEach with value, value, set signature
fruitSet.forEach((value, valueAgain, set) => {
    // Note: value appears twice (Set doesn't have keys)
    console.log(value);
});

/**
 * Iterate Set with for...of
 * Time Complexity: O(n)
 * ✅ Best Practice: Direct iteration is cleanest
 */
function iterateSetValues(set) {
    if (!(set instanceof Set)) {
        throw new TypeError('Argument must be a Set');
    }
    for (const value of set) {
        console.log(value);
    }
}

// ✅ Best Practice: Direct iteration
for (const fruit of fruitSet) {
    console.log(fruit);
}

// ✅ Best Practice: Iterate with entries() (returns [value, value])
for (const [value] of fruitSet.entries()) {
    console.log(value);
}

// ============================================================================
// 6. Converting Set to Array
// ============================================================================

/**
 * Convert Set to Array
 * ✅ Best Practice: Use Array.from() or spread operator
 */
const fruitArray = Array.from(fruitSet);
const fruitArraySpread = [...fruitSet];

/**
 * Convert Set to Array with transformation
 * ✅ Best Practice: Combine Array.from() with map
 */
const upperFruits = Array.from(fruitSet, fruit => fruit.toUpperCase());

// ============================================================================
// 7. WeakSet (Memory-Efficient Sets)
// ============================================================================

/**
 * WeakSet Examples
 * ✅ Best Practice: Use WeakSet when storing object references that should be garbage collected
 * - Values must be objects (not primitives)
 * - Values are weakly referenced (can be garbage collected)
 * - No iteration methods (forEach, for...of, values(), entries())
 * - No size property
 * - Use case: Tracking object presence, preventing memory leaks
 */
const weakSet = new WeakSet();

// ✅ Valid: Object values
const obj1 = { id: 1 };
const obj2 = { id: 2 };
weakSet.add(obj1);
weakSet.add(obj2);

// ❌ Invalid: Primitive values
// weakSet.add('string'); // TypeError
// weakSet.add(123); // TypeError

/**
 * Object tracking pattern with WeakSet
 * ✅ Best Practice: Use WeakSet for tracking processed objects
 */
const processedObjects = new WeakSet();

function processObject(obj) {
    if (processedObjects.has(obj)) {
        return 'Already processed';
    }
    processedObjects.add(obj);
    return 'Processing...';
}

// ============================================================================
// 8. Common Use Cases
// ============================================================================

/**
 * Remove duplicates from array
 * Time Complexity: O(n)
 * ✅ Best Practice: Most efficient way to get unique values
 * @param {Array} arr - Array with potential duplicates
 * @returns {Array} New array with unique elements
 */
function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }
    return [...new Set(arr)];
}

const numbers = [1, 2, 2, 3, 3, 4, 5];
const uniqueNumbers = removeDuplicates(numbers); // [1, 2, 3, 4, 5]

/**
 * Check for duplicates in array
 * Time Complexity: O(n)
 * ✅ Best Practice: Compare array length with Set size
 * @param {Array} arr - Array to check
 * @returns {boolean} True if array has duplicates
 */
function hasDuplicates(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Argument must be an array');
    }
    return arr.length !== new Set(arr).size;
}

console.log(hasDuplicates([1, 2, 3])); // false
console.log(hasDuplicates([1, 2, 2])); // true

/**
 * Fast membership testing
 * Time Complexity: O(1) per lookup vs O(n) for arrays
 * ✅ Best Practice: Convert array to Set for multiple lookups
 */
function createLookupSet(items) {
    if (!Array.isArray(items)) {
        throw new TypeError('Argument must be an array');
    }
    return new Set(items);
}

const allowedValues = createLookupSet(['admin', 'user', 'guest']);
function isAllowed(role) {
    return allowedValues.has(role); // O(1) instead of O(n)
}

// ============================================================================
// 9. Set Operations (Union, Intersection, Difference)
// ============================================================================

/**
 * Union of two sets
 * Time Complexity: O(n + m) where n and m are set sizes
 * ✅ Best Practice: Use spread operator for union
 * @param {Set} set1 - First set
 * @param {Set} set2 - Second set
 * @returns {Set} Union of both sets
 */
function setUnion(set1, set2) {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    return new Set([...set1, ...set2]);
}

const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);
const union = setUnion(set1, set2); // Set { 1, 2, 3, 4 }

/**
 * Intersection of two sets
 * Time Complexity: O(n) where n is size of smaller set
 * ✅ Best Practice: Filter smaller set for efficiency
 * @param {Set} set1 - First set
 * @param {Set} set2 - Second set
 * @returns {Set} Intersection of both sets
 */
function setIntersection(set1, set2) {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    // Use smaller set for iteration
    const [smaller, larger] = set1.size <= set2.size ? [set1, set2] : [set2, set1];
    return new Set([...smaller].filter(x => larger.has(x)));
}

const intersection = setIntersection(set1, set2); // Set { 2, 3 }

/**
 * Difference of two sets (set1 - set2)
 * Time Complexity: O(n) where n is size of set1
 * ✅ Best Practice: Filter set1 for elements not in set2
 * @param {Set} set1 - First set
 * @param {Set} set2 - Second set
 * @returns {Set} Elements in set1 but not in set2
 */
function setDifference(set1, set2) {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    return new Set([...set1].filter(x => !set2.has(x)));
}

const difference = setDifference(set1, set2); // Set { 1 }

/**
 * Symmetric difference (elements in either set, but not both)
 * Time Complexity: O(n + m)
 * @param {Set} set1 - First set
 * @param {Set} set2 - Second set
 * @returns {Set} Symmetric difference
 */
function setSymmetricDifference(set1, set2) {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    const diff1 = setDifference(set1, set2);
    const diff2 = setDifference(set2, set1);
    return setUnion(diff1, diff2);
}

/**
 * Check if set1 is subset of set2
 * Time Complexity: O(n) where n is size of set1
 * @param {Set} set1 - Potential subset
 * @param {Set} set2 - Potential superset
 * @returns {boolean} True if set1 is subset of set2
 */
function isSubset(set1, set2) {
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
 * Time Complexity: O(m) where m is size of set2
 * @param {Set} set1 - Potential superset
 * @param {Set} set2 - Potential subset
 * @returns {boolean} True if set1 is superset of set2
 */
function isSuperset(set1, set2) {
    if (!(set1 instanceof Set) || !(set2 instanceof Set)) {
        throw new TypeError('Both arguments must be Sets');
    }
    return isSubset(set2, set1);
}

// ============================================================================
// 10. Performance Considerations
// ============================================================================

/**
 * Time Complexity Summary:
 * - add(value): O(1) average
 * - delete(value): O(1) average
 * - has(value): O(1) average
 * - clear(): O(n)
 * - size: O(1)
 * - Iteration: O(n)
 * 
 * Best Practices:
 * - Use Set for O(1) membership testing (vs O(n) for arrays)
 * - Convert array to Set when doing multiple lookups
 * - Use Set for automatic duplicate removal
 * - Use WeakSet for object-only collections
 * - Prefer Set operations over manual array filtering
 * - Use spread operator or Array.from() for conversions
 * 
 * Performance Comparison:
 * - Array.includes(): O(n) - slow for large arrays
 * - Set.has(): O(1) - fast, constant time
 * - Use Set when: multiple lookups, need uniqueness, don't need index
 * - Use Array when: need indexed access, need order with duplicates
 */

// ============================================================================
// 11. Set vs Array
// ============================================================================

/**
 * When to use Set:
 * ✅ Need unique values automatically
 * ✅ Need fast membership testing (has operation)
 * ✅ Don't need indexed access
 * ✅ Insertion order is sufficient
 * ✅ Frequent add/delete operations
 * ✅ Need set operations (union, intersection, difference)
 * 
 * When to use Array:
 * ✅ Need indexed access
 * ✅ Need duplicates
 * ✅ Need array methods (map, filter, reduce with index)
 * ✅ Need to maintain specific order
 * ✅ Working with array-like data structures
 */

// ============================================================================
// 12. Error Handling
// ============================================================================

/**
 * Safe Set operation with error handling
 * @param {Set} set - Set to operate on
 * @param {Function} operation - Operation to perform
 * @returns {Object} Result object with success flag
 */
function safeSetOperation(set, operation) {
    try {
        if (!(set instanceof Set)) {
            throw new TypeError('First argument must be a Set');
        }
        if (typeof operation !== 'function') {
            throw new TypeError('Second argument must be a function');
        }
        const result = operation(set);
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToSet,
        hasInSet,
        clearSet,
        deleteFromSet,
        iterateSet,
        iterateSetValues,
        removeDuplicates,
        hasDuplicates,
        createLookupSet,
        setUnion,
        setIntersection,
        setDifference,
        setSymmetricDifference,
        isSubset,
        isSuperset,
        safeSetOperation
    };
}

