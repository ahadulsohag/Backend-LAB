# Pet Farm API

A simple RESTful API for managing a pet farm, built with Node.js, Express, and MongoDB.

## Features
- User Authentication (JWT)
- Role-based Access (User/Admin)
- Pet CRUD Operations
- Partial Search by Name
- File Upload for Pet Images
- Input Validation & Error Handling

## Setup Instructions
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the template below.
4. Start the server: `npm start` or `npm run dev`

## Environment Variables
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/petfarm
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT
- `GET /auth/profile` - Get current user profile (Protected)
- `DELETE /auth/:id` - Delete a user (Admin only)

### Pets Resource
- `GET /api/pets` - Get all pets
- `POST /api/pets` - Create a new pet (Protected)
- `GET /api/pets/:id` - Get pet by ID
- `PUT /api/pets/:id` - Update pet by ID (Protected)
- `DELETE /api/pets/:id` - Delete pet by ID (Admin only)
- `DELETE /api/pets` - Delete all pets (Admin only)
- `GET /api/pets/search?name=val` - Search pets by name (partial match)
- `PATCH /api/pets/:id/status` - Update pet status (Protected)
- `POST /api/pets/:id/upload` - Upload pet image (Protected)

## Request Example (Create Pet)
```json
{
  "name": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 2,
  "description": "Friendly and energetic."
}
```
