/**
 * Environment Variables and Configuration Examples - JavaScript
 * Environment Variables và Configuration với best practices
 * 
 * Best Practices:
 * - Always validate environment variables
 * - Use schema validation
 * - Provide type coercion
 * - Use environment-specific configs
 * - Never commit secrets
 * - Use secrets management in production
 */

'use strict';

// Install: npm install dotenv
require('dotenv').config();

// ============================================================================
// 1. Environment Variable Schema
// ============================================================================

/**
 * Environment variable schema definition
 * ✅ Best Practice: Define schema for validation
 */
const envSchema = {
    // Required variables
    required: {
        DB_NAME: {
            type: 'string',
            description: 'Database name'
        },
        DB_USER: {
            type: 'string',
            description: 'Database user'
        },
        API_KEY: {
            type: 'string',
            description: 'API key for external services'
        }
    },
    
    // Optional variables with defaults
    optional: {
        NODE_ENV: {
            type: 'string',
            default: 'development',
            allowedValues: ['development', 'staging', 'production', 'test']
        },
        PORT: {
            type: 'number',
            default: 3000,
            min: 1,
            max: 65535
        },
        DB_HOST: {
            type: 'string',
            default: 'localhost'
        },
        DB_PORT: {
            type: 'number',
            default: 5432,
            min: 1,
            max: 65535
        },
        LOG_LEVEL: {
            type: 'string',
            default: 'info',
            allowedValues: ['error', 'warn', 'info', 'debug']
        },
        ENABLE_FEATURE_X: {
            type: 'boolean',
            default: false
        },
        ENABLE_FEATURE_Y: {
            type: 'boolean',
            default: false
        }
    }
};

// ============================================================================
// 2. Type Coercion Helpers
// ============================================================================

/**
 * Coerce string to number
 * ✅ Best Practice: Type coercion with validation
 * @param {string} value - String value to coerce
 * @param {number} defaultValue - Default value if invalid
 * @returns {number} Coerced number
 */
function coerceNumber(value, defaultValue = 0) {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
}

/**
 * Coerce string to boolean
 * ✅ Best Practice: Handle various boolean representations
 * @param {string} value - String value to coerce
 * @param {boolean} defaultValue - Default value
 * @returns {boolean} Coerced boolean
 */
function coerceBoolean(value, defaultValue = false) {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    const lower = String(value).toLowerCase();
    return lower === 'true' || lower === '1' || lower === 'yes';
}

/**
 * Coerce string to array
 * ✅ Best Practice: Support comma-separated values
 * @param {string} value - Comma-separated string
 * @param {Array} defaultValue - Default value
 * @returns {Array} Coerced array
 */
function coerceArray(value, defaultValue = []) {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return String(value).split(',').map(item => item.trim()).filter(Boolean);
}

// ============================================================================
// 3. Schema Validation
// ============================================================================

/**
 * Validate environment variables against schema
 * ✅ Best Practice: Comprehensive validation
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result
 */
function validateEnvSchema(schema) {
    const errors = [];
    const warnings = [];
    const config = {};
    
    // Validate required variables
    for (const [key, definition] of Object.entries(schema.required || {})) {
        const value = process.env[key];
        
        if (!value || value.trim() === '') {
            errors.push(`Missing required environment variable: ${key} (${definition.description})`);
            continue;
        }
        
        config[key] = coerceValue(value, definition);
    }
    
    // Validate optional variables
    for (const [key, definition] of Object.entries(schema.optional || {})) {
        const value = process.env[key];
        
        if (value === undefined || value === null) {
            config[key] = definition.default;
            continue;
        }
        
        // Validate allowed values
        if (definition.allowedValues && !definition.allowedValues.includes(value)) {
            warnings.push(
                `Invalid value for ${key}: ${value}. Allowed: ${definition.allowedValues.join(', ')}. Using default: ${definition.default}`
            );
            config[key] = definition.default;
            continue;
        }
        
        const coerced = coerceValue(value, definition);
        
        // Validate numeric ranges
        if (definition.type === 'number') {
            if (definition.min !== undefined && coerced < definition.min) {
                warnings.push(`${key} value ${coerced} is below minimum ${definition.min}`);
            }
            if (definition.max !== undefined && coerced > definition.max) {
                warnings.push(`${key} value ${coerced} is above maximum ${definition.max}`);
            }
        }
        
        config[key] = coerced;
    }
    
    return {
        valid: errors.length === 0,
        errors,
        warnings,
        config
    };
}

/**
 * Coerce value based on type definition
 * @param {string} value - Value to coerce
 * @param {Object} definition - Type definition
 * @returns {*} Coerced value
 */
function coerceValue(value, definition) {
    switch (definition.type) {
        case 'number':
            return coerceNumber(value, definition.default);
        case 'boolean':
            return coerceBoolean(value, definition.default);
        case 'array':
            return coerceArray(value, definition.default);
        case 'string':
        default:
            return value;
    }
}

// ============================================================================
// 4. Configuration Management Class
// ============================================================================

/**
 * Configuration Manager
 * ✅ Best Practice: Centralized configuration management
 */
class Config {
    #config = {};
    #validated = false;
    
    constructor(schema = envSchema) {
        const validation = validateEnvSchema(schema);
        
        if (!validation.valid) {
            throw new Error(
                `Configuration validation failed:\n${validation.errors.join('\n')}`
            );
        }
        
        // Log warnings
        if (validation.warnings.length > 0) {
            console.warn('Configuration warnings:');
            validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
        }
        
        this.#config = validation.config;
        this.#validated = true;
    }
    
    /**
     * Get configuration value
     * @param {string} key - Configuration key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Configuration value
     */
    get(key, defaultValue = undefined) {
        return this.#config[key] ?? defaultValue;
    }
    
    /**
     * Get all configuration
     * @returns {Object} Configuration object
     */
    getAll() {
        return { ...this.#config };
    }
    
    /**
     * Get database configuration
     * @returns {Object} Database config
     */
    getDatabase() {
        return {
            host: this.get('DB_HOST'),
            port: this.get('DB_PORT'),
            name: this.get('DB_NAME'),
            user: this.get('DB_USER'),
            password: process.env.DB_PASSWORD // Never log passwords
        };
    }
    
    /**
     * Get API configuration
     * @returns {Object} API config
     */
    getAPI() {
        return {
            key: this.get('API_KEY'),
            secret: process.env.API_SECRET // Never log secrets
        };
    }
    
    /**
     * Get feature flags
     * @returns {Object} Feature flags
     */
    getFeatures() {
        return {
            featureX: this.get('ENABLE_FEATURE_X'),
            featureY: this.get('ENABLE_FEATURE_Y')
        };
    }
    
    /**
     * Check if development environment
     * @returns {boolean} True if development
     */
    isDevelopment() {
        return this.get('NODE_ENV') === 'development';
    }
    
    /**
     * Check if production environment
     * @returns {boolean} True if production
     */
    isProduction() {
        return this.get('NODE_ENV') === 'production';
    }
    
    /**
     * Check if test environment
     * @returns {boolean} True if test
     */
    isTest() {
        return this.get('NODE_ENV') === 'test';
    }
    
    /**
     * Get environment name
     * @returns {string} Environment name
     */
    getEnvironment() {
        return this.get('NODE_ENV');
    }
}

// ============================================================================
// 5. Environment-Specific Configuration
// ============================================================================

/**
 * Environment-specific configuration
 * ✅ Best Practice: Separate configs per environment
 */
const environmentConfigs = {
    development: {
        db: {
            host: 'localhost',
            port: 5432,
            name: 'myapp_dev',
            ssl: false
        },
        api: {
            baseUrl: 'http://localhost:3000',
            timeout: 5000
        },
        logging: {
            level: 'debug',
            format: 'pretty'
        }
    },
    
    staging: {
        db: {
            host: process.env.DB_HOST || 'staging-db.example.com',
            port: parseInt(process.env.DB_PORT) || 5432,
            name: process.env.DB_NAME || 'myapp_staging',
            ssl: true
        },
        api: {
            baseUrl: process.env.API_BASE_URL || 'https://staging-api.example.com',
            timeout: 10000
        },
        logging: {
            level: 'info',
            format: 'json'
        }
    },
    
    production: {
        db: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5432,
            name: process.env.DB_NAME,
            ssl: true
        },
        api: {
            baseUrl: process.env.API_BASE_URL,
            timeout: 15000
        },
        logging: {
            level: process.env.LOG_LEVEL || 'warn',
            format: 'json'
        }
    },
    
    test: {
        db: {
            host: 'localhost',
            port: 5432,
            name: 'myapp_test',
            ssl: false
        },
        api: {
            baseUrl: 'http://localhost:3001',
            timeout: 1000
        },
        logging: {
            level: 'error',
            format: 'json'
        }
    }
};

/**
 * Get environment-specific configuration
 * ✅ Best Practice: Merge base and environment configs
 * @param {string} env - Environment name
 * @returns {Object} Environment configuration
 */
function getEnvironmentConfig(env = process.env.NODE_ENV || 'development') {
    const baseConfig = {
        appName: 'MyApp',
        version: process.env.APP_VERSION || '1.0.0'
    };
    
    const envConfig = environmentConfigs[env] || environmentConfigs.development;
    
    return {
        ...baseConfig,
        ...envConfig,
        environment: env
    };
}

// ============================================================================
// 6. Secrets Management
// ============================================================================

/**
 * Secrets Manager Interface
 * ✅ Best Practice: Abstract secrets management
 */
class SecretsManager {
    /**
     * Get secret value
     * @param {string} key - Secret key
     * @returns {Promise<string>} Secret value
     */
    async getSecret(key) {
        // In production, fetch from secrets management service
        // For development, use environment variables
        if (process.env.NODE_ENV === 'production') {
            // return await this.fetchFromSecretsService(key);
            throw new Error('Secrets service not configured');
        }
        
        return process.env[key] || null;
    }
    
    /**
     * Fetch from AWS Secrets Manager (example)
     * @param {string} secretName - Secret name
     * @returns {Promise<Object>} Secret object
     */
    async fetchFromAWSSecretsManager(secretName) {
        // Example implementation:
        // const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
        // const client = new SecretsManagerClient({ region: 'us-east-1' });
        // const response = await client.send(new GetSecretValueCommand({ SecretId: secretName }));
        // return JSON.parse(response.SecretString);
        throw new Error('AWS Secrets Manager not implemented');
    }
}

// ============================================================================
// 7. Configuration Builder Pattern
// ============================================================================

/**
 * Configuration Builder
 * ✅ Best Practice: Fluent interface for configuration
 */
class ConfigBuilder {
    constructor() {
        this.config = {};
    }
    
    /**
     * Set database configuration
     * @param {Object} dbConfig - Database configuration
     * @returns {ConfigBuilder} Builder instance
     */
    withDatabase(dbConfig) {
        this.config.database = dbConfig;
        return this;
    }
    
    /**
     * Set API configuration
     * @param {Object} apiConfig - API configuration
     * @returns {ConfigBuilder} Builder instance
     */
    withAPI(apiConfig) {
        this.config.api = apiConfig;
        return this;
    }
    
    /**
     * Set feature flags
     * @param {Object} features - Feature flags
     * @returns {ConfigBuilder} Builder instance
     */
    withFeatures(features) {
        this.config.features = features;
        return this;
    }
    
    /**
     * Build configuration
     * @returns {Object} Final configuration
     */
    build() {
        return { ...this.config };
    }
}

// ============================================================================
// 8. Configuration Validation
// ============================================================================

/**
 * Validate environment variables
 * ✅ Best Practice: Validate on application startup
 * @param {Array<string>} required - Required variable names
 * @throws {Error} If validation fails
 */
function validateRequiredEnv(required = []) {
    const missing = required.filter(key => !process.env[key] || process.env[key].trim() === '');
    
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            `Please check your .env file or environment configuration.`
        );
    }
}

/**
 * Validate environment variable format
 * ✅ Best Practice: Validate format, not just presence
 * @param {string} key - Variable name
 * @param {Function} validator - Validation function
 * @throws {Error} If validation fails
 */
function validateEnvFormat(key, validator) {
    const value = process.env[key];
    
    if (value && !validator(value)) {
        throw new Error(`Invalid format for environment variable ${key}: ${value}`);
    }
}

// Email format validator
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// URL format validator
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============================================================================
// 9. Configuration with Type Coercion
// ============================================================================

/**
 * Get configuration with automatic type coercion
 * ✅ Best Practice: Type-safe configuration access
 */
const appConfig = {
    // Server configuration
    server: {
        port: coerceNumber(process.env.PORT, 3000),
        host: process.env.HOST || '0.0.0.0',
        env: process.env.NODE_ENV || 'development'
    },
    
    // Database configuration
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: coerceNumber(process.env.DB_PORT, 5432),
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: coerceBoolean(process.env.DB_SSL, false),
        pool: {
            min: coerceNumber(process.env.DB_POOL_MIN, 2),
            max: coerceNumber(process.env.DB_POOL_MAX, 10)
        }
    },
    
    // API configuration
    api: {
        key: process.env.API_KEY,
        secret: process.env.API_SECRET,
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        timeout: coerceNumber(process.env.API_TIMEOUT, 10000)
    },
    
    // Logging configuration
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.LOG_FORMAT || 'json',
        file: process.env.LOG_FILE || null
    },
    
    // Feature flags
    features: {
        featureX: coerceBoolean(process.env.ENABLE_FEATURE_X, false),
        featureY: coerceBoolean(process.env.ENABLE_FEATURE_Y, false),
        maintenance: coerceBoolean(process.env.MAINTENANCE_MODE, false)
    },
    
    // CORS configuration
    cors: {
        origin: coerceArray(process.env.CORS_ORIGIN, ['http://localhost:3000']),
        credentials: coerceBoolean(process.env.CORS_CREDENTIALS, true)
    }
};

// ============================================================================
// 10. Security Best Practices
// ============================================================================

/**
 * Security Best Practices:
 * 
 * ✅ DO:
 * - Never commit .env files to version control
 * - Use .gitignore to exclude .env files
 * - Use environment variables for all secrets
 * - Validate all environment variables
 * - Use secrets management services in production
 * - Rotate secrets regularly
 * - Use different secrets per environment
 * - Never log secrets or sensitive data
 * 
 * ❌ DON'T:
 * - Hardcode secrets in code
 * - Commit .env files
 * - Share .env files via insecure channels
 * - Use production secrets in development
 * - Log sensitive environment variables
 * - Store secrets in client-side code
 */

// .gitignore example:
/*
# Environment variables
.env
.env.local
.env.*.local
.env.production
.env.staging

# Logs
*.log
npm-debug.log*

# Dependencies
node_modules/
*/

// ============================================================================
// 11. Example Usage
// ============================================================================

// Initialize configuration
const config = new Config(envSchema);

// Access configuration
console.log('Environment:', config.getEnvironment());
console.log('Port:', config.get('PORT'));
console.log('Database:', config.getDatabase());
console.log('Features:', config.getFeatures());

// Environment-specific config
const envConfig = getEnvironmentConfig();
console.log('Environment config:', envConfig);

// Validate required variables
try {
    validateRequiredEnv(['DB_NAME', 'DB_USER', 'API_KEY']);
    console.log('Environment variables validated');
} catch (error) {
    console.error('Validation failed:', error.message);
    process.exit(1);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Config,
        ConfigBuilder,
        SecretsManager,
        validateEnvSchema,
        validateRequiredEnv,
        validateEnvFormat,
        coerceNumber,
        coerceBoolean,
        coerceArray,
        getEnvironmentConfig,
        envSchema,
        appConfig,
        isValidEmail,
        isValidURL
    };
}
