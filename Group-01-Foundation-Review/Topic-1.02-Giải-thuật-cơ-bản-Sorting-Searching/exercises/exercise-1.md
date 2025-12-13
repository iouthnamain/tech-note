# Exercise 1: Implement Sorting and Searching Algorithms

## Objective
Implement and compare different sorting and searching algorithms.

## Requirements

### Part 1: Implement Sorting Algorithms

1. **Bubble Sort**
   - Implement bubble sort algorithm
   - Count the number of comparisons and swaps
   - Test with arrays of different sizes: [5, 2, 8, 1, 9], [10, 5, 3, 7, 2, 8, 4]

2. **Quick Sort**
   - Implement quick sort algorithm
   - Use the last element as pivot
   - Test with the same arrays

3. **Merge Sort**
   - Implement merge sort algorithm
   - Test with the same arrays

### Part 2: Implement Searching Algorithms

1. **Linear Search**
   - Implement linear search
   - Return index if found, -1 if not found
   - Test: search for 8 in [5, 2, 8, 1, 9]

2. **Binary Search**
   - Implement binary search (requires sorted array)
   - Return index if found, -1 if not found
   - Test: search for 8 in sorted array [1, 2, 5, 8, 9]

### Part 3: Performance Comparison

Compare the performance of sorting algorithms:
- Time each algorithm with arrays of size 100, 1000, 10000
- Count operations (comparisons, swaps)
- Create a comparison table

## Starter Code

Create a file `sorting-search.js`:

```javascript
// Your implementations here

// Test cases
const testArray1 = [5, 2, 8, 1, 9];
const testArray2 = [10, 5, 3, 7, 2, 8, 4];

// Test sorting algorithms
console.log('Bubble Sort:', bubbleSort([...testArray1]));
console.log('Quick Sort:', quickSort([...testArray1]));
console.log('Merge Sort:', mergeSort([...testArray1]));

// Test searching algorithms
const sorted = [1, 2, 5, 8, 9];
console.log('Linear Search:', linearSearch(sorted, 8));
console.log('Binary Search:', binarySearch(sorted, 8));
```

## Expected Output

```
Bubble Sort: [1, 2, 5, 8, 9]
Quick Sort: [1, 2, 5, 8, 9]
Merge Sort: [1, 2, 5, 8, 9]
Linear Search: 3
Binary Search: 3
```

## Bonus Challenges

1. Implement Heap Sort
2. Implement Insertion Sort
3. Compare all algorithms with large datasets (10000+ elements)
4. Visualize the sorting process

## Solution

Check `solutions/solution-1.js` after attempting the exercise.
