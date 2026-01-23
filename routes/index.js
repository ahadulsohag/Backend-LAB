const express = require('express');
const router = express.Router();

// Import route modules
const postsRoutes = require('../src/routes/posts');
const userRoutes = require('../src/routes/userRoutes');

// Use route modules
router.use('/posts', postsRoutes);
router.use('/users', userRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Blog API v1.0.0',
    endpoints: {
      posts: '/api/posts',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

module.exports = router;