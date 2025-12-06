# Full-Stack Todo App

A modern, responsive **Full-Stack Todo Application** built with **React**, **Express**, and **PostgreSQL**. This app allows users to manage tasks efficiently with full **CRUD functionality**, session-based **authentication**, and secure backend operations.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Security](#security)  
- [Contributing](#contributing) 
- [License](#license)  

---

## Features

- ✅ **Responsive React Frontend**: Mobile-friendly UI with smooth interactions.  
- ✅ **CRUD Operations**: Create, read, update, and delete todos effortlessly.  
- ✅ **Session-Based Authentication**: Secure login and signup using sessions.  
- ✅ **User Management**: Each user can only access their own todos.  
- ✅ **Persistent Database**: PostgreSQL stores all tasks and user data.   

---

## Tech Stack

- **Frontend**: React, React Router, Axios  
- **Backend**: Express.js, Node.js, Passport.js (for authentication), bcrypt  
- **Database**: PostgreSQL
- **Others**: CORS, Express-Session, dotenv  

---

## Installation

### Backend

1. Clone the repository:  
   ```bash
   git clone https://github.com/umerzafar4598/todo-fullstack-app.git
   cd todo-fullstack-app/server
Install dependencies:

npm install


Configure environment variables in .env file:

PORT=3000
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=your_secret_key


Run migrations (if using):

npm run migrate


Start the backend server:

npm run dev

### Frontend

Navigate to frontend directory:

cd ../client


Install dependencies:

npm install

Configure environment variables in .env file:

VITE_API_URL=http://localhost:3000/api

Start React app:

npm run dev

## Usage

Register a new account or Login if you already have one.
Add Todos using the input form.
Update tasks or mark as complete.
Delete tasks you no longer need.
Logout securely via session termination.
.

## Api Endpoints

| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| POST   | /api/signup    | Register a new user                |
| POST   | /api/login     | Login user and create session      |
| POST   | /api/logout    | Logout user and destroy session    |
| GET    | /api/todos     | Fetch all todos for logged-in user |
| POST   | /api/todos     | Create a new todo                  |
| PUT    | /api/todos/:id | Update a todo by ID                |
| DELETE | /api/todos/:id | Delete a todo by ID                |

## Security

Session-based authentication using express-session.
Passwords hashed with bcrypt.
Protected routes ensuring users can only access their own data.
CORS configured to allow safe frontend-backend communication.

## Contributing
Contributions are welcome!

Fork the repository.

Create a new branch: git checkout -b feature/your-feature.

Commit your changes: git commit -m "Add your feature".

Push to the branch: git push origin feature/your-feature.

Open a Pull Request.

## License

This project is licensed under the MIT License.