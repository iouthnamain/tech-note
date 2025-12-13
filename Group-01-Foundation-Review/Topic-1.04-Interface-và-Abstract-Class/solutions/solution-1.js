// Solution: Interface and Abstract Class System

// Abstract Animal Class
class Animal {
    constructor(name) {
        if (this.constructor === Animal) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.name = name;
    }
    
    makeSound() {
        throw new Error('makeSound must be implemented');
    }
    
    move() {
        throw new Error('move must be implemented');
    }
    
    eat(food) {
        return `${this.name} is eating ${food}`;
    }
}

// Interfaces (simulated with classes)
class IFlyable {
    fly() {
        throw new Error('fly must be implemented');
    }
    
    land() {
        throw new Error('land must be implemented');
    }
}

class ISwimmable {
    swim() {
        throw new Error('swim must be implemented');
    }
    
    dive() {
        throw new Error('dive must be implemented');
    }
}

class IRunnable {
    run() {
        throw new Error('run must be implemented');
    }
    
    stop() {
        throw new Error('stop must be implemented');
    }
}

// Bird Class - extends Animal, implements IFlyable
class Bird extends Animal {
    constructor(name) {
        super(name);
    }
    
    makeSound() {
        return 'Chirp!';
    }
    
    move() {
        return 'Flying';
    }
    
    fly() {
        return `${this.name} is flying`;
    }
    
    land() {
        return `${this.name} has landed`;
    }
}

// Fish Class - extends Animal, implements ISwimmable
class Fish extends Animal {
    constructor(name) {
        super(name);
    }
    
    makeSound() {
        return 'Blub blub';
    }
    
    move() {
        return 'Swimming';
    }
    
    swim() {
        return `${this.name} is swimming`;
    }
    
    dive() {
        return `${this.name} is diving`;
    }
}

// Dog Class - extends Animal, implements IRunnable
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    
    makeSound() {
        return 'Woof!';
    }
    
    move() {
        return 'Running';
    }
    
    run() {
        return `${this.name} is running`;
    }
    
    stop() {
        return `${this.name} has stopped`;
    }
}

// Zoo Class - Dependency Injection
class Zoo {
    constructor(animals = []) {
        this.animals = animals;
    }
    
    addAnimal(animal) {
        if (!(animal instanceof Animal)) {
            throw new Error('Only animals can be added to zoo');
        }
        this.animals.push(animal);
    }
    
    showAnimals() {
        this.animals.forEach(animal => {
            console.log(`${animal.name}: ${animal.makeSound()} - ${animal.move()}`);
        });
    }
    
    getAnimalsByType(type) {
        return this.animals.filter(animal => animal instanceof type);
    }
}

// Test
const bird = new Bird('Tweety');
const fish = new Fish('Nemo');
const dog = new Dog('Buddy');

const zoo = new Zoo([bird, fish, dog]);
zoo.showAnimals();

// Demonstrate polymorphism
console.log('\n=== Polymorphism Demo ===');
const animals = [bird, fish, dog];
animals.forEach(animal => {
    console.log(`${animal.name}: ${animal.makeSound()} - ${animal.move()}`);
});

// Demonstrate interface usage
console.log('\n=== Interface Demo ===');
console.log(bird.fly());
console.log(fish.swim());
console.log(dog.run());

module.exports = {
    Animal,
    IFlyable,
    ISwimmable,
    IRunnable,
    Bird,
    Fish,
    Dog,
    Zoo
};

