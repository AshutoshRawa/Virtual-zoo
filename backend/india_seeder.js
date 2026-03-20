const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Animal = require('./models/Animal');
const Zoo = require('./models/Zoo');
const connectDB = require('./config/db');

dotenv.config();

// All Unsplash photo IDs verified via browser search
const BASE = 'https://images.unsplash.com/photo-';
const img = (id) => `${BASE}${id}?w=1000&h=600&fit=crop&q=80`;

const seedData = async () => {
    try {
        await connectDB();
        await Animal.deleteMany();
        await Zoo.deleteMany();

        const animalsToInsert = [
            {
                name: 'Bengal Tiger',
                species: 'Panthera tigris tigris',
                description: 'The Bengal Tiger is the national animal of India and the most numerous tiger subspecies in the world. An apex predator of the dense tropical jungles and mangrove forests, every Bengal Tiger is identified by a completely unique pattern of black stripes. They stalk prey silently before launching explosive burst-speed attacks of up to 60 km/h. Project Tiger, India\'s landmark conservation initiative, has helped stabilize their numbers across major reserves like Ranthambore, Sundarbans, and Jim Corbett.',
                habitat: 'Tropical Rainforests, Mangroves, Deciduous Forests',
                diet: 'Carnivore — deer, wild boar, water buffalo, sambar',
                threatStatus: 'Endangered',
                imageUrl: 'https://images.pexels.com/photos/3352544/pexels-photo-3352544.jpeg?w=1000&h=600&fit=crop'  // User-provided Bengal Tiger photo
            },
            {
                name: 'Indian Elephant',
                species: 'Elephas maximus indicus',
                description: 'The largest land animal in Asia, the Indian Elephant is revered in Hindu culture as the living embodiment of Lord Ganesha. Highly intelligent, these creatures form deeply bonded matriarchal herds led by the oldest female. An adult elephant can consume over 150 kg of vegetation and 180 litres of water per day, making them extraordinary ecosystem engineers as they shape forests in their wake.',
                habitat: 'Grasslands, Dry and Wet Deciduous Forests',
                diet: 'Herbivore — grasses, leaves, bark, stems, fruits',
                threatStatus: 'Endangered',
                imageUrl: img('1557050543-4d5f4e07ef46')  // Verified elephant (already working)
            },
            {
                name: 'Asiatic Lion',
                species: 'Panthera leo persica',
                description: 'The only wild lion population in Asia exists exclusively within the Gir Forest National Park in Gujarat, India. The Asiatic Lion is slightly smaller than its African cousin and can be identified by a distinctive longitudinal fold of skin along its belly. Today, numbers stand at over 600 individuals — a remarkable conservation success story.',
                habitat: 'Dry Deciduous Forest and Open Savanna',
                diet: 'Carnivore — chital, sambar, nilgai, cattle',
                threatStatus: 'Endangered',
                imageUrl: img('1546182990-dffeafbe841d')  // Verified lion (already working)
            },
            {
                name: 'Indian One-Horned Rhinoceros',
                species: 'Rhinoceros unicornis',
                description: 'Distinguished by its prehistoric appearance and famously armored skin that folds in thick plates across its massive body, the Greater One-Horned Rhinoceros is a symbol of survival. Almost entirely restricted to Kaziranga National Park in Assam, this single park protects two-thirds of the entire world population.',
                habitat: 'Tall Elephant Grass and Riverine Forests',
                diet: 'Herbivore — grasses, leaves, aquatic plants, fruits',
                threatStatus: 'Vulnerable',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Great-Indian-one-horned-rhinoceros-at-Kaziranga-national-park-in-Assam-India.jpg/500px-Great-Indian-one-horned-rhinoceros-at-Kaziranga-national-park-in-Assam-India.jpg'  // User-provided rhino photo
            },
            {
                name: 'Indian Peafowl',
                species: 'Pavo cristatus',
                description: 'India\'s national bird, the Indian Peafowl, is one of nature\'s most breathtaking displays of evolutionary artistry. The male\'s iridescent "train" can contain up to 200 feathers and reach 1.8 meters in length. During the monsoon breeding season, the male fans its train in a dramatic shivering display.',
                habitat: 'Deciduous Forests, Agricultural Lands, Urban Parks',
                diet: 'Omnivore — seeds, insects, small reptiles, berries',
                threatStatus: 'Least Concern',
                imageUrl: 'https://i0.wp.com/www.beyourownbirder.com/wp-content/uploads/2018/11/indian-peafowl-male1.jpg?w=670&ssl=1'  // User-provided peafowl photo
            },
            {
                name: 'Snow Leopard',
                species: 'Panthera uncia',
                description: 'Known as the "Ghost of the Mountains," the Snow Leopard is one of the rarest and most enigmatic felines on Earth. Perfectly adapted to the brutal, freezing landscapes of the Indian Himalayas — from Ladakh to Spiti Valley — their wide, fur-covered paws act as natural snowshoes. Their impossibly long, thick tail wraps around them like a living blanket against polar winds.',
                habitat: 'High Alpine Rocky Terrain and Sub-Alpine Zones (3,000–5,500m)',
                diet: 'Carnivore — blue sheep, ibex, marmots, hares',
                threatStatus: 'Vulnerable',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/500px-Irbis4.JPG'  // User-provided snow leopard photo
            },
            {
                name: 'Indian Leopard',
                species: 'Panthera pardus fusca',
                description: 'The Indian Leopard is the most adaptable large predator on the planet, thriving in environments from dense rainforest to rocky hillsides to city fringes. Famous for their extraordinary strength — capable of hauling prey heavier than themselves up into tree canopy — and near-supernatural stealth. Leopards in India coexist in surprisingly close proximity to human settlements, mostly unseen.',
                habitat: 'Rainforests, Scrub Jungles, Rocky Hillsides, Deciduous Forests',
                diet: 'Carnivore — chital, langur, wild boar, domestic livestock',
                threatStatus: 'Vulnerable',
                imageUrl: img('1456926631375-92c8ce872def')  // Verified leopard (already working)
            },
            {
                name: 'Sloth Bear',
                species: 'Melursus ursinus',
                description: 'Shaggy, nocturnal, and wonderfully eccentric, the Sloth Bear is found only on the Indian subcontinent. They possess a specially adapted long snout, a highly mobile lower lip, and missing front upper teeth — creating a biological vacuum cleaner for sucking termites and ants from mounds. The species famously inspired Mowgli\'s companion Baloo in Rudyard Kipling\'s The Jungle Book.',
                habitat: 'Tropical Dry and Moist Deciduous Forests',
                diet: 'Omnivore — termites, ants, wild fruits, honeybee larvae',
                threatStatus: 'Vulnerable',
                imageUrl: 'https://ichef.bbci.co.uk/news/1536/cpsprodpb/5fcc/live/6931c100-b961-11f0-a91b-ddb7c85c6295.jpg.webp'  // User-provided sloth bear photo
            },
            {
                name: 'Gharial',
                species: 'Gavialis gangeticus',
                description: 'The Gharial is the world\'s most extreme crocodilian — its needle-thin, razor-toothed snout up to 1.5m in length is an evolutionary miracle designed exclusively for catching fast-moving fish. Males develop a distinctive bulbous "ghara" (pot) on their snout used for vocalizations. Once found across the entire Gangetic river system, they are now critically restricted to just two rivers in India.',
                habitat: 'Clean, Deep, Fast-Flowing Great River Channels',
                diet: 'Carnivore — almost exclusively fish',
                threatStatus: 'Critically Endangered',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Gharial_san_diego.jpg/500px-Gharial_san_diego.jpg'  // User-provided gharial photo
            },
            {
                name: 'Nilgai (Blue Bull)',
                species: 'Boselaphus tragocamelus',
                description: 'The Nilgai is the largest antelope in Asia, standing up to 1.5 meters at the shoulder. The name literally means "Blue Cow" in Hindi — adult males develop a distinctive bluish-grey coat. Remarkably fast runners achieving 50 km/h, Nilgai can leap over 2-meter-high fences with ease. Sacred to many Hindus, they roam uninhibited through agricultural fields across northen India.',
                habitat: 'Dry Scrub Forest, Grasslands, Agricultural Plains',
                diet: 'Herbivore — grasses, leaves, crops, fruits',
                threatStatus: 'Least Concern',
                imageUrl: 'https://res.cloudinary.com/roundglass/image/upload/c_crop,x_0,y_0,w_2560,h_1439,f_auto/ar_16:9,c_fill,w_auto/g_auto,q_auto/v1748855091/rg/collective/media/nilgai-blue-bull-jbhavya-Getty-Images_qwi49v.jpg'  // User nilgai
            },
            {
                name: 'Red Panda',
                species: 'Ailurus fulgens',
                description: 'Found in the lush temperate forests of the Eastern Himalayas — particularly the high ridges of Sikkim and Arunachal Pradesh — the Red Panda is one of India\'s most enchanting mammals. Despite sharing a name with the Giant Panda, it is the sole member of its own unique family. With its fiery chestnut coat and distinctively ringed tail, it uses a false thumb to grip bamboo like its distant relative.',
                habitat: 'Temperate Broadleaf and Mixed Himalayan Forests (2,200–4,800m)',
                diet: 'Omnivore — bamboo shoots, wild berries, insects, bird eggs',
                threatStatus: 'Endangered',
                imageUrl: 'https://www.thrigbyhall.com/wp-content/uploads/2025/06/IMG_0801_DxO-1.jpg'  // User red panda
            },
            {
                name: 'King Cobra',
                species: 'Ophiophagus hannah',
                description: 'The King Cobra is the world\'s longest venomous snake — adults reach an astonishing 5.5 meters in length. It is the only snake species on Earth that builds a nest for its eggs and actively guards it with extraordinary aggression. When confronted, it can rear up to a third of its body length, spreading a magnificent hood. Despite its venom, it primarily preys on other snakes, even other venomous species.',
                habitat: 'Dense Tropical Rainforests and Bamboo Thickets',
                diet: 'Carnivore — exclusively other snakes, including cobras and rat snakes',
                threatStatus: 'Vulnerable',
                imageUrl: 'https://res.cloudinary.com/roundglass/image/upload/c_crop,x_0,y_0,w_2048,h_1152,f_auto/ar_16:9,c_fill,w_auto/g_auto,q_auto/v1739767141/rg/collective/media/Ophiophagus-hannah_-from-Thailand_Photo-by-P.-Gowri-Shankar-1-1-2048x1365_t1ruli.jpg'  // User king cobra
            },
            {
                name: 'Gaur (Indian Bison)',
                species: 'Bos gaurus',
                description: 'The Gaur is the world\'s largest wild bovine — a massively built, forest-dwelling herbivore that can weigh over a metric tonne. Found across the Western Ghats, Central Indian highlands, and Northeast forests, the Gaur is a striking study in raw power: high-ridged spines, massive curved horns, and glossy dark coats that gleam like polished leather. A healthy Gaur herd is a superlative indicator of a thriving, undisturbed forest ecosystem.',
                habitat: 'Tropical and Subtropical Moist Broadleaf Forests, Grassland Edges',
                diet: 'Herbivore — grasses, bamboo shoots, leaves, bark',
                threatStatus: 'Vulnerable',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlyfT_aruWv2jZ_G2zQaSrkZRF4eZwhES-sw&s'  // User gaur/bison
            },
            {
                name: 'Blackbuck',
                species: 'Antilope cervicapra',
                description: 'The Blackbuck is one of the fastest land animals in Asia, capable of sustaining 80 km/h for extended distances. The adult male undergoes a dramatic transformation at sexual maturity, developing glossy jet-black upper coats contrasting with striking white undersides and spiraling lyre-shaped horns up to 70 cm long. Found in open grasslands of Rajasthan, Gujarat, and Haryana and sacred to the Bishnoi community who protect them fervently.',
                habitat: 'Semi-Arid Grasslands, Open Plains, Agricultural Scrub',
                diet: 'Herbivore — grasses, pods, flowers, crops',
                threatStatus: 'Least Concern',
                imageUrl: 'https://thetravellertrails.in/wp-content/uploads/2025/06/The-Blackbuck-Indias-Fastest-On-Open-Ground.jpg'  // User blackbuck
            },
            {
                name: 'Indian Pangolin',
                species: 'Manis crassicaudata',
                description: 'The Indian Pangolin is the world\'s most trafficked wild mammal. Covered from head to tail in hard overlapping scales made of keratin, the Pangolin is nature\'s living pinecone. When threatened, it rolls into an impenetrable ball. A single Indian Pangolin can consume over 70 million insects per year, making it a critical ecological balancing agent. Current poaching pressure for traditional medicine markets is catastrophic.',
                habitat: 'Tropical and Subtropical Dry Deciduous Forests and Grasslands',
                diet: 'Insectivore — ants and termites exclusively',
                threatStatus: 'Endangered',
                imageUrl: 'https://res.cloudinary.com/dr0zfbman/images/f_auto,q_auto:good/v1741864715/WordPress%20Content/Indian-pangolin_USAID-Asia-1_21668d34e7/Indian-pangolin_USAID-Asia-1_21668d34e7.jpg?_i=AA'  // User pangolin
            },
            {
                name: 'Mugger Crocodile',
                species: 'Crocodylus palustris',
                description: 'The Mugger Crocodile is India\'s most widespread and adaptable crocodilian — thriving in rivers, freshwater lakes, reservoirs, and irrigation canals. Broad-snouted and powerfully built, it can reach nearly 4 meters. Among the most long-lived reptiles, routinely surviving 40–50 years in the wild. They have been documented using sticks as decoys during nesting season to lure nest-building birds close enough to catch.',
                habitat: 'Freshwater Rivers, Still Marshes, Ponds, Man-Made Reservoirs',
                diet: 'Carnivore — fish, frogs, birds, deer, wild boar',
                threatStatus: 'Vulnerable',
                imageUrl: 'https://res.cloudinary.com/roundglass/image/upload/f_auto/v1604404096/roundglass/sustain/marsh-crocodile-mugger-dhritiman-mukherjee_qxctoh.jpg'  // User mugger croc
            },
            {
                name: 'Dhole (Indian Wild Dog)',
                species: 'Cuon alpinus',
                description: 'The Dhole might be the most efficient pack predator on the Indian subcontinent. Working in tight, coordinated packs of 5–20 individuals, they can successfully hunt prey many times their size. Despite having smaller teeth than most pack predators, their stamina and teamwork are unmatched. They communicate with eerie, musical whistle-like calls in the forest. Found predominantly in Central Indian reserves and the Western Ghats.',
                habitat: 'Dense Sal and Teak Forests, Alpine Meadows and Steppes',
                diet: 'Carnivore — chital, sambar, gaur calves, wild boar',
                threatStatus: 'Endangered',
                imageUrl: 'https://cdn1.byjus.com/wp-content/uploads/2023/03/unnamed-10.jpg'  // User dhole/wild dog
            },
            {
                name: 'Indian Star Tortoise',
                species: 'Geochelone elegans',
                description: 'The Indian Star Tortoise is one of the most visually stunning reptiles in the world, with a dramatically domed shell decorated with radiating cream and yellow "star" patterns against a deep black background — each individual with a completely unique design. Found in dry scrub and grasslands of Western India, they are gravely threatened by the international exotic pet trade — among the most seized animals at international borders.',
                habitat: 'Dry Scrubland, Thorn Forest, Semi-Arid Grasslands',
                diet: 'Herbivore — grasses, fallen fruits, flowers, succulents',
                threatStatus: 'Vulnerable',
                imageUrl: img('1437622368342-7a3d73a34c8f')  // Turtle/tortoise photo
            }
        ];

        const insertedAnimals = await Animal.insertMany(animalsToInsert);
        console.log(`✅ ${insertedAnimals.length} Indian Animals Imported!`);

        const zoosToInsert = [
            {
                name: 'National Zoological Park',
                location: 'Mathura Road, New Delhi, Delhi 110003, India',
                coordinates: { lat: 28.6019, lng: 77.2452 },
                description: 'A massive 176-acre zoo in the heart of Delhi, next to a 16th-century Mughal citadel. Home to a wide range of Indian and exotic megafauna.',
                supportedAnimals: [
                    insertedAnimals[0]._id, insertedAnimals[1]._id, insertedAnimals[4]._id,
                    insertedAnimals[7]._id, insertedAnimals[9]._id, insertedAnimals[12]._id
                ]
            },
            {
                name: 'Arignar Anna Zoological Park',
                location: 'Vandalur, Chennai, Tamil Nadu 600048, India',
                coordinates: { lat: 12.8797, lng: 80.0833 },
                description: 'The largest zoological park in India by area, established across 1,490 acres with active breeding programs for endangered species.',
                supportedAnimals: [
                    insertedAnimals[0]._id, insertedAnimals[1]._id, insertedAnimals[3]._id,
                    insertedAnimals[6]._id, insertedAnimals[15]._id
                ]
            },
            {
                name: 'Mysore Zoo (Sri Chamarajendra Zoological Gardens)',
                location: 'Indira Nagar, Mysuru, Karnataka 570010, India',
                coordinates: { lat: 12.3023, lng: 76.6644 },
                description: 'One of the oldest and most popular zoos in India, established in 1892. Famous for wildlife rescue, rehabilitation and rare species exhibits.',
                supportedAnimals: [
                    insertedAnimals[0]._id, insertedAnimals[1]._id, insertedAnimals[4]._id,
                    insertedAnimals[7]._id, insertedAnimals[16]._id
                ]
            },
            {
                name: 'Padmaja Naidu Himalayan Zoological Park',
                location: 'Darjeeling, West Bengal 734101, India',
                coordinates: { lat: 27.0589, lng: 88.2635 },
                description: 'India\'s highest altitude zoo at 7,000 feet, world-famous for breeding Snow Leopards and Red Pandas in captivity.',
                supportedAnimals: [insertedAnimals[5]._id, insertedAnimals[10]._id]
            },
            {
                name: 'Sakkarbaug Zoological Garden',
                location: 'Junagadh, Gujarat 362001, India',
                coordinates: { lat: 21.5303, lng: 70.4729 },
                description: 'The premier breeding center for the endangered Asiatic Lion, directly adjacent to Gir Forest.',
                supportedAnimals: [insertedAnimals[2]._id, insertedAnimals[7]._id, insertedAnimals[13]._id]
            },
            {
                name: 'Nandankanan Zoological Park',
                location: 'Bhubaneswar, Odisha 754005, India',
                coordinates: { lat: 20.3951, lng: 85.8190 },
                description: 'Famous for the first captive breeding of White Tigers in the world. Surrounded by the Chandaka Forest and a scenic lake.',
                supportedAnimals: [insertedAnimals[0]._id, insertedAnimals[1]._id, insertedAnimals[8]._id]
            }
        ];

        await Zoo.insertMany(zoosToInsert);
        console.log(`✅ ${zoosToInsert.length} Indian Zoos Imported!`);
        process.exit(0);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
