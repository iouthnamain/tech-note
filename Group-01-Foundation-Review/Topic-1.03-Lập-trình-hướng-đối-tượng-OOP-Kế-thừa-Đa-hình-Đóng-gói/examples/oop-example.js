/**
 * OOP Examples - JavaScript
 * Lập trình hướng đối tượng: Kế thừa, Đa hình, Đóng gói với best practices
 * 
 * Best Practices:
 * - Use private fields for encapsulation
 * - Prefer composition over inheritance
 * - Follow SOLID principles
 * - Use interfaces/abstract classes appropriately
 * - Implement proper error handling
 * - Use getters/setters for controlled access
 */

'use strict';

// ============================================================================
// 1. Encapsulation (Đóng gói) - Hide internal details
// ============================================================================

/**
 * BankAccount class demonstrating encapsulation
 * ✅ Best Practice: Use private fields (#) for true encapsulation
 * ✅ Best Practice: Validate inputs in constructor and methods
 * ✅ Best Practice: Provide controlled access through methods
 */
class BankAccount {
    // ✅ Best Practice: Private fields (ES2022)
    #balance = 0;
    #accountNumber;
    #transactionHistory = [];
    
    /**
     * Create a new bank account
     * @param {string} accountNumber - Unique account identifier
     * @param {number} initialBalance - Initial account balance (default: 0)
     * @throws {Error} If accountNumber is invalid or initialBalance is negative
     */
    constructor(accountNumber, initialBalance = 0) {
        if (!accountNumber || typeof accountNumber !== 'string') {
            throw new Error('Account number must be a non-empty string');
        }
        if (initialBalance < 0) {
            throw new Error('Initial balance cannot be negative');
        }
        
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.#transactionHistory.push({
            type: 'INITIAL',
            amount: initialBalance,
            timestamp: new Date()
        });
    }
    
    /**
     * Deposit money into account
     * @param {number} amount - Amount to deposit
     * @returns {number} New balance
     * @throws {Error} If amount is invalid
     */
    deposit(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Deposit amount must be a positive number');
        }
        
            this.#balance += amount;
        this.#transactionHistory.push({
            type: 'DEPOSIT',
            amount,
            timestamp: new Date()
        });
        return this.#balance;
        }
    
    /**
     * Withdraw money from account
     * @param {number} amount - Amount to withdraw
     * @returns {number} New balance
     * @throws {Error} If amount is invalid or insufficient funds
     */
    withdraw(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Withdrawal amount must be a positive number');
        }
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
            this.#balance -= amount;
        this.#transactionHistory.push({
            type: 'WITHDRAWAL',
            amount,
            timestamp: new Date()
        });
        return this.#balance;
        }
    
    /**
     * Get current balance
     * ✅ Best Practice: Read-only access through getter
     * @returns {number} Current balance
     */
    getBalance() {
        return this.#balance;
    }
    
    /**
     * Get account number
     * @returns {string} Account number
     */
    getAccountNumber() {
        return this.#accountNumber;
    }
    
    /**
     * Get transaction history (read-only copy)
     * ✅ Best Practice: Return copy to prevent external mutation
     * @returns {Array} Copy of transaction history
     */
    getTransactionHistory() {
        return [...this.#transactionHistory];
    }
}

// ============================================================================
// 2. Inheritance (Kế thừa) - Reuse code
// ============================================================================

/**
 * Base Animal class
 * ✅ Best Practice: Use inheritance for "is-a" relationships
 */
class Animal {
    #name;
    #species;
    
    /**
     * Create a new animal
     * @param {string} name - Animal name
     * @param {string} species - Animal species
     */
    constructor(name, species) {
        if (!name || typeof name !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        this.#name = name;
        this.#species = species;
    }
    
    /**
     * Make a sound (to be overridden by subclasses)
     * ✅ Best Practice: Provide default implementation
     * @returns {string} Sound made by animal
     */
    makeSound() {
        return 'Some generic sound';
    }
    
    /**
     * Get animal information
     * @returns {string} Animal info string
     */
    getInfo() {
        return `${this.#name} is a ${this.#species}`;
    }
    
    getName() {
        return this.#name;
    }
    
    getSpecies() {
        return this.#species;
    }
}

/**
 * Dog class extending Animal
 * ✅ Best Practice: Use super() to call parent constructor
 */
class Dog extends Animal {
    #breed;
    
    constructor(name, breed) {
        super(name, 'Dog');
        if (!breed || typeof breed !== 'string') {
            throw new Error('Breed must be a non-empty string');
        }
        this.#breed = breed;
    }
    
    /**
     * Override parent method (Polymorphism)
     * ✅ Best Practice: Override methods for specific behavior
     * @returns {string} Dog sound
     */
    makeSound() {
        return 'Woof! Woof!';
    }
    
    /**
     * Additional method specific to Dog
     * @returns {string} Fetch message
     */
    fetch() {
        return `${this.getName()} is fetching!`;
    }
    
    getBreed() {
        return this.#breed;
    }
}

class Cat extends Animal {
    #color;
    
    constructor(name, color) {
        super(name, 'Cat');
        if (!color || typeof color !== 'string') {
            throw new Error('Color must be a non-empty string');
        }
        this.#color = color;
    }
    
    makeSound() {
        return 'Meow!';
    }
    
    getColor() {
        return this.#color;
    }
}

// ============================================================================
// 3. Polymorphism (Đa hình) - Same interface, different behavior
// ============================================================================

/**
 * Demonstrate polymorphism
 * ✅ Best Practice: Functions work with base class types
 * @param {Array<Animal>} animals - Array of animals
 */
function animalSounds(animals) {
    if (!Array.isArray(animals)) {
        throw new TypeError('animals must be an array');
    }
    animals.forEach(animal => {
        if (!(animal instanceof Animal)) {
            throw new TypeError('All items must be Animal instances');
        }
        console.log(`${animal.getName()}: ${animal.makeSound()}`);
    });
}

// ============================================================================
// 4. Abstraction (Trừu tượng) - Abstract class concept
// ============================================================================

/**
 * Abstract Shape class
 * ✅ Best Practice: Prevent instantiation of abstract classes
 * ⚠️ JavaScript doesn't have native abstract classes, so we simulate it
 */
class Shape {
    #color;
    
    constructor(color) {
        // ✅ Best Practice: Prevent direct instantiation
        if (this.constructor === Shape) {
            throw new Error('Cannot instantiate abstract class Shape');
        }
        if (!color || typeof color !== 'string') {
            throw new Error('Color must be a non-empty string');
        }
        this.#color = color;
    }
    
    /**
     * Abstract method (must be implemented by subclasses)
     * ✅ Best Practice: Throw error if not implemented
     * @returns {number} Area of the shape
     * @throws {Error} If not implemented by subclass
     */
    calculateArea() {
        throw new Error('Method calculateArea() must be implemented by subclass');
    }
    
    /**
     * Get shape information
     * @returns {string} Shape info
     */
    getInfo() {
        return `Shape with color ${this.#color}`;
    }
    
    getColor() {
        return this.#color;
    }
}

class Circle extends Shape {
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

class Rectangle extends Shape {
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
// 5. Composition over Inheritance
// ============================================================================

/**
 * Engine class (to be composed)
 * ✅ Best Practice: Use composition for "has-a" relationships
 */
class Engine {
    #horsepower;
    #isRunning = false;
    
    constructor(horsepower) {
        if (typeof horsepower !== 'number' || horsepower <= 0) {
            throw new Error('Horsepower must be a positive number');
        }
        this.#horsepower = horsepower;
    }
    
    start() {
        this.#isRunning = true;
        return 'Engine started';
    }
    
    stop() {
        this.#isRunning = false;
        return 'Engine stopped';
    }
    
    isRunning() {
        return this.#isRunning;
    }
    
    getHorsepower() {
        return this.#horsepower;
    }
}

/**
 * Car class using composition
 * ✅ Best Practice: Compose objects instead of inheriting
 */
class Car {
    #make;
    #model;
    #engine;
    
    constructor(make, model, engine) {
        if (!make || typeof make !== 'string') {
            throw new Error('Make must be a non-empty string');
        }
        if (!model || typeof model !== 'string') {
            throw new Error('Model must be a non-empty string');
        }
        if (!(engine instanceof Engine)) {
            throw new Error('Engine must be an Engine instance');
        }
        this.#make = make;
        this.#model = model;
        this.#engine = engine;
    }
    
    start() {
        return this.#engine.start();
    }
    
    stop() {
        return this.#engine.stop();
    }
    
    getInfo() {
        return `${this.#make} ${this.#model} with ${this.#engine.getHorsepower()}hp engine`;
    }
}

// ============================================================================
// 6. SOLID Principles Examples
// ============================================================================

/**
 * Single Responsibility Principle (SRP)
 * ✅ Each class should have one reason to change
 */

// ❌ BAD: Class with multiple responsibilities
class BadUser {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    // ❌ User class shouldn't handle email validation
    validateEmail() {
        return this.email.includes('@');
    }
    
    // ❌ User class shouldn't handle database operations
    saveToDatabase() {
        // Database logic here
    }
}

// ✅ GOOD: Separate concerns
class User {
    #name;
    #email;
    
    constructor(name, email) {
        this.#name = name;
        this.#email = email;
    }
    
    getName() {
        return this.#name;
    }
    
    getEmail() {
        return this.#email;
    }
}

class EmailValidator {
    static validate(email) {
        return typeof email === 'string' && email.includes('@');
    }
}

class UserRepository {
    static save(user) {
        // Database logic here
        console.log(`Saving user: ${user.getName()}`);
    }
}

/**
 * Open/Closed Principle (OCP)
 * ✅ Open for extension, closed for modification
 */

// ✅ GOOD: Extend functionality without modifying base class
class PaymentProcessor {
    processPayment(amount) {
        throw new Error('Must be implemented by subclass');
    }
}

class CreditCardProcessor extends PaymentProcessor {
    processPayment(amount) {
        return `Processing credit card payment of $${amount}`;
    }
}

class PayPalProcessor extends PaymentProcessor {
    processPayment(amount) {
        return `Processing PayPal payment of $${amount}`;
    }
}

/**
 * Liskov Substitution Principle (LSP)
 * ✅ Subtypes must be substitutable for their base types
 */

// ✅ GOOD: Subclasses can be used anywhere base class is expected
class Bird {
    fly() {
        return 'Flying';
    }
}

class Sparrow extends Bird {
    fly() {
        return 'Sparrow flying';
    }
}

class Penguin extends Bird {
    // ❌ BAD: Penguin can't fly, violates LSP
    // ✅ GOOD: Don't inherit if behavior doesn't match
}

// ✅ BETTER: Use composition or separate hierarchy
class FlightlessBird {
    walk() {
        return 'Walking';
    }
}

/**
 * Interface Segregation Principle (ISP)
 * ✅ Clients shouldn't depend on interfaces they don't use
 */

// ❌ BAD: Large interface forcing implementation of unused methods
class BadWorker {
    work() {}
    eat() {}
    sleep() {}
}

// ✅ GOOD: Smaller, focused interfaces
class Worker {
    work() {
        throw new Error('Must be implemented');
    }
}

class Eater {
    eat() {
        throw new Error('Must be implemented');
    }
}

class Sleeper {
    sleep() {
        throw new Error('Must be implemented');
    }
}

// Implement only what's needed
class Human extends Worker {
    work() {
        return 'Working';
    }
}

/**
 * Dependency Inversion Principle (DIP)
 * ✅ Depend on abstractions, not concretions
 */

// ✅ GOOD: Depend on abstraction (interface/abstract class)
class NotificationService {
    constructor(notifier) {
        if (!notifier || typeof notifier.send !== 'function') {
            throw new Error('Notifier must have send method');
        }
        this.notifier = notifier;
    }
    
    sendNotification(message) {
        return this.notifier.send(message);
    }
}

class EmailNotifier {
    send(message) {
        return `Sending email: ${message}`;
    }
}

class SMSNotifier {
    send(message) {
        return `Sending SMS: ${message}`;
    }
}

// ============================================================================
// 7. Getters and Setters
// ============================================================================

/**
 * Class with getters and setters
 * ✅ Best Practice: Use getters/setters for controlled access
 */
class Temperature {
    #celsius = 0;
    
    // Getter
    get celsius() {
        return this.#celsius;
    }
    
    // Setter with validation
    set celsius(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.#celsius = value;
    }
    
    // Computed property
    get fahrenheit() {
        return (this.#celsius * 9 / 5) + 32;
    }
    
    set fahrenheit(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.#celsius = (value - 32) * 5 / 9;
    }
}

// ============================================================================
// 8. Static Methods and Properties
// ============================================================================

/**
 * Class with static methods
 * ✅ Best Practice: Use static methods for utility functions
 */
class MathUtils {
    static PI = Math.PI;
    
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static createCircle(radius) {
        return new Circle('default', radius);
    }
}

// ============================================================================
// Example Usage
// ============================================================================

// Encapsulation
const account = new BankAccount('ACC001', 1000);
console.log('Initial balance:', account.getBalance());
account.deposit(500);
console.log('After deposit:', account.getBalance());

// Inheritance and Polymorphism
const dog = new Dog('Buddy', 'Golden Retriever');
const cat = new Cat('Whiskers', 'Orange');
console.log(dog.getInfo());
console.log(cat.getInfo());

const animals = [dog, cat];
animalSounds(animals);

// Abstraction
const circle = new Circle('red', 5);
const rectangle = new Rectangle('blue', 4, 6);
console.log('Circle area:', circle.calculateArea());
console.log('Rectangle area:', rectangle.calculateArea());

// Composition
const engine = new Engine(200);
const car = new Car('Toyota', 'Camry', engine);
console.log(car.getInfo());
console.log(car.start());

// SOLID Principles
const emailNotifier = new EmailNotifier();
const notificationService = new NotificationService(emailNotifier);
console.log(notificationService.sendNotification('Hello!'));

// Getters/Setters
const temp = new Temperature();
temp.celsius = 25;
console.log(`Celsius: ${temp.celsius}, Fahrenheit: ${temp.fahrenheit}`);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
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
        PaymentProcessor,
        CreditCardProcessor,
        PayPalProcessor,
        NotificationService,
        EmailNotifier,
        SMSNotifier,
        Temperature,
        MathUtils
};
}
