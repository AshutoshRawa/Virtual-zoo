const Animal = require('../models/Animal');

// @desc    Fetch all animals or search by name/species
// @route   GET /api/animals
// @access  Public
const getAnimals = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            $or: [
                { name: { $regex: req.query.keyword, $options: 'i' } },
                { species: { $regex: req.query.keyword, $options: 'i' } }
            ]
        } : {};

        const animals = await Animal.find({ ...keyword });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single animal by ID
// @route   GET /api/animals/:id
// @access  Public
const getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id);

        if (animal) {
            res.json(animal);
        } else {
            res.status(404).json({ message: 'Animal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnimals, getAnimalById };
