const express = require('express');
const { body, param } = require('express-validator');
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { published, author, tags } = req.query;

    const filter = {};
    if (published !== undefined) {
      filter.published = published === 'true';
    }
    if (author) {
      filter.author = author;
    }
    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    const posts = await Post.find(filter)
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);

    res.json({
      message: 'Posts retrieved successfully',
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts/:id - Get a specific post
router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid post ID'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', 'username email');
      
      if (!post) {
        return res.status(404).json({
          message: 'Post not found'
        });
      }

      post.views += 1;
      await post.save();

      res.json({
        message: 'Post retrieved successfully',
        post
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// POST /api/posts - Create a new post
router.post('/',
  auth,
  [
    body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
    body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('tags.*').optional().trim().isLength({ min: 1 }).withMessage('Each tag must be a non-empty string'),
    body('published').optional().isBoolean().withMessage('Published must be a boolean')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { title, content, tags = [], published = false } = req.body;
      
      const post = new Post({
        title,
        content,
        author: req.user._id,
        tags,
        published
      });
      
      await post.save();
      await post.populate('author', 'username email');
      
      res.status(201).json({
        message: 'Post created successfully',
        post
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /api/posts/:id - Update a post
router.put('/:id',
  auth,
  [
    param('id').isMongoId().withMessage('Invalid post ID'),
    body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
    body('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
    body('tags.*').optional().trim().isLength({ min: 1 }).withMessage('Each tag must be a non-empty string'),
    body('published').optional().isBoolean().withMessage('Published must be a boolean')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({
          message: 'Post not found'
        });
      }

      if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          message: 'Not authorized to update this post'
        });
      }

      const { title, content, tags, published } = req.body;
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (content !== undefined) updateData.content = content;
      if (tags !== undefined) updateData.tags = tags;
      if (published !== undefined) updateData.published = published;

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).populate('author', 'username email');

      res.json({
        message: 'Post updated successfully',
        post: updatedPost
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/posts/:id - Delete a post
router.delete('/:id',
  auth,
  param('id').isMongoId().withMessage('Invalid post ID'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({
          message: 'Post not found'
        });
      }

      if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          message: 'Not authorized to delete this post'
        });
      }

      await Post.findByIdAndDelete(req.params.id);

      res.json({
        message: 'Post deleted successfully',
        post
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;