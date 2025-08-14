# Quorium Backend

A REST API server for managing student data built with Express.js.

## Features

- Get all students
- Get student by ID
- Add new students with validation
- View dashboard statistics (total students, average age, gender distribution)
- Data validation using Joi
- Initial data loaded from dummyjson.com

## API Endpoints

### Students
- `GET /students` - Retrieve all students
- `GET /students/:id` - Get a specific student by ID
- `POST /students` - Add a new student

### Dashboard
- `GET /dashboard/stats` - Get statistical information about students

## Setup

1. Install dependencies:
```sh
npm install
```

2. Start the server:
```sh
node index.js
```

The server will run on port 3000 by default or use the PORT environment variable.

## Development

Run tests using Jest:
```sh
npm test
```

## Student Data Schema

New students must match this schema:
```json
{
  "firstName": "string",
  "lastName": "string", 
  "age": "number",
  "gender": "male|female",
  "email": "string"
}
```

## Dependencies

- express - Web framework
- joi - Data validation
- jest - Testing
- nodemon - Development server

