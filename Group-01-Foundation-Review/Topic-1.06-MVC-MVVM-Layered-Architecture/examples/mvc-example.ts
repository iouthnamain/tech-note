/**
 * MVC/MVVM Architecture Examples - TypeScript
 * MVC / MVVM / Layered Architecture với type safety
 * 
 * TypeScript Best Practices:
 * - Typed models, views, controllers
 * - Dependency injection with types
 * - Service layer types
 * - Repository pattern with generics
 */

// ============================================================================
// 1. Type Definitions
// ============================================================================

/**
 * User entity interface
 */
interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt?: string;
}

/**
 * Product entity interface
 */
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

/**
 * Create user request
 */
interface CreateUserRequest {
    name: string;
    email: string;
}

/**
 * Update user request
 */
interface UpdateUserRequest {
    name?: string;
    email?: string;
}

// ============================================================================
// 2. MVC Pattern - Model
// ============================================================================

/**
 * User Model - Data and business logic
 * ✅ Best Practice: Model handles data operations
 */
class UserModel {
    private users: User[] = [];
    
    getAllUsers(): User[] {
        return [...this.users]; // Return copy
    }
    
    getUserById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
    
    createUser(userData: CreateUserRequest): User {
        const newUser: User = {
            id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
        return newUser;
    }
    
    updateUser(id: number, userData: UpdateUserRequest): User | null {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) return null;
        
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...userData,
            updatedAt: new Date().toISOString()
        };
        return this.users[userIndex];
    }
    
    deleteUser(id: number): boolean {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) return false;
        
        this.users.splice(userIndex, 1);
        return true;
    }
}

// ============================================================================
// 3. MVC Pattern - View
// ============================================================================

/**
 * User View - Presentation layer
 * ✅ Best Practice: View handles display logic
 */
class UserView {
    displayUsers(users: User[]): void {
        console.log('=== Users ===');
        users.forEach(user => {
            console.log(`${user.id}: ${user.name} (${user.email})`);
        });
    }
    
    displayUser(user: User | undefined): void {
        if (!user) {
            console.log('User not found');
            return;
        }
        console.log(`User: ${user.name}`);
        console.log(`Email: ${user.email}`);
        if (user.updatedAt) {
            console.log(`Updated: ${user.updatedAt}`);
        }
    }
    
    displayMessage(message: string): void {
        console.log(`Message: ${message}`);
    }
    
    displayError(error: string): void {
        console.error(`Error: ${error}`);
    }
}

// ============================================================================
// 4. MVC Pattern - Controller
// ============================================================================

/**
 * User Controller - Handles user input and coordinates Model and View
 * ✅ Best Practice: Controller coordinates between Model and View
 */
class UserController {
    constructor(
        private readonly model: UserModel,
        private readonly view: UserView
    ) {}
    
    getAllUsers(): void {
        const users = this.model.getAllUsers();
        this.view.displayUsers(users);
    }
    
    getUserById(id: number): void {
        const user = this.model.getUserById(id);
        this.view.displayUser(user);
    }
    
    createUser(userData: CreateUserRequest): User | null {
        try {
            // Validation
            if (!userData.name || !userData.email) {
                this.view.displayError('Name and email are required');
                return null;
            }
            
            const newUser = this.model.createUser(userData);
            this.view.displayMessage(`User ${newUser.name} created`);
            return newUser;
        } catch (error) {
            this.view.displayError(error instanceof Error ? error.message : 'Unknown error');
            return null;
        }
    }
    
    updateUser(id: number, userData: UpdateUserRequest): User | null {
        try {
            const updatedUser = this.model.updateUser(id, userData);
            if (updatedUser) {
                this.view.displayMessage(`User ${updatedUser.name} updated`);
            } else {
                this.view.displayMessage('User not found');
            }
            return updatedUser;
        } catch (error) {
            this.view.displayError(error instanceof Error ? error.message : 'Unknown error');
            return null;
        }
    }
    
    deleteUser(id: number): boolean {
        const deleted = this.model.deleteUser(id);
        if (deleted) {
            this.view.displayMessage('User deleted');
        } else {
            this.view.displayMessage('User not found');
        }
        return deleted;
    }
}

// ============================================================================
// 5. MVVM Pattern - Model
// ============================================================================

/**
 * Product Model
 */
class ProductModel {
    private products: Product[] = [];
    
    getProducts(): Product[] {
        return [...this.products];
    }
    
    addProduct(product: Product): void {
        this.products.push(product);
    }
    
    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}

// ============================================================================
// 6. MVVM Pattern - ViewModel
// ============================================================================

/**
 * Product ViewModel - Business logic and state management
 * ✅ Best Practice: ViewModel manages state and business logic
 */
class ProductViewModel {
    private _products: Product[] = [];
    private _selectedProduct: Product | null = null;
    
    constructor(private readonly model: ProductModel) {}
    
    get products(): readonly Product[] {
        return this._products;
    }
    
    get selectedProduct(): Product | null {
        return this._selectedProduct;
    }
    
    loadProducts(): void {
        this._products = this.model.getProducts();
    }
    
    selectProduct(product: Product): void {
        this._selectedProduct = product;
    }
    
    addProduct(product: Product): void {
        this.model.addProduct(product);
        this.loadProducts();
    }
    
    clearSelection(): void {
        this._selectedProduct = null;
    }
}

// ============================================================================
// 7. MVVM Pattern - View
// ============================================================================

/**
 * Product View - UI layer
 * ✅ Best Practice: View observes ViewModel
 */
class ProductView {
    constructor(private readonly viewModel: ProductViewModel) {}
    
    render(): void {
        console.log('Products:', this.viewModel.products);
        if (this.viewModel.selectedProduct) {
            console.log('Selected:', this.viewModel.selectedProduct);
        }
    }
    
    update(): void {
        this.render();
    }
}

// ============================================================================
// 8. Layered Architecture - Repository Pattern
// ============================================================================

/**
 * Generic Repository Interface
 * ✅ Best Practice: Use generics for reusable repository
 * @template T - Entity type
 * @template ID - ID type
 */
interface IRepository<T, ID = number> {
    findAll(): Promise<T[]>;
    findById(id: ID): Promise<T | null>;
    create(entity: Omit<T, 'id'>): Promise<T>;
    update(id: ID, entity: Partial<T>): Promise<T | null>;
    delete(id: ID): Promise<boolean>;
}

/**
 * Generic Repository Implementation
 * ✅ Best Practice: Generic repository with type safety
 */
class Repository<T extends { id: ID }, ID = number> implements IRepository<T, ID> {
    protected entities: T[] = [];
    
    async findAll(): Promise<T[]> {
        return [...this.entities];
    }
    
    async findById(id: ID): Promise<T | null> {
        const entity = this.entities.find(e => e.id === id);
        return entity ?? null;
    }
    
    async create(entityData: Omit<T, 'id'>): Promise<T> {
        const newId = this.entities.length > 0
            ? (Math.max(...this.entities.map(e => Number(e.id))) + 1) as ID
            : (1 as ID);
        
        const newEntity = { ...entityData, id: newId } as T;
        this.entities.push(newEntity);
        return newEntity;
    }
    
    async update(id: ID, updates: Partial<T>): Promise<T | null> {
        const index = this.entities.findIndex(e => e.id === id);
        if (index === -1) return null;
        
        this.entities[index] = { ...this.entities[index], ...updates };
        return this.entities[index];
    }
    
    async delete(id: ID): Promise<boolean> {
        const index = this.entities.findIndex(e => e.id === id);
        if (index === -1) return false;
        
        this.entities.splice(index, 1);
        return true;
    }
}

/**
 * User Repository
 */
class UserRepository extends Repository<User> {
    async findByEmail(email: string): Promise<User | null> {
        const user = this.entities.find(u => u.email === email);
        return user ?? null;
    }
}

// ============================================================================
// 9. Layered Architecture - Service Layer
// ============================================================================

/**
 * User Service Interface
 * ✅ Best Practice: Use interfaces for service contracts
 */
interface IUserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(userData: CreateUserRequest): Promise<User>;
    updateUser(id: number, userData: UpdateUserRequest): Promise<User>;
    deleteUser(id: number): Promise<boolean>;
}

/**
 * User Service - Business logic layer
 * ✅ Best Practice: Service layer handles business logic
 */
class UserService implements IUserService {
    constructor(private readonly repository: IRepository<User>) {}
    
    async getAllUsers(): Promise<User[]> {
        return await this.repository.findAll();
    }
    
    async getUserById(id: number): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    
    async createUser(userData: CreateUserRequest): Promise<User> {
        // Business logic validation
        if (!userData.name || userData.name.length < 2) {
            throw new Error('Name must be at least 2 characters');
        }
        
        if (!userData.email || !userData.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        
        // Check for duplicate email
        const existingUser = await (this.repository as UserRepository).findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        
        return await this.repository.create({
            ...userData,
            createdAt: new Date().toISOString()
        });
    }
    
    async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
        const existingUser = await this.getUserById(id);
        
        // Validate email if provided
        if (userData.email && !userData.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        
        // Check for duplicate email
        if (userData.email && userData.email !== existingUser.email) {
            const duplicateUser = await (this.repository as UserRepository).findByEmail(userData.email);
            if (duplicateUser) {
                throw new Error('Email already exists');
            }
        }
        
        const updated = await this.repository.update(id, {
            ...userData,
            updatedAt: new Date().toISOString()
        });
        
        if (!updated) {
            throw new Error(`User with id ${id} not found`);
        }
        
        return updated;
    }
    
    async deleteUser(id: number): Promise<boolean> {
        await this.getUserById(id); // Verify user exists
        return await this.repository.delete(id);
    }
}

// ============================================================================
// 10. Layered Architecture - Presentation Layer
// ============================================================================

/**
 * User Controller (Presentation Layer)
 * ✅ Best Practice: Controller handles HTTP requests/responses
 */
class UserController {
    constructor(private readonly service: IUserService) {}
    
    async handleGetUsers(req: unknown, res: { json: (data: unknown) => void }): Promise<void> {
        try {
            const users = await this.service.getAllUsers();
            res.json({ success: true, data: users });
        } catch (error) {
            res.json({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    
    async handleGetUserById(
        req: { params: { id: string } },
        res: { json: (data: unknown) => void; status: (code: number) => { json: (data: unknown) => void } }
    ): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ success: false, error: 'Invalid user ID' });
                return;
            }
            
            const user = await this.service.getUserById(id);
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error instanceof Error ? error.message : 'User not found'
            });
        }
    }
    
    async handleCreateUser(
        req: { body: CreateUserRequest },
        res: { json: (data: unknown) => void; status: (code: number) => { json: (data: unknown) => void } }
    ): Promise<void> {
        try {
            const user = await this.service.createUser(req.body);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create user'
            });
        }
    }
}

// ============================================================================
// 11. Dependency Injection Container
// ============================================================================

/**
 * Simple Dependency Injection Container
 * ✅ Best Practice: Use DI for better testability
 */
class DIContainer {
    private services = new Map<string, unknown>();
    
    register<T>(name: string, factory: () => T): void {
        this.services.set(name, factory);
    }
    
    resolve<T>(name: string): T {
        const factory = this.services.get(name);
        if (!factory || typeof factory !== 'function') {
            throw new Error(`Service ${name} not found`);
        }
        return (factory as () => T)();
    }
}

// Setup DI Container
const container = new DIContainer();

// Register services
container.register('UserRepository', () => new UserRepository());
container.register('UserService', () => new UserService(container.resolve<IRepository<User>>('UserRepository')));
container.register('UserController', () => new UserController(container.resolve<IUserService>('UserService')));

// ============================================================================
// 12. Example Usage
// ============================================================================

// MVC Pattern
const userModel = new UserModel();
const userView = new UserView();
const userController = new UserController(userModel, userView);

userController.getAllUsers();
userController.createUser({ name: 'Jane Smith', email: 'jane@example.com' });
userController.getAllUsers();

// MVVM Pattern
const productModel = new ProductModel();
const productViewModel = new ProductViewModel(productModel);
const productView = new ProductView(productViewModel);

productViewModel.addProduct({ id: 1, name: 'Laptop', price: 999 });
productViewModel.loadProducts();
productView.render();

// Layered Architecture
const repository = container.resolve<IRepository<User>>('UserRepository');
const service = container.resolve<IUserService>('UserService');
const controller = container.resolve<UserController>('UserController');

// Export
export {
    UserModel,
    UserView,
    UserController,
    ProductModel,
    ProductViewModel,
    ProductView,
    IRepository,
    Repository,
    UserRepository,
    IUserService,
    UserService,
    UserController as LayeredUserController,
    DIContainer,
    type User,
    type Product,
    type CreateUserRequest,
    type UpdateUserRequest
};

