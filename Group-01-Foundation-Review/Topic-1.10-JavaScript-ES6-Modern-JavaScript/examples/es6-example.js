/**
 * JavaScript ES6+ Examples - Modern JavaScript Features
 * ES6, ES2020, ES2021, ES2022, ES2023, ES2024 với best practices
 * 
 * Best Practices:
 * - Use modern features appropriately
 * - Understand when to use each feature
 * - Consider browser compatibility
 * - Use features that improve code clarity
 */

'use strict';

// ============================================================================
// 1. Arrow Functions (ES6)
// ============================================================================

/**
 * Arrow Functions
 * ✅ Best Practice: Use for short functions and callbacks
 * ⚠️ Don't use for methods that need 'this' binding
 */

// Simple arrow functions
const add = (a, b) => a + b;
const square = x => x * x;
const greet = () => console.log('Hello!');

// Arrow functions preserve 'this' from outer scope
const obj = {
    name: 'John',
    traditional: function() {
        setTimeout(function() {
            console.log(this.name); // undefined (lost context)
        }, 100);
    },
    arrow: function() {
        setTimeout(() => {
            console.log(this.name); // 'John' (preserved context)
        }, 100);
    }
};

// ✅ Best Practice: Use arrow functions for callbacks
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// ============================================================================
// 2. Destructuring (ES6)
// ============================================================================

/**
 * Array Destructuring
 * ✅ Best Practice: Use for extracting array elements
 */
const [first, second, ...rest] = numbers;
const [head, , third] = numbers; // Skip second element

// ✅ Best Practice: Use with default values
const [a = 0, b = 0] = [1];

/**
 * Object Destructuring
 * ✅ Best Practice: Use for extracting object properties
 */
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age } = person;
const { name: personName, ...otherInfo } = person;

// ✅ Best Practice: Use with default values
const { name: userName = 'Guest', email = 'no-email' } = person;

// ✅ Best Practice: Nested destructuring
const user = {
    profile: {
        name: 'John',
        address: {
            city: 'New York'
        }
    }
};
const { profile: { name: profileName, address: { city } } } = user;

// ============================================================================
// 3. Spread Operator (ES6)
// ============================================================================

/**
 * Spread Operator
 * ✅ Best Practice: Use for copying and merging
 */

// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// ✅ Best Practice: Immutable array operations
const newArray = [...arr1, 7]; // Add element
const withoutFirst = arr1.slice(1); // Remove first

// Object spreading
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// ✅ Best Practice: Override properties
const updated = { ...obj1, b: 3 }; // { a: 1, b: 3 }

// ============================================================================
// 4. Template Literals (ES6)
// ============================================================================

/**
 * Template Literals
 * ✅ Best Practice: Use for string interpolation and multi-line strings
 */
const name = 'John';
const age = 30;
const message = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
const html = `
    <div>
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;

// ✅ Best Practice: Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

const highlighted = highlight`Hello, ${name}!`;

// ============================================================================
// 5. Default Parameters (ES6)
// ============================================================================

/**
 * Default Parameters
 * ✅ Best Practice: Use for optional parameters
 */
function greet(name = 'Guest', greeting = 'Hello') {
    return `${greeting}, ${name}!`;
}

// ✅ Best Practice: Use with destructuring
function createUser({ name = 'Anonymous', email = 'no-email', age = 0 } = {}) {
    return { name, email, age };
}

// ============================================================================
// 6. Rest Parameters (ES6)
// ============================================================================

/**
 * Rest Parameters
 * ✅ Best Practice: Use for variable number of arguments
 */
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// ✅ Best Practice: Combine with other parameters
function log(message, ...args) {
    console.log(message, ...args);
}

// ============================================================================
// 7. Promises (ES6)
// ============================================================================

/**
 * Promises
 * ✅ Best Practice: Use for async operations
 */
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched successfully');
        }, 1000);
    });
};

fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// ✅ Best Practice: Promise.all for parallel operations
Promise.all([fetchData(), fetchData()])
    .then(results => console.log('All done:', results))
    .catch(error => console.error('One failed:', error));

// ✅ Best Practice: Promise.allSettled (ES2020)
Promise.allSettled([fetchData(), fetchData()])
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} succeeded:`, result.value);
            } else {
                console.log(`Promise ${index} failed:`, result.reason);
            }
        });
    });

// ============================================================================
// 8. Async/Await (ES2017)
// ============================================================================

/**
 * Async/Await
 * ✅ Best Practice: Use for cleaner async code
 */
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// ✅ Best Practice: Parallel async operations
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => fetchUserData(id));
    return await Promise.all(promises);
}

// ============================================================================
// 9. Top-Level Await (ES2022)
// ============================================================================

/**
 * Top-Level Await
 * ✅ Best Practice: Use in modules for initialization
 * ⚠️ Only works in ES modules, not in scripts
 */

// In ES module:
// const data = await fetchData();
// console.log('Data loaded:', data);

// ============================================================================
// 10. Classes (ES6)
// ============================================================================

/**
 * Classes
 * ✅ Best Practice: Use for object-oriented programming
 */
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static createAdult(name) {
        return new Person(name, 18);
    }
}

class Student extends Person {
    constructor(name, age, school) {
        super(name, age);
        this.school = school;
    }
    
    study() {
        return `${this.name} is studying at ${this.school}`;
    }
}

// ============================================================================
// 11. Private Class Fields (ES2022)
// ============================================================================

/**
 * Private Class Fields
 * ✅ Best Practice: Use # for private fields and methods
 */
class BankAccount {
    #balance = 0; // Private field
    #accountNumber;
    
    constructor(accountNumber, initialBalance = 0) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
    }
    
    // Private method
    #validateAmount(amount) {
        return typeof amount === 'number' && amount > 0;
    }
    
    deposit(amount) {
        if (this.#validateAmount(amount)) {
            this.#balance += amount;
            return this.#balance;
        }
        throw new Error('Invalid amount');
    }
    
    getBalance() {
        return this.#balance;
    }
}

// ============================================================================
// 12. Static Class Fields (ES2022)
// ============================================================================

/**
 * Static Class Fields
 * ✅ Best Practice: Use for class-level data
 */
class MathUtils {
    static PI = 3.14159;
    static E = 2.71828;
    
    static add(a, b) {
        return a + b;
    }
}

// ============================================================================
// 13. Logical Assignment Operators (ES2021)
// ============================================================================

/**
 * Logical Assignment Operators
 * ✅ Best Practice: Use for concise assignments
 */

// Logical OR assignment (||=)
let x = null;
x ||= 'default'; // x = x || 'default'

// Logical AND assignment (&&=)
let y = 'value';
y &&= 'updated'; // y = y && 'updated'

// Nullish coalescing assignment (??=)
let z = null;
z ??= 'default'; // z = z ?? 'default'

// ============================================================================
// 14. Optional Chaining (ES2020)
// ============================================================================

/**
 * Optional Chaining
 * ✅ Best Practice: Use for safe property access
 */
const user = {
    profile: {
        name: 'John',
        address: {
            city: 'New York'
        }
    }
};

const city = user?.profile?.address?.city; // 'New York'
const zip = user?.profile?.address?.zip; // undefined (no error)

// ✅ Best Practice: With method calls
const result = user?.profile?.getName?.(); // Safe method call

// ✅ Best Practice: With arrays
const firstItem = items?.[0]; // Safe array access

// ============================================================================
// 15. Nullish Coalescing (ES2020)
// ============================================================================

/**
 * Nullish Coalescing
 * ✅ Best Practice: Use for default values (only null/undefined)
 */
const name = user?.name ?? 'Guest'; // Use 'Guest' if name is null or undefined
const count = items?.length ?? 0;

// Difference from ||
const value = 0;
const result1 = value || 'default'; // 'default' (0 is falsy)
const result2 = value ?? 'default'; // 0 (only null/undefined trigger default)

// ============================================================================
// 16. Array Methods (ES6+)
// ============================================================================

/**
 * Modern Array Methods
 * ✅ Best Practice: Use functional array methods
 */
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);

// filter - select elements
const evens = numbers.filter(n => n % 2 === 0);

// reduce - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);

// find - find first matching element
const found = numbers.find(n => n > 3);

// findIndex - find index of first matching element
const index = numbers.findIndex(n => n > 3);

// some - check if any element matches
const hasEven = numbers.some(n => n % 2 === 0);

// every - check if all elements match
const allPositive = numbers.every(n => n > 0);

// includes - check if array includes value
const hasThree = numbers.includes(3);

// flat - flatten nested arrays (ES2019)
const nested = [[1, 2], [3, 4]];
const flattened = nested.flat(); // [1, 2, 3, 4]

// flatMap - map and flatten (ES2019)
const words = ['hello world', 'foo bar'];
const letters = words.flatMap(word => word.split(' ')); // ['hello', 'world', 'foo', 'bar']

// at - get element by index (ES2022)
const last = numbers.at(-1); // 5 (last element)
const first = numbers.at(0); // 1

// ============================================================================
// 17. Object Methods (ES6+)
// ============================================================================

/**
 * Object Methods
 * ✅ Best Practice: Use Object methods for object operations
 */

// Object.keys - get all keys
const keys = Object.keys(person); // ['name', 'age', 'city']

// Object.values - get all values
const values = Object.values(person); // ['John', 30, 'New York']

// Object.entries - get key-value pairs
const entries = Object.entries(person); // [['name', 'John'], ['age', 30], ...]

// Object.fromEntries - create object from entries (ES2019)
const newObj = Object.fromEntries(entries);

// Object.assign - copy properties (ES6)
const copied = Object.assign({}, person);

// ✅ Best Practice: Use spread operator instead
const copied2 = { ...person };

// ============================================================================
// 18. Map and Set (ES6)
// ============================================================================

/**
 * Map and Set
 * ✅ Best Practice: Use Map for key-value pairs, Set for unique values
 */
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
console.log(map.get('name')); // 'John'

const set = new Set([1, 2, 3, 3, 4]);
console.log(set); // Set {1, 2, 3, 4}

// ============================================================================
// 19. Modules (ES6)
// ============================================================================

/**
 * ES6 Modules
 * ✅ Best Practice: Use ES modules for better code organization
 */

// Export named exports
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export class Calculator { ... }

// Export default
// export default class Calculator { ... }

// Import
// import Calculator, { PI, add } from './calculator.js';
// import * as MathUtils from './math.js';

// ============================================================================
// 20. String Methods (ES6+)
// ============================================================================

/**
 * String Methods
 * ✅ Best Practice: Use modern string methods
 */
const text = 'Hello World';

// startsWith - check if string starts with substring
const startsWithHello = text.startsWith('Hello'); // true

// endsWith - check if string ends with substring
const endsWithWorld = text.endsWith('World'); // true

// includes - check if string includes substring
const includesWorld = text.includes('World'); // true

// repeat - repeat string
const repeated = 'ha'.repeat(3); // 'hahaha'

// padStart/padEnd - pad string (ES2017)
const padded = '5'.padStart(3, '0'); // '005'

// ============================================================================
// 21. Numeric Separators (ES2021)
// ============================================================================

/**
 * Numeric Separators
 * ✅ Best Practice: Use for readability in large numbers
 */
const million = 1_000_000;
const binary = 0b1010_0001;
const hex = 0xFF_EC_DE_5E;

// ============================================================================
// 22. Promise.any (ES2021)
// ============================================================================

/**
 * Promise.any
 * ✅ Best Practice: Use when you need the first fulfilled promise
 */
Promise.any([fetchData(), fetchData()])
    .then(firstResult => console.log('First success:', firstResult))
    .catch(errors => console.error('All failed:', errors));

// ============================================================================
// 23. String.replaceAll (ES2021)
// ============================================================================

/**
 * String.replaceAll
 * ✅ Best Practice: Use for replacing all occurrences
 */
const text2 = 'hello world hello';
const replaced = text2.replaceAll('hello', 'hi'); // 'hi world hi'

// ============================================================================
// 24. Array.findLast / findLastIndex (ES2023)
// ============================================================================

/**
 * Array.findLast / findLastIndex
 * ✅ Best Practice: Use to find last matching element
 */
const numbers2 = [1, 2, 3, 4, 5, 3];
const lastThree = numbers2.findLast(n => n === 3); // 3 (last occurrence)
const lastIndex = numbers2.findLastIndex(n => n === 3); // 5

// ============================================================================
// 25. Array.toSorted / toReversed / toSpliced (ES2023)
// ============================================================================

/**
 * Immutable Array Methods
 * ✅ Best Practice: Use for immutable array operations
 */
const original = [3, 1, 4, 2];
const sorted = original.toSorted(); // [1, 2, 3, 4] (original unchanged)
const reversed = original.toReversed(); // [2, 4, 1, 3] (original unchanged)

// ============================================================================
// Best Practices Summary
// ============================================================================

/**
 * Modern JavaScript Best Practices:
 * 
 * 1. Use arrow functions for callbacks and short functions
 * 2. Use destructuring for cleaner code
 * 3. Use spread operator for copying and merging
 * 4. Use template literals for strings
 * 5. Use async/await for async code
 * 6. Use optional chaining for safe property access
 * 7. Use nullish coalescing for default values
 * 8. Use private fields (#) for encapsulation
 * 9. Use logical assignment operators for concise code
 * 10. Use modern array/object methods
 * 11. Consider browser compatibility
 * 12. Use ES modules for better organization
 */

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
    add,
    greet,
    Person,
    Student,
        BankAccount,
        MathUtils,
    fetchData,
        fetchUserData,
        sum
};
}
