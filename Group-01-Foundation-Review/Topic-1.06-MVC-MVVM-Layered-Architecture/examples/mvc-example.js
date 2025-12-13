// MVC Architecture Example - JavaScript
// MVC / MVVM / Layered Architecture

// 1. MVC Pattern (Model-View-Controller)

// Model - Data and business logic
class UserModel {
    constructor() {
        this.users = [
            { id: 1, name: 'John Doe', email: 'john@example.com' }
        ];
    }
    
    getAllUsers() {
        return this.users;
    }
    
    getUserById(id) {
        return this.users.find(u => u.id === id);
    }
    
    createUser(userData) {
        const newUser = {
            id: this.users.length + 1,
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
        return newUser;
    }
    
    updateUser(id, userData) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) return null;
        
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...userData,
            updatedAt: new Date().toISOString()
        };
        return this.users[userIndex];
    }
    
    deleteUser(id) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) return false;
        
        this.users.splice(userIndex, 1);
        return true;
    }
}

// View - Presentation layer
class UserView {
    displayUsers(users) {
        console.log('=== Users ===');
        users.forEach(user => {
            console.log(`${user.id}: ${user.name} (${user.email})`);
        });
    }
    
    displayUser(user) {
        if (!user) {
            console.log('User not found');
            return;
        }
        console.log(`User: ${user.name}`);
        console.log(`Email: ${user.email}`);
    }
    
    displayMessage(message) {
        console.log(`Message: ${message}`);
    }
}

// Controller - Handles user input and coordinates Model and View
class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    
    getAllUsers() {
        const users = this.model.getAllUsers();
        this.view.displayUsers(users);
    }
    
    getUserById(id) {
        const user = this.model.getUserById(id);
        this.view.displayUser(user);
    }
    
    createUser(userData) {
        const newUser = this.model.createUser(userData);
        this.view.displayMessage(`User ${newUser.name} created`);
        return newUser;
    }
    
    updateUser(id, userData) {
        const updatedUser = this.model.updateUser(id, userData);
        if (updatedUser) {
            this.view.displayMessage(`User ${updatedUser.name} updated`);
        } else {
            this.view.displayMessage('User not found');
        }
        return updatedUser;
    }
    
    deleteUser(id) {
        const deleted = this.model.deleteUser(id);
        if (deleted) {
            this.view.displayMessage('User deleted');
        } else {
            this.view.displayMessage('User not found');
        }
        return deleted;
    }
}

// 2. MVVM Pattern (Model-View-ViewModel)

// Model
class ProductModel {
    constructor() {
        this.products = [];
    }
    
    getProducts() {
        return this.products;
    }
    
    addProduct(product) {
        this.products.push(product);
    }
}

// ViewModel - Business logic and state management
class ProductViewModel {
    constructor(model) {
        this.model = model;
        this.products = [];
        this.selectedProduct = null;
    }
    
    loadProducts() {
        this.products = this.model.getProducts();
    }
    
    selectProduct(product) {
        this.selectedProduct = product;
    }
    
    addProduct(product) {
        this.model.addProduct(product);
        this.loadProducts();
    }
}

// View - UI layer (simplified)
class ProductView {
    constructor(viewModel) {
        this.viewModel = viewModel;
    }
    
    render() {
        console.log('Products:', this.viewModel.products);
        if (this.viewModel.selectedProduct) {
            console.log('Selected:', this.viewModel.selectedProduct);
        }
    }
}

// 3. Layered Architecture

// Presentation Layer
class UserPresentationLayer {
    constructor(serviceLayer) {
        this.service = serviceLayer;
    }
    
    async handleGetUsers(req, res) {
        try {
            const users = await this.service.getAllUsers();
            res.json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

// Service Layer (Business Logic)
class UserServiceLayer {
    constructor(dataLayer) {
        this.dataLayer = dataLayer;
    }
    
    async getAllUsers() {
        return await this.dataLayer.findAll();
    }
    
    async getUserById(id) {
        const user = await this.dataLayer.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

// Data Access Layer
class UserDataLayer {
    constructor() {
        this.users = [];
    }
    
    async findAll() {
        return this.users;
    }
    
    async findById(id) {
        return this.users.find(u => u.id === id);
    }
    
    async create(userData) {
        const newUser = { id: this.users.length + 1, ...userData };
        this.users.push(newUser);
        return newUser;
    }
}

// Example usage
const userModel = new UserModel();
const userView = new UserView();
const userController = new UserController(userModel, userView);

userController.getAllUsers();
userController.createUser({ name: 'Jane Smith', email: 'jane@example.com' });
userController.getAllUsers();

module.exports = {
    UserModel,
    UserView,
    UserController,
    ProductModel,
    ProductViewModel,
    ProductView
};

