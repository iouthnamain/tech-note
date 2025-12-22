# Senior Java Full Stack Developer Guide - Comprehensive

## Table of Contents
1. [Introduction](#introduction)
2. [Core Java Expertise](#core-java-expertise)
3. [Spring Framework Ecosystem](#spring-framework-ecosystem)
4. [Backend Architecture](#backend-architecture)
5. [Database & Persistence](#database--persistence)
6. [Frontend Technologies](#frontend-technologies)
7. [API Design & Integration](#api-design--integration)
8. [Microservices Architecture](#microservices-architecture)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [DevOps & Infrastructure](#devops--infrastructure)
11. [Security](#security)
12. [Performance Optimization](#performance-optimization)
13. [Code Quality & Best Practices](#code-quality--best-practices)
14. [Team Leadership](#team-leadership)
15. [Real-World Examples](#real-world-examples)
16. [Common Pitfalls](#common-pitfalls)
17. [Resources](#resources)
18. [Summary](#summary)

---

## Introduction

This comprehensive guide covers everything a senior Java full stack developer needs to master. It includes advanced Java concepts, Spring Framework ecosystem, microservices, testing, and production-ready patterns.

### Who This Guide Is For
- Senior Java developers
- Full stack developers working with Java
- Technical leads and architects
- Developers building enterprise applications

### Prerequisites
- Solid understanding of Java fundamentals
- Experience with Spring Framework
- Basic knowledge of web development
- Understanding of database concepts

---

## Core Java Expertise

### JVM Memory Model

```mermaid
graph TB
    subgraph JVM["JVM Memory"]
        Heap[Heap Memory]
        Stack[Stack Memory]
        MethodArea[Method Area]
        PC[Program Counter]
    end
    
    subgraph Heap["Heap"]
        YoungGen[Young Generation<br/>Eden, Survivor]
        OldGen[Old Generation]
    end
    
    Heap --> YoungGen
    Heap --> OldGen
    
    YoungGen --> GC[Garbage Collection]
    OldGen --> GC
```

### Advanced Java Concepts

#### 1. **Java Language Features (Java 8-21)**

```java
// Records (Java 14+)
public record User(String name, String email, int age) {
    public User {
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
    
    public String displayName() {
        return name + " (" + email + ")";
    }
}

// Pattern matching (Java 16+)
public String processObject(Object obj) {
    return switch (obj) {
        case String s when s.length() > 10 -> "Long string: " + s;
        case String s -> "String: " + s;
        case Integer i when i > 100 -> "Large number: " + i;
        case Integer i -> "Number: " + i;
        case null -> "Null object";
        default -> "Unknown: " + obj;
    };
}

// Sealed classes (Java 17+)
public sealed class Shape permits Circle, Rectangle, Triangle {
    public abstract double area();
}

public final class Circle extends Shape {
    private final double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

// Virtual threads (Java 21)
public class VirtualThreadExample {
    public void processRequests(List<Request> requests) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            requests.forEach(request -> 
                executor.submit(() -> processRequest(request))
            );
        }
    }
}
```

#### 2. **Concurrency & Multithreading**

```java
// CompletableFuture patterns
public class AsyncService {
    public CompletableFuture<User> getUserAsync(Long id) {
        return CompletableFuture
            .supplyAsync(() -> userRepository.findById(id))
            .thenApply(user -> {
                if (user == null) {
                    throw new UserNotFoundException(id);
                }
                return user;
            })
            .exceptionally(ex -> {
                log.error("Error fetching user", ex);
                return null;
            });
    }
    
    public CompletableFuture<List<User>> getUsersWithDetails(List<Long> ids) {
        List<CompletableFuture<User>> futures = ids.stream()
            .map(this::getUserAsync)
            .toList();
        
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                .map(CompletableFuture::join)
                .filter(Objects::nonNull)
                .toList());
    }
}

// Thread-safe singleton
public class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {}
    
    public static ThreadSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

#### 3. **Streams API**

```java
// Advanced stream operations
public class StreamExamples {
    // Grouping and partitioning
    public Map<String, List<User>> groupUsersByRole(List<User> users) {
        return users.stream()
            .collect(Collectors.groupingBy(User::getRole));
    }
    
    // Custom collector
    public Map<String, Long> countUsersByRole(List<User> users) {
        return users.stream()
            .collect(Collectors.groupingBy(
                User::getRole,
                Collectors.counting()
            ));
    }
    
    // Parallel processing
    public List<String> processInParallel(List<String> data) {
        return data.parallelStream()
            .map(this::expensiveOperation)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }
    
    // Chaining operations
    public Optional<User> findActiveAdmin(List<User> users) {
        return users.stream()
            .filter(User::isActive)
            .filter(u -> "ADMIN".equals(u.getRole()))
            .findFirst();
    }
}
```

---

## Spring Framework Ecosystem

### Spring Framework Architecture

```mermaid
graph TB
    subgraph Client[Client Layer]
        Browser[Web Browser]
        MobileApp[Mobile App]
        APIClient[API Client]
    end
    
    subgraph Web[Web Layer]
        DispatcherServlet[DispatcherServlet]
        HandlerMapping[Handler Mapping]
        Controller[Controller]
        ViewResolver[View Resolver]
        Interceptor[Interceptors]
    end
    
    subgraph Business[Business Layer]
        Service[Service Layer]
        AOP[AOP Proxy]
        Transaction[Transaction Manager]
    end
    
    subgraph Data[Data Layer]
        Repository[Repository Layer]
        JPA[JPA Entity Manager]
        DataSource[DataSource]
    end
    
    subgraph Infrastructure[Infrastructure]
        Database[(Database)]
        Cache[(Cache)]
        MessageQueue[Message Queue]
    end
    
    subgraph SpringContainer[Spring IoC Container]
        BeanFactory[Bean Factory]
        ApplicationContext[Application Context]
        DependencyInjection[DI Container]
    end
    
    Browser --> DispatcherServlet
    MobileApp --> DispatcherServlet
    APIClient --> DispatcherServlet
    
    DispatcherServlet --> HandlerMapping
    HandlerMapping --> Interceptor
    Interceptor --> Controller
    
    Controller --> Service
    Service --> AOP
    AOP --> Transaction
    Transaction --> Repository
    
    Repository --> JPA
    JPA --> DataSource
    DataSource --> Database
    
    Service --> Cache
    Service --> MessageQueue
    
    SpringContainer --> BeanFactory
    SpringContainer --> ApplicationContext
    SpringContainer --> DependencyInjection
    
    DependencyInjection -.->|Manages| Controller
    DependencyInjection -.->|Manages| Service
    DependencyInjection -.->|Manages| Repository
    
    style Web fill:#e1f5ff
    style Business fill:#fff4e6
    style Data fill:#e1f5ff
    style SpringContainer fill:#ffcccc
```

### Spring Request Processing Flow

```mermaid
sequenceDiagram
    participant Client
    participant DispatcherServlet
    participant HandlerMapping
    participant Interceptor
    participant Controller
    participant Service
    participant Repository
    participant Database
    
    Client->>DispatcherServlet: HTTP Request
    DispatcherServlet->>HandlerMapping: Find Handler
    HandlerMapping-->>DispatcherServlet: Handler Method
    
    DispatcherServlet->>Interceptor: PreHandle
    Interceptor-->>DispatcherServlet: Continue
    
    DispatcherServlet->>Controller: Invoke Handler
    Controller->>Service: Business Logic
    Service->>Repository: Data Access
    Repository->>Database: SQL Query
    Database-->>Repository: Result Set
    Repository-->>Service: Entity
    Service->>Service: Business Logic
    Service-->>Controller: DTO
    
    Controller->>Interceptor: PostHandle
    Interceptor-->>Controller: Continue
    Controller-->>DispatcherServlet: ModelAndView/Response
    
    DispatcherServlet->>DispatcherServlet: Render View/JSON
    DispatcherServlet-->>Client: HTTP Response
```

### Spring Boot Configuration

```java
// Application configuration
@SpringBootApplication
@EnableScheduling
@EnableAsync
@EnableJpaAuditing
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Configuration properties
@ConfigurationProperties(prefix = "app")
@Data
public class AppProperties {
    private String name;
    private String version;
    private Security security = new Security();
    
    @Data
    public static class Security {
        private String secret;
        private long tokenValidity;
    }
}

// application.yml
app:
  name: MyApplication
  version: 1.0.0
  security:
    secret: ${JWT_SECRET:default-secret}
    token-validity: 3600000
```

### Spring MVC Controllers

```java
@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {
    
    private final UserService userService;
    
    @GetMapping
    public ResponseEntity<Page<UserDTO>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sort) {
        Pageable pageable = PageRequest.of(page, size, 
            Sort.by(sort != null ? sort : "id"));
        Page<UserDTO> users = userService.findAll(pageable);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(user);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        return userService.update(id, request)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Spring Data JPA

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Query methods
    List<User> findByEmailContaining(String email);
    Optional<User> findByEmail(String email);
    List<User> findByAgeBetween(int min, int max);
    
    // Custom queries
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.active = true")
    List<User> findActiveUsersByRole(@Param("role") String role);
    
    @Query(value = "SELECT * FROM users WHERE age > :age", nativeQuery = true)
    List<User> findUsersOlderThan(@Param("age") int age);
    
    // Modifying queries
    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.lastLogin < :date")
    int deactivateInactiveUsers(@Param("date") LocalDateTime date);
    
    // Specifications for dynamic queries
    default List<User> findUsers(UserSpecification spec) {
        return findAll(spec);
    }
}

// Specification example
public class UserSpecification {
    public static Specification<User> hasRole(String role) {
        return (root, query, cb) -> cb.equal(root.get("role"), role);
    }
    
    public static Specification<User> isActive() {
        return (root, query, cb) -> cb.isTrue(root.get("active"));
    }
    
    public static Specification<User> ageGreaterThan(int age) {
        return (root, query, cb) -> cb.greaterThan(root.get("age"), age);
    }
}
```

### Spring Security

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()))
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
        return http.build();
    }
    
    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri("https://example.com/.well-known/jwks.json")
            .build();
    }
}
```

---

## Backend Architecture

### Dependency Injection Flow

```mermaid
sequenceDiagram
    participant App as Application Startup
    participant Container as Spring Container
    participant Scanner as Component Scanner
    participant BeanFactory as Bean Factory
    participant Bean as Bean Instance
    
    App->>Container: Initialize Application Context
    Container->>Scanner: Scan for Components
    Scanner->>Scanner: Find @Component, @Service, @Repository
    Scanner-->>Container: Component Definitions
    
    Container->>BeanFactory: Create Bean Definitions
    BeanFactory->>BeanFactory: Resolve Dependencies
    
    loop For each Bean
        BeanFactory->>Bean: Instantiate Bean
        BeanFactory->>Bean: Inject Dependencies
        BeanFactory->>Bean: Apply AOP Proxies
        BeanFactory->>Bean: Initialize (@PostConstruct)
        BeanFactory->>Container: Register Bean
    end
    
    Container->>Container: All Beans Ready
    Container-->>App: Application Context Ready
```

### Dependency Injection Architecture

```mermaid
graph TB
    subgraph Container[Spring IoC Container]
        ApplicationContext[Application Context]
        BeanFactory[Bean Factory]
        DependencyResolver[Dependency Resolver]
    end
    
    subgraph Beans[Beans]
        ControllerBean[@Controller Bean]
        ServiceBean[@Service Bean]
        RepositoryBean[@Repository Bean]
        ConfigBean[@Configuration Bean]
    end
    
    subgraph Injection[Injection Types]
        Constructor[Constructor Injection]
        Field[Field Injection]
        Setter[Setter Injection]
    end
    
    ApplicationContext --> BeanFactory
    BeanFactory --> DependencyResolver
    
    DependencyResolver --> Constructor
    DependencyResolver --> Field
    DependencyResolver --> Setter
    
    Constructor --> ControllerBean
    Constructor --> ServiceBean
    Field --> RepositoryBean
    Setter --> ConfigBean
    
    ServiceBean -.->|Depends on| RepositoryBean
    ControllerBean -.->|Depends on| ServiceBean
    
    style Container fill:#e1f5ff
    style Beans fill:#fff4e6
    style Injection fill:#e1f5ff
```

### Layered Architecture

```java
// Service layer
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public UserDTO create(CreateUserRequest request) {
        User user = userMapper.toEntity(request);
        user = userRepository.save(user);
        return userMapper.toDTO(user);
    }
    
    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id)
            .map(userMapper::toDTO);
    }
    
    public Page<UserDTO> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
            .map(userMapper::toDTO);
    }
}

// DTOs
public record UserDTO(Long id, String name, String email, String role) {}
public record CreateUserRequest(String name, String email, String role) {}
```

### Hexagonal Architecture

```java
// Port (interface)
public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    List<User> findAll();
}

// Adapter (implementation)
@Repository
public class JpaUserRepository implements UserRepository {
    private final UserJpaRepository jpaRepository;
    
    @Override
    public User save(User user) {
        return jpaRepository.save(user);
    }
    
    // ... other methods
}

// Domain service
@Service
public class UserDomainService {
    public void validateUser(User user) {
        if (user.getEmail() == null || !user.getEmail().contains("@")) {
            throw new InvalidUserException("Invalid email");
        }
    }
}
```

---

## Database & Persistence

### JPA Entities

```java
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @Version
    private Long version;
    
    // Getters and setters
}
```

### Transaction Management

### Transaction Management Flow

```mermaid
sequenceDiagram
    participant Client
    participant Service as @Transactional Service
    participant AOP as AOP Proxy
    participant TM as Transaction Manager
    participant DataSource as DataSource
    participant DB as Database
    
    Client->>Service: Method Call
    Service->>AOP: Intercept Call
    AOP->>TM: Begin Transaction
    TM->>DataSource: Get Connection
    DataSource->>DB: Open Connection
    DB-->>DataSource: Connection
    DataSource-->>TM: Connection
    TM->>TM: Set AutoCommit(false)
    TM-->>AOP: Transaction Started
    
    AOP->>Service: Invoke Method
    Service->>Service: Business Logic
    Service->>DataSource: Execute SQL
    DataSource->>DB: Execute Query
    DB-->>DataSource: Result
    DataSource-->>Service: Result
    
    alt Success
        Service-->>AOP: Return Success
        AOP->>TM: Commit Transaction
        TM->>DB: COMMIT
        DB-->>TM: Committed
        TM->>DataSource: Release Connection
        TM-->>AOP: Transaction Committed
        AOP-->>Client: Return Result
    else Exception
        Service-->>AOP: Throw Exception
        AOP->>TM: Rollback Transaction
        TM->>DB: ROLLBACK
        DB-->>TM: Rolled Back
        TM->>DataSource: Release Connection
        TM-->>AOP: Transaction Rolled Back
        AOP-->>Client: Throw Exception
    end
```

### Transaction Propagation

```mermaid
graph TB
    Start([Method Call]) --> Check{Has Active<br/>Transaction?}
    
    Check -->|No| CreateNew[REQUIRED:<br/>Create New Transaction]
    Check -->|Yes| UseExisting[REQUIRED:<br/>Use Existing Transaction]
    
    Check -->|Always New| RequiresNew[REQUIRES_NEW:<br/>Always New Transaction]
    Check -->|Must Exist| Mandatory[MANDATORY:<br/>Must Have Transaction]
    Check -->|No Transaction| Never[NEVER:<br/>No Transaction Allowed]
    Check -->|Optional| Supports[SUPPORTS:<br/>Use if Exists]
    Check -->|Nested| Nested[NESTED:<br/>Nested Transaction]
    
    CreateNew --> Execute[Execute Method]
    UseExisting --> Execute
    RequiresNew --> Execute
    Mandatory --> Execute
    Never --> Execute
    Supports --> Execute
    Nested --> Execute
    
    Execute --> Commit{Success?}
    Commit -->|Yes| CommitTx[Commit Transaction]
    Commit -->|No| Rollback[Rollback Transaction]
    
    style Start fill:#e1f5ff
    style Execute fill:#fff4e6
```

```java
@Service
@Transactional
public class OrderService {
    
    @Transactional(readOnly = true)
    public OrderDTO getOrder(Long id) {
        // Read-only transaction
        return orderRepository.findById(id)
            .map(orderMapper::toDTO)
            .orElseThrow(() -> new OrderNotFoundException(id));
    }
    
    @Transactional(rollbackFor = Exception.class)
    public OrderDTO createOrder(CreateOrderRequest request) {
        // Transactional with rollback on any exception
        Order order = orderMapper.toEntity(request);
        order = orderRepository.save(order);
        return orderMapper.toDTO(order);
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logOrderCreation(Long orderId) {
        // New transaction, independent of parent
        auditLogRepository.save(new AuditLog("ORDER_CREATED", orderId));
    }
}
```

---

## Microservices Architecture

### Microservices Architecture

```mermaid
graph TB
    subgraph Client[Client Layer]
        WebApp[Web Application]
        MobileApp[Mobile App]
    end
    
    subgraph Gateway[API Gateway Layer]
        SpringGateway[Spring Cloud Gateway]
        LoadBalancer[Load Balancer]
        CircuitBreaker[Circuit Breaker]
    end
    
    subgraph Services[Microservices]
        UserService[User Service<br/>Port 8081]
        OrderService[Order Service<br/>Port 8082]
        ProductService[Product Service<br/>Port 8083]
        PaymentService[Payment Service<br/>Port 8084]
    end
    
    subgraph Infrastructure[Infrastructure Services]
        Eureka[Eureka Server<br/>Service Discovery]
        ConfigServer[Config Server]
        Zipkin[Zipkin<br/>Distributed Tracing]
    end
    
    subgraph Data[Data Layer]
        UserDB[(User DB)]
        OrderDB[(Order DB)]
        ProductDB[(Product DB)]
        PaymentDB[(Payment DB)]
    end
    
    subgraph Messaging[Messaging]
        RabbitMQ[RabbitMQ<br/>Message Queue]
        Kafka[Kafka<br/>Event Stream]
    end
    
    WebApp --> SpringGateway
    MobileApp --> SpringGateway
    
    SpringGateway --> LoadBalancer
    LoadBalancer --> CircuitBreaker
    CircuitBreaker --> UserService
    CircuitBreaker --> OrderService
    CircuitBreaker --> ProductService
    CircuitBreaker --> PaymentService
    
    UserService -.->|Register| Eureka
    OrderService -.->|Register| Eureka
    ProductService -.->|Register| Eureka
    PaymentService -.->|Register| Eureka
    
    UserService --> ConfigServer
    OrderService --> ConfigServer
    ProductService --> ConfigServer
    
    UserService --> UserDB
    OrderService --> OrderDB
    ProductService --> ProductDB
    PaymentService --> PaymentDB
    
    OrderService --> RabbitMQ
    PaymentService --> RabbitMQ
    RabbitMQ --> NotificationService[Notification Service]
    
    OrderService --> Kafka
    ProductService --> Kafka
    
    UserService -.->|Trace| Zipkin
    OrderService -.->|Trace| Zipkin
    
    style Gateway fill:#e1f5ff
    style Services fill:#fff4e6
    style Infrastructure fill:#e1f5ff
    style Messaging fill:#fff4e6
```

### Microservices Communication

```mermaid
graph TB
    Client[Client] --> Gateway[API Gateway]
    
    Gateway --> UserService[User Service]
    Gateway --> OrderService[Order Service]
    Gateway --> ProductService[Product Service]
    
    UserService --> UserDB[(User DB)]
    OrderService --> OrderDB[(Order DB)]
    ProductService --> ProductDB[(Product DB)]
    
    OrderService --> MessageQueue[Message Queue]
    ProductService --> MessageQueue
    
    MessageQueue --> NotificationService[Notification Service]
    
    UserService -.Service Discovery.-> Eureka[Eureka Server]
    OrderService -.Service Discovery.-> Eureka
    ProductService -.Service Discovery.-> Eureka
```

### Spring Cloud Gateway

```java
@Configuration
public class GatewayConfig {
    
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r
                .path("/api/users/**")
                .uri("lb://user-service"))
            .route("order-service", r -> r
                .path("/api/orders/**")
                .uri("lb://order-service"))
            .build();
    }
    
    @Bean
    public GlobalFilter customGlobalFilter() {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            // Add custom headers
            ServerHttpRequest modifiedRequest = request.mutate()
                .header("X-Gateway-Request", "true")
                .build();
            return chain.filter(exchange.mutate().request(modifiedRequest).build());
        };
    }
}
```

### Service Discovery

```java
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

---

## Frontend Technologies

### React Integration with Spring Boot

```java
// Backend: REST Controller
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(userService.create(request));
    }
}
```

```typescript
// Frontend: React component
import { useEffect, useState } from 'react';

function UsersList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
    
    return (
        <div>
            {users.map(user => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    );
}
```

### Vue.js Integration

```typescript
// Vue component
<template>
    <div>
        <div v-for="user in users" :key="user.id">
            {{ user.name }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        };
    },
    mounted() {
        fetch('http://localhost:8080/api/users')
            .then(res => res.json())
            .then(data => this.users = data);
    }
};
</script>
```

### Angular Integration

```typescript
// Angular service
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:8080/api/users');
    }
}

// Angular component
@Component({
    selector: 'app-users',
    template: `
        <div *ngFor="let user of users$ | async">
            {{ user.name }}
        </div>
    `
})
export class UsersComponent {
    users$ = this.userService.getUsers();
    
    constructor(private userService: UserService) {}
}
```

### Thymeleaf (Server-Side Rendering)

```html
<!-- templates/users.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Users</title>
</head>
<body>
    <h1>Users</h1>
    <table>
        <tr th:each="user : ${users}">
            <td th:text="${user.name}"></td>
            <td th:text="${user.email}"></td>
        </tr>
    </table>
</body>
</html>
```

```java
// Controller
@Controller
public class UserViewController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public String getUsers(Model model) {
        model.addAttribute("users", userService.findAll());
        return "users";
    }
}
```

---

## API Design & Integration

### RESTful API Design

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<Page<UserDTO>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserDTO> users = userService.findAll(pageable);
        return ResponseEntity.ok(users);
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDTO user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
```

### API Documentation with Swagger

```java
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User API")
                .version("1.0.0")
                .description("User management API"));
    }
}
```

---

## Testing & Quality Assurance

### Testing Strategy

```java
// Unit Tests: Fast, isolated
@ExtendWith(MockitoExtension.class)
class UserServiceTest { /* ... */ }

// Integration Tests: Test with real dependencies
@SpringBootTest
class UserControllerIntegrationTest { /* ... */ }

// E2E Tests: Test complete flows
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserE2ETest { /* ... */ }
```

---

## Testing

### Unit Testing

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void shouldCreateUser() {
        // Given
        CreateUserRequest request = new CreateUserRequest("John", "john@example.com", "USER");
        User savedUser = new User(1L, "John", "john@example.com", UserRole.USER);
        
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        
        // When
        UserDTO result = userService.create(request);
        
        // Then
        assertThat(result.name()).isEqualTo("John");
        verify(userRepository).save(any(User.class));
    }
}
```

### Integration Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldCreateUser() throws Exception {
        CreateUserRequest request = new CreateUserRequest("John", "john@example.com", "USER");
        
        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("John"));
    }
}
```

---

## Security

### Spring Security Flow

```mermaid
sequenceDiagram
    participant Client
    participant FilterChain as Security Filter Chain
    participant AuthFilter as Authentication Filter
    participant AuthManager as Authentication Manager
    participant UserDetailsService as User Details Service
    participant PasswordEncoder as Password Encoder
    participant AuthProvider as Authentication Provider
    participant SecurityContext as Security Context
    participant AuthzFilter as Authorization Filter
    participant Controller as Controller
    
    Client->>FilterChain: HTTP Request
    FilterChain->>AuthFilter: Process Request
    
    alt Not Authenticated
        AuthFilter->>AuthFilter: Extract Credentials
        AuthFilter->>AuthManager: Authenticate
        AuthManager->>AuthProvider: Authenticate
        AuthProvider->>UserDetailsService: Load User
        UserDetailsService-->>AuthProvider: User Details
        AuthProvider->>PasswordEncoder: Verify Password
        PasswordEncoder-->>AuthProvider: Password Valid
        AuthProvider-->>AuthManager: Authentication
        AuthManager-->>AuthFilter: Authentication
        AuthFilter->>SecurityContext: Set Authentication
        SecurityContext-->>AuthFilter: Stored
    end
    
    AuthFilter->>AuthzFilter: Continue Filter Chain
    AuthzFilter->>AuthzFilter: Check Authorization
    AuthzFilter->>SecurityContext: Get Authentication
    SecurityContext-->>AuthzFilter: Authentication
    
    alt Authorized
        AuthzFilter->>Controller: Forward Request
        Controller-->>AuthzFilter: Response
        AuthzFilter-->>FilterChain: Response
        FilterChain-->>Client: HTTP Response
    else Not Authorized
        AuthzFilter-->>FilterChain: 403 Forbidden
        FilterChain-->>Client: Error Response
    end
```

### Security Architecture

```mermaid
graph TB
    subgraph Client[Client Layer]
        Browser[Web Browser]
        MobileApp[Mobile App]
    end
    
    subgraph Security[Security Layer]
        FilterChain[Security Filter Chain]
        AuthFilter[Authentication Filter]
        AuthzFilter[Authorization Filter]
        CSRFProtection[CSRF Protection]
    end
    
    subgraph Auth[Authentication]
        AuthManager[Authentication Manager]
        AuthProvider[Authentication Provider]
        UserDetailsService[User Details Service]
        PasswordEncoder[Password Encoder]
        JWTDecoder[JWT Decoder]
    end
    
    subgraph Authz[Authorization]
        AccessDecisionManager[Access Decision Manager]
        MethodSecurity[Method Security]
        RoleHierarchy[Role Hierarchy]
    end
    
    subgraph Storage[Storage]
        UserDB[(User Database)]
        TokenStore[Token Store]
        SessionStore[Session Store]
    end
    
    Browser --> FilterChain
    MobileApp --> FilterChain
    
    FilterChain --> AuthFilter
    FilterChain --> CSRFProtection
    FilterChain --> AuthzFilter
    
    AuthFilter --> AuthManager
    AuthManager --> AuthProvider
    AuthProvider --> UserDetailsService
    AuthProvider --> PasswordEncoder
    AuthProvider --> JWTDecoder
    
    UserDetailsService --> UserDB
    JWTDecoder --> TokenStore
    
    AuthzFilter --> AccessDecisionManager
    AccessDecisionManager --> MethodSecurity
    AccessDecisionManager --> RoleHierarchy
    
    style Security fill:#e1f5ff
    style Auth fill:#fff4e6
    style Authz fill:#e1f5ff
```

### Spring Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()))
            );
        return http.build();
    }
}
```

### OAuth2 Implementation

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(
            @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        UserDTO user = userService.findById(userId);
        return ResponseEntity.ok(user);
    }
}
```

---

## Performance Optimization

### JVM Tuning

```bash
# JVM options for production
java -Xms2g -Xmx4g \
     -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \
     -XX:+HeapDumpOnOutOfMemoryError \
     -jar myapp.jar
```

### Caching with Spring Cache

```java
@Service
public class UserService {
    
    @Cacheable(value = "users", key = "#id")
    public UserDTO findById(Long id) {
        return userRepository.findById(id)
            .map(userMapper::toDTO)
            .orElseThrow();
    }
    
    @CacheEvict(value = "users", key = "#id")
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
```

### Async Processing

```java
@Service
public class EmailService {
    
    @Async
    public CompletableFuture<Void> sendEmail(String to, String subject, String body) {
        // Async email sending
        return CompletableFuture.completedFuture(null);
    }
}

@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.initialize();
        return executor;
    }
}
```

---

## Common Pitfalls

### 1. **N+1 Query Problem**

```java
// BAD: N+1 queries
List<User> users = userRepository.findAll();
users.forEach(user -> {
    List<Order> orders = orderRepository.findByUserId(user.getId()); // N queries
});

// GOOD: Use JOIN FETCH
@Query("SELECT u FROM User u JOIN FETCH u.orders")
List<User> findAllWithOrders();
```

### 2. **Transaction Boundaries**

```java
// BAD: Transaction too large
@Transactional
public void processLargeBatch(List<Item> items) {
    items.forEach(item -> {
        // Processing each item in same transaction
        processItem(item);
    });
}

// GOOD: Batch processing
public void processLargeBatch(List<Item> items) {
    items.forEach(item -> {
        processItemInTransaction(item);
    });
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
private void processItemInTransaction(Item item) {
    processItem(item);
}
```

---

## Real-World Examples

### Example 1: E-Commerce Order Processing System

```java
// OrderService.java - Complete order processing
@Service
@Transactional
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;
    
    public OrderDTO processOrder(CreateOrderRequest request) {
        // 1. Validate inventory
        inventoryService.reserveItems(request.getItems());
        
        // 2. Process payment
        PaymentResult payment = paymentService.processPayment(
            request.getPaymentMethod(), 
            request.getTotal()
        );
        
        if (!payment.isSuccess()) {
            inventoryService.releaseItems(request.getItems());
            throw new PaymentException("Payment failed");
        }
        
        // 3. Create order
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setItems(request.getItems());
        order.setTotal(request.getTotal());
        order.setStatus(OrderStatus.CONFIRMED);
        order = orderRepository.save(order);
        
        // 4. Send notification
        notificationService.sendOrderConfirmation(order);
        
        return orderMapper.toDTO(order);
    }
}
```

### Example 2: Microservices with Spring Cloud

```java
// UserService - Service A
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private OrderServiceClient orderServiceClient;
    
    @GetMapping("/{id}/orders")
    public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable Long id) {
        // Call Order Service via Feign Client
        List<OrderDTO> orders = orderServiceClient.getOrdersByUserId(id);
        return ResponseEntity.ok(orders);
    }
}

// OrderServiceClient - Feign Client
@FeignClient(name = "order-service", url = "${order.service.url}")
public interface OrderServiceClient {
    @GetMapping("/orders/user/{userId}")
    List<OrderDTO> getOrdersByUserId(@PathVariable Long userId);
}
```

---

## DevOps & Infrastructure

### Docker Configuration

```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/myapp.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: java-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: java-app
  template:
    metadata:
      labels:
        app: java-app
    spec:
      containers:
      - name: java-app
        image: myapp:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
```

### Build and Deployment Pipeline

```mermaid
flowchart TD
    Start([Code Commit]) --> GitPush[Push to Git Repository]
    GitPush --> Trigger[CI/CD Pipeline Triggered]
    
    Trigger --> Checkout[Checkout Code]
    Checkout --> Build[Build Stage]
    
    Build --> MavenBuild[Maven Build<br/>mvn clean package]
    MavenBuild --> Compile[Compile Java Code]
    Compile --> Package[Package JAR/WAR]
    Package --> BuildDocker[Build Docker Image]
    BuildDocker --> PushRegistry[Push to Container Registry]
    
    PushRegistry --> Test[Test Stage]
    Test --> UnitTest[Unit Tests<br/>mvn test]
    UnitTest --> IntegrationTest[Integration Tests]
    IntegrationTest --> CodeQuality[Code Quality Checks<br/>SonarQube]
    
    CodeQuality --> QualityGate{Quality Gate<br/>Pass?}
    QualityGate -->|No| Fail[Build Failed]
    QualityGate -->|Yes| SecurityScan[Security Scan]
    
    SecurityScan --> Deploy[Deploy Stage]
    Deploy --> DeployDev[Deploy to Dev Environment]
    DeployDev --> SmokeTest[Smoke Tests]
    
    SmokeTest --> DeployQA{Deploy to QA?}
    DeployQA -->|Yes| DeployQAEnv[Deploy to QA]
    DeployQAEnv --> QATest[QA Testing]
    QATest --> DeployProd{Deploy to Prod?}
    DeployQA -->|No| DeployProd
    
    DeployProd -->|Yes| DeployProdEnv[Deploy to Production<br/>Kubernetes]
    DeployProd -->|No| End([Pipeline Complete])
    
    DeployProdEnv --> HealthCheck[Health Checks]
    HealthCheck --> Monitor[Monitoring & Logging]
    Monitor --> End
    
    style Start fill:#e1f5ff
    style End fill:#fff4e6
    style Fail fill:#ffcccc
```

### CI/CD Pipeline Architecture

```mermaid
graph TB
    subgraph Source[Source Control]
        Git[Git Repository]
        Webhook[Webhook]
    end
    
    subgraph CI[CI Pipeline]
        Jenkins[Jenkins/GitHub Actions]
        Build[Build Stage]
        Test[Test Stage]
        Quality[Quality Stage]
    end
    
    subgraph Artifacts[Artifacts]
        JAR[JAR/WAR File]
        DockerImage[Docker Image]
        Reports[Test Reports]
    end
    
    subgraph Registry[Container Registry]
        DockerHub[Docker Hub]
        ECR[ECR/ACR]
    end
    
    subgraph CD[CD Pipeline]
        Deploy[Deployment]
        K8s[Kubernetes]
        Monitoring[Monitoring]
    end
    
    subgraph Environments[Environments]
        Dev[Development]
        QA[Quality Assurance]
        Prod[Production]
    end
    
    Git --> Webhook
    Webhook --> Jenkins
    Jenkins --> Build
    Build --> Test
    Test --> Quality
    
    Build --> JAR
    Build --> DockerImage
    Test --> Reports
    
    DockerImage --> DockerHub
    DockerImage --> ECR
    
    Quality --> Deploy
    Deploy --> K8s
    K8s --> Dev
    K8s --> QA
    K8s --> Prod
    
    Dev --> Monitoring
    QA --> Monitoring
    Prod --> Monitoring
    
    style CI fill:#e1f5ff
    style CD fill:#fff4e6
    style Environments fill:#e1f5ff
```

### CI/CD with Jenkins

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}
```

---

## Code Quality & Best Practices

### Code Standards

```java
// Use meaningful names
// BAD
int d; // elapsed time in days
int ds; // elapsed time in days

// GOOD
int elapsedTimeInDays;
int daysSinceCreation;
```

### Exception Handling

```java
// BAD: Swallowing exceptions
try {
    processData();
} catch (Exception e) {
    // Silent failure
}

// GOOD: Proper exception handling
try {
    processData();
} catch (DataProcessingException e) {
    logger.error("Failed to process data", e);
    throw new ServiceException("Unable to process data", e);
}
```

### Documentation

```java
/**
 * Calculates the total price including tax.
 * 
 * @param basePrice the base price before tax
 * @param taxRate the tax rate as a decimal (e.g., 0.1 for 10%)
 * @return the total price including tax
 * @throws IllegalArgumentException if basePrice is negative or taxRate is invalid
 */
public BigDecimal calculateTotalPrice(BigDecimal basePrice, BigDecimal taxRate) {
    if (basePrice.compareTo(BigDecimal.ZERO) < 0) {
        throw new IllegalArgumentException("Base price cannot be negative");
    }
    return basePrice.multiply(BigDecimal.ONE.add(taxRate));
}
```

---

## Team Leadership

### Code Review Best Practices

1. **Be Constructive**
   - Focus on code, not person
   - Suggest improvements
   - Explain why changes are needed

2. **Review Checklist**
   - Code follows style guide
   - Tests are included
   - Documentation is updated
   - Performance considered
   - Security reviewed

### Mentoring

```java
// Guide junior developers
// Explain design decisions
// Share knowledge through:
// - Pair programming
// - Code reviews
// - Technical discussions
// - Documentation
```

### Technical Decision Making

- Evaluate technologies objectively
- Consider team skills
- Assess long-term maintenance
- Document decisions (ADRs)

---

## Resources

- [Spring Framework Documentation](https://spring.io/projects/spring-framework)
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Java Documentation](https://docs.oracle.com/javase/)

---

## Summary

This guide covers essential knowledge for senior Java full stack developers:

1. **Core Java**: Modern features, concurrency, streams
2. **Spring Framework**: Boot, MVC, Data, Security, Cloud
3. **Architecture**: Layered, hexagonal, clean architecture
4. **Database**: JPA, transactions, optimization
5. **Microservices**: Spring Cloud, service discovery
6. **Testing**: Unit, integration, E2E testing
7. **Security**: Spring Security, OAuth2, JWT
8. **Performance**: JVM tuning, caching, async processing
9. **Best Practices**: Code quality, documentation

Master these concepts to build scalable, maintainable enterprise applications.

