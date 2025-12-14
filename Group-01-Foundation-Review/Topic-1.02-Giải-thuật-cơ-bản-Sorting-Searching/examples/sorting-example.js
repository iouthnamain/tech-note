/**
 * Sorting and Searching Algorithms Examples - JavaScript
 * Các giải thuật sắp xếp và tìm kiếm cơ bản với best practices
 * 
 * Best Practices:
 * - Always validate input
 * - Don't mutate original arrays
 * - Handle edge cases (empty arrays, single elements)
 * - Use appropriate algorithm for data size
 * - Consider stability requirements
 * - Document time and space complexity
 */

'use strict';

// ============================================================================
// Input Validation Helpers
// ============================================================================

/**
 * Validate array input
 * @param {*} arr - Value to validate
 * @param {string} functionName - Name of calling function
 * @throws {TypeError} If input is not an array
 */
function validateArray(arr, functionName = 'function') {
    if (!Array.isArray(arr)) {
        throw new TypeError(`${functionName}: Expected array, got ${typeof arr}`);
    }
}

/**
 * Validate comparison function
 * @param {Function} compareFn - Comparison function to validate
 * @param {string} functionName - Name of calling function
 * @throws {TypeError} If compareFn is not a function
 */
function validateCompareFn(compareFn, functionName = 'function') {
    if (compareFn !== undefined && typeof compareFn !== 'function') {
        throw new TypeError(`${functionName}: compareFn must be a function`);
    }
}

/**
 * Check if array is sorted
 * @param {Array} arr - Array to check
 * @param {Function} compareFn - Optional comparison function
 * @returns {boolean} True if array is sorted
 */
function isSorted(arr, compareFn = (a, b) => a - b) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return true;
    }
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

// ============================================================================
// 1. Bubble Sort - O(n²) time, O(1) space
// ============================================================================

/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²) worst case, O(n) best case (already sorted)
 * Space Complexity: O(1) - in-place sorting
 * Stability: Stable
 * 
 * ✅ Best Practice: Simple but inefficient - use for educational purposes only
 * ⚠️ Not recommended for production use with large datasets
 * 
 * @param {Array} arr - Array to sort
 * @param {Function} compareFn - Optional comparison function (a, b) => number
 * @returns {Array} New sorted array (original not mutated)
 * @throws {TypeError} If arr is not an array
 */
function bubbleSort(arr, compareFn = (a, b) => a - b) {
    validateArray(arr, 'bubbleSort');
    validateCompareFn(compareFn, 'bubbleSort');
    
    // Edge case: empty or single element array
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const sorted = [...arr]; // ✅ Best Practice: Don't mutate original
    const n = sorted.length;
    let swapped = false;
    
    // ✅ Best Practice: Early termination if already sorted
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(sorted[j], sorted[j + 1]) > 0) {
                // Swap using destructuring
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                swapped = true;
            }
        }
        // Early termination optimization
        if (!swapped) {
            break;
        }
    }
    
    return sorted;
}

// ============================================================================
// 2. Quick Sort - O(n log n) average, O(n²) worst, O(log n) space
// ============================================================================

/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack)
 * Stability: Not stable
 * 
 * ✅ Best Practice: Fast average case, commonly used
 * ⚠️ Worst case occurs when pivot is always smallest/largest
 * 
 * @param {Array} arr - Array to sort
 * @param {Function} compareFn - Optional comparison function
 * @returns {Array} New sorted array
 * @throws {TypeError} If arr is not an array
 */
function quickSort(arr, compareFn = (a, b) => a - b) {
    validateArray(arr, 'quickSort');
    validateCompareFn(compareFn, 'quickSort');
    
    // Base case
    if (arr.length <= 1) {
        return [...arr];
    }
    
    // ✅ Best Practice: Use median-of-three for better pivot selection
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    
    const left = [];
    const middle = [];
    const right = [];
    
    // Partition array
    for (const element of arr) {
        const comparison = compareFn(element, pivot);
        if (comparison < 0) {
            left.push(element);
        } else if (comparison > 0) {
            right.push(element);
        } else {
            middle.push(element);
    }
    }
    
    // Recursively sort and combine
    return [
        ...quickSort(left, compareFn),
        ...middle,
        ...quickSort(right, compareFn)
    ];
}

// ============================================================================
// 3. Merge Sort - O(n log n) time, O(n) space
// ============================================================================

/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n) worst case (guaranteed)
 * Space Complexity: O(n) - requires additional space
 * Stability: Stable
 * 
 * ✅ Best Practice: Predictable performance, stable sort
 * ✅ Best for: When stability is required, worst-case performance matters
 * 
 * @param {Array} arr - Array to sort
 * @param {Function} compareFn - Optional comparison function
 * @returns {Array} New sorted array
 * @throws {TypeError} If arr is not an array
 */
function mergeSort(arr, compareFn = (a, b) => a - b) {
    validateArray(arr, 'mergeSort');
    validateCompareFn(compareFn, 'mergeSort');
    
    // Base case
    if (arr.length <= 1) {
        return [...arr];
    }
    
    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), compareFn);
    const right = mergeSort(arr.slice(mid), compareFn);
    
    // Conquer - merge sorted halves
    return merge(left, right, compareFn);
}

/**
 * Merge two sorted arrays
 * @param {Array} left - First sorted array
 * @param {Array} right - Second sorted array
 * @param {Function} compareFn - Comparison function
 * @returns {Array} Merged sorted array
 */
function merge(left, right, compareFn = (a, b) => a - b) {
    const result = [];
    let i = 0;
    let j = 0;
    
    // Merge while both arrays have elements
    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    // Append remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// ============================================================================
// 4. Insertion Sort - O(n²) time, O(1) space
// ============================================================================

/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²) worst case, O(n) best case (already sorted)
 * Space Complexity: O(1) - in-place sorting
 * Stability: Stable
 * 
 * ✅ Best Practice: Efficient for small arrays or nearly sorted data
 * ✅ Used in: Timsort (Python), Introsort (C++)
 * 
 * @param {Array} arr - Array to sort
 * @param {Function} compareFn - Optional comparison function
 * @returns {Array} New sorted array
 * @throws {TypeError} If arr is not an array
 */
function insertionSort(arr, compareFn = (a, b) => a - b) {
    validateArray(arr, 'insertionSort');
    validateCompareFn(compareFn, 'insertionSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const sorted = [...arr];
    
    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        let j = i - 1;
        
        // Shift elements greater than current
        while (j >= 0 && compareFn(sorted[j], current) > 0) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        
        sorted[j + 1] = current;
    }
    
    return sorted;
}

// ============================================================================
// 5. Selection Sort - O(n²) time, O(1) space
// ============================================================================

/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²) - always
 * Space Complexity: O(1) - in-place sorting
 * Stability: Not stable
 * 
 * ⚠️ Not recommended - always O(n²) even for sorted arrays
 * ✅ Educational purposes only
 * 
 * @param {Array} arr - Array to sort
 * @param {Function} compareFn - Optional comparison function
 * @returns {Array} New sorted array
 * @throws {TypeError} If arr is not an array
 */
function selectionSort(arr, compareFn = (a, b) => a - b) {
    validateArray(arr, 'selectionSort');
    validateCompareFn(compareFn, 'selectionSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const sorted = [...arr];
    
    for (let i = 0; i < sorted.length - 1; i++) {
        let minIndex = i;
        
        // Find minimum element in remaining array
        for (let j = i + 1; j < sorted.length; j++) {
            if (compareFn(sorted[j], sorted[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        // Swap if minimum is not at current position
        if (minIndex !== i) {
            [sorted[i], sorted[minIndex]] = [sorted[minIndex], sorted[i]];
        }
    }
    
    return sorted;
}

// ============================================================================
// 6. Linear Search - O(n) time, O(1) space
// ============================================================================

/**
 * Linear Search Algorithm
 * Time Complexity: O(n) worst case
 * Space Complexity: O(1)
 * 
 * ✅ Best Practice: Works on unsorted arrays
 * ✅ Use when: Array is small or unsorted
 * 
 * @param {Array} arr - Array to search
 * @param {*} target - Target value to find
 * @param {Function} equalityFn - Optional equality function
 * @returns {number} Index of target, or -1 if not found
 * @throws {TypeError} If arr is not an array
 */
function linearSearch(arr, target, equalityFn = (a, b) => a === b) {
    validateArray(arr, 'linearSearch');
    
    if (typeof equalityFn !== 'function') {
        throw new TypeError('linearSearch: equalityFn must be a function');
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (equalityFn(arr[i], target)) {
            return i;
        }
    }
    
    return -1; // Not found
}

// ============================================================================
// 7. Binary Search - O(log n) time, O(1) space
// ============================================================================

/**
 * Binary Search Algorithm
 * Time Complexity: O(log n) worst case
 * Space Complexity: O(1) iterative, O(log n) recursive
 * 
 * ✅ Best Practice: Requires sorted array
 * ✅ Use when: Array is large and sorted
 * ⚠️ Array must be sorted for correct results
 * 
 * @param {Array} arr - Sorted array to search
 * @param {*} target - Target value to find
 * @param {Function} compareFn - Optional comparison function
 * @returns {number} Index of target, or -1 if not found
 * @throws {TypeError} If arr is not an array
 * @throws {Error} If array is not sorted
 */
function binarySearch(arr, target, compareFn = (a, b) => a - b) {
    validateArray(arr, 'binarySearch');
    validateCompareFn(compareFn, 'binarySearch');
    
    // ✅ Best Practice: Validate array is sorted
    if (!isSorted(arr, compareFn)) {
        throw new Error('binarySearch: Array must be sorted');
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // ✅ Best Practice: Use Math.floor for integer division
        const mid = Math.floor((left + right) / 2);
        const comparison = compareFn(arr[mid], target);
        
        if (comparison === 0) {
            return mid; // Found
        } else if (comparison < 0) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Not found
}

/**
 * Binary Search (Recursive version)
 * @param {Array} arr - Sorted array to search
 * @param {*} target - Target value to find
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @param {Function} compareFn - Optional comparison function
 * @returns {number} Index of target, or -1 if not found
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1, compareFn = (a, b) => a - b) {
    validateArray(arr, 'binarySearchRecursive');
    
    if (left > right) {
        return -1; // Base case: not found
    }
    
    const mid = Math.floor((left + right) / 2);
    const comparison = compareFn(arr[mid], target);
    
    if (comparison === 0) {
        return mid;
    } else if (comparison < 0) {
        return binarySearchRecursive(arr, target, mid + 1, right, compareFn);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1, compareFn);
    }
}

// ============================================================================
// 8. Performance Testing Helpers
// ============================================================================

/**
 * Measure execution time of a function
 * @param {Function} fn - Function to measure
 * @param {*} args - Arguments to pass to function
 * @returns {Object} Result with execution time and return value
 */
function measurePerformance(fn, ...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    return {
        result,
        executionTime: end - start,
        executionTimeMs: `${(end - start).toFixed(4)}ms`
    };
}

/**
 * Compare sorting algorithms
 * @param {Array} testData - Data to test with
 * @returns {Object} Comparison results
 */
function compareSortingAlgorithms(testData) {
    validateArray(testData, 'compareSortingAlgorithms');
    
    const algorithms = [
        { name: 'Bubble Sort', fn: bubbleSort },
        { name: 'Quick Sort', fn: quickSort },
        { name: 'Merge Sort', fn: mergeSort },
        { name: 'Insertion Sort', fn: insertionSort },
        { name: 'Selection Sort', fn: selectionSort }
    ];
    
    const results = algorithms.map(({ name, fn }) => {
        const measurement = measurePerformance(fn, testData);
        return {
            algorithm: name,
            executionTime: measurement.executionTime,
            executionTimeMs: measurement.executionTimeMs,
            sorted: measurement.result
        };
    });
    
    // Sort by execution time
    results.sort((a, b) => a.executionTime - b.executionTime);
    
    return results;
}

// ============================================================================
// 9. Algorithm Selection Guide
// ============================================================================

/**
 * Choose appropriate sorting algorithm based on requirements
 * 
 * Algorithm Selection Guide:
 * 
 * 1. Small arrays (< 10 elements):
 *    - Use Insertion Sort (simple, efficient for small data)
 * 
 * 2. Medium arrays (10-1000 elements):
 *    - Use Quick Sort (fast average case)
 *    - Use Merge Sort if stability is required
 * 
 * 3. Large arrays (> 1000 elements):
 *    - Use Quick Sort (best average performance)
 *    - Use Merge Sort for guaranteed O(n log n)
 * 
 * 4. Nearly sorted arrays:
 *    - Use Insertion Sort (O(n) for nearly sorted)
 * 
 * 5. Stability required:
 *    - Use Merge Sort or Insertion Sort
 *    - Avoid Quick Sort and Selection Sort
 * 
 * 6. Memory constrained:
 *    - Use in-place algorithms (Bubble, Insertion, Selection, Quick Sort)
 *    - Avoid Merge Sort (requires O(n) extra space)
 */

// ============================================================================
// 10. Example Usage and Testing
// ============================================================================

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = [11, 12, 22, 25, 34, 64, 90];

console.log('Original array:', numbers);
console.log('Bubble Sort:', bubbleSort(numbers));
console.log('Quick Sort:', quickSort(numbers));
console.log('Merge Sort:', mergeSort(numbers));
console.log('Insertion Sort:', insertionSort(numbers));

console.log('\nSearching in sorted array:', sortedNumbers);
console.log('Linear Search (25):', linearSearch(sortedNumbers, 25));
console.log('Binary Search (25):', binarySearch(sortedNumbers, 25));
console.log('Binary Search (99):', binarySearch(sortedNumbers, 99)); // Not found

// Performance comparison
if (typeof performance !== 'undefined') {
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    console.log('\nPerformance Comparison (1000 elements):');
    const comparison = compareSortingAlgorithms(largeArray);
    comparison.forEach(result => {
        console.log(`${result.algorithm}: ${result.executionTimeMs}`);
    });
}

// ============================================================================
// 11. Time Complexity Summary
// ============================================================================

/**
 * Time Complexity Comparison:
 * 
 * Sorting Algorithms:
 * - Bubble Sort:    O(n²) worst, O(n) best, O(n²) average
 * - Quick Sort:     O(n log n) average, O(n²) worst
 * - Merge Sort:     O(n log n) worst (guaranteed)
 * - Insertion Sort: O(n²) worst, O(n) best
 * - Selection Sort: O(n²) always
 * 
 * Searching Algorithms:
 * - Linear Search:  O(n) worst case
 * - Binary Search:  O(log n) worst case (requires sorted array)
 * 
 * Space Complexity:
 * - Bubble Sort:    O(1) - in-place
 * - Quick Sort:     O(log n) - recursion stack
 * - Merge Sort:     O(n) - requires additional array
 * - Insertion Sort: O(1) - in-place
 * - Selection Sort: O(1) - in-place
 * - Linear Search:  O(1)
 * - Binary Search:  O(1) iterative, O(log n) recursive
 */

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
    bubbleSort,
    quickSort,
    mergeSort,
        insertionSort,
        selectionSort,
    linearSearch,
        binarySearch,
        binarySearchRecursive,
        merge,
        isSorted,
        validateArray,
        measurePerformance,
        compareSortingAlgorithms
    };
}

