# 🌿 WildIndia Virtual Zoo

A full-stack immersive virtual zoo experience built with the **MERN stack**, focused exclusively on **India's native wildlife**. Explore 18 Indian animal species, view 3D interactive displays, and navigate to the nearest real Indian zoos.

---

## 🦁 Features

- **18 Indian Animal Profiles** — Bengal Tiger, Snow Leopard, Gharial, Red Panda, King Cobra, and more
- **Immersive Forest UI** — Dark jungle theme with falling leaves, firefly particles, and bioluminescent accents
- **Interactive 3D Viewer** — Three.js powered 3D card for each animal with mouse-tilt and glow effects
- **Nearest Zoo Locator** — Find nearby Indian zoos using live geolocation and calculate distances
- **Google Maps Navigation** — Get directions from your location to the nearest zoo
- **Animal Search** — Search wildlife by name or species
- **No Login Required** — Completely open and free to explore

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| 3D Rendering | Three.js |
| Styling | Vanilla CSS (Glassmorphism + Forest theme) |
| Fonts | Google Fonts — Cinzel, Outfit |
| Auth | JWT + bcryptjs (backend ready) |

---

## 📁 Project Structure

```
Virtual-zoo/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Animal, Zoo logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── india_seeder.js # Database seed script
│   └── server.js       # Express server
└── frontend/
    └── src/
        ├── components/ # Navbar, ARViewer
        └── pages/      # Home, AnimalDetails
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Virtual-zoo.git
cd Virtual-zoo
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
NODE_ENV=development
```

### 3. Seed the Database
```bash
node india_seeder.js
```

### 4. Start the Backend
```bash
npm start
```

### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### 6. Open the App
Visit `http://localhost:5173` in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/animals` | Get all animals (supports `?keyword=`) |
| GET | `/api/animals/:id` | Get single animal by ID |
| GET | `/api/zoos` | Get all zoos |
| GET | `/api/zoos/nearest?animalId=` | Get zoos for a specific animal |

---

## 🔒 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `PORT` | Backend port (default: 5001) |
| `NODE_ENV` | Environment (`development` / `production`) |

---

## 🐾 Animals in the Database

Bengal Tiger · Indian Elephant · Asiatic Lion · Indian One-Horned Rhinoceros · Indian Peafowl · Snow Leopard · Indian Leopard · Sloth Bear · Gharial · Nilgai · Red Panda · King Cobra · Gaur · Blackbuck · Indian Pangolin · Mugger Crocodile · Dhole · Indian Star Tortoise

---

## 📜 License

MIT License — free to use and modify.

---

> Built with ❤️ for India's incredible wildlife heritage.
