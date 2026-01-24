const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
    try {
        const pet = await Pet.create(req.body);
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAllPets = async (req, res) => {
    try {
        await Pet.deleteMany({});
        res.json({ message: 'All pets removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet) {
            await pet.deleteOne();
            res.json({ message: 'Pet removed' });
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchPets = async (req, res) => {
    const { name } = req.query;
    try {
        const pets = await Pet.find({ name: { $regex: name, $options: 'i' } });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePetStatus = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet) {
            pet.status = req.body.status || pet.status;
            const updatedPet = await pet.save();
            res.json(updatedPet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.uploadPetImage = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (pet) {
            pet.imageUrl = `/uploads/${req.file.filename}`;
            await pet.save();
            res.json({ message: 'Image uploaded successfully', imageUrl: pet.imageUrl });
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
