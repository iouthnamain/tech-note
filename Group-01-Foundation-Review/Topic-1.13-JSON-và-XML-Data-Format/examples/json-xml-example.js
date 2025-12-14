/**
 * JSON and XML Examples - JavaScript
 * JSON và XML: Data Format với best practices
 * 
 * Best Practices:
 * - Always validate JSON before parsing
 * - Use proper error handling
 * - Implement schema validation
 * - Use transformation utilities
 * - Handle parsing errors gracefully
 */

'use strict';

// ============================================================================
// 1. JSON Basics
// ============================================================================

/**
 * Creating JSON Objects
 * ✅ Best Practice: Use consistent structure
 */
const jsonObject = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    address: {
        street: '123 Main St',
        city: 'New York',
        zip: '10001'
    },
    hobbies: ['reading', 'coding', 'gaming'],
    isActive: true
};

/**
 * JSON.stringify - Convert object to JSON string
 * ✅ Best Practice: Use replacer and space for formatting
 */
const jsonString = JSON.stringify(jsonObject);
const formattedJson = JSON.stringify(jsonObject, null, 2); // Pretty print

// ✅ Best Practice: Use replacer to filter properties
const filteredJson = JSON.stringify(jsonObject, ['name', 'email']);

// ✅ Best Practice: Custom replacer function
function replacer(key, value) {
    if (key === 'email') {
        return undefined; // Exclude email
    }
    return value;
}
const withoutEmail = JSON.stringify(jsonObject, replacer);

/**
 * JSON.parse - Convert JSON string to object
 * ✅ Best Practice: Always use try-catch
 */
function safeParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('JSON parse error:', error);
        return null;
    }
}

const parsedObject = safeParse(jsonString);

// ============================================================================
// 2. JSON Validation
// ============================================================================

/**
 * Validate JSON string
 * ✅ Best Practice: Validate before parsing
 * @param {string} str - JSON string to validate
 * @returns {boolean} True if valid JSON
 */
function isValidJSON(str) {
    if (typeof str !== 'string') {
        return false;
    }
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Parse JSON with error details
 * ✅ Best Practice: Provide detailed error information
 * @param {string} str - JSON string to parse
 * @returns {Object} Result with success flag and data/error
 */
function parseJSONSafe(str) {
    try {
        const data = JSON.parse(str);
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            position: error.message.match(/\d+/)?.[0] // Extract position if available
        };
    }
}

// ============================================================================
// 3. JSON Schema Validation
// ============================================================================

/**
 * JSON Schema (simplified)
 * ✅ Best Practice: Define schemas for validation
 */
const userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        age: { type: 'number', minimum: 0, maximum: 150 },
        email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }
    },
    required: ['name', 'email']
};

/**
 * Validate JSON against schema
 * ✅ Best Practice: Comprehensive validation
 * @param {*} data - Data to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result
 */
function validateJSON(data, schema) {
    const errors = [];
    
    // Check type
    if (schema.type === 'object' && typeof data !== 'object' || data === null || Array.isArray(data)) {
        errors.push('Data must be an object');
        return { valid: false, errors };
    }
    
    if (schema.type === 'array' && !Array.isArray(data)) {
        errors.push('Data must be an array');
        return { valid: false, errors };
    }
    
    // Check required fields
    if (schema.required) {
        for (const field of schema.required) {
            if (!(field in data) || data[field] === undefined || data[field] === null) {
                errors.push(`Missing required field: ${field}`);
            }
        }
    }
    
    // Validate properties
    if (schema.properties) {
        for (const [field, fieldSchema] of Object.entries(schema.properties)) {
            const value = data[field];
            
            if (value === undefined) continue; // Optional field
            
            // Type validation
            if (fieldSchema.type && typeof value !== fieldSchema.type) {
                errors.push(`${field} must be of type ${fieldSchema.type}`);
                continue;
            }
            
            // String validations
            if (fieldSchema.type === 'string') {
                if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
                    errors.push(`${field} must be at least ${fieldSchema.minLength} characters`);
                }
                if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
                    errors.push(`${field} must be at most ${fieldSchema.maxLength} characters`);
                }
                if (fieldSchema.pattern) {
                    const regex = new RegExp(fieldSchema.pattern);
                    if (!regex.test(value)) {
                        errors.push(`${field} format is invalid`);
                    }
                }
            }
            
            // Number validations
            if (fieldSchema.type === 'number') {
                if (fieldSchema.minimum !== undefined && value < fieldSchema.minimum) {
                    errors.push(`${field} must be at least ${fieldSchema.minimum}`);
                }
                if (fieldSchema.maximum !== undefined && value > fieldSchema.maximum) {
                    errors.push(`${field} must be at most ${fieldSchema.maximum}`);
            }
        }
    }
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// ============================================================================
// 4. JSON Transformation Utilities
// ============================================================================

/**
 * Deep clone using JSON
 * ✅ Best Practice: Use for simple objects (no functions, dates, etc.)
 * ⚠️ Limitations: Doesn't handle functions, dates, undefined, symbols
 * @param {*} obj - Object to clone
 * @returns {*} Deep cloned object
 */
function deepClone(obj) {
    try {
    return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        throw new Error('Cannot clone object: ' + error.message);
    }
}

/**
 * Filter JSON data
 * ✅ Best Practice: Use for data filtering
 * @param {Array} items - Array of objects to filter
 * @param {Object} criteria - Filter criteria
 * @returns {Array} Filtered array
 */
function filterData(items, criteria) {
    if (!Array.isArray(items)) {
        throw new TypeError('First argument must be an array');
    }
    
    return items.filter(item => {
        return Object.keys(criteria).every(key => {
            const itemValue = item[key];
            const criteriaValue = criteria[key];
            
            // Support for nested properties
            if (key.includes('.')) {
                const keys = key.split('.');
                let value = item;
                for (const k of keys) {
                    value = value?.[k];
                }
                return value === criteriaValue;
            }
            
            return itemValue === criteriaValue;
        });
    });
}

/**
 * Transform JSON structure
 * ✅ Best Practice: Use for data transformation
 * @param {Array} users - Array of user objects
 * @param {Function} transformFn - Transformation function
 * @returns {Array} Transformed array
 */
function transformData(users, transformFn) {
    if (!Array.isArray(users)) {
        throw new TypeError('First argument must be an array');
    }
    if (typeof transformFn !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    
    return users.map(transformFn);
}

// Example transformation
function transformUserData(users) {
    return transformData(users, user => ({
        id: user.id,
        fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
        contact: {
            email: user.email,
            phone: user.phone ?? null
        },
        metadata: {
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }));
}

/**
 * Flatten nested JSON
 * ✅ Best Practice: Use for simplifying nested structures
 * @param {Object} obj - Object to flatten
 * @param {string} prefix - Key prefix
 * @returns {Object} Flattened object
 */
function flattenJSON(obj, prefix = '') {
    const flattened = {};
    
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(flattened, flattenJSON(value, newKey));
        } else {
            flattened[newKey] = value;
        }
    }
    
    return flattened;
}

/**
 * Unflatten JSON
 * ✅ Best Practice: Restore nested structure
 * @param {Object} obj - Flattened object
 * @returns {Object} Nested object
 */
function unflattenJSON(obj) {
    const result = {};
    
    for (const [key, value] of Object.entries(obj)) {
        const keys = key.split('.');
        let current = result;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!(k in current) || typeof current[k] !== 'object' || current[k] === null) {
                current[k] = {};
            }
            current = current[k];
        }
        
        current[keys[keys.length - 1]] = value;
    }
    
    return result;
}

// ============================================================================
// 5. Working with JSON in APIs
// ============================================================================

/**
 * Fetch JSON data with error handling
 * ✅ Best Practice: Comprehensive error handling
 * @param {string} url - API endpoint
 * @returns {Promise<Object>} Parsed JSON data
 */
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        
        const text = await response.text();
        const parseResult = parseJSONSafe(text);
        
        if (!parseResult.success) {
            throw new Error(`JSON parse error: ${parseResult.error}`);
        }
        
        return parseResult.data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error;
    }
}

/**
 * POST JSON data
 * ✅ Best Practice: Proper headers and error handling
 * @param {string} url - API endpoint
 * @param {Object} data - Data to send
 * @returns {Promise<Object>} Response data
 */
async function postJSON(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting JSON:', error);
        throw error;
    }
}

// ============================================================================
// 6. XML Handling
// ============================================================================

/**
 * Parse XML string
 * ✅ Best Practice: Handle parsing errors
 * @param {string} xmlString - XML string to parse
 * @returns {Document|Object} Parsed XML document or object
 */
function parseXML(xmlString) {
    if (typeof xmlString !== 'string') {
        throw new TypeError('XML string must be a string');
    }
    
    try {
        // Browser environment
        if (typeof DOMParser !== 'undefined') {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            
            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                throw new Error('XML parsing error: ' + parserError.textContent);
            }
            
            return xmlDoc;
        }
        
        // Node.js environment (would need xml2js library)
        throw new Error('XML parsing not available in this environment');
    } catch (error) {
        console.error('XML parse error:', error);
        throw error;
    }
}

/**
 * Convert XML to JSON (simplified)
 * ✅ Best Practice: Transform XML to JSON structure
 * @param {Document} xmlDoc - XML document
 * @returns {Object} JSON object
 */
function xmlToJSON(xmlDoc) {
    if (!xmlDoc || !xmlDoc.documentElement) {
        throw new Error('Invalid XML document');
    }
    
    function nodeToObject(node) {
        const obj = {};
        
        // Add attributes
        if (node.attributes) {
            for (const attr of node.attributes) {
                obj[`@${attr.name}`] = attr.value;
            }
        }
        
        // Add child nodes
        for (const child of node.childNodes) {
            if (child.nodeType === 1) { // Element node
                const childName = child.nodeName;
                const childValue = nodeToObject(child);
                
                if (obj[childName]) {
                    // Multiple children with same name - convert to array
                    if (!Array.isArray(obj[childName])) {
                        obj[childName] = [obj[childName]];
                    }
                    obj[childName].push(childValue);
                } else {
                    obj[childName] = childValue;
                }
            } else if (child.nodeType === 3 && child.textContent?.trim()) { // Text node
                return child.textContent.trim();
            }
        }
        
        return Object.keys(obj).length > 0 ? obj : node.textContent?.trim() || '';
    }
    
    return { [xmlDoc.documentElement.nodeName]: nodeToObject(xmlDoc.documentElement) };
}

// ============================================================================
// 7. JSON Streaming (for large data)
// ============================================================================

/**
 * Stream JSON parsing (conceptual)
 * ✅ Best Practice: Use for large JSON files
 * Note: Actual implementation would use streaming JSON parser library
 */
async function* streamJSON(stream) {
    // This is a conceptual example
    // In practice, use a streaming JSON parser like 'stream-json' or 'JSONStream'
    let buffer = '';
    
    for await (const chunk of stream) {
        buffer += chunk.toString();
        // Process complete JSON objects from buffer
        // Yield parsed objects
    }
}

// ============================================================================
// 8. JSON Comparison
// ============================================================================

/**
 * Compare JSON objects
 * ✅ Best Practice: Deep comparison
 * @param {*} obj1 - First object
 * @param {*} obj2 - Second object
 * @returns {boolean} True if objects are equal
 */
function compareJSON(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Get JSON diff
 * ✅ Best Practice: Find differences between objects
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {Object} Differences
 */
function getJSONDiff(obj1, obj2) {
    const diff = {
        added: {},
        removed: {},
        changed: {}
    };
    
    const keys1 = new Set(Object.keys(obj1));
    const keys2 = new Set(Object.keys(obj2));
    
    // Find added and changed
    for (const key of keys2) {
        if (!keys1.has(key)) {
            diff.added[key] = obj2[key];
        } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
            diff.changed[key] = { old: obj1[key], new: obj2[key] };
        }
    }
    
    // Find removed
    for (const key of keys1) {
        if (!keys2.has(key)) {
            diff.removed[key] = obj1[key];
        }
    }
    
    return diff;
}

// ============================================================================
// 9. JSON vs XML Comparison
// ============================================================================

/**
 * JSON vs XML:
 * 
 * JSON Advantages:
 * - Lighter weight (less verbose)
 * - Native JavaScript support
 * - Easier to parse
 * - More readable
 * - Better for APIs
 * - Faster parsing
 * 
 * XML Advantages:
 * - More expressive
 * - Better for complex documents
 * - Supports attributes
 * - Schema validation (XSD)
 * - Namespace support
 * - Better for document markup
 * 
 * When to use JSON:
 * - APIs and data exchange
 * - Configuration files
 * - Simple data structures
 * - Web applications
 * 
 * When to use XML:
 * - Document markup
 * - Complex hierarchical data
 * - When schema validation is critical
 * - Legacy systems
 */

// ============================================================================
// 10. Example Usage
// ============================================================================

// JSON operations
const user = {
    name: 'John',
    email: 'john@example.com',
    age: 30
};

const validation = validateJSON(user, userSchema);
if (validation.valid) {
    console.log('User is valid');
} else {
    console.error('Validation errors:', validation.errors);
}

// Transformation
const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
];

const transformed = transformUserData(users);
console.log('Transformed users:', transformed);

// Flatten/Unflatten
const nested = { user: { name: 'John', address: { city: 'NYC' } } };
const flattened = flattenJSON(nested);
console.log('Flattened:', flattened);
const unflattened = unflattenJSON(flattened);
console.log('Unflattened:', unflattened);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
    isValidJSON,
        parseJSONSafe,
    validateJSON,
        deepClone,
        filterData,
        transformData,
        transformUserData,
        flattenJSON,
        unflattenJSON,
        fetchJSON,
        postJSON,
        parseXML,
        xmlToJSON,
        compareJSON,
        getJSONDiff,
        userSchema
};
}
