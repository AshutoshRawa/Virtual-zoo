const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    habitat: {
        type: String
    },
    diet: {
        type: String
    },
    imageUrl: {
        type: String
    },
    modelUrl: {
        type: String
    },
    sketchfabId: {
        type: String
    },
    threatStatus: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Animal', animalSchema);
