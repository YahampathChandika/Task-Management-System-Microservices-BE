# 🧩 Simple Task Management System – Backend (Microservices + API Gateway)

This project consists of 3 backend microservices and an API Gateway built using Node.js, Express, Sequelize, and MySQL with JWT-based authentication.

---

## 📦 Microservices Overview

| Service          | Port   | Description                                                           |
| ---------------- | ------ | --------------------------------------------------------------------- |
| API Gateway      | `3000` | Centralized entry point for all services and Swagger docs             |
| Auth Service     | `3001` | Handles user login and JWT generation                                 |
| Employee Service | `3002` | Manages employee CRUD                                                 |
| Task Service     | `3003` | Manages task CRUD and assignment (communicates with Employee Service) |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-root>
```

## 2. Create MySQL Databases

```sql
CREATE DATABASE tm-auth;
CREATE DATABASE tm-employee;
CREATE DATABASE tm-task;
```

## 2. ⚙️ Configure Each Service

Each service uses Sequelize. Update the config/config.json file with your DB credentials.

### Example config/config.json:

```json
{
  "development": {
    "username": "your username",
    "password": "your password",
    "database": "tm-employee",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
### Replace "tm-employee" with:

 * tm-auth in auth-service
 * tm-employee in employee-service
 * tm-task in task-service


## 2. 🚀 Start Each Service

### Auth Service (3001)
```bash
cd auth-service
npm install
npm start
```

### Employee Service (3002)
```bash
cd employee-service
npm install
npm start
```

### Task Service (3003)
```bash
cd task-service
npm install
npm start
```

### 🌐 API Gateway (3000)
```bash
cd api-gateway
npm install
node index.js
```

## Access Swagger docs at:
```bash
http://localhost:3000/docs
```

## ✅ Done!

You can now:
* Authenticate via /login
* Manage employees via /employees
* Manage tasks via /tasks

All routes are accessible through the API Gateway.
