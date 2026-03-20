<div align="center">

# 🐯 WildIndia Virtual Zoo

**An immersive full-stack virtual zoo experience showcasing India's incredible native wildlife.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

- 🦁 **18 Indian Animal Profiles** — Bengal Tiger, Snow Leopard, Gharial, Red Panda, King Cobra & more
- 🌿 **Immersive Forest UI** — Deep jungle theme with falling leaves, firefly particles & bioluminescent accents
- 🎴 **Interactive 3D Cards** — Three.js powered animal cards with mouse-tilt and glow effects
- 📍 **Nearest Zoo Locator** — Find nearby Indian zoos via live geolocation & calculate distances
- 🗺️ **Google Maps Navigation** — Get directions from your location to any zoo
- 🔍 **Animal Search** — Filter wildlife by name or species instantly
- 🔓 **No Login Required** — Fully open and free to explore

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 (Vite), React Router v6, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **3D Rendering** | Three.js |
| **Styling** | Vanilla CSS — Glassmorphism + Forest theme |
| **Fonts** | Google Fonts — Cinzel, Outfit |
| **Auth** | JWT + bcryptjs |

---

## 📁 Project Structure

```
Virtual-zoo/
├── backend/
│   ├── config/             # MongoDB connection
│   ├── controllers/        # Animal, Zoo, Auth logic
│   ├── models/             # Mongoose schemas (Animal, Zoo, User)
│   ├── routes/             # Express API routes
│   ├── utils/              # JWT token helper
│   ├── india_seeder.js     # Database seed script (18 animals)
│   ├── server.js           # Express app entry point
│   └── .env.example        # Environment variable template
└── frontend/
    ├── public/
    └── src/
        ├── components/     # Navbar, ARViewer
        └── pages/          # Home, AnimalDetails
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### 1. Clone the repository
```bash
git clone https://github.com/AshutoshRawa/Virtual-zoo.git
cd Virtual-zoo
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Copy the environment template and fill in your values:
```bash
cp .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_random_secret_key
```

### 3. Seed the Database
```bash
node india_seeder.js
```

### 4. Start the Backend
```bash
npm start
```
> Backend runs at `http://localhost:5001`

### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
> Frontend runs at `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/animals` | Get all animals (supports `?keyword=`) |
| `GET` | `/api/animals/:id` | Get single animal by ID |
| `GET` | `/api/zoos` | Get all zoos |
| `GET` | `/api/zoos/nearest?animalId=` | Get zoos for a specific animal |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

---

## 🔒 Environment Variables

See [`backend/.env.example`](./backend/.env.example) for the full template.

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) |
| `PORT` | Backend port (default: `5001`) |
| `NODE_ENV` | `development` or `production` |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore`.

---

## 🐾 Animals in the Zoo

| | | | |
|---|---|---|---|
| 🐯 Bengal Tiger | 🐘 Indian Elephant | 🦁 Asiatic Lion | 🦏 Indian Rhino |
| 🦚 Indian Peafowl | 🐆 Snow Leopard | 🐆 Indian Leopard | 🐻 Sloth Bear |
| 🐊 Gharial | 🦌 Nilgai | 🐼 Red Panda | 🐍 King Cobra |
| 🐂 Gaur | 🦌 Blackbuck | 🦔 Indian Pangolin | 🐊 Mugger Crocodile |
| 🐕 Dhole | 🐢 Indian Star Tortoise | | |

---

## 📜 License

[MIT License](LICENSE) — free to use and modify.

---

<div align="center">
Built with ❤️ for India's incredible wildlife heritage.
</div>
