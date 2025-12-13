// Solution: OOP System - Vehicle Classes

// Base Vehicle Class with Encapsulation
class Vehicle {
    #brand;
    #model;
    #year;
    
    constructor(brand, model, year) {
        this.#brand = brand;
        this.#model = model;
        this.#year = year;
    }
    
    // Getters for private properties
    getBrand() {
        return this.#brand;
    }
    
    getModel() {
        return this.#model;
    }
    
    getYear() {
        return this.#year;
    }
    
    getInfo() {
        return `${this.#year} ${this.#brand} ${this.#model}`;
    }
    
    start() {
        return 'Vehicle started';
    }
    
    stop() {
        return 'Vehicle stopped';
    }
}

// Car Class - Inheritance and Polymorphism
class Car extends Vehicle {
    #doors;
    
    constructor(brand, model, year, doors) {
        super(brand, model, year);
        this.#doors = doors;
    }
    
    getDoors() {
        return this.#doors;
    }
    
    // Override start method (Polymorphism)
    start() {
        return 'Car engine started';
    }
    
    openTrunk() {
        return 'Trunk opened';
    }
}

// Motorcycle Class
class Motorcycle extends Vehicle {
    #hasSidecar;
    
    constructor(brand, model, year, hasSidecar = false) {
        super(brand, model, year);
        this.#hasSidecar = hasSidecar;
    }
    
    getHasSidecar() {
        return this.#hasSidecar;
    }
    
    // Override start method (Polymorphism)
    start() {
        return 'Motorcycle engine started';
    }
    
    wheelie() {
        return 'Doing a wheelie!';
    }
}

// Truck Class
class Truck extends Vehicle {
    #cargoCapacity;
    
    constructor(brand, model, year, cargoCapacity) {
        super(brand, model, year);
        this.#cargoCapacity = cargoCapacity;
    }
    
    getCargoCapacity() {
        return this.#cargoCapacity;
    }
    
    // Override start method (Polymorphism)
    start() {
        return 'Truck engine started';
    }
    
    loadCargo(weight) {
        if (weight > this.#cargoCapacity) {
            throw new Error('Cargo weight exceeds capacity');
        }
        return `Loaded ${weight} kg of cargo`;
    }
}

// Polymorphism demonstration
function demonstratePolymorphism(vehicles) {
    vehicles.forEach(vehicle => {
        console.log(`${vehicle.getInfo()}: ${vehicle.start()}`);
    });
}

// Test
const vehicles = [
    new Car('Toyota', 'Camry', 2023, 4),
    new Motorcycle('Honda', 'CBR', 2023, false),
    new Truck('Ford', 'F-150', 2023, 5000)
];

console.log('=== Polymorphism Demo ===');
demonstratePolymorphism(vehicles);

console.log('\n=== Individual Vehicle Info ===');
vehicles.forEach(vehicle => {
    console.log(vehicle.getInfo());
    if (vehicle instanceof Car) {
        console.log(`  Doors: ${vehicle.getDoors()}`);
        console.log(`  ${vehicle.openTrunk()}`);
    } else if (vehicle instanceof Motorcycle) {
        console.log(`  Has sidecar: ${vehicle.getHasSidecar()}`);
        console.log(`  ${vehicle.wheelie()}`);
    } else if (vehicle instanceof Truck) {
        console.log(`  Cargo capacity: ${vehicle.getCargoCapacity()} kg`);
        console.log(`  ${vehicle.loadCargo(2000)}`);
    }
});

module.exports = {
    Vehicle,
    Car,
    Motorcycle,
    Truck,
    demonstratePolymorphism
};

