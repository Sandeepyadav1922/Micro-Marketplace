# Full Stack Web Application

This is a full stack web application developed using React.js for the frontend and Node.js + Express.js for the backend. The application follows REST API architecture and supports complete CRUD operations with proper environment-based configuration.

The project demonstrates frontend-backend integration, API handling, environment variable management, and deployment-ready structure.

## Live Demo

Frontend (Live):
https://micro-marketplace-app.onrender.com

Backend (Live API):
https://micro-marketplace-backend.onrender.com

## Features

- RESTful API Integration
- Full CRUD Operations
- Environment-based API configuration (Local & Production)
- Backend deployment ready
- Clean and scalable folder structure

## Tech Stack

Frontend:
- React.js
- Axios
- bootstrap

Backend:
- Node.js
- Express.js

Database:
- MongoDB

## Environment Configuration

The frontend uses environment variables to switch between:

Local Development:
VITE_API_URL=http://localhost:8080

Production:
VITE_API_URL=https://micro-marketplace-backend.onrender.com

## Installation & Setup

Follow the steps below to run the project locally.

### 1. Clone the Repository

git clone https://github.com/Sandeepyadav1922/Micro-Marketplace.git

cd Micro-Marketplace

## 2. Backend Setup

Go to the backend folder:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend folder and add:

PORT=8080
MONGO_URI=mongodb+srv://skyabc1922:4x4AaTe6QoyRHy3A@cluster0.zcy642f.mongodb.net/?appName=Cluster0
JWT_SECRET_KEY=mysupersecretkey

Start the backend server:

npm start

The backend will run on:
http://localhost:8080

## 3. Frontend Setup

Open a new terminal and go to frontend folder:

cd frontend

Install dependencies:

npm install

Create a .env file inside frontend folder and add:

VITE_API_URL=http://localhost:8080

Start the frontend server:

npm run dev

The frontend will run on:
http://localhost:5173

---

## 4. Production Setup

For deployment, update frontend environment variable:

VITE_API_URL=https://micro-marketplace-backend.onrender.com

Rebuild the frontend before deploying.

## API Endpoints

Base URL (Local):
http://localhost:8080

Base URL (Production):
https://micro-marketplace-backend.onrender.com

### Get All Products

GET /products

Description:
Fetch all items from database.

### Get Single Products

GET /products/:id

Description:
Fetch a single item by ID.

### Create Products

POST /products

Body (JSON):
{
  "title": "Sample Title",
  "description": "Sample Description",
  "image": "image",
  "price" : "price"
}

Description:
Create a new item in the database.

### Update Products

PUT /products/:id

Body (JSON):
{
  "title": "Updated Title"
}

Description:
Update an existing item by ID.

---

### Delete Products

DELETE /products/:id

Description:
Delete an item by ID.

# Review APIs

### Create Review

DELETE /products/:id/review

Description:
Create new Review.

### Delete Review

DELETE /products/:id/review/reviewId

Description:
Delete Review by ID.

# Authentication APIs

### Register User

POST /auth/register

Body (JSON):
{
  "name": "random name",
  "email": "dsh@example.com",
  "password": "3872378"
}

Description:
Creates a new user account and stores encrypted password in the database.

### Login User

POST /auth/login

Body (JSON):
{
  "email": "dsh@example.com",
  "password": "3872378"
}

Response:
{
  "token": "JWT_TOKEN"
}

Description:
Authenticates user and returns a JWT token for authorized access.