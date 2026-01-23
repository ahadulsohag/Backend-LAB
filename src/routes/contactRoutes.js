const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  getContactStats
} = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/', submitContactForm);

// GET /api/contact - Get all contact submissions (admin)
router.get('/', getAllContactSubmissions);

// GET /api/contact/stats - Get contact form statistics (admin)
router.get('/stats', getContactStats);

// GET /api/contact/:id - Get a specific contact submission (admin)
router.get('/:id', getContactSubmissionById);

// DELETE /api/contact/:id - Delete a contact submission (admin)
router.delete('/:id', deleteContactSubmission);

module.exports = router;