# Exercise 1: Work with JSON and XML Data

## Objective
Practice parsing, validating, and manipulating JSON and XML data.

## Requirements

### Part 1: JSON Operations

1. **Create JSON Data**
   - Create a JSON object representing a blog post
   - Include: title, author, content, tags (array), published date, comments (array of objects)

2. **Parse and Access**
   - Parse JSON string to object
   - Access nested properties
   - Modify JSON data
   - Convert back to string

3. **JSON Validation**
   - Validate JSON structure
   - Check required fields
   - Validate data types
   - Handle invalid JSON gracefully

### Part 2: JSON API Integration

1. **Fetch JSON Data**
   - Create async function to fetch JSON from API
   - Handle errors
   - Parse response

2. **Send JSON Data**
   - POST JSON data to API
   - Set proper headers
   - Handle response

### Part 3: JSON Transformation

1. **Transform Structure**
   - Convert flat JSON to nested structure
   - Convert nested to flat
   - Filter and map JSON arrays

2. **Data Processing**
   - Calculate statistics from JSON array
   - Group data by property
   - Sort and filter data

### Part 4: XML Handling (Optional)

1. **Parse XML**
   - Parse XML string
   - Extract data from XML
   - Convert XML to JSON

## Starter Code

```javascript
// Sample JSON data
const blogPostJSON = `{
    "title": "My Blog Post",
    "author": "John Doe",
    "content": "Blog content here...",
    "tags": ["tech", "programming"],
    "published": "2024-01-15",
    "comments": [
        {"author": "Alice", "text": "Great post!"}
    ]
}`;

// Your implementations here
```

## Expected Output

```
Parsed JSON:
- Title: My Blog Post
- Author: John Doe
- Tags: tech, programming
- Comments: 1

Transformed JSON:
{
  "post": {
    "title": "My Blog Post",
    "metadata": {
      "author": "John Doe",
      "published": "2024-01-15"
    }
  }
}
```

## Testing

1. Test with valid JSON
2. Test with invalid JSON (error handling)
3. Test nested data access
4. Test API integration (mock API)

## Bonus Challenges

1. Create a JSON schema validator
2. Implement JSON diff function
3. Convert between JSON and XML
4. Create a JSON query language (simple version)
5. Implement JSON compression

## Solution

Check `solutions/solution-1.js` after attempting the exercise.

