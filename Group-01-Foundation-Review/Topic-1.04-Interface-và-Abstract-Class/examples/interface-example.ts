/**
 * Interface and Abstract Class Examples - TypeScript
 * Interface và Abstract Class với native TypeScript features
 * 
 * TypeScript Best Practices:
 * - Use interfaces for contracts
 * - Use abstract classes for shared implementation
 * - Implement interface segregation principle
 * - Use interface inheritance and merging
 * - Use generic interfaces for reusability
 */

// ============================================================================
// 1. Basic Interfaces
// ============================================================================

/**
 * Payment Processor Interface
 * ✅ Best Practice: Use interfaces for contracts
 */
interface IPaymentProcessor {
    processPayment(amount: number): string;
    refundPayment(transactionId: string): boolean;
}

/**
 * Credit Card Processor implementing interface
 */
class CreditCardProcessor implements IPaymentProcessor {
    private readonly apiKey: string;
    
    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('API key is required');
        }
        this.apiKey = apiKey;
    }
    
    processPayment(amount: number): string {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        console.log(`Processing credit card payment of $${amount}`);
        return `CC_${Date.now()}`;
    }
    
    refundPayment(transactionId: string): boolean {
        if (!transactionId) {
            throw new Error('Transaction ID is required');
        }
        console.log(`Refunding credit card transaction: ${transactionId}`);
        return true;
    }
}

class PayPalProcessor implements IPaymentProcessor {
    private readonly clientId: string;
    private readonly clientSecret: string;
    
    constructor(clientId: string, clientSecret: string) {
        if (!clientId || !clientSecret) {
            throw new Error('Client ID and secret are required');
        }
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    
    processPayment(amount: number): string {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        console.log(`Processing PayPal payment of $${amount}`);
        return `PP_${Date.now()}`;
    }
    
    refundPayment(transactionId: string): boolean {
        if (!transactionId) {
            throw new Error('Transaction ID is required');
        }
        console.log(`Refunding PayPal transaction: ${transactionId}`);
        return true;
    }
}

// ============================================================================
// 2. Abstract Classes (Native TypeScript)
// ============================================================================

/**
 * Abstract Shape class
 * ✅ Best Practice: Use abstract keyword for abstract classes
 */
abstract class AbstractShape {
    protected readonly color: string;
    
    constructor(color: string) {
        if (!color) {
            throw new Error('Color is required');
        }
        this.color = color;
    }
    
    // ✅ Best Practice: Abstract method must be implemented
    abstract calculateArea(): number;
    
    // ✅ Best Practice: Concrete method with shared implementation
    getColor(): string {
        return this.color;
    }
    
    getInfo(): string {
        return `Shape with color ${this.color}`;
    }
}

class Circle extends AbstractShape {
    private readonly radius: number;
    
    constructor(color: string, radius: number) {
        super(color);
        if (radius <= 0) {
            throw new Error('Radius must be positive');
        }
        this.radius = radius;
    }
    
    override calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    getRadius(): number {
        return this.radius;
    }
}

class Rectangle extends AbstractShape {
    private readonly width: number;
    private readonly height: number;
    
    constructor(color: string, width: number, height: number) {
        super(color);
        if (width <= 0 || height <= 0) {
            throw new Error('Width and height must be positive');
        }
        this.width = width;
        this.height = height;
    }
    
    override calculateArea(): number {
        return this.width * this.height;
    }
    
    getWidth(): number {
        return this.width;
    }
    
    getHeight(): number {
        return this.height;
    }
}

// ============================================================================
// 3. Dependency Injection with Interfaces
// ============================================================================

/**
 * Payment Service using dependency injection
 * ✅ Best Practice: Depend on interface, not concrete class
 */
class PaymentService {
    constructor(private readonly processor: IPaymentProcessor) {
        if (!processor) {
            throw new Error('Payment processor is required');
        }
    }
    
    makePayment(amount: number): string {
        return this.processor.processPayment(amount);
    }
    
    refund(transactionId: string): boolean {
        return this.processor.refundPayment(transactionId);
    }
}

// ============================================================================
// 4. Interface Segregation Principle
// ============================================================================

/**
 * Interface Segregation Principle
 * ✅ Best Practice: Create small, focused interfaces
 */

// ✅ GOOD: Segregated interfaces
interface IReadable {
    read(): string;
}

interface IWritable {
    write(data: string): void;
}

interface IDeletable {
    delete(): boolean;
}

interface IRenamable {
    rename(newName: string): boolean;
}

/**
 * File Reader implementing only IReadable
 */
class FileReader implements IReadable {
    constructor(private readonly filePath: string) {
        if (!filePath) {
            throw new Error('File path is required');
        }
    }
    
    read(): string {
        return `Content from ${this.filePath}`;
    }
}

/**
 * File Writer implementing only IWritable
 */
class FileWriter implements IWritable {
    constructor(private readonly filePath: string) {
        if (!filePath) {
            throw new Error('File path is required');
        }
    }
    
    write(data: string): void {
        console.log(`Writing to ${this.filePath}: ${data}`);
    }
}

/**
 * Full File Handler implementing multiple interfaces
 */
class FullFileHandler implements IReadable, IWritable, IDeletable, IRenamable {
    private filePath: string;
    
    constructor(filePath: string) {
        if (!filePath) {
            throw new Error('File path is required');
        }
        this.filePath = filePath;
    }
    
    read(): string {
        return `Content from ${this.filePath}`;
    }
    
    write(data: string): void {
        console.log(`Writing to ${this.filePath}: ${data}`);
    }
    
    delete(): boolean {
        console.log(`Deleting ${this.filePath}`);
        return true;
    }
    
    rename(newName: string): boolean {
        const oldPath = this.filePath;
        this.filePath = newName;
        console.log(`Renamed ${oldPath} to ${newName}`);
        return true;
    }
}

// ============================================================================
// 5. Interface Inheritance
// ============================================================================

/**
 * Base interface
 */
interface IAnimal {
    name: string;
    makeSound(): string;
}

/**
 * Extended interface
 * ✅ Best Practice: Use interface inheritance for extension
 */
interface IDomesticAnimal extends IAnimal {
    owner: string;
    getOwner(): string;
}

class Dog implements IDomesticAnimal {
    constructor(
        public readonly name: string,
        public readonly owner: string
    ) {}
    
    makeSound(): string {
        return 'Woof!';
    }
    
    getOwner(): string {
        return this.owner;
    }
}

// ============================================================================
// 6. Generic Interfaces
// ============================================================================

/**
 * Generic repository interface
 * ✅ Best Practice: Use generics for reusable interfaces
 * @template T - Entity type
 */
interface IRepository<T> {
    findById(id: string): T | undefined;
    findAll(): T[];
    save(entity: T): void;
    delete(id: string): boolean;
}

/**
 * Generic repository implementation
 */
class Repository<T> implements IRepository<T> {
    private items: Map<string, T> = new Map();
    
    findById(id: string): T | undefined {
        return this.items.get(id);
    }
    
    findAll(): T[] {
        return Array.from(this.items.values());
    }
    
    save(entity: T & { id: string }): void {
        this.items.set(entity.id, entity);
    }
    
    delete(id: string): boolean {
        return this.items.delete(id);
    }
}

// ============================================================================
// 7. Interface Merging (Declaration Merging)
// ============================================================================

/**
 * Interface merging example
 * ✅ Best Practice: Use for extending third-party interfaces
 */
interface Window {
    customProperty: string;
}

// Later in code, can extend again
interface Window {
    anotherProperty: number;
}

// Now Window has both properties

// ============================================================================
// 8. Optional and Readonly Properties
// ============================================================================

/**
 * Interface with optional and readonly properties
 * ✅ Best Practice: Use optional for flexibility, readonly for immutability
 */
interface IUser {
    readonly id: string;
    name: string;
    email: string;
    age?: number; // Optional
    readonly createdAt: Date;
}

class User implements IUser {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public age?: number
    ) {
        // createdAt is set once
    }
    
    readonly createdAt: Date = new Date();
}

// ============================================================================
// 9. Index Signatures
// ============================================================================

/**
 * Interface with index signature
 * ✅ Best Practice: Use for dynamic property access
 */
interface IDictionary<T> {
    [key: string]: T;
}

class Dictionary<T> implements IDictionary<T> {
    private data: { [key: string]: T } = {};
    
    set(key: string, value: T): void {
        this.data[key] = value;
    }
    
    get(key: string): T | undefined {
        return this.data[key];
    }
}

// ============================================================================
// 10. Function Type Interfaces
// ============================================================================

/**
 * Function type interface
 * ✅ Best Practice: Use for callback functions
 */
interface IEventHandler {
    (event: string, data: unknown): void;
}

class EventEmitter {
    private handlers: Map<string, IEventHandler[]> = new Map();
    
    on(event: string, handler: IEventHandler): void {
        const handlers = this.handlers.get(event) ?? [];
        handlers.push(handler);
        this.handlers.set(event, handlers);
    }
    
    emit(event: string, data: unknown): void {
        const handlers = this.handlers.get(event) ?? [];
        handlers.forEach(handler => handler(event, data));
    }
}

// ============================================================================
// 11. Hybrid Types (Interfaces with both callable and properties)
// ============================================================================

/**
 * Hybrid type interface
 * ✅ Best Practice: Use for objects that are both callable and have properties
 */
interface ICounter {
    (): number;
    reset(): void;
    value: number;
}

function createCounter(): ICounter {
    let count = 0;
    
    const counter = (() => count) as ICounter;
    counter.reset = () => { count = 0; };
    counter.value = 0;
    
    Object.defineProperty(counter, 'value', {
        get: () => count,
        set: (val) => { count = val; }
    });
    
    return counter;
}

// ============================================================================
// 12. Mapped Types with Interfaces
// ============================================================================

/**
 * Utility type to make all properties optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Utility type to make all properties readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * Utility type to pick specific properties
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Usage
interface IUserFull {
    id: string;
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<IUserFull>;
type ReadonlyUser = Readonly<IUserFull>;
type UserName = Pick<IUserFull, 'name' | 'email'>;

// ============================================================================
// 13. Best Practices Summary
// ============================================================================

/**
 * TypeScript Interface and Abstract Class Best Practices:
 * 
 * 1. Interfaces:
 *    - Use for contracts and type checking
 *    - No implementation, only signatures
 *    - Can extend other interfaces
 *    - Support optional and readonly properties
 *    - Support index signatures
 * 
 * 2. Abstract Classes:
 *    - Use for shared implementation
 *    - Can have abstract and concrete methods
 *    - Cannot be instantiated directly
 *    - Use abstract keyword
 * 
 * 3. Interface Segregation:
 *    - Create small, focused interfaces
 *    - Don't force implementation of unused methods
 *    - Combine interfaces when needed
 * 
 * 4. Dependency Injection:
 *    - Depend on interfaces, not concrete classes
 *    - Enables testing and flexibility
 *    - Follows dependency inversion principle
 * 
 * 5. Generics:
 *    - Use generic interfaces for reusability
 *    - Type-safe reusable code
 *    - Use constraints when needed
 * 
 * 6. When to Use:
 *    - Interface: Contract definition, no shared code
 *    - Abstract Class: Shared implementation, base class
 */

export {
    IPaymentProcessor,
    CreditCardProcessor,
    PayPalProcessor,
    AbstractShape,
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
    IAnimal,
    IDomesticAnimal,
    Dog,
    IRepository,
    Repository,
    IUser,
    User,
    IDictionary,
    Dictionary,
    IEventHandler,
    EventEmitter,
    ICounter,
    createCounter,
    type PartialUser,
    type ReadonlyUser,
    type UserName
};

