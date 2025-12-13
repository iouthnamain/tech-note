# Exercise 1: Implement and Compare Data Structures

## Objective
Implement Array, List, Map, and Set operations and compare their performance.

## Requirements

### Part 1: Implement Operations

1. **Array Operations**
   - Create a function to add 1000 elements to an array
   - Measure time taken for insertion
   - Implement search operation
   - Measure search time

2. **Map Operations**
   - Create a function to add 1000 key-value pairs to a Map
   - Measure time taken for insertion
   - Implement search operation by key
   - Measure search time

3. **Set Operations**
   - Create a function to add 1000 unique elements to a Set
   - Measure time taken for insertion
   - Implement search operation (has method)
   - Measure search time

### Part 2: Performance Comparison

Create a comparison function that:
- Tests each data structure with the same dataset
- Measures insertion time for 100, 1000, 10000 elements
- Measures search time for each structure
- Creates a summary table showing results

### Part 3: Use Case Analysis

For each data structure, document:
- Best use cases
- Time complexity for common operations
- When to use each structure
- Trade-offs between structures

## Starter Code

```javascript
// Your implementations here
const array = [];
const map = new Map();
const set = new Set();

// Measure insertion time
function measureInsertion(dataStructure, elements, type) {
    const start = performance.now();
    
    if (type === 'array') {
        // Your code here
    } else if (type === 'map') {
        // Your code here
    } else if (type === 'set') {
        // Your code here
    }
    
    const end = performance.now();
    return end - start;
}

// Measure search time
function measureSearch(dataStructure, target, type) {
    const start = performance.now();
    
    // Your search implementation here
    
    const end = performance.now();
    return end - start;
}

// Performance comparison
function comparePerformance(sizes) {
    const results = [];
    
    sizes.forEach(size => {
        // Test each data structure
        // Record results
    });
    
    return results;
}
```

## Expected Output

```
Performance Comparison Table:
┌──────────┬─────────────┬─────────────┬─────────────┐
│ Size     │ Array       │ Map         │ Set         │
├──────────┼─────────────┼─────────────┼─────────────┤
│ 100      │ 0.5ms       │ 0.3ms       │ 0.2ms       │
│ 1000     │ 2.1ms       │ 1.5ms       │ 1.2ms       │
│ 10000    │ 15.3ms      │ 12.1ms      │ 10.8ms      │
└──────────┴─────────────┴─────────────┴─────────────┘

Search Performance:
- Array: O(n) - Linear search
- Map: O(1) - Hash lookup
- Set: O(1) - Hash lookup
```

## Testing

Test with:
- Small datasets (10-100 elements)
- Medium datasets (1000-5000 elements)
- Large datasets (10000+ elements)
- Different data types (numbers, strings, objects)

## Bonus Challenges

1. Implement List (using Array as base) with additional methods
2. Compare memory usage between structures
3. Test with different JavaScript engines (V8, SpiderMonkey)
4. Create visualizations of performance differences

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

