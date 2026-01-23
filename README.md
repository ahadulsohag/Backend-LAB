# Node.js Backend API

A complete RESTful API built with Node.js, Express.js, and MongoDB featuring authentication, authorization, and CRUD operations.

## Features

- **User Authentication**: JWT-based registration and login system
- **Authorization**: Role-based access control (user/admin)
- **CRUD Operations**: Complete Create, Read, Update, Delete operations
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling middleware
- **Security**: Password hashing, CORS, Helmet security headers
- **Logging**: Morgan request logging
- **Database**: MongoDB with Mongoose ODM
- **Environment Configuration**: Secure environment variable management

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-super-secret-jwt-key
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users

- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `GET /api/users` - Get all users (admin only)

### Posts (Main Resource)

- `GET /api/posts` - Get all posts (with pagination and filtering)
- `GET /api/posts/:id` - Get specific post
- `POST /api/posts` - Create new post (authenticated)
- `PUT /api/posts/:id` - Update post (author/admin)
- `DELETE /api/posts/:id` - Delete post (author/admin)

## Data Models

### User

- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: user/admin, default: user)
- isActive (Boolean, default: true)

### Post

- title (String, required, max 200 chars)
- content (String, required)
- author (ObjectId, ref: User)
- tags (Array of Strings)
- published (Boolean, default: false)
- views (Number, default: 0)

## Project Structure

```
├── src/
│   ├── server.js                 # Main server file
│   ├── models/                  # Database models
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js
│   │   └── validation.js
│   └── utils/                   # Utility functions
│       └── jwt.js
├── tests/                       # Test files
├── docs/                        # Documentation
├── .env.example                # Environment template
└── package.json
```

## Testing

```bash
npm test
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Request validation
- CORS configuration
- Helmet security headers
- Rate limiting ready

## Error Handling

- Validation error responses
- Duplicate field detection
- Invalid ID format handling
- Comprehensive error logging
- Development vs production error details

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Input validation
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logger
- **dotenv**: Environment variable management
- **nodemon**: Development auto-restart
- **jest**: Testing framework
- **supertest**: HTTP testing utility

## License

ISC
