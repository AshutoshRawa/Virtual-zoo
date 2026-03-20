const Zoo = require('../models/Zoo');

// @desc    Fetch all zoos or zoos that support specific animals
// @route   GET /api/zoos
// @access  Public
const getZoos = async (req, res) => {
    try {
        // If we want to filter zoos by an animal id
        const animalId = req.query.animalId;
        let query = {};
        if (animalId) {
            query.supportedAnimals = animalId;
        }

        const zoos = await Zoo.find(query).populate('supportedAnimals', 'name');
        res.json(zoos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch nearest zoo based on coordinates (Mock implementation)
// @route   GET /api/zoos/nearest
// @access  Public
const getNearestZoo = async (req, res) => {
    try {
        const { lat, lng, animalId } = req.query;

        // Naive distance calculation or just return all zoos in reality we'd use MongoDB $near
        // For this simulation, we'll return zoos that have the animal and sort them naively or just return first
        let query = {};
        if (animalId) {
            query.supportedAnimals = animalId;
        }

        // In a real application, you'd use a GeoJSON index and $near query.
        // For simplicity without setting up a full spatial index, we'll return all matching zoos.
        const nearestZoos = await Zoo.find(query).populate('supportedAnimals', 'name');

        res.json(nearestZoos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getZoos, getNearestZoo };
