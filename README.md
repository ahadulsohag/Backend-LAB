# GreenPastures: Elite Farm Management System 🌿🐄

GreenPastures is a professional, full-stack management platform designed for modern farm managers to track livestock health, farm wealth, and operational efficiency. Built with a "Nature-Inspired" premium aesthetic.

## 🚀 Features

- **Livestock Tracking**: Monitor animal species, breeds, weight, and detailed health status.
- **Health Logs**: Record vaccinations, medical treatments, and conditions with a history of records.
- **Wealth Dashboard**: Real-time financial analytics including Total Wealth, Monthly Income, and Expenses.
- **Secure Authentication**: Role-based access control (Admin/User) with JWT tokens.
- **Premium UI**: Modern glassmorphism design, responsive layouts, and data-driven summary cards.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Axios, Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS.

---

## 🏃‍♂️ Getting Started

### 1. Prerequisites
- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/petfarm
   JWT_SECRET=your_secret_key_here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the root folder:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 📋 API Documentation

### Authentication
- `POST /auth/register` - Create a new account (roles: `user`, `admin`).
- `POST /auth/login` - Authenticate and receive a JWT token.

### Livestock
- `GET /api/animals` - List all residents.
- `POST /api/animals` - Register a new animal (Admin only).
- `POST /api/animals/:id/health` - Add a new health record/treatment.

### Finance
- `GET /api/finance` - View all transactions.
- `GET /api/finance/summary` - Get total wealth, income, and expense summary.
- `POST /api/finance` - Record a new income or expense.

---

## 👋 Support
Developed for the **Pet Farm / Livestock Management Lab Exam**. This system fulfills all CRUD, Auth, and Advanced Reporting requirements.
