# Student Grading System Implementation

## Backend Setup
- [x] Create server.js (Express server with MongoDB connection)
- [x] Create models/User.js (Mongoose schema for users with roles and marks)
- [x] Create routes/auth.js (register, login endpoints)
- [x] Create routes/marks.js (get and update marks endpoints)
- [x] Install backend dependencies (express, mongoose, bcrypt, jsonwebtoken, cors)

## Frontend Components
- [x] Create components/Register.js (registration form, redirect to login)
- [x] Create components/Login.js (login form, store token and role, redirect to dashboards)
- [x] Create components/StudentDashboard.js (fetch and display marks)
- [x] Create components/TeacherDashboard.js (fetch all students, update marks, display marks list)

## Styling
- [x] Create CSS files for each component (Register.css, Login.css, StudentDashboard.css, TeacherDashboard.css)
- [x] Style all pages to be attractive

## Integration
- [x] Update App.js to include Register route
- [x] Connect frontend components to backend APIs
- [x] Test full flow: register -> login -> dashboards -> logout

## Capacitor Setup
- [x] Install Capacitor core and CLI
- [x] Initialize Capacitor
- [x] Add iOS platform
- [x] Build React app for production

## Testing
- [x] Test user registration and login
- [x] Test student viewing marks
- [x] Test teacher updating and viewing marks
- [x] Test admin login and access to marks API
- [x] Test logout functionality
- [x] Fix HTTPS server error (crt) with proxy configuration
- [ ] Test iOS build
