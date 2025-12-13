# Exercise 1: Build an OOP System

## Objective
Design and implement an object-oriented system demonstrating encapsulation, inheritance, and polymorphism.

## Requirements

### Part 1: Create Base Class

Create a `Vehicle` class with:
- Properties: `brand`, `model`, `year` (private)
- Methods: `getInfo()`, `start()`, `stop()`
- Constructor to initialize properties

### Part 2: Create Derived Classes

1. **Car Class** (extends Vehicle)
   - Additional property: `doors` (number)
   - Override `start()` to return "Car engine started"
   - Add method: `openTrunk()`

2. **Motorcycle Class** (extends Vehicle)
   - Additional property: `hasSidecar` (boolean)
   - Override `start()` to return "Motorcycle engine started"
   - Add method: `wheelie()`

3. **Truck Class** (extends Vehicle)
   - Additional property: `cargoCapacity` (number)
   - Override `start()` to return "Truck engine started"
   - Add method: `loadCargo(weight)`

### Part 3: Demonstrate Polymorphism

Create a function that:
- Takes an array of vehicles
- Calls `start()` on each vehicle
- Demonstrates that each vehicle type behaves differently

### Part 4: Encapsulation

Ensure all properties are properly encapsulated:
- Use private fields or getters/setters
- Prevent direct access to internal state
- Provide controlled access through methods

## Starter Code

```javascript
// Your implementations here

// Test cases
const vehicles = [
    new Car('Toyota', 'Camry', 2023, 4),
    new Motorcycle('Honda', 'CBR', 2023, false),
    new Truck('Ford', 'F-150', 2023, 5000)
];

// Demonstrate polymorphism
vehicles.forEach(vehicle => {
    console.log(vehicle.start());
});
```

## Expected Output

```
Car engine started
Motorcycle engine started
Truck engine started
```

## Bonus Challenges

1. Add an abstract `Vehicle` class that cannot be instantiated
2. Implement an interface pattern for vehicles
3. Add a `Service` class that can service any vehicle type
4. Create a `Fleet` class to manage multiple vehicles

## Solution

Check `solutions/solution-1.js` after attempting the exercise.
