const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');

// GET /api/skills - Get all skills with optional filtering
router.get('/', getAllSkills);

// GET /api/skills/:id - Get a specific skill
router.get('/:id', getSkillById);

// POST /api/skills - Create a new skill (admin)
router.post('/', createSkill);

// PUT /api/skills/:id - Update a skill (admin)
router.put('/:id', updateSkill);

// DELETE /api/skills/:id - Delete a skill (admin)
router.delete('/:id', deleteSkill);

module.exports = router;