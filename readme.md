### `README.md`

# Task Management System

## Overview

This is a simple Task Management System built with Node.js, PostgreSQL, and JWT authentication. It provides CRUD operations for managing tasks and secure access to the API endpoints.

## Table of Contents

- [Setup and Running the Project](#setup-and-running-the-project)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Running Tests](#running-tests)
- [Version Control](#version-control)
- [Design Decisions](#design-decisions)

## Setup and Running the Project

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Clone the Repository

```bash
git clone <repository-url>
cd task-management-system
```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```plaintext
NODE_ENV=development
JWT_SECRET=your_jwt_secret
PORT=3000
POSTGRES_DB=testdb
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_HOST=db
```

### Running the Project

Build and run the Docker containers using Docker Compose:

```bash
docker-compose up --build
```

This command will start the application on `http://localhost:3000`.

## API Documentation

### Authentication

- **Register a new user**

  ```
  POST /api/register
  ```

  **Request Body:**

  ```json
  {
    "username": "user1",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "uuid",
      "username": "user1",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

- **Login and get a JWT token**

  ```
  POST /api/login
  ```

  **Request Body:**

  ```json
  {
    "username": "user1",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "username": "user1",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

### Tasks

- **Create a new task**

  ```
  POST /api/tasks
  ```

  **Request Header:**

  ```
  x-access-token: jwt_token
  ```

  **Request Body:**

  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending"
  }
  ```

  **Response:**

  ```json
  {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

- **Get all tasks**

  ```
  GET /api/tasks
  ```

  **Request Header:**

  ```
  x-access-token: jwt_token
  ```

  **Response:**

  ```json
  [
    {
      "id": "uuid",
      "title": "Task Title",
      "description": "Task Description",
      "status": "Pending",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    ...
  ]
  ```

- **Get a task by ID**

  ```
  GET /api/tasks/:id
  ```

  **Request Header:**

  ```
  x-access-token: jwt_token
  ```

  **Response:**

  ```json
  {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

- **Update a task**

  ```
  PUT /api/tasks/:id
  ```

  **Request Header:**

  ```
  x-access-token: jwt_token
  ```

  **Request Body:**

  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "In Progress"
  }
  ```

  **Response:**

  ```json
  {
    "id": "uuid",
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "In Progress",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

- **Delete a task**

  ```
  DELETE /api/tasks/:id
  ```

  **Request Header:**

  ```
  x-access-token: jwt_token
  ```

  **Response:**

  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Database Schema

### Users Table

- `id`: UUID (Primary Key)
- `username`: String (Unique)
- `password`: String (Hashed)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Tasks Table

- `id`: UUID (Primary Key)
- `title`: String
- `description`: Text
- `status`: Enum (Pending, In Progress, Completed)
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Running Tests

To run the tests inside the Docker container, use:

```bash
docker-compose run test
```

This command will execute all unit and integration tests.
