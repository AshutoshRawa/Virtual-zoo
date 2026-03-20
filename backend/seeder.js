const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Animal = require('./models/Animal');
const Zoo = require('./models/Zoo');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Animal.deleteMany();
        await Zoo.deleteMany();

        const animalsToInsert = [
            { name: 'African Elephant', species: 'Loxodonta africana', description: 'The largest land animal on Earth with massive ears and a long trunk.', habitat: 'Savanna', diet: 'Herbivore', threatStatus: 'Vulnerable', imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&h=600&fit=crop' },
            { name: 'Bengal Tiger', species: 'Panthera tigris tigris', description: 'A magnificent striped predator native to the Indian subcontinent.', habitat: 'Tropical Rainforest', diet: 'Carnivore', threatStatus: 'Endangered', imageUrl: 'https://images.unsplash.com/photo-1549480017-d04b6d418dc5?w=800&h=600&fit=crop' },
            { name: 'Emperor Penguin', species: 'Aptenodytes forsteri', description: 'The tallest and heaviest of all living penguin species.', habitat: 'Antarctica', diet: 'Carnivore', threatStatus: 'Near Threatened', imageUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800&h=600&fit=crop' },
            { name: 'Giant Panda', species: 'Ailuropoda melanoleuca', description: 'The beloved black-and-white bear famous for eating bamboo.', habitat: 'Bamboo Forest', diet: 'Herbivore', threatStatus: 'Vulnerable', imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop' },
            { name: 'Red Kangaroo', species: 'Macropus rufus', description: 'The largest of all kangaroos, known for bounding at high speeds.', habitat: 'Desert & Grassland', diet: 'Herbivore', threatStatus: 'Least Concern', imageUrl: 'https://images.unsplash.com/photo-1552554627-c1d0f507742d?w=800&h=600&fit=crop' },
            { name: 'Snow Leopard', species: 'Panthera uncia', description: 'The elusive ghost of the mountains.', habitat: 'Mountains', diet: 'Carnivore', threatStatus: 'Vulnerable', imageUrl: 'https://images.unsplash.com/photo-1551608752-bbb8fb347201?w=800&h=600&fit=crop' }
        ];

        const insertedAnimals = await Animal.insertMany(animalsToInsert);
        console.log('Animals Imported!');

        // Now create zoos linking these animals
        const zoosToInsert = [
            {
                name: 'Central Park Virtual Zoo',
                location: 'New York, USA',
                description: 'Experience wildlife in the heart of the virtual internet.',
                supportedAnimals: [insertedAnimals[0]._id, insertedAnimals[3]._id]
            },
            {
                name: 'San Diego Virtual Safari',
                location: 'San Diego, CA, USA',
                description: 'Extensive enclosure spaces for large predators and herbivores.',
                supportedAnimals: [insertedAnimals[1]._id, insertedAnimals[4]._id, insertedAnimals[5]._id]
            },
            {
                name: 'Arctic Wildlife Rescue',
                location: 'Oslo, Norway',
                description: 'A specialized haven for animals of the cold.',
                supportedAnimals: [insertedAnimals[2]._id, insertedAnimals[5]._id]
            }
        ];

        await Zoo.insertMany(zoosToInsert);
        console.log('Zoos Imported!');

        process.exit();
    } catch (error) {
        console.error(`Error with seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedData();
