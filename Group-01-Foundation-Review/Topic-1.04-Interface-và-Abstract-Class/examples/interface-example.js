/**
 * Interface and Abstract Class Examples - JavaScript
 * Interface và Abstract Class với best practices
 * 
 * Note: JavaScript doesn't have native interfaces or abstract classes,
 * but we can simulate them using patterns
 * 
 * Best Practices:
 * - Use duck typing for interface checking
 * - Implement interface segregation principle
 * - Use abstract classes for shared implementation
 * - Validate interface implementation
 * - Use dependency injection with interfaces
 */

'use strict';

// ============================================================================
// 1. Interface Pattern (Duck Typing)
// ============================================================================

/**
 * Interface validation helper
 * ✅ Best Practice: Check if object implements interface methods
 * @param {Object} obj - Object to check
 * @param {Array<string>} methods - Required method names
 * @returns {boolean} True if object implements all methods
 */
function implementsInterface(obj, methods) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    return methods.every(method => typeof obj[method] === 'function');
}

/**
 * Payment Processor Interface
 * ✅ Best Practice: Document interface contract
 * Required methods: processPayment, refundPayment
 */
class IPaymentProcessor {
    /**
     * Process a payment
     * @param {number} amount - Payment amount
     * @returns {string} Transaction ID
     * @throws {Error} If not implemented
     */
    processPayment(amount) {
        throw new Error('processPayment must be implemented');
    }
    
    /**
     * Refund a payment
     * @param {string} transactionId - Transaction ID to refund
     * @returns {boolean} True if refund successful
     * @throws {Error} If not implemented
     */
    refundPayment(transactionId) {
        throw new Error('refundPayment must be implemented');
    }
}

// ============================================================================
// 2. Abstract Class Pattern
// ============================================================================

/**
 * Abstract Shape class
 * ✅ Best Practice: Prevent instantiation, provide base implementation
 */
class AbstractShape {
    #color;
    
    constructor(color) {
        // ✅ Best Practice: Prevent direct instantiation
        if (this.constructor === AbstractShape) {
            throw new Error('Cannot instantiate abstract class AbstractShape');
        }
        if (!color || typeof color !== 'string') {
            throw new Error('Color must be a non-empty string');
        }
        this.#color = color;
    }
    
    /**
     * Abstract method - must be implemented by subclasses
     * @returns {number} Area of the shape
     * @throws {Error} If not implemented
     */
    calculateArea() {
        throw new Error('calculateArea must be implemented by subclass');
    }
    
    /**
     * Concrete method - shared implementation
     * @returns {string} Color of the shape
     */
    getColor() {
        return this.#color;
    }
    
    /**
     * Get shape information
     * @returns {string} Shape info string
     */
    getInfo() {
        return `Shape with color ${this.#color}`;
    }
}

// ============================================================================
// 3. Implementing Interface
// ============================================================================

/**
 * Credit Card Payment Processor
 * ✅ Best Practice: Implement all interface methods
 */
class CreditCardProcessor extends IPaymentProcessor {
    #apiKey;
    
    constructor(apiKey) {
        super();
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('API key must be a non-empty string');
        }
        this.#apiKey = apiKey;
    }
    
    processPayment(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }
        console.log(`Processing credit card payment of $${amount}`);
        return `CC_${Date.now()}`;
    }
    
    refundPayment(transactionId) {
        if (!transactionId || typeof transactionId !== 'string') {
            throw new Error('Transaction ID must be a non-empty string');
        }
        console.log(`Refunding credit card transaction: ${transactionId}`);
        return true;
    }
}

/**
 * PayPal Payment Processor
 */
class PayPalProcessor extends IPaymentProcessor {
    #clientId;
    #clientSecret;
    
    constructor(clientId, clientSecret) {
        super();
        if (!clientId || !clientSecret) {
            throw new Error('Client ID and secret are required');
        }
        this.#clientId = clientId;
        this.#clientSecret = clientSecret;
    }
    
    processPayment(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }
        console.log(`Processing PayPal payment of $${amount}`);
        return `PP_${Date.now()}`;
    }
    
    refundPayment(transactionId) {
        if (!transactionId || typeof transactionId !== 'string') {
            throw new Error('Transaction ID must be a non-empty string');
        }
        console.log(`Refunding PayPal transaction: ${transactionId}`);
        return true;
    }
}

// ============================================================================
// 4. Implementing Abstract Class
// ============================================================================

/**
 * Circle class extending AbstractShape
 */
class Circle extends AbstractShape {
    #radius;
    
    constructor(color, radius) {
        super(color);
        if (typeof radius !== 'number' || radius <= 0) {
            throw new Error('Radius must be a positive number');
        }
        this.#radius = radius;
    }
    
    calculateArea() {
        return Math.PI * this.#radius * this.#radius;
    }
    
    getRadius() {
        return this.#radius;
    }
}

class Rectangle extends AbstractShape {
    #width;
    #height;
    
    constructor(color, width, height) {
        super(color);
        if (typeof width !== 'number' || width <= 0) {
            throw new Error('Width must be a positive number');
        }
        if (typeof height !== 'number' || height <= 0) {
            throw new Error('Height must be a positive number');
        }
        this.#width = width;
        this.#height = height;
    }
    
    calculateArea() {
        return this.#width * this.#height;
    }
    
    getWidth() {
        return this.#width;
    }
    
    getHeight() {
        return this.#height;
    }
}

// ============================================================================
// 5. Dependency Injection using Interface
// ============================================================================

/**
 * Payment Service using dependency injection
 * ✅ Best Practice: Depend on interface, not concrete implementation
 */
class PaymentService {
    #processor;
    
    constructor(paymentProcessor) {
        // ✅ Best Practice: Validate interface implementation
        const requiredMethods = ['processPayment', 'refundPayment'];
        if (!implementsInterface(paymentProcessor, requiredMethods)) {
            throw new Error('Payment processor must implement IPaymentProcessor interface');
        }
        this.#processor = paymentProcessor;
    }
    
    makePayment(amount) {
        return this.#processor.processPayment(amount);
    }
    
    refund(transactionId) {
        return this.#processor.refundPayment(transactionId);
    }
}

// ============================================================================
// 6. Interface Segregation Principle
// ============================================================================

/**
 * Interface Segregation Principle
 * ✅ Best Practice: Create small, focused interfaces instead of large ones
 */

// ❌ BAD: Large interface forcing implementation of unused methods
class BadFileHandler {
    read() {
        throw new Error('read must be implemented');
    }
    write() {
        throw new Error('write must be implemented');
    }
    delete() {
        throw new Error('delete must be implemented');
    }
    rename() {
        throw new Error('rename must be implemented');
    }
}

// ✅ GOOD: Segregated interfaces
class IReadable {
    read() {
        throw new Error('read must be implemented');
    }
}

class IWritable {
    write(data) {
        throw new Error('write must be implemented');
    }
}

class IDeletable {
    delete() {
        throw new Error('delete must be implemented');
    }
}

class IRenamable {
    rename(newName) {
        throw new Error('rename must be implemented');
    }
}

/**
 * File Reader implementing only IReadable
 */
class FileReader {
    #filePath;
    
    constructor(filePath) {
        if (!filePath || typeof filePath !== 'string') {
            throw new Error('File path must be a non-empty string');
        }
        this.#filePath = filePath;
    }
    
    read() {
        // Simulated file reading
        return `Content from ${this.#filePath}`;
    }
}

/**
 * File Writer implementing only IWritable
 */
class FileWriter {
    #filePath;
    
    constructor(filePath) {
        if (!filePath || typeof filePath !== 'string') {
            throw new Error('File path must be a non-empty string');
        }
        this.#filePath = filePath;
    }
    
    write(data) {
        console.log(`Writing to ${this.#filePath}: ${data}`);
        return true;
    }
}

/**
 * Full File Handler implementing multiple interfaces
 */
class FullFileHandler {
    #filePath;
    
    constructor(filePath) {
        if (!filePath || typeof filePath !== 'string') {
            throw new Error('File path must be a non-empty string');
        }
        this.#filePath = filePath;
    }
    
    read() {
        return `Content from ${this.#filePath}`;
    }
    
    write(data) {
        console.log(`Writing to ${this.#filePath}: ${data}`);
        return true;
    }
    
    delete() {
        console.log(`Deleting ${this.#filePath}`);
        return true;
    }
    
    rename(newName) {
        const oldPath = this.#filePath;
        this.#filePath = newName;
        console.log(`Renamed ${oldPath} to ${newName}`);
        return true;
    }
}

// ============================================================================
// 7. Duck Typing Pattern
// ============================================================================

/**
 * Duck Typing: "If it walks like a duck and quacks like a duck, it's a duck"
 * ✅ Best Practice: Check for required methods/properties, not class type
 */

/**
 * Function that works with any object that has a 'quack' method
 */
function makeSound(duck) {
    if (typeof duck?.quack === 'function') {
        return duck.quack();
    }
    throw new Error('Object must have a quack method');
}

class Duck {
    quack() {
        return 'Quack!';
    }
}

class Person {
    quack() {
        return 'I can quack too!';
    }
}

// Both work because they implement the same interface
makeSound(new Duck()); // Works
makeSound(new Person()); // Also works!

// ============================================================================
// 8. Mixin Pattern for Multiple Interface Implementation
// ============================================================================

/**
 * Mixin pattern for implementing multiple interfaces
 * ✅ Best Practice: Use mixins for code reuse
 */

const ReadableMixin = {
    read() {
        return 'Reading data';
    }
};

const WritableMixin = {
    write(data) {
        console.log(`Writing: ${data}`);
    }
};

class DataStore {
    constructor() {
        Object.assign(this, ReadableMixin, WritableMixin);
    }
}

// ============================================================================
// 9. Interface Documentation Pattern
// ============================================================================

/**
 * Interface documentation using JSDoc
 * ✅ Best Practice: Document interface contracts clearly
 * 
 * @interface ILogger
 * @property {function(string): void} log - Log a message
 * @property {function(string): void} error - Log an error
 * @property {function(string): void} warn - Log a warning
 */

/**
 * Console Logger implementing ILogger
 */
class ConsoleLogger {
    log(message) {
        console.log(`[LOG] ${message}`);
    }
    
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
    
    warn(message) {
        console.warn(`[WARN] ${message}`);
    }
}

// ============================================================================
// 10. Example Usage
// ============================================================================

// Interface implementation
const creditCard = new CreditCardProcessor('api-key-123');
const paypal = new PayPalProcessor('client-id', 'client-secret');

const paymentService1 = new PaymentService(creditCard);
const paymentService2 = new PaymentService(paypal);

paymentService1.makePayment(100);
paymentService2.makePayment(200);

// Abstract class implementation
const circle = new Circle('red', 5);
const rectangle = new Rectangle('blue', 4, 6);

console.log('Circle area:', circle.calculateArea());
console.log('Rectangle area:', rectangle.calculateArea());

// Interface segregation
const reader = new FileReader('/path/to/file.txt');
const writer = new FileWriter('/path/to/file.txt');
const fullHandler = new FullFileHandler('/path/to/file.txt');

console.log(reader.read());
writer.write('Hello World');
fullHandler.delete();
fullHandler.rename('/path/to/newfile.txt');

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IPaymentProcessor,
        AbstractShape,
        CreditCardProcessor,
        PayPalProcessor,
        Circle,
        Rectangle,
        PaymentService,
        IReadable,
        IWritable,
        IDeletable,
        IRenamable,
        FileReader,
        FileWriter,
        FullFileHandler,
        implementsInterface,
        makeSound,
        Duck,
        Person,
        DataStore,
        ConsoleLogger
    };
}
