# Student Grading System

A web application for managing student grades, built with React frontend and Node.js/Express backend.

## Features

- User authentication (students, teachers, admins)
- Student dashboard to view grades
- Teacher dashboard to manage grades
- Secure API with JWT authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-app
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   npm install
   cd ..
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   MONGO_URI=mongodb://localhost:27017/sgs
   JWT_SECRET=your-secret-key
   ```

## Running the Application

1. Start the backend:
   ```
   cd backend
   npm run dev  # for development with nodemon
   # or
   npm start    # for production
   ```
   Backend will run on http://localhost:5000

2. Start the frontend:
   ```
   npm start
   ```
   Frontend will run on http://localhost:3000

## Default Users

The application comes with pre-registered default users for testing:

- **Student**: Username: `student`, Password: `pass`
- **Teacher**: Username: `teacher`, Password: `pass`
- **Admin**: Username: `admin`, Password: `pass`

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login
- GET /api/grades - Get grades (teacher)
- POST /api/grades - Add grade (teacher)
- PUT /api/grades/:id - Update grade (teacher)
- DELETE /api/grades/:id - Delete grade (teacher)

## CI/CD

This project uses Gitea Actions with Kaniko for continuous integration and deployment.

- On push to main branch, Gitea Actions will build the Docker image using Kaniko and deploy it.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
