// Solution: Implement and Compare Data Structures

// Part 1: Array Operations
function arrayInsertion(elements) {
    const arr = [];
    const start = performance.now();
    
    for (let i = 0; i < elements; i++) {
        arr.push(i); // O(1) operation
    }
    
    const end = performance.now();
    return {
        time: end - start,
        size: arr.length
    };
}

function arraySearch(arr, target) {
    const start = performance.now();
    const found = arr.includes(target); // O(n) operation
    const end = performance.now();
    
    return {
        found,
        time: end - start
    };
}

// Part 2: Map Operations
function mapInsertion(elements) {
    const map = new Map();
    const start = performance.now();
    
    for (let i = 0; i < elements; i++) {
        map.set(`key_${i}`, i); // O(1) average
    }
    
    const end = performance.now();
    return {
        time: end - start,
        size: map.size
    };
}

function mapSearch(map, target) {
    const start = performance.now();
    const found = map.has(target); // O(1) average
    const end = performance.now();
    
    return {
        found,
        time: end - start
    };
}

// Part 3: Set Operations
function setInsertion(elements) {
    const set = new Set();
    const start = performance.now();
    
    for (let i = 0; i < elements; i++) {
        set.add(i); // O(1) average
    }
    
    const end = performance.now();
    return {
        time: end - start,
        size: set.size
    };
}

function setSearch(set, target) {
    const start = performance.now();
    const found = set.has(target); // O(1) average
    const end = performance.now();
    
    return {
        found,
        time: end - start
    };
}

// Part 4: Performance Comparison
function comparePerformance(sizes) {
    const results = [];
    
    sizes.forEach(size => {
        // Array test
        const arrayResult = arrayInsertion(size);
        const array = Array.from({ length: size }, (_, i) => i);
        const arraySearchResult = arraySearch(array, Math.floor(size / 2));
        
        // Map test
        const mapResult = mapInsertion(size);
        const map = new Map(Array.from({ length: size }, (_, i) => [`key_${i}`, i]));
        const mapSearchResult = mapSearch(map, `key_${Math.floor(size / 2)}`);
        
        // Set test
        const setResult = setInsertion(size);
        const set = new Set(Array.from({ length: size }, (_, i) => i));
        const setSearchResult = setSearch(set, Math.floor(size / 2));
        
        results.push({
            size,
            array: {
                insertion: arrayResult.time.toFixed(2),
                search: arraySearchResult.time.toFixed(2)
            },
            map: {
                insertion: mapResult.time.toFixed(2),
                search: mapSearchResult.time.toFixed(2)
            },
            set: {
                insertion: setResult.time.toFixed(2),
                search: setSearchResult.time.toFixed(2)
            }
        });
    });
    
    return results;
}

// Run comparison
const sizes = [100, 1000, 10000];
const results = comparePerformance(sizes);

console.table(results);

// Part 5: Use Case Analysis
const useCases = {
    array: {
        bestFor: [
            'Ordered collection of items',
            'Indexed access needed',
            'Frequent iteration',
            'Simple list of values'
        ],
        timeComplexity: {
            access: 'O(1)',
            search: 'O(n)',
            insertEnd: 'O(1)',
            insertBegin: 'O(n)',
            delete: 'O(n)'
        }
    },
    map: {
        bestFor: [
            'Key-value pairs',
            'Fast lookups by key',
            'Counting occurrences',
            'Caching data'
        ],
        timeComplexity: {
            access: 'O(1)',
            search: 'O(1)',
            insert: 'O(1)',
            delete: 'O(1)'
        }
    },
    set: {
        bestFor: [
            'Unique values only',
            'Fast membership testing',
            'Removing duplicates',
            'Set operations (union, intersection)'
        ],
        timeComplexity: {
            add: 'O(1)',
            has: 'O(1)',
            delete: 'O(1)',
            size: 'O(1)'
        }
    }
};

console.log('\nUse Case Analysis:');
console.log(JSON.stringify(useCases, null, 2));

module.exports = {
    arrayInsertion,
    arraySearch,
    mapInsertion,
    mapSearch,
    setInsertion,
    setSearch,
    comparePerformance
};

