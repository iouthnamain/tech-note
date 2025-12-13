# Exercise 1: Configure Application with Environment Variables

## Objective
Set up environment-based configuration system with proper security practices.

## Requirements

### Part 1: Create Configuration System

1. **Environment Files**
   - Create `.env` file for local development
   - Create `.env.example` template file
   - Document all required variables

2. **Configuration Class**
   - Create Config class to manage settings
   - Load environment variables
   - Provide defaults for optional variables
   - Validate required variables

### Part 2: Environment-Specific Configs

Create configurations for:
1. **Development**
   - Local database
   - Debug mode enabled
   - Detailed logging

2. **Staging**
   - Staging database
   - Production-like settings
   - Error tracking enabled

3. **Production**
   - Production database
   - Optimized settings
   - Security features enabled

### Part 3: Security Implementation

1. **Secrets Management**
   - Never commit `.env` to version control
   - Use `.gitignore` properly
   - Validate all required secrets on startup

2. **Error Handling**
   - Fail fast if required variables missing
   - Provide clear error messages
   - Don't expose secrets in error messages

### Part 4: Configuration Usage

1. **Database Configuration**
   - Load DB credentials from environment
   - Support different databases per environment

2. **API Configuration**
   - Load API keys and endpoints
   - Configure timeouts and retries

3. **Feature Flags**
   - Use environment variables for feature toggles
   - Enable/disable features per environment

## Starter Code

Create `.env.example`:
```
# Database
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

# API
API_KEY=
API_SECRET=

# App
NODE_ENV=development
PORT=3000
```

Create `config.js`:
```javascript
require('dotenv').config();

class Config {
    // Your implementation
}

module.exports = new Config();
```

## Expected Structure

```
project/
├── .env (not in git)
├── .env.example (in git)
├── config/
│   ├── development.js
│   ├── staging.js
│   └── production.js
└── config.js
```

## Testing

1. Test with all variables set
2. Test with missing required variables
3. Test environment switching
4. Verify .gitignore excludes .env

## Bonus Challenges

1. Implement configuration hot-reload
2. Add configuration validation schema
3. Create configuration documentation
4. Implement secrets rotation
5. Add configuration encryption

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

