# Architecture Patterns Guide - Comprehensive

## Table of Contents
1. [Introduction](#introduction)
2. [Monolithic Architecture](#monolithic-architecture)
3. [Microservices Architecture](#microservices-architecture)
4. [Serverless Architecture](#serverless-architecture)
5. [Event-Driven Architecture](#event-driven-architecture)
6. [Layered Architecture](#layered-architecture)
7. [Hexagonal Architecture](#hexagonal-architecture)
8. [Clean Architecture](#clean-architecture)
9. [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
10. [CQRS](#cqrs)
11. [Event Sourcing](#event-sourcing)
12. [API Gateway Pattern](#api-gateway-pattern)
13. [Service Mesh](#service-mesh)
14. [When to Use Which Architecture](#when-to-use-which-architecture)
15. [Resources](#resources)
16. [Summary](#summary)

---

## Introduction

This guide covers various software architecture patterns and when to use them. Learn to choose the right architecture for your project.

### Architecture Pattern Comparison

```mermaid
graph TB
    subgraph Patterns[Architecture Patterns]
        Monolithic[Monolithic<br/>Single Unit]
        Microservices[Microservices<br/>Independent Services]
        Serverless[Serverless<br/>Functions]
        EventDriven[Event-Driven<br/>Events & Messages]
    end
    
    subgraph Characteristics[Key Characteristics]
        Simple[Simple Development]
        Scalable[Independent Scaling]
        CostEffective[Pay-per-Use]
        Decoupled[Loose Coupling]
    end
    
    subgraph UseCases[Best Use Cases]
        SmallApps[Small-Medium Apps]
        LargeApps[Large Complex Apps]
        EventWorkloads[Event-Driven Workloads]
        RealTime[Real-Time Systems]
    end
    
    Monolithic --> Simple
    Monolithic --> SmallApps
    
    Microservices --> Scalable
    Microservices --> LargeApps
    
    Serverless --> CostEffective
    Serverless --> EventWorkloads
    
    EventDriven --> Decoupled
    EventDriven --> RealTime
    
    style Monolithic fill:#e1f5ff
    style Microservices fill:#fff4e6
    style Serverless fill:#e1f5ff
    style EventDriven fill:#fff4e6
```

### Who This Guide Is For
- Software architects
- Senior developers
- Technical leads
- Anyone designing systems

---

## Monolithic Architecture

### Characteristics
- Single deployable unit
- Shared codebase
- Shared database
- Simple to develop and deploy

### When to Use
- Small to medium applications
- Team size is small
- Simple requirements
- Fast development needed

### Architecture Diagram

```mermaid
graph TB
    subgraph Client[Client Layer]
        Web[Web Browser]
        Mobile[Mobile App]
    end
    
    subgraph Monolith["Monolithic Application"]
        UI[User Interface Layer]
        Controller[Controller Layer]
        Service[Business Logic Layer]
        DataAccess[Data Access Layer]
    end
    
    subgraph Infrastructure[Infrastructure]
        DB[(Single Database)]
        Cache[Cache]
        Queue[Message Queue]
    end
    
    Web --> Monolith
    Mobile --> Monolith
    
    UI --> Controller
    Controller --> Service
    Service --> DataAccess
    DataAccess --> DB
    Service --> Cache
    Service --> Queue
    
    style Client fill:#e1f5ff
    style Monolith fill:#fff4e6
    style Infrastructure fill:#e1f5ff
```

### Monolithic Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant UI as UI Layer
    participant Controller as Controller Layer
    participant Service as Service Layer
    participant DAO as Data Access Layer
    participant DB as Database
    
    Client->>UI: HTTP Request
    UI->>Controller: Route Request
    Controller->>Service: Business Logic
    Service->>DAO: Data Access
    DAO->>DB: Query Database
    DB-->>DAO: Return Data
    DAO-->>Service: Return Entity
    Service-->>Controller: Return DTO
    Controller-->>UI: Return Response
    UI-->>Client: HTTP Response
```

### Example Structure

```
monolith/
├── controllers/
├── services/
├── models/
├── views/
└── database/
```

---

## Microservices Architecture

### Characteristics
- Multiple independent services
- Each service has its own database
- Services communicate via APIs
- Independent deployment

### Architecture Diagram

```mermaid
graph TB
    subgraph Client[Client Layer]
        Web[Web Client]
        Mobile[Mobile Client]
    end
    
    subgraph Gateway[API Gateway Layer]
        APIGateway[API Gateway<br/>Kong/AWS API Gateway]
    end
    
    subgraph Services[Microservices Layer]
        UserSvc[User Service<br/>Port: 8001]
        OrderSvc[Order Service<br/>Port: 8002]
        ProductSvc[Product Service<br/>Port: 8003]
        PaymentSvc[Payment Service<br/>Port: 8004]
        NotificationSvc[Notification Service<br/>Port: 8005]
    end
    
    subgraph Databases[Database Layer]
        UserDB[(User Database)]
        OrderDB[(Order Database)]
        ProductDB[(Product Database)]
        PaymentDB[(Payment Database)]
    end
    
    subgraph Infrastructure[Infrastructure Layer]
        MessageQueue[Message Queue<br/>Kafka/RabbitMQ]
        ServiceRegistry[Service Registry<br/>Consul/Eureka]
        ConfigServer[Config Server]
    end
    
    Web --> APIGateway
    Mobile --> APIGateway
    
    APIGateway --> UserSvc
    APIGateway --> OrderSvc
    APIGateway --> ProductSvc
    APIGateway --> PaymentSvc
    
    UserSvc --> UserDB
    OrderSvc --> OrderDB
    ProductSvc --> ProductDB
    PaymentSvc --> PaymentDB
    
    UserSvc --> MessageQueue
    OrderSvc --> MessageQueue
    ProductSvc --> MessageQueue
    PaymentSvc --> MessageQueue
    
    MessageQueue --> NotificationSvc
    
    UserSvc --> ServiceRegistry
    OrderSvc --> ServiceRegistry
    ProductSvc --> ServiceRegistry
    
    UserSvc --> ConfigServer
    OrderSvc --> ConfigServer
    
    style Client fill:#e1f5ff
    style Gateway fill:#fff4e6
    style Services fill:#e1f5ff
    style Databases fill:#fff4e6
    style Infrastructure fill:#e1f5ff
```

### Microservices Communication Flow

```mermaid
sequenceDiagram
    participant Client
    participant Gateway as API Gateway
    participant OrderSvc as Order Service
    participant UserSvc as User Service
    participant ProductSvc as Product Service
    participant Queue as Message Queue
    participant NotificationSvc as Notification Service
    
    Client->>Gateway: POST /orders
    Gateway->>OrderSvc: Route Request
    OrderSvc->>UserSvc: GET /users/{id}
    UserSvc-->>OrderSvc: User Data
    OrderSvc->>ProductSvc: GET /products/{id}
    ProductSvc-->>OrderSvc: Product Data
    OrderSvc->>OrderSvc: Create Order
    OrderSvc->>Queue: Publish Order Created Event
    Queue->>NotificationSvc: Deliver Event
    NotificationSvc->>NotificationSvc: Send Notification
    OrderSvc-->>Gateway: Order Created
    Gateway-->>Client: 201 Created
```

### When to Use
- Large, complex applications
- Multiple teams
- Different scaling requirements
- Technology diversity needed

### Example

```typescript
// User Service
class UserService {
    async getUser(id: number) {
        return await this.userRepository.findById(id);
    }
}

// Order Service
class OrderService {
    async createOrder(userId: number, items: Item[]) {
        // Call User Service
        const user = await userService.getUser(userId);
        // Create order
    }
}
```

---

## Serverless Architecture

### Serverless Architecture Diagram

```mermaid
graph TB
    subgraph Client[Client Layer]
        Web[Web Client]
        Mobile[Mobile Client]
    end
    
    subgraph API[API Gateway]
        APIGateway[API Gateway<br/>AWS API Gateway]
    end
    
    subgraph Functions[Function Layer]
        Func1[Lambda Function 1<br/>User Service]
        Func2[Lambda Function 2<br/>Order Service]
        Func3[Lambda Function 3<br/>Product Service]
        Func4[Lambda Function 4<br/>Payment Service]
    end
    
    subgraph Events[Event Sources]
        S3[S3 Bucket]
        DynamoDB[(DynamoDB)]
        SQS[SQS Queue]
        EventBridge[EventBridge]
    end
    
    subgraph Storage[Storage Layer]
        Database[(Database)]
        ObjectStorage[Object Storage]
        Cache[ElastiCache]
    end
    
    Web --> APIGateway
    Mobile --> APIGateway
    
    APIGateway --> Func1
    APIGateway --> Func2
    APIGateway --> Func3
    APIGateway --> Func4
    
    S3 --> Func1
    DynamoDB --> Func2
    SQS --> Func3
    EventBridge --> Func4
    
    Func1 --> Database
    Func2 --> ObjectStorage
    Func3 --> Cache
    Func4 --> Database
    
    style Client fill:#e1f5ff
    style API fill:#fff4e6
    style Functions fill:#e1f5ff
    style Events fill:#fff4e6
    style Storage fill:#e1f5ff
```

### Serverless Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Gateway as API Gateway
    participant Lambda as Lambda Function
    participant DB as Database
    participant S3 as S3 Storage
    
    Client->>Gateway: HTTP Request
    Gateway->>Lambda: Invoke Function
    Note over Lambda: Cold Start<br/>(if needed)
    Lambda->>DB: Query Database
    DB-->>Lambda: Return Data
    Lambda->>S3: Store Result
    Lambda-->>Gateway: Return Response
    Gateway-->>Client: HTTP Response
    Note over Lambda: Function Terminated<br/>(after timeout)
```

### Characteristics
- Functions as a service
- Pay per execution
- Auto-scaling
- No server management

### When to Use
- Event-driven workloads
- Variable traffic
- Cost optimization
- Rapid development

### Example

```typescript
// AWS Lambda
export const handler = async (event: any) => {
    const { userId } = event;
    const user = await getUser(userId);
    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};
```

---

## Event-Driven Architecture

### Event-Driven Architecture Diagram

```mermaid
graph TB
    subgraph Producers[Event Producers]
        Service1[Service 1]
        Service2[Service 2]
        Service3[Service 3]
    end
    
    subgraph EventBus[Event Bus]
        MessageBroker[Message Broker<br/>Kafka/RabbitMQ]
        EventStore[Event Store]
    end
    
    subgraph Consumers[Event Consumers]
        Consumer1[Consumer Service 1]
        Consumer2[Consumer Service 2]
        Consumer3[Consumer Service 3]
        ConsumerN[Consumer Service N]
    end
    
    subgraph Storage[Storage Layer]
        DB1[(Database 1)]
        DB2[(Database 2)]
        Cache[Cache]
    end
    
    Service1 -->|Publish Events| MessageBroker
    Service2 -->|Publish Events| MessageBroker
    Service3 -->|Publish Events| MessageBroker
    
    MessageBroker --> EventStore
    MessageBroker --> Consumer1
    MessageBroker --> Consumer2
    MessageBroker --> Consumer3
    MessageBroker --> ConsumerN
    
    Consumer1 --> DB1
    Consumer2 --> DB2
    Consumer3 --> Cache
    ConsumerN --> DB1
    
    style Producers fill:#e1f5ff
    style EventBus fill:#fff4e6
    style Consumers fill:#e1f5ff
    style Storage fill:#fff4e6
```

### Event-Driven Flow

```mermaid
sequenceDiagram
    participant Producer as Event Producer
    participant Broker as Event Broker
    participant Store as Event Store
    participant Consumer1 as Consumer 1
    participant Consumer2 as Consumer 2
    participant DB as Database
    
    Producer->>Broker: Publish Event
    Broker->>Store: Persist Event
    Broker->>Consumer1: Deliver Event
    Broker->>Consumer2: Deliver Event
    
    Consumer1->>Consumer1: Process Event
    Consumer1->>DB: Update Database
    
    Consumer2->>Consumer2: Process Event
    Consumer2->>DB: Update Database
    
    Consumer1->>Broker: Acknowledge
    Consumer2->>Broker: Acknowledge
```

### Characteristics
- Loose coupling
- Event producers and consumers
- Asynchronous communication
- Scalable

### When to Use
- Real-time processing
- High throughput
- Decoupled systems
- Event streaming

### Example

```typescript
// Event producer
eventBus.publish('user.created', {
    userId: 1,
    email: 'user@example.com'
});

// Event consumer
eventBus.subscribe('user.created', async (event) => {
    await sendWelcomeEmail(event.email);
});
```

---

## Layered Architecture

### Layers
1. **Presentation**: UI, controllers
2. **Business**: Business logic
3. **Data Access**: Database operations

### Example

```typescript
// Presentation Layer
class UserController {
    constructor(private userService: UserService) {}
    
    async createUser(req: Request, res: Response) {
        const user = await this.userService.create(req.body);
        res.json(user);
    }
}

// Business Layer
class UserService {
    constructor(private userRepository: UserRepository) {}
    
    async create(data: CreateUserData) {
        // Business logic
        return await this.userRepository.save(data);
    }
}

// Data Access Layer
class UserRepository {
    async save(data: CreateUserData) {
        return await db.users.create(data);
    }
}
```

---

## Hexagonal Architecture

### Ports and Adapters
- **Ports**: Interfaces
- **Adapters**: Implementations

### Example

```typescript
// Port (interface)
interface UserRepository {
    findById(id: number): Promise<User>;
}

// Adapter (implementation)
class PostgreSQLUserRepository implements UserRepository {
    async findById(id: number) {
        return await db.query('SELECT * FROM users WHERE id = $1', [id]);
    }
}

// Domain
class UserService {
    constructor(private userRepository: UserRepository) {}
    
    async getUser(id: number) {
        return await this.userRepository.findById(id);
    }
}
```

---

## Clean Architecture

### Architecture Diagram

```mermaid
graph TB
    subgraph Frameworks["Frameworks & Drivers Layer"]
        Web[Web Framework<br/>Express/FastAPI]
        DB[(Database<br/>PostgreSQL)]
        UI[UI Framework<br/>React/Vue]
        ExternalAPI[External APIs]
    end
    
    subgraph InterfaceAdapters["Interface Adapters Layer"]
        Controllers[Controllers]
        Presenters[Presenters]
        Gateways[Gateways]
        Mappers[Data Mappers]
    end
    
    subgraph UseCases["Use Cases Layer"]
        CreateUser[Create User Use Case]
        GetUser[Get User Use Case]
        UpdateUser[Update User Use Case]
        DeleteUser[Delete User Use Case]
    end
    
    subgraph Entities["Entities Layer<br/>Domain Models"]
        User[User Entity]
        Order[Order Entity]
        Product[Product Entity]
    end
    
    Web --> Controllers
    UI --> Presenters
    DB --> Gateways
    ExternalAPI --> Gateways
    
    Controllers --> CreateUser
    Controllers --> GetUser
    Controllers --> UpdateUser
    Controllers --> DeleteUser
    
    CreateUser --> User
    GetUser --> User
    UpdateUser --> User
    DeleteUser --> User
    
    Presenters --> UseCases
    Gateways --> UseCases
    Mappers --> UseCases
    
    UseCases --> Entities
    
    style Frameworks fill:#e1f5ff
    style InterfaceAdapters fill:#fff4e6
    style UseCases fill:#e1f5ff
    style Entities fill:#fff4e6
```

### Clean Architecture Dependency Flow

```mermaid
flowchart TD
    Start([Request]) --> Framework[Framework Layer]
    Framework --> Adapter[Interface Adapter Layer]
    Adapter --> UseCase[Use Case Layer]
    UseCase --> Entity[Entity Layer]
    
    Entity --> UseCase
    UseCase --> Adapter
    Adapter --> Framework
    Framework --> End([Response])
    
    Note1[Note: Dependencies point inward<br/>Outer layers depend on inner layers]
    
    style Framework fill:#e1f5ff
    style Adapter fill:#fff4e6
    style UseCase fill:#e1f5ff
    style Entity fill:#fff4e6
```

### Layers
1. **Entities**: Business objects
2. **Use Cases**: Application logic
3. **Interface Adapters**: Controllers, presenters
4. **Frameworks**: Database, web framework

### Example

```typescript
// Entity
class User {
    constructor(
        public id: number,
        public name: string,
        public email: string
    ) {}
}

// Use Case
class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}
    
    async execute(data: CreateUserData): Promise<User> {
        const user = new User(0, data.name, data.email);
        return await this.userRepository.save(user);
    }
}

// Interface Adapter
class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}
    
    async create(req: Request, res: Response) {
        const user = await this.createUserUseCase.execute(req.body);
        res.json(user);
    }
}
```

---

## Domain-Driven Design (DDD)

### DDD Context Map

```mermaid
graph TB
    subgraph BC1[Bounded Context: Order Management]
        OrderAggregate[Order Aggregate]
        OrderEntity[Order Entity]
        OrderVO[Order Value Objects]
        OrderRepo[Order Repository]
    end
    
    subgraph BC2[Bounded Context: Inventory]
        InventoryAggregate[Inventory Aggregate]
        ProductEntity[Product Entity]
        StockVO[Stock Value Objects]
        InventoryRepo[Inventory Repository]
    end
    
    subgraph BC3[Bounded Context: Payment]
        PaymentAggregate[Payment Aggregate]
        PaymentEntity[Payment Entity]
        PaymentVO[Payment Value Objects]
        PaymentRepo[Payment Repository]
    end
    
    subgraph BC4[Bounded Context: Shipping]
        ShippingAggregate[Shipping Aggregate]
        ShipmentEntity[Shipment Entity]
        AddressVO[Address Value Objects]
        ShippingRepo[Shipping Repository]
    end
    
    OrderAggregate -->|Published Events| EventBus[Domain Events]
    InventoryAggregate -->|Published Events| EventBus
    PaymentAggregate -->|Published Events| EventBus
    ShippingAggregate -->|Published Events| EventBus
    
    EventBus -->|Consume Events| OrderAggregate
    EventBus -->|Consume Events| InventoryAggregate
    EventBus -->|Consume Events| PaymentAggregate
    EventBus -->|Consume Events| ShippingAggregate
    
    OrderAggregate -.->|Anti-Corruption Layer| InventoryAggregate
    OrderAggregate -.->|Anti-Corruption Layer| PaymentAggregate
    OrderAggregate -.->|Anti-Corruption Layer| ShippingAggregate
    
    style BC1 fill:#e1f5ff
    style BC2 fill:#fff4e6
    style BC3 fill:#e1f5ff
    style BC4 fill:#fff4e6
    style EventBus fill:#ffcccc
```

### DDD Aggregate Structure

```mermaid
graph TB
    subgraph Aggregate[Order Aggregate Root]
        OrderEntity[Order Entity<br/>Aggregate Root]
        
        subgraph ValueObjects[Value Objects]
            OrderId[Order ID]
            OrderStatus[Order Status]
            TotalAmount[Total Amount]
            CreatedDate[Created Date]
        end
        
        subgraph Entities[Child Entities]
            OrderItem1[Order Item 1]
            OrderItem2[Order Item 2]
            OrderItemN[Order Item N]
        end
        
        subgraph DomainServices[Domain Services]
            PricingService[Pricing Service]
            ValidationService[Validation Service]
        end
    end
    
    OrderEntity --> ValueObjects
    OrderEntity --> Entities
    OrderEntity --> DomainServices
    
    OrderItem1 --> OrderEntity
    OrderItem2 --> OrderEntity
    OrderItemN --> OrderEntity
    
    OrderEntity -->|Invariant| Invariant[Business Rules<br/>Invariants]
    
    style Aggregate fill:#e1f5ff
    style ValueObjects fill:#fff4e6
    style Entities fill:#e1f5ff
    style DomainServices fill:#fff4e6
```

### DDD Layered Architecture

```mermaid
graph TB
    subgraph Presentation[Presentation Layer]
        Controllers[Controllers]
        DTOs[DTOs]
    end
    
    subgraph Application[Application Layer]
        UseCases[Use Cases]
        AppServices[Application Services]
        Commands[Commands]
        Queries[Queries]
    end
    
    subgraph Domain[Domain Layer]
        Entities[Entities]
        ValueObjects[Value Objects]
        Aggregates[Aggregates]
        DomainServices[Domain Services]
        Repositories[Repository Interfaces]
        DomainEvents[Domain Events]
    end
    
    subgraph Infrastructure[Infrastructure Layer]
        RepoImpl[Repository Implementations]
        ExternalServices[External Services]
        Persistence[Persistence]
    end
    
    Controllers --> UseCases
    UseCases --> Entities
    UseCases --> Aggregates
    UseCases --> DomainServices
    UseCases --> Repositories
    
    Repositories -.->|Interface| RepoImpl
    RepoImpl --> Persistence
    
    Aggregates --> DomainEvents
    DomainEvents --> ExternalServices
    
    style Presentation fill:#e1f5ff
    style Application fill:#fff4e6
    style Domain fill:#e1f5ff
    style Infrastructure fill:#fff4e6
```

### Concepts
- **Entities**: Objects with identity
- **Value Objects**: Immutable objects
- **Aggregates**: Cluster of entities
- **Repositories**: Data access
- **Domain Services**: Domain logic

### Example

```typescript
// Entity
class User {
    constructor(
        private id: UserId,
        private name: UserName,
        private email: Email
    ) {}
    
    changeEmail(newEmail: Email) {
        this.email = newEmail;
    }
}

// Value Object
class Email {
    constructor(private value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid email');
        }
    }
    
    private isValid(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
```

---

## CQRS (Command Query Responsibility Segregation)

### CQRS Architecture Diagram

```mermaid
graph TB
    subgraph Client[Client Layer]
        WebApp[Web Application]
        MobileApp[Mobile Application]
    end
    
    subgraph CommandSide[Command Side - Write]
        CommandAPI[Command API]
        CommandHandler[Command Handlers]
        WriteDB[(Write Database<br/>Normalized)]
        EventStore[Event Store]
    end
    
    subgraph EventBus[Event Bus]
        MessageBroker[Message Broker]
    end
    
    subgraph QuerySide[Query Side - Read]
        QueryAPI[Query API]
        QueryHandler[Query Handlers]
        ReadDB[(Read Database<br/>Denormalized)]
        ReadModels[Read Models]
    end
    
    WebApp -->|Commands| CommandAPI
    MobileApp -->|Commands| CommandAPI
    WebApp -->|Queries| QueryAPI
    MobileApp -->|Queries| QueryAPI
    
    CommandAPI --> CommandHandler
    CommandHandler --> WriteDB
    CommandHandler --> EventStore
    
    EventStore --> MessageBroker
    MessageBroker --> ReadModels
    ReadModels --> ReadDB
    
    QueryAPI --> QueryHandler
    QueryHandler --> ReadDB
    
    style Client fill:#e1f5ff
    style CommandSide fill:#fff4e6
    style EventBus fill:#ffcccc
    style QuerySide fill:#e1f5ff
```

### CQRS Flow

```mermaid
sequenceDiagram
    participant Client
    participant CommandAPI as Command API
    participant CommandHandler as Command Handler
    participant WriteDB as Write DB
    participant EventStore as Event Store
    participant EventBus as Event Bus
    participant ReadModel as Read Model
    participant ReadDB as Read DB
    participant QueryAPI as Query API
    
    Note over Client,QueryAPI: Write Operation (Command)
    Client->>CommandAPI: Create User Command
    CommandAPI->>CommandHandler: Execute Command
    CommandHandler->>WriteDB: Save User
    CommandHandler->>EventStore: Store Event
    EventStore->>EventBus: Publish Event
    EventBus->>ReadModel: Update Read Model
    ReadModel->>ReadDB: Update Read DB
    
    Note over Client,QueryAPI: Read Operation (Query)
    Client->>QueryAPI: Get User Query
    QueryAPI->>ReadDB: Query Read Model
    ReadDB-->>QueryAPI: Return User Data
    QueryAPI-->>Client: Return Result
```

### CQRS with Event Sourcing

```mermaid
graph LR
    subgraph Commands[Commands]
        CreateUser[Create User]
        UpdateUser[Update User]
        DeleteUser[Delete User]
    end
    
    subgraph EventStore[Event Store]
        Event1[UserCreated Event]
        Event2[UserUpdated Event]
        Event3[UserDeleted Event]
    end
    
    subgraph ReadModels[Read Models]
        UserList[User List View]
        UserDetail[User Detail View]
        UserStats[User Statistics]
    end
    
    CreateUser --> Event1
    UpdateUser --> Event2
    DeleteUser --> Event3
    
    Event1 --> UserList
    Event1 --> UserDetail
    Event1 --> UserStats
    
    Event2 --> UserList
    Event2 --> UserDetail
    
    Event3 --> UserList
    
    style Commands fill:#e1f5ff
    style EventStore fill:#fff4e6
    style ReadModels fill:#e1f5ff
```

### Separation
- **Commands**: Write operations
- **Queries**: Read operations

### Example

```typescript
// Command
class CreateUserCommand {
    constructor(private userRepository: UserRepository) {}
    
    async execute(data: CreateUserData): Promise<void> {
        await this.userRepository.save(data);
    }
}

// Query
class GetUserQuery {
    constructor(private userRepository: UserRepository) {}
    
    async execute(id: number): Promise<User> {
        return await this.userRepository.findById(id);
    }
}
```

---

## Event Sourcing

### Event Sourcing Architecture

```mermaid
graph TB
    subgraph Commands[Command Layer]
        CreateCommand[Create Command]
        UpdateCommand[Update Command]
        DeleteCommand[Delete Command]
    end
    
    subgraph Aggregate[Aggregate]
        AggregateRoot[Aggregate Root]
        CurrentState[Current State]
    end
    
    subgraph EventStore[Event Store]
        Event1[Event 1: Created]
        Event2[Event 2: Updated]
        Event3[Event 3: Updated]
        Event4[Event 4: Deleted]
    end
    
    subgraph Projections[Projections]
        ReadModel1[Read Model 1]
        ReadModel2[Read Model 2]
        ReadModel3[Read Model 3]
    end
    
    subgraph QueryDB[Query Databases]
        DB1[(Database 1)]
        DB2[(Database 2)]
        Cache[(Cache)]
    end
    
    CreateCommand --> AggregateRoot
    UpdateCommand --> AggregateRoot
    DeleteCommand --> AggregateRoot
    
    AggregateRoot -->|Generate Events| Event1
    AggregateRoot -->|Generate Events| Event2
    AggregateRoot -->|Generate Events| Event3
    AggregateRoot -->|Generate Events| Event4
    
    EventStore -->|Replay Events| CurrentState
    
    Event1 --> Projections
    Event2 --> Projections
    Event3 --> Projections
    Event4 --> Projections
    
    Projections --> ReadModel1
    Projections --> ReadModel2
    Projections --> ReadModel3
    
    ReadModel1 --> DB1
    ReadModel2 --> DB2
    ReadModel3 --> Cache
    
    style Commands fill:#e1f5ff
    style Aggregate fill:#fff4e6
    style EventStore fill:#ffcccc
    style Projections fill:#e1f5ff
    style QueryDB fill:#fff4e6
```

### Event Sourcing Flow

```mermaid
sequenceDiagram
    participant Client
    participant Command as Command Handler
    participant Aggregate as Aggregate Root
    participant EventStore as Event Store
    participant Projection as Projection Handler
    participant ReadDB as Read Database
    
    Note over Client,ReadDB: Write Operation
    Client->>Command: Create User Command
    Command->>Aggregate: Load from Events
    Aggregate->>EventStore: Load Events
    EventStore-->>Aggregate: Return Events
    Aggregate->>Aggregate: Replay Events<br/>(Rebuild State)
    Aggregate->>Aggregate: Apply Command<br/>(Generate New Event)
    Aggregate->>EventStore: Save Event
    EventStore->>Projection: Publish Event
    Projection->>ReadDB: Update Read Model
    Aggregate-->>Command: Return Result
    Command-->>Client: Success
    
    Note over Client,ReadDB: Read Operation
    Client->>ReadDB: Query Read Model
    ReadDB-->>Client: Return Data
```

### Event Store Structure

```mermaid
graph LR
    subgraph EventStore[Event Store]
        Stream1[Stream: User-123]
        Stream2[Stream: Order-456]
        Stream3[Stream: Product-789]
    end
    
    subgraph Stream1Events[User-123 Events]
        E1[Event 1: UserCreated<br/>v1]
        E2[Event 2: EmailChanged<br/>v2]
        E3[Event 3: NameChanged<br/>v3]
        E4[Event 4: UserDeleted<br/>v4]
    end
    
    subgraph Stream2Events[Order-456 Events]
        E5[Event 1: OrderCreated<br/>v1]
        E6[Event 2: ItemAdded<br/>v2]
        E7[Event 3: OrderShipped<br/>v3]
    end
    
    Stream1 --> Stream1Events
    Stream2 --> Stream2Events
    Stream3 --> Stream3Events
    
    Stream1Events -->|Replay| Aggregate1[User Aggregate]
    Stream2Events -->|Replay| Aggregate2[Order Aggregate]
    
    style EventStore fill:#e1f5ff
    style Stream1Events fill:#fff4e6
    style Stream2Events fill:#e1f5ff
    style Stream3Events fill:#fff4e6
```

### Event Sourcing with Snapshots

```mermaid
graph TB
    subgraph EventStore[Event Store]
        Events[Events 1-1000]
        Snapshot[Snapshot at Event 1000]
        NewEvents[Events 1001-1500]
    end
    
    subgraph Aggregate[Aggregate]
        LoadSnapshot[Load Snapshot]
        ReplayEvents[Replay Events 1001-1500]
        CurrentState[Current State]
    end
    
    Events --> Snapshot
    Snapshot --> LoadSnapshot
    LoadSnapshot --> ReplayEvents
    NewEvents --> ReplayEvents
    ReplayEvents --> CurrentState
    
    CurrentState -->|Generate New Event| NewEvent[Event 1501]
    NewEvent --> EventStore
    
    style EventStore fill:#e1f5ff
    style Aggregate fill:#fff4e6
```

### Characteristics
- **Events as Source of Truth**: Store events instead of current state
- **Event Replay**: Rebuild state by replaying events
- **Audit Trail**: Complete history of all changes
- **Time Travel**: Query state at any point in time

### When to Use
- Audit requirements
- Complex business logic
- Event replay needs
- Temporal queries
- CQRS implementations

### Example

```typescript
// Event
interface UserCreatedEvent {
    type: 'UserCreated';
    userId: string;
    email: string;
    timestamp: Date;
}

// Aggregate
class User {
    private events: Event[] = [];
    
    static fromEvents(events: Event[]): User {
        const user = new User();
        events.forEach(event => user.apply(event));
        return user;
    }
    
    create(email: string) {
        const event = new UserCreatedEvent(email);
        this.apply(event);
        this.events.push(event);
    }
    
    private apply(event: Event) {
        // Apply event to rebuild state
        if (event.type === 'UserCreated') {
            this.email = event.email;
        }
    }
    
    getUncommittedEvents(): Event[] {
        return this.events;
    }
}
```

---

## API Gateway Pattern

### API Gateway Architecture

```mermaid
graph TB
    subgraph Clients[Client Layer]
        Web[Web Client]
        Mobile[Mobile Client]
        Desktop[Desktop Client]
    end
    
    subgraph Gateway[API Gateway]
        Auth[Authentication]
        RateLimit[Rate Limiting]
        Routing[Request Routing]
        LoadBalancer[Load Balancing]
        Transform[Request/Response<br/>Transformation]
        Caching[Response Caching]
        Monitoring[Monitoring & Logging]
    end
    
    subgraph Services[Microservices]
        UserService[User Service]
        OrderService[Order Service]
        ProductService[Product Service]
        PaymentService[Payment Service]
        InventoryService[Inventory Service]
    end
    
    subgraph Backend[Backend Services]
        UserDB[(User DB)]
        OrderDB[(Order DB)]
        ProductDB[(Product DB)]
        PaymentDB[(Payment DB)]
    end
    
    Web --> Gateway
    Mobile --> Gateway
    Desktop --> Gateway
    
    Gateway --> Auth
    Auth --> RateLimit
    RateLimit --> Routing
    Routing --> LoadBalancer
    LoadBalancer --> Transform
    Transform --> Caching
    
    Caching --> UserService
    Caching --> OrderService
    Caching --> ProductService
    Caching --> PaymentService
    Caching --> InventoryService
    
    UserService --> UserDB
    OrderService --> OrderDB
    ProductService --> ProductDB
    PaymentService --> PaymentDB
    InventoryService --> ProductDB
    
    Gateway --> Monitoring
    
    style Clients fill:#e1f5ff
    style Gateway fill:#fff4e6
    style Services fill:#e1f5ff
    style Backend fill:#fff4e6
```

### API Gateway Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Gateway as API Gateway
    participant Auth as Auth Service
    participant RateLimit as Rate Limiter
    participant Service as Microservice
    participant DB as Database
    
    Client->>Gateway: HTTP Request
    Gateway->>Auth: Authenticate Request
    Auth-->>Gateway: Token Valid
    Gateway->>RateLimit: Check Rate Limit
    RateLimit-->>Gateway: Within Limit
    Gateway->>Gateway: Route to Service
    Gateway->>Service: Forward Request
    Service->>DB: Query Database
    DB-->>Service: Return Data
    Service-->>Gateway: Response
    Gateway->>Gateway: Transform Response
    Gateway->>Gateway: Cache Response
    Gateway-->>Client: HTTP Response
```

### API Gateway Features

```mermaid
graph LR
    subgraph Features[API Gateway Features]
        Auth[Authentication<br/>& Authorization]
        RateLimit[Rate Limiting]
        Routing[Request Routing]
        LoadBalance[Load Balancing]
        Transform[Request/Response<br/>Transformation]
        Cache[Response Caching]
        Monitor[Monitoring &<br/>Analytics]
        Version[API Versioning]
        Circuit[Circuit Breaker]
        Retry[Retry Logic]
    end
    
    style Features fill:#e1f5ff
    style Auth fill:#fff4e6
    style RateLimit fill:#e1f5ff
    style Routing fill:#fff4e6
    style LoadBalance fill:#e1f5ff
    style Transform fill:#fff4e6
    style Cache fill:#e1f5ff
    style Monitor fill:#fff4e6
    style Version fill:#e1f5ff
    style Circuit fill:#fff4e6
    style Retry fill:#e1f5ff
```

### Characteristics
- **Single Entry Point**: All client requests go through gateway
- **Cross-Cutting Concerns**: Authentication, rate limiting, logging
- **Service Aggregation**: Combine multiple service responses
- **Protocol Translation**: HTTP to gRPC, WebSocket, etc.

### When to Use
- Microservices architecture
- Multiple client types
- Need for centralized security
- Service aggregation requirements

### Example

```typescript
// API Gateway Configuration
const gateway = new APIGateway({
    routes: [
        {
            path: '/api/users/*',
            service: 'user-service',
            authentication: true,
            rateLimit: { requests: 100, window: '1m' }
        },
        {
            path: '/api/orders/*',
            service: 'order-service',
            authentication: true,
            rateLimit: { requests: 50, window: '1m' }
        }
    ]
});
```

---

## Service Mesh

### Service Mesh Architecture

```mermaid
graph TB
    subgraph Clients[Client Applications]
        Client1[Client 1]
        Client2[Client 2]
    end
    
    subgraph Gateway[Ingress Gateway]
        Ingress[Ingress Controller]
    end
    
    subgraph Services[Microservices]
        Service1[Service 1<br/>+ Sidecar Proxy]
        Service2[Service 2<br/>+ Sidecar Proxy]
        Service3[Service 3<br/>+ Sidecar Proxy]
        Service4[Service 4<br/>+ Sidecar Proxy]
    end
    
    subgraph ControlPlane[Control Plane]
        Config[Configuration]
        Security[Security Policies]
        Traffic[Traffic Management]
        Observability[Observability]
    end
    
    subgraph DataPlane[Data Plane]
        Sidecar1[Sidecar Proxy 1]
        Sidecar2[Sidecar Proxy 2]
        Sidecar3[Sidecar Proxy 3]
        Sidecar4[Sidecar Proxy 4]
    end
    
    Client1 --> Ingress
    Client2 --> Ingress
    
    Ingress --> Service1
    Ingress --> Service2
    
    Service1 --> Service3
    Service2 --> Service4
    Service3 --> Service4
    
    Service1 -.->|Managed by| Sidecar1
    Service2 -.->|Managed by| Sidecar2
    Service3 -.->|Managed by| Sidecar3
    Service4 -.->|Managed by| Sidecar4
    
    ControlPlane --> Sidecar1
    ControlPlane --> Sidecar2
    ControlPlane --> Sidecar3
    ControlPlane --> Sidecar4
    
    style Clients fill:#e1f5ff
    style Gateway fill:#fff4e6
    style Services fill:#e1f5ff
    style ControlPlane fill:#ffcccc
    style DataPlane fill:#fff4e6
```

### Service Mesh Communication Flow

```mermaid
sequenceDiagram
    participant Service1 as Service 1
    participant Sidecar1 as Sidecar Proxy 1
    participant Sidecar2 as Sidecar Proxy 2
    participant Service2 as Service 2
    participant ControlPlane as Control Plane
    
    Note over Service1,ControlPlane: Service-to-Service Communication
    Service1->>Sidecar1: Outbound Request
    Sidecar1->>ControlPlane: Get Service Discovery
    ControlPlane-->>Sidecar1: Service 2 Location
    Sidecar1->>Sidecar1: Apply Policies<br/>(Auth, Rate Limit)
    Sidecar1->>Sidecar2: Forward Request<br/>(mTLS)
    Sidecar2->>Sidecar2: Validate Request<br/>(Auth, Policies)
    Sidecar2->>Service2: Forward to Service
    Service2-->>Sidecar2: Response
    Sidecar2->>Sidecar2: Apply Policies
    Sidecar2->>Sidecar1: Return Response<br/>(mTLS)
    Sidecar1->>Sidecar1: Log Metrics
    Sidecar1-->>Service1: Return Response
    Sidecar1->>ControlPlane: Report Metrics
```

### Service Mesh Components

```mermaid
graph TB
    subgraph ControlPlane[Control Plane]
        ConfigManager[Configuration Manager]
        ServiceDiscovery[Service Discovery]
        SecurityManager[Security Manager]
        TrafficManager[Traffic Manager]
        PolicyManager[Policy Manager]
    end
    
    subgraph DataPlane[Data Plane - Sidecar Proxies]
        Proxy1[Envoy/Istio Proxy]
        Proxy2[Envoy/Istio Proxy]
        Proxy3[Envoy/Istio Proxy]
    end
    
    subgraph Features[Service Mesh Features]
        mTLS[mTLS Encryption]
        LoadBalance[Load Balancing]
        CircuitBreaker[Circuit Breaker]
        Retry[Retry Logic]
        Timeout[Timeout Management]
        Tracing[Distributed Tracing]
        Metrics[Metrics Collection]
        Logging[Logging]
    end
    
    ControlPlane --> Proxy1
    ControlPlane --> Proxy2
    ControlPlane --> Proxy3
    
    Proxy1 --> Features
    Proxy2 --> Features
    Proxy3 --> Features
    
    style ControlPlane fill:#e1f5ff
    style DataPlane fill:#fff4e6
    style Features fill:#ffcccc
```

### Service Mesh Benefits

```mermaid
mindmap
    root((Service Mesh))
        Security
            mTLS Encryption
            Authentication
            Authorization
            Policy Enforcement
        Observability
            Distributed Tracing
            Metrics Collection
            Logging
            Health Monitoring
        Traffic Management
            Load Balancing
            Circuit Breaking
            Retry Logic
            Timeout Management
            A/B Testing
        Resilience
            Fault Injection
            Chaos Engineering
            Health Checks
            Auto Recovery
```

### Characteristics
- **Sidecar Pattern**: Proxy runs alongside each service
- **Transparent**: Services don't need to know about mesh
- **Control Plane**: Centralized configuration and management
- **Data Plane**: Handles actual service-to-service communication

### When to Use
- Microservices architecture
- Need for service-to-service security
- Complex traffic management
- Observability requirements
- Multi-cloud deployments

### Example

```yaml
# Istio Service Mesh Configuration
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - user-service
  http:
  - match:
    - headers:
        version:
          exact: v2
    route:
    - destination:
        host: user-service
        subset: v2
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10
```

---

## When to Use Which Architecture

### Monolithic
- Small to medium apps
- Simple requirements
- Small team

### Microservices
- Large, complex apps
- Multiple teams
- Different scaling needs

### Serverless
- Event-driven
- Variable traffic
- Cost optimization

### Event-Driven
- Real-time processing
- High throughput
- Decoupled systems

---

## Common Pitfalls

### 1. Over-Engineering

```typescript
// BAD: Microservices for simple app
// 10 services for a blog application

// GOOD: Start simple
// Monolith first, extract services when needed
```

### 2. Wrong Architecture Choice

```typescript
// BAD: Using microservices for small team
// Complex setup, no benefits

// GOOD: Match architecture to needs
// Small team = monolith
// Large team = microservices
```

### 3. Tight Coupling

```typescript
// BAD: Direct dependencies
class OrderService {
    private userService = new UserService(); // Tight coupling
}

// GOOD: Dependency injection
class OrderService {
    constructor(private userService: UserService) {} // Loose coupling
}
```

---

## Best Practices

### Architecture Best Practices

1. **Start Simple**
   - Begin with monolith
   - Extract when needed
   - Don't over-engineer

2. **Choose Based on Context**
   - Team size
   - Project complexity
   - Scaling needs

3. **Design for Change**
   - Loose coupling
   - High cohesion
   - Clear boundaries

4. **Document Decisions**
   - Architecture Decision Records (ADRs)
   - Document trade-offs
   - Keep updated

---

## Real-World Examples

### Example 1: E-Commerce System Architecture

```mermaid
graph TB
    Client[Web/Mobile Client] --> Gateway[API Gateway]
    
    Gateway --> AuthService[Auth Service]
    Gateway --> ProductService[Product Service]
    Gateway --> OrderService[Order Service]
    Gateway --> PaymentService[Payment Service]
    
    ProductService --> ProductDB[(Product DB)]
    OrderService --> OrderDB[(Order DB)]
    PaymentService --> PaymentDB[(Payment DB)]
    
    OrderService --> MessageQueue[Message Queue]
    MessageQueue --> NotificationService[Notification Service]
    MessageQueue --> InventoryService[Inventory Service]
    
    PaymentService --> ExternalPayment[External Payment Gateway]
```

### Example 2: Clean Architecture Implementation

```typescript
// Domain layer (entities)
class User {
    constructor(
        private id: UserId,
        private email: Email,
        private name: UserName
    ) {}
    
    changeEmail(newEmail: Email) {
        this.email = newEmail;
    }
}

// Application layer (use cases)
class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private emailService: EmailService
    ) {}
    
    async execute(data: CreateUserData): Promise<User> {
        const user = new User(
            UserId.generate(),
            new Email(data.email),
            new UserName(data.name)
        );
        
        await this.userRepository.save(user);
        await this.emailService.sendWelcomeEmail(user.email);
        
        return user;
    }
}

// Infrastructure layer (adapters)
class PostgreSQLUserRepository implements UserRepository {
    async save(user: User): Promise<void> {
        await db.users.create({
            id: user.id.value,
            email: user.email.value,
            name: user.name.value
        });
    }
}
```

---

## Resources

- [Martin Fowler's Architecture Patterns](https://martinfowler.com/architecture/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## Summary

Key architecture patterns:

1. **Monolithic**: Simple, single deployable unit
2. **Microservices**: Independent, scalable services
3. **Serverless**: Functions as a service
4. **Event-Driven**: Asynchronous, decoupled
5. **Layered**: Separation of concerns
6. **Hexagonal**: Ports and adapters
7. **Clean**: Dependency inversion
8. **DDD**: Domain-focused design
9. **CQRS**: Separate reads and writes
10. **Event Sourcing**: Events as source of truth
11. **API Gateway**: Single entry point for clients
12. **Service Mesh**: Service-to-service communication layer

### Architecture Pattern Comparison Matrix

```mermaid
graph TB
    subgraph Comparison[Architecture Pattern Comparison]
        Monolithic[Monolithic<br/>✅ Simple<br/>✅ Single Deploy<br/>❌ Limited Scale]
        Microservices[Microservices<br/>✅ Independent Scale<br/>✅ Team Autonomy<br/>❌ Complexity]
        Serverless[Serverless<br/>✅ Auto Scale<br/>✅ Cost Effective<br/>❌ Cold Start]
        EventDriven[Event-Driven<br/>✅ Decoupled<br/>✅ Real-time<br/>❌ Eventual Consistency]
        Clean[Clean Architecture<br/>✅ Testable<br/>✅ Maintainable<br/>❌ Overhead]
        DDD[DDD<br/>✅ Domain Focus<br/>✅ Rich Model<br/>❌ Learning Curve]
        CQRS[CQRS<br/>✅ Scale Reads/Writes<br/>✅ Optimized<br/>❌ Complexity]
        EventSourcing[Event Sourcing<br/>✅ Audit Trail<br/>✅ Time Travel<br/>❌ Storage]
    end
    
    style Monolithic fill:#e1f5ff
    style Microservices fill:#fff4e6
    style Serverless fill:#e1f5ff
    style EventDriven fill:#fff4e6
    style Clean fill:#e1f5ff
    style DDD fill:#fff4e6
    style CQRS fill:#e1f5ff
    style EventSourcing fill:#fff4e6
```

Choose the right architecture based on your requirements.

