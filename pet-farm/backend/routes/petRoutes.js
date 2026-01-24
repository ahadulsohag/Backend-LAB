const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    createPet, getAllPets, getPetById, updatePet,
    deleteAllPets, deletePetById, searchPets,
    updatePetStatus, uploadPetImage
} = require('../controllers/petController');
const { protect, admin } = require('../middleware/authMiddleware');

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

router.route('/')
    .post(protect, createPet)
    .get(getAllPets)
    .delete(protect, admin, deleteAllPets);

router.get('/search', searchPets);

router.route('/:id')
    .get(getPetById)
    .put(protect, updatePet)
    .delete(protect, admin, deletePetById);

router.patch('/:id/status', protect, updatePetStatus);

router.post('/:id/upload', protect, upload.single('image'), uploadPetImage);

module.exports = router;
