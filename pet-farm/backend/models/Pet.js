const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true }, // e.g., Dog, Cat, Rabbit
    breed: { type: String },
    age: { type: Number },
    status: { type: String, enum: ['Available', 'Adopted', 'Pending'], default: 'Available' },
    imageUrl: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
