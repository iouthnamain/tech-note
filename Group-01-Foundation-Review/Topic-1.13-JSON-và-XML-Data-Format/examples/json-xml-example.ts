/**
 * JSON and XML Examples - TypeScript
 * JSON và XML: Data Format với type safety
 * 
 * TypeScript Best Practices:
 * - JSON type definitions
 * - Type-safe parsing
 * - Schema-to-type generation
 * - XML type definitions
 */

// ============================================================================
// 1. Type Definitions
// ============================================================================

/**
 * User interface
 */
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    address?: Address;
    hobbies?: string[];
    isActive: boolean;
}

interface Address {
    street: string;
    city: string;
    zip: string;
}

/**
 * JSON Value type
 */
type JsonValue =
    | string
    | number
    | boolean
    | null
    | { [key: string]: JsonValue }
    | JsonValue[];

/**
 * JSON Schema types
 */
interface JsonSchema {
    type: 'object' | 'array' | 'string' | 'number' | 'boolean';
    properties?: Record<string, PropertySchema>;
    required?: string[];
    items?: JsonSchema;
    minLength?: number;
    maxLength?: number;
    minimum?: number;
    maximum?: number;
    pattern?: string;
}

interface PropertySchema {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    minLength?: number;
    maxLength?: number;
    minimum?: number;
    maximum?: number;
    pattern?: string;
}

// ============================================================================
// 2. Type-Safe JSON Parsing
// ============================================================================

/**
 * Parse JSON with type safety
 * ✅ Best Practice: Use type guards for validation
 * @template T - Expected type
 * @param str - JSON string
 * @returns Parsed data or null
 */
function parseJSON<T>(str: string): T | null {
    try {
        const parsed = JSON.parse(str);
        return parsed as T;
    } catch (error) {
        console.error('JSON parse error:', error);
        return null;
    }
}

/**
 * Parse JSON with result type
 * ✅ Best Practice: Use Result type for error handling
 */
type ParseResult<T> =
    | { success: true; data: T }
    | { success: false; error: string; position?: string };

function parseJSONSafe<T>(str: string): ParseResult<T> {
    try {
        const data = JSON.parse(str) as T;
        return { success: true, data };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const position = message.match(/\d+/)?.[0];
        return {
            success: false,
            error: message,
            position
        };
    }
}

// ============================================================================
// 3. Type Guards for JSON Validation
// ============================================================================

/**
 * Type guard for User
 * ✅ Best Practice: Use type guards for runtime validation
 */
function isUser(value: unknown): value is User {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value &&
        'email' in value &&
        'isActive' in value &&
        typeof (value as User).id === 'number' &&
        typeof (value as User).name === 'string' &&
        typeof (value as User).email === 'string' &&
        typeof (value as User).isActive === 'boolean'
    );
}

/**
 * Type guard for User array
 */
function isUserArray(value: unknown): value is User[] {
    return Array.isArray(value) && value.every(isUser);
}

/**
 * Validate and parse JSON as User
 */
function parseUserJSON(str: string): User | null {
    const result = parseJSONSafe<unknown>(str);
    if (!result.success) {
        return null;
    }
    
    if (isUser(result.data)) {
        return result.data;
    }
    
    return null;
}

// ============================================================================
// 4. Schema-to-Type Generation
// ============================================================================

/**
 * Generate type from schema (conceptual)
 * ✅ Best Practice: Use tools like json-schema-to-typescript in practice
 */
type SchemaToType<S extends JsonSchema> = S extends { type: 'object'; properties: infer P }
    ? P extends Record<string, PropertySchema>
        ? {
              [K in keyof P]: P[K] extends { type: 'string' }
                  ? string
                  : P[K] extends { type: 'number' }
                  ? number
                  : P[K] extends { type: 'boolean' }
                  ? boolean
                  : unknown;
          }
        : never
    : never;

// ============================================================================
// 5. Type-Safe JSON Operations
// ============================================================================

/**
 * Deep clone with type safety
 * ✅ Best Practice: Type-safe cloning
 */
function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Type-safe JSON stringify
 */
function stringifyJSON<T>(obj: T, replacer?: (key: string, value: unknown) => unknown, space?: number): string {
    return JSON.stringify(obj, replacer, space);
}

/**
 * Filter with type safety
 * @template T - Item type
 */
function filterData<T extends Record<string, unknown>>(
    items: T[],
    criteria: Partial<T>
): T[] {
    return items.filter(item => {
        return Object.keys(criteria).every(key => {
            return item[key] === criteria[key as keyof T];
        });
    });
}

/**
 * Transform with type safety
 * @template T - Input type
 * @template U - Output type
 */
function transformData<T, U>(items: T[], transformFn: (item: T) => U): U[] {
    return items.map(transformFn);
}

// ============================================================================
// 6. Type-Safe API Functions
// ============================================================================

/**
 * Fetch JSON with type safety
 * ✅ Best Practice: Generic function for type-safe API calls
 * @template T - Response type
 */
async function fetchJSON<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
        throw new Error('Response is not JSON');
    }
    
    const text = await response.text();
    const result = parseJSONSafe<T>(text);
    
    if (!result.success) {
        throw new Error(`JSON parse error: ${result.error}`);
    }
    
    return result.data;
}

/**
 * POST JSON with type safety
 * @template TRequest - Request type
 * @template TResponse - Response type
 */
async function postJSON<TRequest, TResponse>(
    url: string,
    data: TRequest
): Promise<TResponse> {
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
        throw new Error((errorData as { message?: string }).message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json() as TResponse;
}

// ============================================================================
// 7. XML Type Definitions
// ============================================================================

/**
 * XML Node interface
 */
interface XMLNode {
    name: string;
    attributes?: Record<string, string>;
    children?: XMLNode[];
    text?: string;
}

/**
 * XML Document interface
 */
interface XMLDocument {
    root: XMLNode;
}

/**
 * Parse XML to typed structure
 */
function parseXMLToObject(xmlString: string): XMLDocument | null {
    // Simplified XML parsing
    // In practice, use a library like 'xml2js' with proper types
    try {
        // Implementation would parse XML string
        return null; // Placeholder
    } catch (error) {
        console.error('XML parse error:', error);
        return null;
    }
}

// ============================================================================
// 8. Type-Safe JSON Schema Validation
// ============================================================================

/**
 * Validation result type
 */
interface ValidationResult {
    valid: boolean;
    errors: string[];
}

/**
 * Validate data against schema
 * ✅ Best Practice: Type-safe validation
 */
function validateJSON<T extends Record<string, unknown>>(
    data: unknown,
    schema: JsonSchema
): ValidationResult {
    const errors: string[] = [];
    
    if (schema.type === 'object' && (typeof data !== 'object' || data === null || Array.isArray(data))) {
        errors.push('Data must be an object');
        return { valid: false, errors };
    }
    
    if (schema.type === 'array' && !Array.isArray(data)) {
        errors.push('Data must be an array');
        return { valid: false, errors };
    }
    
    if (schema.required && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        for (const field of schema.required) {
            if (!(field in data) || (data as Record<string, unknown>)[field] === undefined) {
                errors.push(`Missing required field: ${field}`);
            }
        }
    }
    
    if (schema.properties && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        const obj = data as Record<string, unknown>;
        for (const [field, fieldSchema] of Object.entries(schema.properties)) {
            const value = obj[field];
            if (value === undefined) continue;
            
            if (fieldSchema.type && typeof value !== fieldSchema.type) {
                errors.push(`${field} must be of type ${fieldSchema.type}`);
            }
            
            if (fieldSchema.type === 'string' && typeof value === 'string') {
                if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
                    errors.push(`${field} must be at least ${fieldSchema.minLength} characters`);
                }
                if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
                    errors.push(`${field} must be at most ${fieldSchema.maxLength} characters`);
                }
            }
            
            if (fieldSchema.type === 'number' && typeof value === 'number') {
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
// 9. Utility Types for JSON
// ============================================================================

/**
 * Make all properties optional recursively
 */
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties required recursively
 */
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Flatten nested object type
 */
type FlattenObject<T> = {
    [K in keyof T]: T[K] extends object ? FlattenObject<T[K]> & T : T[K];
};

// ============================================================================
// 10. Type-Safe JSON Transformation
// ============================================================================

/**
 * Transform user data with type safety
 */
function transformUserData(users: User[]): Array<{
    id: number;
    fullName: string;
    contact: { email: string; phone?: string | null };
}> {
    return users.map(user => ({
        id: user.id,
        fullName: user.name,
        contact: {
            email: user.email,
            phone: null
        }
    }));
}

/**
 * Flatten JSON with type safety
 */
function flattenJSON<T extends Record<string, unknown>>(
    obj: T,
    prefix = ''
): Record<string, unknown> {
    const flattened: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(flattened, flattenJSON(value as Record<string, unknown>, newKey));
        } else {
            flattened[newKey] = value;
        }
    }
    
    return flattened;
}

// ============================================================================
// 11. Best Practices Summary
// ============================================================================

/**
 * TypeScript JSON/XML Best Practices:
 * 
 * 1. Type Safety:
 *    - Always define interfaces for JSON structures
 *    - Use type guards for runtime validation
 *    - Use generic functions for reusability
 * 
 * 2. Parsing:
 *    - Use Result types for error handling
 *    - Validate before using parsed data
 *    - Handle parsing errors gracefully
 * 
 * 3. Validation:
 *    - Implement schema validation
 *    - Use type guards for type narrowing
 *    - Provide detailed error messages
 * 
 * 4. Transformation:
 *    - Use generic functions for type safety
 *    - Define output types explicitly
 *    - Use utility types when needed
 * 
 * 5. API Calls:
 *    - Use generic functions for type-safe API calls
 *    - Define request/response types
 *    - Handle errors properly
 */

// Example usage
const userSchema: JsonSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        email: { type: 'string', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' },
        age: { type: 'number', minimum: 0, maximum: 150 }
    },
    required: ['name', 'email']
};

const userData: unknown = {
    name: 'John',
    email: 'john@example.com',
    age: 30
};

const validation = validateJSON(userData, userSchema);
if (validation.valid && isUser(userData)) {
    console.log('Valid user:', userData);
}

export {
    parseJSON,
    parseJSONSafe,
    isUser,
    isUserArray,
    parseUserJSON,
    deepClone,
    stringifyJSON,
    filterData,
    transformData,
    transformUserData,
    fetchJSON,
    postJSON,
    validateJSON,
    flattenJSON,
    parseXMLToObject,
    type User,
    type Address,
    type JsonValue,
    type JsonSchema,
    type PropertySchema,
    type ParseResult,
    type ValidationResult,
    type XMLNode,
    type XMLDocument,
    type DeepPartial,
    type DeepRequired
};

