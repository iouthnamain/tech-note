// Solution: Sorting and Searching Algorithms

// Bubble Sort with operation counting
function bubbleSort(arr) {
    const sorted = [...arr];
    let comparisons = 0;
    let swaps = 0;
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                swaps++;
            }
        }
    }
    
    return { sorted, comparisons, swaps };
}

// Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[arr.length - 1]; // Last element as pivot
    const left = [];
    const middle = [];
    const right = [];
    
    for (const element of arr) {
        if (element < pivot) left.push(element);
        else if (element > pivot) right.push(element);
        else middle.push(element);
    }
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Linear Search
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Performance comparison
function compareSortingPerformance(sizes) {
    const results = [];
    
    sizes.forEach(size => {
        const arr = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 1000)
        );
        
        // Bubble Sort
        const bubbleStart = performance.now();
        const bubbleResult = bubbleSort([...arr]);
        const bubbleTime = performance.now() - bubbleStart;
        
        // Quick Sort
        const quickStart = performance.now();
        quickSort([...arr]);
        const quickTime = performance.now() - quickStart;
        
        // Merge Sort
        const mergeStart = performance.now();
        mergeSort([...arr]);
        const mergeTime = performance.now() - mergeStart;
        
        results.push({
            size,
            bubbleSort: {
                time: bubbleTime.toFixed(2) + 'ms',
                comparisons: bubbleResult.comparisons,
                swaps: bubbleResult.swaps
            },
            quickSort: {
                time: quickTime.toFixed(2) + 'ms'
            },
            mergeSort: {
                time: mergeTime.toFixed(2) + 'ms'
            }
        });
    });
    
    return results;
}

// Test
const testArray1 = [5, 2, 8, 1, 9];
const testArray2 = [10, 5, 3, 7, 2, 8, 4];

console.log('Bubble Sort:', bubbleSort([...testArray1]).sorted);
console.log('Quick Sort:', quickSort([...testArray1]));
console.log('Merge Sort:', mergeSort([...testArray1]));

const sorted = [1, 2, 5, 8, 9];
console.log('Linear Search (8):', linearSearch(sorted, 8));
console.log('Binary Search (8):', binarySearch(sorted, 8));

// Performance comparison
const sizes = [100, 1000, 10000];
console.table(compareSortingPerformance(sizes));

module.exports = {
    bubbleSort,
    quickSort,
    mergeSort,
    linearSearch,
    binarySearch,
    compareSortingPerformance
};

