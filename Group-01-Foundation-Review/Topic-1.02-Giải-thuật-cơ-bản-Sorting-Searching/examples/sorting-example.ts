/**
 * Sorting and Searching Algorithms Examples - TypeScript
 * Các giải thuật sắp xếp và tìm kiếm với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Use generic types for reusable algorithms
 * - Use type constraints for comparable types
 * - Use function overloads for different signatures
 * - Use type predicates for type narrowing
 * - Avoid 'any' type - use generics with constraints
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Comparison function type
 * Returns negative if a < b, positive if a > b, zero if equal
 */
type CompareFn<T> = (a: T, b: T) => number;

/**
 * Equality function type
 * Returns true if values are equal
 */
type EqualityFn<T> = (a: T, b: T) => boolean;

/**
 * Result type for search operations
 */
type SearchResult = number; // -1 if not found, otherwise index

// ============================================================================
// Input Validation
// ============================================================================

/**
 * Validate array input
 * @template T - Element type
 * @param arr - Value to validate
 * @param functionName - Name of calling function
 * @throws {TypeError} If input is not an array
 */
function validateArray<T>(arr: unknown, functionName = 'function'): asserts arr is T[] {
    if (!Array.isArray(arr)) {
        throw new TypeError(`${functionName}: Expected array, got ${typeof arr}`);
    }
}

/**
 * Validate comparison function
 * @template T - Element type
 * @param compareFn - Comparison function to validate
 * @param functionName - Name of calling function
 * @throws {TypeError} If compareFn is not a function
 */
function validateCompareFn<T>(
    compareFn: unknown,
    functionName = 'function'
): asserts compareFn is CompareFn<T> {
    if (compareFn !== undefined && typeof compareFn !== 'function') {
        throw new TypeError(`${functionName}: compareFn must be a function`);
    }
}

/**
 * Check if array is sorted
 * @template T - Element type
 * @param arr - Array to check
 * @param compareFn - Optional comparison function
 * @returns True if array is sorted
 */
function isSorted<T>(arr: readonly T[], compareFn: CompareFn<T> = (a, b) => (a as number) - (b as number)): boolean {
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
 * @template T - Element type
 * @param arr - Array to sort
 * @param compareFn - Optional comparison function
 * @returns New sorted array (original not mutated)
 * @throws {TypeError} If arr is not an array
 */
function bubbleSort<T>(
    arr: readonly T[],
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): T[] {
    validateArray<T>(arr, 'bubbleSort');
    validateCompareFn<T>(compareFn, 'bubbleSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const sorted = [...arr];
    const n = sorted.length;
    let swapped = false;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(sorted[j], sorted[j + 1]) > 0) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break; // Early termination
        }
    }
    
    return sorted;
}

// ============================================================================
// 2. Quick Sort - O(n log n) average, O(n²) worst
// ============================================================================

/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack)
 * Stability: Not stable
 * 
 * @template T - Element type
 * @param arr - Array to sort
 * @param compareFn - Optional comparison function
 * @returns New sorted array
 */
function quickSort<T>(
    arr: readonly T[],
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): T[] {
    validateArray<T>(arr, 'quickSort');
    validateCompareFn<T>(compareFn, 'quickSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    
    const left: T[] = [];
    const middle: T[] = [];
    const right: T[] = [];
    
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
 * @template T - Element type
 * @param arr - Array to sort
 * @param compareFn - Optional comparison function
 * @returns New sorted array
 */
function mergeSort<T>(
    arr: readonly T[],
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): T[] {
    validateArray<T>(arr, 'mergeSort');
    validateCompareFn<T>(compareFn, 'mergeSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), compareFn);
    const right = mergeSort(arr.slice(mid), compareFn);
    
    return merge(left, right, compareFn);
}

/**
 * Merge two sorted arrays
 * @template T - Element type
 * @param left - First sorted array
 * @param right - Second sorted array
 * @param compareFn - Comparison function
 * @returns Merged sorted array
 */
function merge<T>(left: readonly T[], right: readonly T[], compareFn: CompareFn<T>): T[] {
    const result: T[] = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// ============================================================================
// 4. Insertion Sort - O(n²) time, O(1) space
// ============================================================================

/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1) - in-place sorting
 * Stability: Stable
 * 
 * @template T - Element type
 * @param arr - Array to sort
 * @param compareFn - Optional comparison function
 * @returns New sorted array
 */
function insertionSort<T>(
    arr: readonly T[],
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): T[] {
    validateArray<T>(arr, 'insertionSort');
    validateCompareFn<T>(compareFn, 'insertionSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const sorted = [...arr];
    
    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i];
        let j = i - 1;
        
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
 * @template T - Element type
 * @param arr - Array to sort
 * @param compareFn - Optional comparison function
 * @returns New sorted array
 */
function selectionSort<T>(
    arr: readonly T[],
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): T[] {
    validateArray<T>(arr, 'selectionSort');
    validateCompareFn<T>(compareFn, 'selectionSort');
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const sorted = [...arr];
    
    for (let i = 0; i < sorted.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < sorted.length; j++) {
            if (compareFn(sorted[j], sorted[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
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
 * @template T - Element type
 * @param arr - Array to search
 * @param target - Target value to find
 * @param equalityFn - Optional equality function
 * @returns Index of target, or -1 if not found
 */
function linearSearch<T>(
    arr: readonly T[],
    target: T,
    equalityFn: EqualityFn<T> = (a, b) => a === b
): SearchResult {
    validateArray<T>(arr, 'linearSearch');
    
    if (typeof equalityFn !== 'function') {
        throw new TypeError('linearSearch: equalityFn must be a function');
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (equalityFn(arr[i], target)) {
            return i;
        }
    }
    
    return -1;
}

// ============================================================================
// 7. Binary Search - O(log n) time, O(1) space
// ============================================================================

/**
 * Binary Search Algorithm (Iterative)
 * Time Complexity: O(log n) worst case
 * Space Complexity: O(1)
 * 
 * ⚠️ Requires sorted array
 * 
 * @template T - Element type
 * @param arr - Sorted array to search
 * @param target - Target value to find
 * @param compareFn - Optional comparison function
 * @returns Index of target, or -1 if not found
 * @throws {Error} If array is not sorted
 */
function binarySearch<T>(
    arr: readonly T[],
    target: T,
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): SearchResult {
    validateArray<T>(arr, 'binarySearch');
    validateCompareFn<T>(compareFn, 'binarySearch');
    
    if (!isSorted(arr, compareFn)) {
        throw new Error('binarySearch: Array must be sorted');
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compareFn(arr[mid], target);
        
        if (comparison === 0) {
            return mid;
        } else if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Binary Search Algorithm (Recursive)
 * @template T - Element type
 * @param arr - Sorted array to search
 * @param target - Target value to find
 * @param left - Left boundary
 * @param right - Right boundary
 * @param compareFn - Optional comparison function
 * @returns Index of target, or -1 if not found
 */
function binarySearchRecursive<T>(
    arr: readonly T[],
    target: T,
    left = 0,
    right = arr.length - 1,
    compareFn: CompareFn<T> = (a, b) => (a as unknown as number) - (b as unknown as number)
): SearchResult {
    validateArray<T>(arr, 'binarySearchRecursive');
    
    if (left > right) {
        return -1;
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
// 8. Generic Sorting Interface
// ============================================================================

/**
 * Generic sorting function type
 */
type SortFunction<T> = (arr: readonly T[], compareFn?: CompareFn<T>) => T[];

/**
 * Sorting algorithm registry
 * ✅ Best Practice: Use type-safe algorithm selection
 */
class SortingAlgorithms {
    static bubbleSort = bubbleSort;
    static quickSort = quickSort;
    static mergeSort = mergeSort;
    static insertionSort = insertionSort;
    static selectionSort = selectionSort;
    
    /**
     * Get appropriate algorithm based on array size
     * @template T - Element type
     * @param size - Array size
     * @returns Recommended sorting function
     */
    static getRecommended<T>(size: number): SortFunction<T> {
        if (size < 10) {
            return this.insertionSort;
        } else if (size < 1000) {
            return this.quickSort;
        } else {
            return this.mergeSort;
        }
    }
}

// ============================================================================
// 9. Type-Safe Performance Measurement
// ============================================================================

/**
 * Performance measurement result
 */
interface PerformanceResult<T> {
    result: T;
    executionTime: number;
    executionTimeMs: string;
}

/**
 * Measure execution time of a function
 * @template T - Return type
 * @template Args - Argument types
 * @param fn - Function to measure
 * @param args - Arguments to pass to function
 * @returns Result with execution time
 */
function measurePerformance<T, Args extends readonly unknown[]>(
    fn: (...args: Args) => T,
    ...args: Args
): PerformanceResult<T> {
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
 * Compare sorting algorithms with type safety
 * @template T - Element type
 * @param testData - Data to test with
 * @returns Comparison results
 */
function compareSortingAlgorithms<T>(testData: readonly T[]): Array<{
    algorithm: string;
    executionTime: number;
    executionTimeMs: string;
    sorted: T[];
}> {
    validateArray<T>(testData, 'compareSortingAlgorithms');
    
    const algorithms: Array<{ name: string; fn: SortFunction<T> }> = [
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
    
    results.sort((a, b) => a.executionTime - b.executionTime);
    
    return results;
}

// ============================================================================
// 10. Constrained Generic Types
// ============================================================================

/**
 * Comparable interface for type constraints
 */
interface Comparable {
    compareTo(other: Comparable): number;
}

/**
 * Sort array of comparable objects
 * ✅ Best Practice: Use interface constraints
 * @template T extends Comparable
 * @param arr - Array of comparable objects
 * @returns Sorted array
 */
function sortComparable<T extends Comparable>(arr: readonly T[]): T[] {
    return quickSort(arr, (a, b) => a.compareTo(b));
}

// Example implementation
class Person implements Comparable {
    constructor(public name: string, public age: number) {}
    
    compareTo(other: Person): number {
        return this.age - other.age;
    }
}

// ============================================================================
// 11. Function Overloads
// ============================================================================

/**
 * Search function with overloads
 * ✅ Best Practice: Use function overloads for different signatures
 */
function search<T>(arr: readonly T[], target: T): SearchResult;
function search<T>(arr: readonly T[], target: T, useBinary: boolean): SearchResult;
function search<T>(
    arr: readonly T[],
    target: T,
    useBinary: boolean,
    compareFn?: CompareFn<T>
): SearchResult;
function search<T>(
    arr: readonly T[],
    target: T,
    useBinary = false,
    compareFn?: CompareFn<T>
): SearchResult {
    if (useBinary) {
        return binarySearch(arr, target, compareFn);
    }
    return linearSearch(arr, target);
}

// ============================================================================
// 12. Best Practices Summary
// ============================================================================

/**
 * TypeScript Algorithm Best Practices:
 * 
 * 1. Type Safety:
 *    - Use generics for reusable algorithms
 *    - Use type constraints when needed
 *    - Use type predicates for validation
 * 
 * 2. Generics:
 *    - Use CompareFn<T> for comparison functions
 *    - Use EqualityFn<T> for equality checks
 *    - Use readonly arrays for immutability
 * 
 * 3. Error Handling:
 *    - Validate inputs with type guards
 *    - Use assertions for type narrowing
 *    - Throw descriptive errors
 * 
 * 4. Performance:
 *    - Choose algorithm based on data size
 *    - Consider stability requirements
 *    - Measure performance when needed
 * 
 * 5. Code Organization:
 *    - Use function overloads for flexibility
 *    - Group related algorithms
 *    - Export types and interfaces
 */

export {
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
    compareSortingAlgorithms,
    SortingAlgorithms,
    sortComparable,
    search,
    Person,
    type CompareFn,
    type EqualityFn,
    type SearchResult,
    type SortFunction,
    type PerformanceResult
};

