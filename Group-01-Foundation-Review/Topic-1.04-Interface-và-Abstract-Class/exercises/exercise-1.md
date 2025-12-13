# Exercise 1: Design Interfaces and Abstract Classes

## Objective
Design and implement a system using interfaces and abstract classes to demonstrate dependency inversion and interface segregation.

## Requirements

### Part 1: Create Abstract Class

Create an abstract `Animal` class with:
- Abstract method: `makeSound()` - must be implemented by subclasses
- Abstract method: `move()` - must be implemented by subclasses
- Concrete method: `eat(food)` - shared implementation
- Property: `name` (protected)

### Part 2: Create Interfaces

1. **IFlyable Interface**
   - Method: `fly()`
   - Method: `land()`

2. **ISwimmable Interface**
   - Method: `swim()`
   - Method: `dive()`

3. **IRunnable Interface**
   - Method: `run()`
   - Method: `stop()`

### Part 3: Implement Classes

1. **Bird Class** (extends Animal, implements IFlyable)
   - Implement `makeSound()` - return "Chirp!"
   - Implement `move()` - return "Flying"
   - Implement `fly()` and `land()`

2. **Fish Class** (extends Animal, implements ISwimmable)
   - Implement `makeSound()` - return "Blub blub"
   - Implement `move()` - return "Swimming"
   - Implement `swim()` and `dive()`

3. **Dog Class** (extends Animal, implements IRunnable)
   - Implement `makeSound()` - return "Woof!"
   - Implement `move()` - return "Running"
   - Implement `run()` and `stop()`

### Part 4: Dependency Injection

Create a `Zoo` class that:
- Accepts animals through constructor (dependency injection)
- Can work with any Animal type
- Demonstrates polymorphism

## Starter Code

```javascript
// Your implementations here

// Test
const bird = new Bird('Tweety');
const fish = new Fish('Nemo');
const dog = new Dog('Buddy');

const zoo = new Zoo([bird, fish, dog]);
zoo.showAnimals();
```

## Expected Output

```
Tweety: Chirp! - Flying
Nemo: Blub blub - Swimming
Buddy: Woof! - Running
```

## Bonus Challenges

1. Create a `Duck` class that implements both IFlyable and ISwimmable
2. Add a `Pet` interface and implement it in appropriate classes
3. Create a factory pattern using interfaces
4. Implement the Strategy pattern using interfaces

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

