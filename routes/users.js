const express = require('express');
const router = express.Router();

// Mock user data (in production, use a real database)
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
];

// GET /api/users - Get all users
router.get('/', (req, res) => {
  res.json({
    message: 'Users retrieved successfully',
    data: users,
    count: users.length
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} not found`
    });
  }

  res.json({
    message: 'User retrieved successfully',
    data: user
  });
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  const { name, email, role = 'user' } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Name and email are required'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully',
    data: newUser
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} not found`
    });
  }

  const { name, email, role } = req.body;
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  if (role) users[userIndex].role = role;

  res.json({
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} not found`
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({
    message: 'User deleted successfully',
    data: deletedUser
  });
});

module.exports = router;