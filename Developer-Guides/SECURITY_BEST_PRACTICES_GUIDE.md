# Security Best Practices Guide - Comprehensive

## Table of Contents
1. [Introduction](#introduction)
2. [Authentication & Authorization](#authentication--authorization)
3. [OWASP Top 10](#owasp-top-10)
4. [Input Validation & Sanitization](#input-validation--sanitization)
5. [Cryptography](#cryptography)
6. [HTTPS/TLS Configuration](#httpstls-configuration)
7. [Secrets Management](#secrets-management)
8. [Security Headers](#security-headers)
9. [Security Testing](#security-testing)
10. [Incident Response](#incident-response)
11. [Compliance](#compliance)
12. [Security in CI/CD](#security-in-cicd)
13. [Resources](#resources)
14. [Summary](#summary)

---

## Introduction

This guide covers security best practices for web applications, APIs, and systems. Learn to protect against common vulnerabilities and implement robust security measures.

### Who This Guide Is For
- Developers
- Security engineers
- DevOps engineers
- Anyone building secure applications

---

## Authentication & Authorization

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant AuthService
    participant Database
    participant TokenService as Token Service
    
    User->>Client: Enter credentials
    Client->>AuthService: POST /login (email, password)
    AuthService->>Database: Query user by email
    Database-->>AuthService: User data (hashed password)
    
    alt Valid Credentials
        AuthService->>AuthService: Verify password hash
        AuthService->>TokenService: Generate Access Token
        TokenService-->>AuthService: JWT Access Token
        AuthService->>TokenService: Generate Refresh Token
        TokenService-->>AuthService: JWT Refresh Token
        AuthService->>Database: Store refresh token
        AuthService-->>Client: Access token + Refresh token
        Client->>Client: Store tokens securely (httpOnly cookie)
        Client-->>User: Authenticated
    else Invalid Credentials
        AuthService->>AuthService: Log failed attempt
        AuthService-->>Client: 401 Unauthorized
        Client-->>User: Authentication failed
    end
```

### Authorization Check Flow

```mermaid
sequenceDiagram
    participant Client
    participant API as API Gateway
    participant AuthMiddleware as Auth Middleware
    participant TokenService as Token Service
    participant AuthzService as Authorization Service
    participant Resource as Protected Resource
    
    Client->>API: Request with JWT Token
    API->>AuthMiddleware: Extract Token
    AuthMiddleware->>TokenService: Validate Token
    
    alt Token Valid
        TokenService->>TokenService: Decode & Verify Token
        TokenService-->>AuthMiddleware: User Claims (id, role, permissions)
        AuthMiddleware->>AuthzService: Check Authorization
        
        AuthzService->>AuthzService: Check User Role
        AuthzService->>AuthzService: Check Permissions
        AuthzService->>AuthzService: Check Resource Access
        
        alt Authorized
            AuthzService-->>AuthMiddleware: Authorized
            AuthMiddleware->>Resource: Forward Request
            Resource-->>AuthMiddleware: Response
            AuthMiddleware-->>API: Response
            API-->>Client: 200 OK + Data
        else Not Authorized
            AuthzService-->>AuthMiddleware: Forbidden
            AuthMiddleware-->>API: 403 Forbidden
            API-->>Client: Access Denied
        end
    else Token Invalid/Expired
        TokenService-->>AuthMiddleware: Token Invalid
        AuthMiddleware-->>API: 401 Unauthorized
        API-->>Client: Please Re-authenticate
    end
```

### Authorization Architecture

```mermaid
graph TB
    subgraph Request[Incoming Request]
        HTTPRequest[HTTP Request<br/>+ JWT Token]
    end
    
    subgraph Auth[Authentication Layer]
        TokenExtractor[Token Extractor]
        TokenValidator[Token Validator]
        UserContext[User Context]
    end
    
    subgraph Authz[Authorization Layer]
        RoleChecker[Role Checker]
        PermissionChecker[Permission Checker]
        PolicyEngine[Policy Engine]
        ResourceChecker[Resource Access Checker]
    end
    
    subgraph Storage[Storage]
        UserDB[(User Database)]
        RoleDB[(Role Database)]
        PolicyDB[(Policy Database)]
    end
    
    subgraph Resource[Protected Resource]
        APIEndpoint[API Endpoint]
        Data[Data]
    end
    
    HTTPRequest --> TokenExtractor
    TokenExtractor --> TokenValidator
    TokenValidator --> UserContext
    UserContext --> RoleChecker
    
    RoleChecker --> UserDB
    RoleChecker --> RoleDB
    RoleChecker --> PermissionChecker
    
    PermissionChecker --> PolicyEngine
    PolicyEngine --> PolicyDB
    PolicyEngine --> ResourceChecker
    
    ResourceChecker --> Resource
    Resource --> APIEndpoint
    APIEndpoint --> Data
    
    style Auth fill:#e1f5ff
    style Authz fill:#fff4e6
    style Resource fill:#e1f5ff
```

### Password Hashing

```typescript
import bcrypt from 'bcrypt';

// Hash password
async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

// Verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

// Usage
const hashedPassword = await hashPassword('userPassword123');
const isValid = await verifyPassword('userPassword123', hashedPassword);
```

### JWT Best Practices

```typescript
import jwt from 'jsonwebtoken';

// Generate token with expiration
function generateToken(user: User): string {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '15m',
            issuer: 'myapp',
            audience: 'myapp-users'
        }
    );
}

// Refresh token
function generateRefreshToken(user: User): string {
    return jwt.sign(
        { id: user.id, type: 'refresh' },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
    );
}

// Verify token
function verifyToken(token: string): UserPayload {
    return jwt.verify(token, process.env.JWT_SECRET!, {
        issuer: 'myapp',
        audience: 'myapp-users'
    }) as UserPayload;
}
```

### Role-Based Access Control (RBAC)

```typescript
interface User {
    id: number;
    role: 'admin' | 'user' | 'moderator';
    permissions: string[];
}

function hasPermission(user: User, permission: string): boolean {
    return user.permissions.includes(permission) || user.role === 'admin';
}

function requirePermission(permission: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!hasPermission(req.user, permission)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

// Usage
app.delete('/api/users/:id', 
    authenticate,
    requirePermission('users:delete'),
    deleteUser
);
```

---

## OWASP Top 10

### OWASP Top 10 Overview

```mermaid
graph TB
    subgraph Critical[Critical Risks]
        A1[#1 Broken Access Control<br/>Unauthorized access to resources]
        A3[#3 Injection<br/>SQL, NoSQL, Command injection]
        A7[#7 Auth Failures<br/>Weak authentication mechanisms]
    end
    
    subgraph High[High Risks]
        A2[#2 Cryptographic Failures<br/>Sensitive data exposure]
        A4[#4 Insecure Design<br/>Flawed security architecture]
        A5[#5 Security Misconfiguration<br/>Default/incomplete configs]
        A8[#8 Data Integrity Failures<br/>Unsafe deserialization]
    end
    
    subgraph Medium[Medium Risks]
        A6[#6 Vulnerable Components<br/>Outdated dependencies]
        A9[#9 Logging Failures<br/>Insufficient logging/monitoring]
        A10[#10 SSRF<br/>Server-Side Request Forgery]
    end
    
    style A1 fill:#ff6b6b
    style A2 fill:#ff8787
    style A3 fill:#ff6b6b
    style A4 fill:#ff8787
    style A5 fill:#ff8787
    style A6 fill:#ffa94d
    style A7 fill:#ff6b6b
    style A8 fill:#ff8787
    style A9 fill:#ffa94d
    style A10 fill:#ffa94d
```

### OWASP Top 10 Risk Matrix

```mermaid
graph LR
    subgraph Impact[Impact]
        HighImpact[High Impact]
        MediumImpact[Medium Impact]
        LowImpact[Low Impact]
    end
    
    subgraph Likelihood[Likelihood]
        HighLikelihood[High Likelihood]
        MediumLikelihood[Medium Likelihood]
        LowLikelihood[Low Likelihood]
    end
    
    HighImpact --> A1
    HighImpact --> A3
    HighImpact --> A7
    MediumImpact --> A2
    MediumImpact --> A4
    MediumImpact --> A5
    LowImpact --> A6
    LowImpact --> A9
    LowImpact --> A10
    
    HighLikelihood --> A1
    HighLikelihood --> A3
    MediumLikelihood --> A2
    MediumLikelihood --> A7
    LowLikelihood --> A6
    LowLikelihood --> A9
    style A3 fill:#ffa8a8
```

### 1. Broken Access Control

```typescript
// BAD: No access control
app.get('/api/users/:id', async (req, res) => {
    const user = await getUser(req.params.id);
    res.json(user); // Anyone can access any user
});

// GOOD: Access control
app.get('/api/users/:id', authenticate, async (req, res) => {
    const userId = req.params.id;
    if (req.user.id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const user = await getUser(userId);
    res.json(user);
});
```

### 2. Cryptographic Failures

```typescript
// BAD: Plain text storage
await db.users.create({
    password: userPassword // Never store plain text
});

// GOOD: Proper hashing
await db.users.create({
    password: await bcrypt.hash(userPassword, 12)
});

// GOOD: Encrypt sensitive data
import crypto from 'crypto';

function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(process.env.ENCRYPTION_KEY!, 'hex'),
        crypto.randomBytes(16)
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
```

### 3. Injection

```typescript
// BAD: SQL injection
app.get('/api/users', async (req, res) => {
    const query = `SELECT * FROM users WHERE name = '${req.query.name}'`;
    const users = await db.query(query); // Vulnerable!
});

// GOOD: Parameterized queries
app.get('/api/users', async (req, res) => {
    const query = 'SELECT * FROM users WHERE name = $1';
    const users = await db.query(query, [req.query.name]);
});

// BAD: NoSQL injection
app.post('/api/users', async (req, res) => {
    const user = await User.findOne({ email: req.body.email }); // Vulnerable if email is user-controlled
});

// GOOD: Input validation
import { z } from 'zod';

const userSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100)
});

app.post('/api/users', async (req, res) => {
    const validated = userSchema.parse(req.body);
    const user = await User.findOne({ email: validated.email });
});
```

### 4. Insecure Design

```typescript
// BAD: Weak password requirements
function validatePassword(password: string): boolean {
    return password.length >= 4; // Too weak
}

// GOOD: Strong password requirements
function validatePassword(password: string): boolean {
    return password.length >= 12 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
}
```

### 5. Security Misconfiguration

```typescript
// BAD: Exposed sensitive information
app.get('/api/config', (req, res) => {
    res.json({
        database: process.env.DATABASE_URL,
        apiKey: process.env.API_KEY // Never expose!
    });
});

// GOOD: Secure configuration
app.get('/api/config', (req, res) => {
    res.json({
        version: process.env.APP_VERSION,
        environment: process.env.NODE_ENV
        // Only expose non-sensitive config
    });
});
```

### 6. Vulnerable Components

```bash
# Regularly update dependencies
npm audit
npm audit fix

# Use dependency scanning in CI/CD
# Check for known vulnerabilities
```

### 7. Authentication Failures

```typescript
// BAD: No rate limiting on login
app.post('/api/login', async (req, res) => {
    // Vulnerable to brute force
});

// GOOD: Rate limiting and account lockout
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // 5 attempts per 15 minutes
    message: 'Too many login attempts'
});

app.post('/api/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.failedAttempts >= 5) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        user.failedAttempts += 1;
        await user.save();
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Reset failed attempts on success
    user.failedAttempts = 0;
    await user.save();
    
    const token = generateToken(user);
    res.json({ token });
});
```

### 8. Software and Data Integrity Failures

```typescript
// Use package lock files
// Verify package integrity
// Use signed packages when possible
```

### 9. Security Logging Failures

```typescript
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'security.log' })
    ]
});

// Log security events
function logSecurityEvent(event: string, details: any) {
    logger.warn('Security Event', {
        event,
        details,
        timestamp: new Date().toISOString(),
        ip: req.ip
    });
}

app.post('/api/login', async (req, res) => {
    // ... login logic
    if (failed) {
        logSecurityEvent('LOGIN_FAILED', { email: req.body.email });
    }
});
```

### 10. Server-Side Request Forgery (SSRF)

```typescript
// BAD: User-controlled URL
app.get('/api/fetch', async (req, res) => {
    const url = req.query.url;
    const response = await fetch(url); // Dangerous!
    res.json(await response.json());
});

// GOOD: Validate and whitelist URLs
const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com'];

function isValidUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return ALLOWED_DOMAINS.includes(parsed.hostname);
    } catch {
        return false;
    }
}

app.get('/api/fetch', async (req, res) => {
    const url = req.query.url;
    if (!isValidUrl(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    const response = await fetch(url);
    res.json(await response.json());
});
```

---

## Input Validation & Sanitization

### Validation

```typescript
import { z } from 'zod';

const userSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    age: z.number().int().min(0).max(150),
    website: z.string().url().optional()
});

app.post('/api/users', async (req, res) => {
    try {
        const validated = userSchema.parse(req.body);
        // Use validated data
    } catch (error) {
        res.status(400).json({ error: 'Validation failed' });
    }
});
```

### Sanitization

```typescript
import DOMPurify from 'isomorphic-dompurify';

// Sanitize HTML
function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html);
}

// Sanitize user input
function sanitizeInput(input: string): string {
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove HTML tags
        .substring(0, 1000); // Limit length
}
```

---

## Cryptography

### Encryption

```typescript
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32);

function encrypt(text: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    
    return {
        encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex')
    };
}

function decrypt(encrypted: string, iv: string, tag: string): string {
    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(iv, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}
```

---

## HTTPS/TLS Configuration

```typescript
import https from 'https';
import fs from 'fs';

const options = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem'),
    // Security headers
    secureProtocol: 'TLSv1_2_method',
    ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384'
};

const server = https.createServer(options, app);
```

---

## Secrets Management

```typescript
// BAD: Hardcoded secrets
const apiKey = 'sk_live_1234567890'; // Never do this!

// GOOD: Environment variables
const apiKey = process.env.API_KEY;

// BETTER: Use secret management service
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

async function getSecret(secretName: string): Promise<string> {
    const client = new SecretsManager({ region: 'us-east-1' });
    const response = await client.getSecretValue({ SecretId: secretName });
    return response.SecretString!;
}
```

---

## Security Headers

```typescript
import helmet from 'helmet';

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:']
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

---

## Security Testing

### Security Testing Flow

```mermaid
flowchart TD
    Start([Security Testing]) --> StaticAnalysis[Static Analysis<br/>SAST]
    StaticAnalysis --> DependencyScan[Dependency Scanning<br/>SCA]
    DependencyScan --> DynamicAnalysis[Dynamic Analysis<br/>DAST]
    DynamicAnalysis --> InteractiveAnalysis[Interactive Analysis<br/>IAST]
    InteractiveAnalysis --> PenetrationTest[Penetration Testing]
    
    StaticAnalysis --> CodeReview[Code Review]
    DependencyScan --> VulnerabilityDB[Vulnerability Database]
    DynamicAnalysis --> RuntimeScan[Runtime Scanning]
    InteractiveAnalysis --> RuntimeAnalysis[Runtime Analysis]
    PenetrationTest --> ManualTesting[Manual Testing]
    
    CodeReview --> Report[Security Report]
    VulnerabilityDB --> Report
    RuntimeScan --> Report
    RuntimeAnalysis --> Report
    ManualTesting --> Report
    
    Report --> Remediate[Remediate Issues]
    Remediate --> Retest[Re-test]
    Retest --> Approve{All Issues<br/>Resolved?}
    Approve -->|No| Remediate
    Approve -->|Yes| Deploy[Approve for Deployment]
    
    style Start fill:#e1f5ff
    style Deploy fill:#fff4e6
```

### Security Testing Architecture

```mermaid
graph TB
    subgraph SAST[Static Application Security Testing]
        CodeScanner[Code Scanner]
        Linter[Security Linter]
        PatternMatcher[Pattern Matcher]
    end
    
    subgraph SCA[Software Composition Analysis]
        DependencyScanner[Dependency Scanner]
        CVE[Vulnerability Database]
        LicenseChecker[License Checker]
    end
    
    subgraph DAST[Dynamic Application Security Testing]
        WebScanner[Web Application Scanner]
        APIScanner[API Scanner]
        Fuzzer[Fuzzing Tool]
    end
    
    subgraph IAST[Interactive Application Security Testing]
        Agent[IAST Agent]
        RuntimeMonitor[Runtime Monitor]
    end
    
    subgraph PenTest[Penetration Testing]
        ManualTester[Security Tester]
        ExploitFramework[Exploit Framework]
    end
    
    CodeScanner --> Report[Security Report]
    Linter --> Report
    DependencyScanner --> CVE
    CVE --> Report
    WebScanner --> Report
    Agent --> Report
    ManualTester --> Report
    
    style SAST fill:#e1f5ff
    style SCA fill:#fff4e6
    style DAST fill:#e1f5ff
    style IAST fill:#fff4e6
```

```typescript
// Security testing with Jest
describe('Security Tests', () => {
    it('should prevent SQL injection', async () => {
        const response = await request(app)
            .get('/api/users')
            .query({ name: "'; DROP TABLE users; --" })
            .expect(400);
    });
    
    it('should require authentication', async () => {
        const response = await request(app)
            .get('/api/users/1')
            .expect(401);
    });
    
    it('should prevent XSS', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: '<script>alert("XSS")</script>' })
            .expect(400);
    });
});
```

---

## Common Pitfalls

### 1. Storing Passwords in Plain Text

```typescript
// BAD: Plain text storage
await db.users.create({
    email: 'user@example.com',
    password: 'password123' // Never do this!
});

// GOOD: Hashed passwords
await db.users.create({
    email: 'user@example.com',
    password: await bcrypt.hash('password123', 12)
});
```

### 2. Exposing Sensitive Data in Errors

```typescript
// BAD: Exposing database errors
try {
    await db.query('SELECT * FROM users');
} catch (error) {
    res.json({ error: error.message }); // May expose DB structure
}

// GOOD: Generic error messages
try {
    await db.query('SELECT * FROM users');
} catch (error) {
    logger.error(error);
    res.json({ error: 'An error occurred' });
}
```

### 3. No Input Validation

```typescript
// BAD: No validation
app.post('/api/users', (req, res) => {
    const user = await createUser(req.body); // Unsafe
});

// GOOD: Validation
const userSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100)
});

app.post('/api/users', (req, res) => {
    const validated = userSchema.parse(req.body);
    const user = await createUser(validated);
});
```

---

## Best Practices

### Security Best Practices

1. **Defense in Depth**
   - Multiple security layers
   - Don't rely on single control
   - Fail securely

2. **Least Privilege**
   - Minimum necessary permissions
   - Principle of least access
   - Regular permission reviews

3. **Secure by Default**
   - Secure configurations
   - Encrypt by default
   - Validate all inputs

4. **Stay Updated**
   - Regular dependency updates
   - Security patches
   - Vulnerability scanning

---

## Real-World Examples

### Example 1: Secure Authentication System

```typescript
// Complete secure authentication
class AuthService {
    async login(email: string, password: string) {
        // Rate limiting
        await this.checkRateLimit(email);
        
        // Find user
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            await this.recordFailedAttempt(email);
            throw new Error('Invalid credentials');
        }
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            await this.recordFailedAttempt(email);
            throw new Error('Invalid credentials');
        }
        
        // Check if account is locked
        if (user.failedAttempts >= 5) {
            throw new Error('Account locked');
        }
        
        // Generate tokens
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        
        // Reset failed attempts
        await this.userRepository.resetFailedAttempts(user.id);
        
        return { accessToken, refreshToken };
    }
}
```

### Example 2: Secure API with Multiple Layers

```typescript
// Multi-layer security
app.use(helmet()); // Security headers
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limiting
app.use(authenticate); // Authentication middleware
app.use(authorize); // Authorization middleware
app.use(validateInput); // Input validation

app.post('/api/orders', requirePermission('orders:create'), async (req, res) => {
    const validated = orderSchema.parse(req.body);
    const order = await orderService.create(validated);
    res.json(order);
});
```

---

## Incident Response

### Incident Response Flow

```mermaid
flowchart TD
    Detect([Security Incident Detected]) --> Classify[Classify Incident]
    Classify --> Assess[Assess Severity]
    
    Assess --> Critical{Critical?}
    Critical -->|Yes| Immediate[Immediate Response]
    Critical -->|No| Standard[Standard Response]
    
    Immediate --> Contain[Contain Incident]
    Standard --> Contain
    
    Contain --> Isolate[Isolate Affected Systems]
    Isolate --> Preserve[Preserve Evidence]
    Preserve --> Investigate[Investigate Root Cause]
    
    Investigate --> Remediate[Remediate Vulnerability]
    Remediate --> Restore[Restore Services]
    Restore --> Monitor[Monitor for Recurrence]
    
    Monitor --> Document[Document Incident]
    Document --> Review[Post-Incident Review]
    Review --> Improve[Improve Security]
    Improve --> End([Incident Closed])
    
    style Detect fill:#ffcccc
    style End fill:#fff4e6
```

### Incident Response Process

```mermaid
sequenceDiagram
    participant Monitor as Monitoring System
    participant SOC as Security Operations
    participant Team as Incident Response Team
    participant Systems as Affected Systems
    participant Management as Management
    participant Legal as Legal/Compliance
    
    Monitor->>SOC: Alert: Security Incident
    SOC->>Team: Activate Response Team
    Team->>Team: Classify & Assess
    
    Team->>Systems: Contain & Isolate
    Systems-->>Team: Systems Isolated
    
    Team->>Team: Investigate Root Cause
    Team->>Team: Collect Evidence
    
    Team->>Management: Report Status
    Team->>Legal: Notify if Required
    
    Team->>Systems: Remediate & Patch
    Systems-->>Team: Systems Secured
    
    Team->>Systems: Restore Services
    Systems-->>Team: Services Restored
    
    Team->>Team: Post-Incident Review
    Team->>Team: Update Security Measures
```

### Incident Response Plan

```typescript
// Incident response workflow
class IncidentResponse {
    async handleSecurityIncident(incident: SecurityIncident) {
        // 1. Identify
        const severity = this.assessSeverity(incident);
        
        // 2. Contain
        if (severity === 'critical') {
            await this.isolateAffectedSystems(incident);
        }
        
        // 3. Eradicate
        await this.removeThreat(incident);
        
        // 4. Recover
        await this.restoreSystems(incident);
        
        // 5. Lessons Learned
        await this.documentIncident(incident);
    }
    
    private assessSeverity(incident: SecurityIncident): string {
        if (incident.type === 'data_breach') return 'critical';
        if (incident.type === 'unauthorized_access') return 'high';
        return 'medium';
    }
}
```

### Incident Response Checklist

1. **Detection**
   - Monitor security logs
   - Set up alerts
   - Regular security audits

2. **Response**
   - Isolate affected systems
   - Preserve evidence
   - Notify stakeholders

3. **Recovery**
   - Patch vulnerabilities
   - Restore from backups
   - Verify system integrity

4. **Post-Incident**
   - Document incident
   - Review procedures
   - Update security measures

---

## Compliance

### GDPR Compliance

```typescript
// GDPR compliance requirements
class GDPRCompliance {
    // Right to access
    async getUserData(userId: string) {
        return await this.dataRepository.findAllUserData(userId);
    }
    
    // Right to erasure
    async deleteUserData(userId: string) {
        await this.dataRepository.deleteAllUserData(userId);
        await this.auditLog.record('DATA_DELETION', userId);
    }
    
    // Data portability
    async exportUserData(userId: string) {
        const data = await this.getUserData(userId);
        return JSON.stringify(data, null, 2);
    }
    
    // Consent management
    async recordConsent(userId: string, consent: Consent) {
        await this.consentRepository.save({
            userId,
            consentType: consent.type,
            granted: consent.granted,
            timestamp: new Date()
        });
    }
}
```

### PCI-DSS Compliance

```typescript
// PCI-DSS requirements for payment processing
class PaymentProcessor {
    // Never store full card numbers
    async processPayment(cardData: CardData) {
        // Tokenize card data
        const token = await this.tokenize(cardData);
        
        // Process with token only
        const result = await this.paymentGateway.charge(token, cardData.amount);
        
        // Log only last 4 digits
        await this.auditLog.record('PAYMENT', {
            last4: cardData.number.slice(-4),
            amount: cardData.amount
        });
        
        return result;
    }
    
    private async tokenize(cardData: CardData): Promise<string> {
        // Use PCI-compliant tokenization service
        return await this.tokenService.createToken(cardData);
    }
}
```

### Compliance Checklist

- **Data Protection**: Encrypt sensitive data
- **Access Control**: Implement proper authentication
- **Audit Logging**: Log all access and changes
- **Data Retention**: Implement retention policies
- **Right to Deletion**: Allow users to delete their data
- **Consent Management**: Track and manage user consent

---

## Security in CI/CD

### Security in CI/CD Pipeline

```mermaid
flowchart TD
    Start([Code Commit]) --> Checkout[Checkout Code]
    Checkout --> SAST[SAST Scan<br/>Static Analysis]
    SAST --> DependencyScan[Dependency Scan<br/>SCA]
    DependencyScan --> SecretScan[Secret Scanning]
    
    SecretScan --> Build[Build Application]
    Build --> ContainerScan[Container Image Scan]
    ContainerScan --> UnitTest[Unit Tests]
    
    UnitTest --> SecurityTest[Security Tests]
    SecurityTest --> DAST[DAST Scan<br/>Dynamic Analysis]
    
    DAST --> QualityGate{Security Quality<br/>Gate Pass?}
    QualityGate -->|No| Block[Block Deployment]
    QualityGate -->|Yes| Deploy[Deploy to Environment]
    
    Deploy --> RuntimeScan[Runtime Security Scan]
    RuntimeScan --> Monitor[Continuous Monitoring]
    
    Block --> Remediate[Remediate Issues]
    Remediate --> Retest[Re-run Pipeline]
    Retest --> Start
    
    style Start fill:#e1f5ff
    style Block fill:#ffcccc
    style Deploy fill:#fff4e6
```

### CI/CD Security Architecture

```mermaid
graph TB
    subgraph Source[Source Control]
        Git[Git Repository]
        PreCommit[Pre-commit Hooks]
    end
    
    subgraph CI[CI Pipeline]
        SAST[SAST Scanner]
        SCA[Dependency Scanner]
        SecretScan[Secret Scanner]
        Build[Build Process]
        ContainerScan[Container Scanner]
    end
    
    subgraph Testing[Security Testing]
        UnitSecurity[Security Unit Tests]
        IntegrationSecurity[Security Integration Tests]
        DAST[DAST Scanner]
    end
    
    subgraph Artifacts[Artifacts]
        ContainerImage[Container Image]
        SBOM[Software Bill of Materials]
        SecurityReport[Security Report]
    end
    
    subgraph Registry[Container Registry]
        RegistryScan[Registry Scanning]
        PolicyCheck[Policy Enforcement]
    end
    
    subgraph CD[CD Pipeline]
        Deploy[Deployment]
        RuntimeSecurity[Runtime Security]
        Monitoring[Security Monitoring]
    end
    
    Git --> PreCommit
    PreCommit --> SAST
    SAST --> SCA
    SCA --> SecretScan
    SecretScan --> Build
    Build --> ContainerScan
    
    ContainerScan --> UnitSecurity
    UnitSecurity --> IntegrationSecurity
    IntegrationSecurity --> DAST
    
    ContainerScan --> ContainerImage
    SCA --> SBOM
    DAST --> SecurityReport
    
    ContainerImage --> RegistryScan
    RegistryScan --> PolicyCheck
    PolicyCheck --> Deploy
    
    Deploy --> RuntimeSecurity
    RuntimeSecurity --> Monitoring
    
    style CI fill:#e1f5ff
    style Testing fill:#fff4e6
    style CD fill:#e1f5ff
```

### Security Scanning in Pipeline

```yaml
# .github/workflows/security.yml
name: Security Scan

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: Run OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
      
      - name: Run SAST scan
        uses: github/super-linter@v4
```

### Secure Secrets Management

```yaml
# Use secrets in CI/CD
- name: Deploy
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  run: |
    aws s3 sync ./dist s3://my-bucket
```

### Security Testing in Pipeline

```yaml
- name: Security Tests
  run: |
    npm run test:security
    npm audit --audit-level=moderate
    npm run lint:security
```

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

---

## Summary

Key security best practices:

1. **Authentication**: Strong passwords, secure tokens
2. **Authorization**: Proper access control
3. **Input Validation**: Validate and sanitize all inputs
4. **Cryptography**: Proper encryption and hashing
5. **HTTPS**: Always use encrypted connections
6. **Secrets Management**: Never hardcode secrets
7. **Security Headers**: Use security headers
8. **OWASP Top 10**: Protect against common vulnerabilities
9. **Security Testing**: Regular security audits
10. **Incident Response**: Plan for security incidents

Master these practices to build secure applications.

