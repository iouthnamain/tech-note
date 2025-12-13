/**
 * OOP Examples - TypeScript
 * Lập trình hướng đối tượng với type safety và best practices
 * 
 * TypeScript Best Practices:
 * - Use access modifiers (public, private, protected, readonly)
 * - Use abstract classes for base implementations
 * - Use interfaces for contracts
 * - Use readonly for immutability
 * - Use getters/setters with proper types
 */

// ============================================================================
// 1. Encapsulation with Access Modifiers
// ============================================================================

/**
 * BankAccount class with TypeScript access modifiers
 * ✅ Best Practice: Use private for true encapsulation
 */
class BankAccount {
    private balance: number = 0;
    private readonly accountNumber: string;
    private transactionHistory: Transaction[] = [];
    
    constructor(accountNumber: string, initialBalance: number = 0) {
        if (!accountNumber) {
            throw new Error('Account number must be a non-empty string');
        }
        if (initialBalance < 0) {
            throw new Error('Initial balance cannot be negative');
        }
        
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactionHistory.push({
            type: 'INITIAL',
            amount: initialBalance,
            timestamp: new Date()
        });
    }
    
    deposit(amount: number): number {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        this.balance += amount;
        this.transactionHistory.push({
            type: 'DEPOSIT',
            amount,
            timestamp: new Date()
        });
        return this.balance;
    }
    
    withdraw(amount: number): number {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        
        this.balance -= amount;
        this.transactionHistory.push({
            type: 'WITHDRAWAL',
            amount,
            timestamp: new Date()
        });
        return this.balance;
    }
    
    getBalance(): number {
        return this.balance;
    }
    
    getAccountNumber(): string {
        return this.accountNumber;
    }
    
    getTransactionHistory(): readonly Transaction[] {
        return [...this.transactionHistory];
    }
}

interface Transaction {
    type: 'INITIAL' | 'DEPOSIT' | 'WITHDRAWAL';
    amount: number;
    timestamp: Date;
}

// ============================================================================
// 2. Inheritance with Type Safety
// ============================================================================

/**
 * Base Animal class
 * ✅ Best Practice: Use protected for subclass access
 */
class Animal {
    protected readonly name: string;
    protected readonly species: string;
    
    constructor(name: string, species: string) {
        if (!name) {
            throw new Error('Name must be a non-empty string');
        }
        this.name = name;
        this.species = species;
    }
    
    makeSound(): string {
        return 'Some generic sound';
    }
    
    getInfo(): string {
        return `${this.name} is a ${this.species}`;
    }
    
    getName(): string {
        return this.name;
    }
    
    getSpecies(): string {
        return this.species;
    }
}

/**
 * Dog class extending Animal
 * ✅ Best Practice: Use super() with proper types
 */
class Dog extends Animal {
    private readonly breed: string;
    
    constructor(name: string, breed: string) {
        super(name, 'Dog');
        if (!breed) {
            throw new Error('Breed must be a non-empty string');
        }
        this.breed = breed;
    }
    
    override makeSound(): string {
        return 'Woof! Woof!';
    }
    
    fetch(): string {
        return `${this.name} is fetching!`;
    }
    
    getBreed(): string {
        return this.breed;
    }
}

class Cat extends Animal {
    private readonly color: string;
    
    constructor(name: string, color: string) {
        super(name, 'Cat');
        if (!color) {
            throw new Error('Color must be a non-empty string');
        }
        this.color = color;
    }
    
    override makeSound(): string {
        return 'Meow!';
    }
    
    getColor(): string {
        return this.color;
    }
}

// ============================================================================
// 3. Polymorphism with Type Safety
// ============================================================================

/**
 * Demonstrate polymorphism
 * ✅ Best Practice: Use base class type for parameters
 */
function animalSounds(animals: Animal[]): void {
    animals.forEach(animal => {
        console.log(`${animal.getName()}: ${animal.makeSound()}`);
    });
}

// ============================================================================
// 4. Abstract Classes (Native TypeScript)
// ============================================================================

/**
 * Abstract Shape class
 * ✅ Best Practice: Use abstract keyword for abstract classes
 */
abstract class Shape {
    protected readonly color: string;
    
    constructor(color: string) {
        if (!color) {
            throw new Error('Color must be a non-empty string');
        }
        this.color = color;
    }
    
    // ✅ Best Practice: Abstract method must be implemented
    abstract calculateArea(): number;
    
    getInfo(): string {
        return `Shape with color ${this.color}`;
    }
    
    getColor(): string {
        return this.color;
    }
}

class Circle extends Shape {
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

class Rectangle extends Shape {
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
// 5. Interfaces for Contracts
// ============================================================================

/**
 * Interface for payment processing
 * ✅ Best Practice: Use interfaces for contracts
 */
interface IPaymentProcessor {
    processPayment(amount: number): string;
    refundPayment(transactionId: string): boolean;
}

/**
 * Interface for notification
 */
interface INotifier {
    send(message: string): string;
}

/**
 * Credit card processor implementing interface
 */
class CreditCardProcessor implements IPaymentProcessor {
    processPayment(amount: number): string {
        return `Processing credit card payment of $${amount}`;
    }
    
    refundPayment(transactionId: string): boolean {
        console.log(`Refunding credit card transaction: ${transactionId}`);
        return true;
    }
}

class PayPalProcessor implements IPaymentProcessor {
    processPayment(amount: number): string {
        return `Processing PayPal payment of $${amount}`;
    }
    
    refundPayment(transactionId: string): boolean {
        console.log(`Refunding PayPal transaction: ${transactionId}`);
        return true;
    }
}

// ============================================================================
// 6. Composition with Type Safety
// ============================================================================

/**
 * Engine class for composition
 */
class Engine {
    private readonly horsepower: number;
    private isRunning: boolean = false;
    
    constructor(horsepower: number) {
        if (horsepower <= 0) {
            throw new Error('Horsepower must be positive');
        }
        this.horsepower = horsepower;
    }
    
    start(): string {
        this.isRunning = true;
        return 'Engine started';
    }
    
    stop(): string {
        this.isRunning = false;
        return 'Engine stopped';
    }
    
    getIsRunning(): boolean {
        return this.isRunning;
    }
    
    getHorsepower(): number {
        return this.horsepower;
    }
}

/**
 * Car class using composition
 * ✅ Best Practice: Compose objects with proper types
 */
class Car {
    private readonly make: string;
    private readonly model: string;
    private readonly engine: Engine;
    
    constructor(make: string, model: string, engine: Engine) {
        if (!make || !model) {
            throw new Error('Make and model must be non-empty strings');
        }
        this.make = make;
        this.model = model;
        this.engine = engine;
    }
    
    start(): string {
        return this.engine.start();
    }
    
    stop(): string {
        return this.engine.stop();
    }
    
    getInfo(): string {
        return `${this.make} ${this.model} with ${this.engine.getHorsepower()}hp engine`;
    }
}

// ============================================================================
// 7. SOLID Principles with TypeScript
// ============================================================================

/**
 * Single Responsibility Principle
 */
class User {
    private readonly name: string;
    private readonly email: string;
    
    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
    
    getName(): string {
        return this.name;
    }
    
    getEmail(): string {
        return this.email;
    }
}

class EmailValidator {
    static validate(email: string): boolean {
        return typeof email === 'string' && email.includes('@');
    }
}

class UserRepository {
    static save(user: User): void {
        console.log(`Saving user: ${user.getName()}`);
    }
}

/**
 * Dependency Inversion Principle
 * ✅ Best Practice: Depend on interfaces, not concrete classes
 */
class NotificationService {
    constructor(private readonly notifier: INotifier) {
        if (!notifier) {
            throw new Error('Notifier is required');
        }
    }
    
    sendNotification(message: string): string {
        return this.notifier.send(message);
    }
}

class EmailNotifier implements INotifier {
    send(message: string): string {
        return `Sending email: ${message}`;
    }
}

class SMSNotifier implements INotifier {
    send(message: string): string {
        return `Sending SMS: ${message}`;
    }
}

// ============================================================================
// 8. Getters and Setters with Types
// ============================================================================

/**
 * Class with typed getters and setters
 */
class Temperature {
    private celsius: number = 0;
    
    get getCelsius(): number {
        return this.celsius;
    }
    
    set setCelsius(value: number) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.celsius = value;
    }
    
    get getFahrenheit(): number {
        return (this.celsius * 9 / 5) + 32;
    }
    
    set setFahrenheit(value: number) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.celsius = (value - 32) * 5 / 9;
    }
}

// ============================================================================
// 9. Static Methods and Properties
// ============================================================================

/**
 * Class with static members
 */
class MathUtils {
    static readonly PI: number = Math.PI;
    
    static add(a: number, b: number): number {
        return a + b;
    }
    
    static multiply(a: number, b: number): number {
        return a * b;
    }
    
    static createCircle(radius: number): Circle {
        return new Circle('default', radius);
    }
}

// ============================================================================
// 10. Generic Classes
// ============================================================================

/**
 * Generic repository class
 * ✅ Best Practice: Use generics for reusable classes
 * @template T - Entity type
 */
class Repository<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
    
    findAll(predicate?: (item: T) => boolean): T[] {
        if (predicate) {
            return this.items.filter(predicate);
        }
        return [...this.items];
    }
    
    remove(predicate: (item: T) => boolean): boolean {
        const index = this.items.findIndex(predicate);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
}

// Usage
const userRepository = new Repository<User>();
userRepository.add(new User('John', 'john@example.com'));

// ============================================================================
// 11. Method Overloading
// ============================================================================

/**
 * Class with method overloading
 * ✅ Best Practice: Use overloads for different signatures
 */
class Calculator {
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        return String(a) + String(b);
    }
}

// ============================================================================
// 12. Readonly Properties
// ============================================================================

/**
 * Class with readonly properties
 * ✅ Best Practice: Use readonly for immutability
 */
class Point {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}
    
    // Cannot modify x or y after construction
}

// ============================================================================
// 13. Protected Members
// ============================================================================

/**
 * Base class with protected members
 */
class BaseLogger {
    protected logLevel: string = 'INFO';
    
    protected log(message: string): void {
        console.log(`[${this.logLevel}] ${message}`);
    }
}

class FileLogger extends BaseLogger {
    constructor() {
        super();
        this.logLevel = 'DEBUG'; // Can access protected member
    }
    
    logToFile(message: string): void {
        this.log(message); // Can call protected method
    }
}

// ============================================================================
// Best Practices Summary
// ============================================================================

/**
 * TypeScript OOP Best Practices:
 * 
 * 1. Access Modifiers:
 *    - private: Only accessible within class
 *    - protected: Accessible in class and subclasses
 *    - public: Accessible everywhere (default)
 *    - readonly: Cannot be reassigned after initialization
 * 
 * 2. Abstract Classes:
 *    - Use abstract keyword
 *    - Cannot be instantiated
 *    - Can have abstract methods
 * 
 * 3. Interfaces:
 *    - Use for contracts
 *    - Multiple interface implementation
 *    - No implementation, only signatures
 * 
 * 4. Inheritance:
 *    - Use extends keyword
 *    - Use super() to call parent constructor
 *    - Use override keyword for method overriding
 * 
 * 5. Composition:
 *    - Prefer composition over inheritance
 *    - Use interfaces for dependencies
 *    - Better flexibility and testability
 * 
 * 6. Generics:
 *    - Use for reusable classes
 *    - Type-safe reusable code
 *    - Use constraints when needed
 */

export {
    BankAccount,
    Animal,
    Dog,
    Cat,
    Shape,
    Circle,
    Rectangle,
    Engine,
    Car,
    User,
    EmailValidator,
    UserRepository,
    IPaymentProcessor,
    CreditCardProcessor,
    PayPalProcessor,
    INotifier,
    NotificationService,
    EmailNotifier,
    SMSNotifier,
    Temperature,
    MathUtils,
    Repository,
    Calculator,
    Point,
    BaseLogger,
    FileLogger,
    type Transaction
};

