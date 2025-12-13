/**
 * Environment Variables and Configuration Examples - TypeScript
 * Environment Variables và Configuration với type safety
 * 
 * TypeScript Best Practices:
 * - Typed environment variables
 * - Configuration interfaces
 * - Type-safe config validation
 * - Environment-specific types
 */

// ============================================================================
// 1. Type Definitions
// ============================================================================

/**
 * Environment type
 */
type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Log level type
 */
type LogLevel = 'error' | 'warn' | 'info' | 'debug';

/**
 * Database configuration interface
 */
interface DatabaseConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    ssl?: boolean;
    pool?: {
        min: number;
        max: number;
    };
}

/**
 * API configuration interface
 */
interface APIConfig {
    key: string;
    secret?: string;
    baseUrl: string;
    timeout: number;
}

/**
 * Logging configuration interface
 */
interface LoggingConfig {
    level: LogLevel;
    format: 'json' | 'pretty';
    file?: string;
}

/**
 * Feature flags interface
 */
interface FeatureFlags {
    featureX: boolean;
    featureY: boolean;
    maintenance?: boolean;
}

/**
 * Complete application configuration
 */
interface AppConfig {
    environment: Environment;
    server: {
        port: number;
        host: string;
    };
    database: DatabaseConfig;
    api: APIConfig;
    logging: LoggingConfig;
    features: FeatureFlags;
    cors?: {
        origin: string[];
        credentials: boolean;
    };
}

// ============================================================================
// 2. Environment Variable Schema
// ============================================================================

/**
 * Environment variable definition
 */
interface EnvVarDefinition {
    type: 'string' | 'number' | 'boolean' | 'array';
    required?: boolean;
    default?: string | number | boolean | string[];
    description?: string;
    min?: number;
    max?: number;
    allowedValues?: string[];
    validator?: (value: string) => boolean;
}

/**
 * Environment schema
 */
interface EnvSchema {
    [key: string]: EnvVarDefinition;
}

/**
 * Environment variable schema
 */
const envSchema: EnvSchema = {
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
    DB_NAME: {
        type: 'string',
        required: true,
        description: 'Database name'
    },
    DB_USER: {
        type: 'string',
        required: true,
        description: 'Database user'
    },
    DB_PASSWORD: {
        type: 'string',
        required: true,
        description: 'Database password'
    },
    API_KEY: {
        type: 'string',
        required: true,
        description: 'API key'
    },
    API_SECRET: {
        type: 'string',
        required: false
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
};

// ============================================================================
// 3. Type Coercion Functions
// ============================================================================

/**
 * Coerce string to number
 * ✅ Best Practice: Type-safe coercion
 */
function coerceNumber(value: string | undefined, defaultValue: number): number {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
}

/**
 * Coerce string to boolean
 */
function coerceBoolean(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    const lower = String(value).toLowerCase();
    return lower === 'true' || lower === '1' || lower === 'yes';
}

/**
 * Coerce string to array
 */
function coerceArray(value: string | undefined, defaultValue: string[] = []): string[] {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    return value.split(',').map(item => item.trim()).filter(Boolean);
}

// ============================================================================
// 4. Type-Safe Configuration Class
// ============================================================================

/**
 * Configuration Manager with type safety
 * ✅ Best Practice: Type-safe configuration access
 */
class Config {
    private readonly config: Record<string, unknown>;
    
    constructor(schema: EnvSchema = envSchema) {
        this.config = this.validateAndCoerce(schema);
    }
    
    /**
     * Validate and coerce environment variables
     */
    private validateAndCoerce(schema: EnvSchema): Record<string, unknown> {
        const config: Record<string, unknown> = {};
        const errors: string[] = [];
        
        for (const [key, definition] of Object.entries(schema)) {
            const value = process.env[key];
            
            // Check required
            if (definition.required && (!value || value.trim() === '')) {
                errors.push(
                    `Missing required environment variable: ${key}${definition.description ? ` (${definition.description})` : ''}`
                );
                continue;
            }
            
            // Use default if value not provided
            if (!value && definition.default !== undefined) {
                config[key] = definition.default;
                continue;
            }
            
            // Coerce based on type
            let coerced: unknown;
            switch (definition.type) {
                case 'number':
                    coerced = coerceNumber(value, definition.default as number);
                    break;
                case 'boolean':
                    coerced = coerceBoolean(value, definition.default as boolean);
                    break;
                case 'array':
                    coerced = coerceArray(value, definition.default as string[]);
                    break;
                case 'string':
                default:
                    coerced = value || definition.default || '';
            }
            
            // Validate allowed values
            if (definition.allowedValues && !definition.allowedValues.includes(String(coerced))) {
                errors.push(
                    `Invalid value for ${key}: ${coerced}. Allowed: ${definition.allowedValues.join(', ')}`
                );
                coerced = definition.default;
            }
            
            // Validate numeric ranges
            if (definition.type === 'number' && typeof coerced === 'number') {
                if (definition.min !== undefined && coerced < definition.min) {
                    errors.push(`${key} value ${coerced} is below minimum ${definition.min}`);
                }
                if (definition.max !== undefined && coerced > definition.max) {
                    errors.push(`${key} value ${coerced} is above maximum ${definition.max}`);
                }
            }
            
            // Custom validator
            if (definition.validator && typeof coerced === 'string' && !definition.validator(coerced)) {
                errors.push(`Invalid format for ${key}: ${coerced}`);
            }
            
            config[key] = coerced;
        }
        
        if (errors.length > 0) {
            throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
        }
        
        return config;
    }
    
    /**
     * Get configuration value with type safety
     * @template T - Expected type
     */
    get<T = unknown>(key: string): T {
        return this.config[key] as T;
    }
    
    /**
     * Get all configuration
     */
    getAll(): Record<string, unknown> {
        return { ...this.config };
    }
    
    /**
     * Get database configuration
     */
    getDatabase(): DatabaseConfig {
        return {
            host: this.get<string>('DB_HOST'),
            port: this.get<number>('DB_PORT'),
            name: this.get<string>('DB_NAME'),
            user: this.get<string>('DB_USER'),
            password: process.env.DB_PASSWORD || '' // Never log
        };
    }
    
    /**
     * Get API configuration
     */
    getAPI(): APIConfig {
        return {
            key: this.get<string>('API_KEY'),
            secret: process.env.API_SECRET, // Never log
            baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
            timeout: coerceNumber(process.env.API_TIMEOUT, 10000)
        };
    }
    
    /**
     * Get feature flags
     */
    getFeatures(): FeatureFlags {
        return {
            featureX: this.get<boolean>('ENABLE_FEATURE_X'),
            featureY: this.get<boolean>('ENABLE_FEATURE_Y')
        };
    }
    
    /**
     * Get environment
     */
    getEnvironment(): Environment {
        return this.get<Environment>('NODE_ENV');
    }
    
    /**
     * Check if development
     */
    isDevelopment(): boolean {
        return this.getEnvironment() === 'development';
    }
    
    /**
     * Check if production
     */
    isProduction(): boolean {
        return this.getEnvironment() === 'production';
    }
    
    /**
     * Check if test
     */
    isTest(): boolean {
        return this.getEnvironment() === 'test';
    }
}

// ============================================================================
// 5. Environment-Specific Configuration
// ============================================================================

/**
 * Environment-specific configuration types
 */
interface EnvironmentConfig {
    database: Partial<DatabaseConfig>;
    api: Partial<APIConfig>;
    logging: Partial<LoggingConfig>;
}

/**
 * Environment configurations
 */
const environmentConfigs: Record<Environment, EnvironmentConfig> = {
    development: {
        database: {
            host: 'localhost',
            port: 5432,
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
        database: {
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
        database: {
            ssl: true
        },
        api: {
            baseUrl: process.env.API_BASE_URL || '',
            timeout: 15000
        },
        logging: {
            level: (process.env.LOG_LEVEL as LogLevel) || 'warn',
            format: 'json'
        }
    },
    
    test: {
        database: {
            host: 'localhost',
            port: 5432,
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
 * ✅ Best Practice: Type-safe environment config
 */
function getEnvironmentConfig(env: Environment = (process.env.NODE_ENV as Environment) || 'development'): EnvironmentConfig {
    return environmentConfigs[env] || environmentConfigs.development;
}

// ============================================================================
// 6. Type-Safe Configuration Builder
// ============================================================================

/**
 * Configuration Builder with type safety
 * ✅ Best Practice: Fluent interface with types
 */
class ConfigBuilder {
    private config: Partial<AppConfig> = {};
    
    withDatabase(dbConfig: DatabaseConfig): this {
        this.config.database = dbConfig;
        return this;
    }
    
    withAPI(apiConfig: APIConfig): this {
        this.config.api = apiConfig;
        return this;
    }
    
    withLogging(loggingConfig: LoggingConfig): this {
        this.config.logging = loggingConfig;
        return this;
    }
    
    withFeatures(features: FeatureFlags): this {
        this.config.features = features;
        return this;
    }
    
    build(): AppConfig {
        if (!this.config.database || !this.config.api || !this.config.logging) {
            throw new Error('Missing required configuration sections');
        }
        
        return {
            environment: (process.env.NODE_ENV as Environment) || 'development',
            server: {
                port: coerceNumber(process.env.PORT, 3000),
                host: process.env.HOST || '0.0.0.0'
            },
            database: this.config.database,
            api: this.config.api,
            logging: this.config.logging,
            features: this.config.features || {
                featureX: false,
                featureY: false
            }
        };
    }
}

// ============================================================================
// 7. Type-Safe Validation
// ============================================================================

/**
 * Validate required environment variables
 * ✅ Best Practice: Type-safe validation
 */
function validateRequiredEnv(required: string[]): void {
    const missing = required.filter(key => !process.env[key] || process.env[key]?.trim() === '');
    
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            `Please check your .env file or environment configuration.`
        );
    }
}

/**
 * Type-safe environment variable validator
 * @template T - Expected type
 */
function validateEnvVar<T>(
    key: string,
    validator: (value: string) => boolean,
    errorMessage?: string
): T {
    const value = process.env[key];
    
    if (!value) {
        throw new Error(`Environment variable ${key} is required`);
    }
    
    if (!validator(value)) {
        throw new Error(
            errorMessage || `Invalid format for environment variable ${key}: ${value}`
        );
    }
    
    return value as T;
}

/**
 * Email validator
 */
function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * URL validator
 */
function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============================================================================
// 8. Complete Type-Safe Configuration
// ============================================================================

/**
 * Create complete application configuration
 * ✅ Best Practice: Type-safe configuration factory
 */
function createAppConfig(): AppConfig {
    const config = new Config();
    const env = config.getEnvironment();
    const envConfig = getEnvironmentConfig(env);
    
    return {
        environment: env,
        server: {
            port: config.get<number>('PORT'),
            host: process.env.HOST || '0.0.0.0'
        },
        database: {
            ...config.getDatabase(),
            ...envConfig.database
        },
        api: {
            ...config.getAPI(),
            ...envConfig.api
        },
        logging: {
            level: (config.get<string>('LOG_LEVEL') as LogLevel) || envConfig.logging.level || 'info',
            format: envConfig.logging.format || 'json',
            ...envConfig.logging
        },
        features: config.getFeatures(),
        cors: {
            origin: coerceArray(process.env.CORS_ORIGIN, ['http://localhost:3000']),
            credentials: coerceBoolean(process.env.CORS_CREDENTIALS, true)
        }
    };
}

// ============================================================================
// 9. Secrets Management Interface
// ============================================================================

/**
 * Secrets Manager interface
 * ✅ Best Practice: Abstract secrets management
 */
interface ISecretsManager {
    getSecret(key: string): Promise<string | null>;
}

/**
 * Environment-based Secrets Manager
 */
class EnvSecretsManager implements ISecretsManager {
    async getSecret(key: string): Promise<string | null> {
        return process.env[key] || null;
    }
}

/**
 * AWS Secrets Manager (example interface)
 */
class AWSSecretsManager implements ISecretsManager {
    async getSecret(key: string): Promise<string | null> {
        // Implementation would fetch from AWS Secrets Manager
        // const client = new SecretsManagerClient({ region: 'us-east-1' });
        // const response = await client.send(new GetSecretValueCommand({ SecretId: key }));
        // return JSON.parse(response.SecretString)[key];
        throw new Error('AWS Secrets Manager not implemented');
    }
}

// ============================================================================
// 10. Best Practices Summary
// ============================================================================

/**
 * TypeScript Environment Configuration Best Practices:
 * 
 * 1. Type Safety:
 *    - Define interfaces for configuration
 *    - Use type-safe getters
 *    - Validate types at runtime
 * 
 * 2. Validation:
 *    - Validate all environment variables
 *    - Use schema-based validation
 *    - Provide helpful error messages
 * 
 * 3. Type Coercion:
 *    - Coerce strings to appropriate types
 *    - Handle defaults properly
 *    - Validate ranges and formats
 * 
 * 4. Environment-Specific:
 *    - Use different configs per environment
 *    - Merge base and environment configs
 *    - Type-safe environment selection
 * 
 * 5. Security:
 *    - Never commit .env files
 *    - Use secrets management in production
 *    - Never log sensitive values
 * 
 * 6. Organization:
 *    - Use configuration classes
 *    - Group related settings
 *    - Provide typed accessors
 */

// Example usage
const config = new Config();
const appConfig = createAppConfig();

console.log('Environment:', config.getEnvironment());
console.log('Port:', config.get<number>('PORT'));
console.log('Database config:', config.getDatabase());

// Export
export {
    Config,
    ConfigBuilder,
    createAppConfig,
    getEnvironmentConfig,
    validateRequiredEnv,
    validateEnvVar,
    coerceNumber,
    coerceBoolean,
    coerceArray,
    isValidEmail,
    isValidURL,
    EnvSecretsManager,
    AWSSecretsManager,
    type Environment,
    type LogLevel,
    type DatabaseConfig,
    type APIConfig,
    type LoggingConfig,
    type FeatureFlags,
    type AppConfig,
    type EnvironmentConfig,
    type EnvSchema,
    type EnvVarDefinition,
    type ISecretsManager
};

