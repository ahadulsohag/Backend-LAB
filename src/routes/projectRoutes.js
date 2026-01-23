const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// GET /api/projects - Get all projects with optional filtering
router.get('/', getAllProjects);

// GET /api/projects/:id - Get a specific project
router.get('/:id', getProjectById);

// POST /api/projects - Create a new project (admin)
router.post('/', createProject);

// PUT /api/projects/:id - Update a project (admin)
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete a project (admin)
router.delete('/:id', deleteProject);

module.exports = router;