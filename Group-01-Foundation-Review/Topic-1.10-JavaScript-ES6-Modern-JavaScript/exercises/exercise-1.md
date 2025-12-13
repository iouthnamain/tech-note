# Exercise 1: Modern JavaScript Features Practice

## Objective
Practice using ES6+ features including arrow functions, destructuring, async/await, and modern array methods.

## Requirements

### Part 1: Arrow Functions and Destructuring

1. Convert traditional functions to arrow functions
2. Use destructuring to extract values from objects and arrays
3. Use spread operator to combine arrays and objects
4. Use template literals for string formatting

### Part 2: Array Methods

Create functions using modern array methods:
1. `map` - Transform an array of numbers to their squares
2. `filter` - Filter even numbers from an array
3. `reduce` - Calculate sum and product of array
4. `find` - Find first element matching condition
5. `some` and `every` - Check array conditions

### Part 3: Async/Await

1. Create an async function to fetch data
2. Handle multiple async operations with Promise.all
3. Implement error handling with try-catch
4. Create a function that retries failed requests

### Part 4: Classes and Modules

1. Create a class hierarchy (base class and derived classes)
2. Use static methods
3. Implement getters and setters
4. Export and import modules

### Part 5: Modern Features

1. Use optional chaining to safely access nested properties
2. Use nullish coalescing for default values
3. Use destructuring with default values
4. Combine multiple ES6+ features in one solution

## Starter Code

```javascript
// Part 1: Convert to arrow functions
function multiply(a, b) {
    return a * b;
}

// Your arrow function version here

// Part 2: Array methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Your implementations here

// Part 3: Async/Await
async function fetchUserData(userId) {
    // Your implementation here
}
```

## Expected Output

```
Squared: [1, 4, 9, 16, 25]
Even numbers: [2, 4, 6, 8, 10]
Sum: 55
Product: 3628800
```

## Testing

1. Test all functions with different inputs
2. Verify async functions handle errors correctly
3. Check that classes work as expected
4. Test module imports/exports

## Bonus Challenges

1. Create a utility library using ES6+ features
2. Implement a data transformation pipeline
3. Build a promise-based API wrapper
4. Create a class with private fields (ES2022)

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

