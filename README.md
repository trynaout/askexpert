# Ask Expert - Online Consultation Platform

A web application that connects users with experts for online consultations. Built with React (TypeScript) for the frontend and Node.js for the backend.

## 🚀 Features

- User authentication and authorization
- Expert profile creation and management
- Consultation booking system
- Real-time expert availability status
- Responsive and modern UI design
- Secure API endpoints

## 🛠️ Tech Stack

### Frontend
- React 
- TypeScript
- Recoil (State Management)
- CSS Modules
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

### Setting up the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:
```bash
npm start
```

### Setting up the Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with:
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
askexpertcursor/
├── backend/                # Backend server code
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── server.js          # Server entry point
│
└── frontend/              # Frontend React application
    ├── public/            # Static files
    └── src/
        ├── components/    # Reusable components
        ├── pages/         # Page components
        ├── services/      # API services
        └── state/         # Recoil state management
```

## 🔒 Environment Variables

### Backend
- `PORT`: Server port number
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Frontend
- `REACT_APP_API_URL`: Backend API URL

## 🚀 Deployment

### Backend
1. Set up your production environment variables
2. Build the application:
```bash
npm run build
```
3. Start the server:
```bash
npm start
```

### Frontend
1. Set up your production environment variables
2. Build the application:
```bash
npm run build
```
3. Deploy the contents of the `build` directory to your hosting service

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/signin`: Sign in to existing account

### Expert Endpoints
- `GET /api/experts`: Get list of all experts
- `GET /api/experts/:id`: Get expert details
- `POST /api/experts`: Create expert profile
- `PUT /api/experts/:id`: Update expert profile

### Consultation Endpoints
- `POST /api/consultations`: Book a consultation
- `GET /api/consultations`: Get user's consultations
- `PUT /api/consultations/:id`: Update consultation status

