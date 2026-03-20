const mongoose = require('mongoose');

const zooSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String, // E.g., 'New York, USA'
        required: true
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    description: {
        type: String
    },
    supportedAnimals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    }],
    imageUrl: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Zoo', zooSchema);
