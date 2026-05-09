# 🏫 SchoolSphere: Full-Stack School Management System

A professional, production-ready School Management System featuring a **Node.js/Express** backend and a **React/Vite** frontend dashboard.

## 🚀 Features

### 💻 Frontend Dashboard
- **Interactive Map**: Visualize all schools using Leaflet.js with custom markers.
- **Admin Panel**: Secure login to Add, Update, and Delete schools.
- **Proximity Search**: Automatically detects user location and sorts schools by distance.
- **Premium Design**: Sleek dark mode with glassmorphism and smooth animations.

### ⚙️ Backend API
- **JWT Authentication**: Secure admin access for data modification.
- **Geospatial Logic**: Precise distance calculations using the Haversine formula.
- **Interactive Docs**: Full Swagger API documentation available at `/docs`.
- **Database Fallback**: Built-in Mock Mode for testing without a live MySQL connection.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Vanilla CSS (Premium Design), Leaflet, Axios, Lucide Icons.
- **Backend**: Node.js, Express, JWT, Bcrypt, Express-Validator, Swagger, Morgan.
- **Database**: MySQL (supported via `mysql2`) or Mock Mode.

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MySQL (Optional, if using Mock Mode)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Pranesh22ramesh/trading-bot-api.git
cd trading-bot-api

# Install Backend dependencies
npm install

# Install Frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory (refer to `.env.example`):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
USE_MOCK_DB=true
PORT=3000
JWT_SECRET=your_secret_key
```

### 4. Running Locally
**Start Backend:**
```bash
npm run dev
```
*API runs at http://localhost:3000*

**Start Frontend:**
```bash
cd frontend
npm run dev
```
*Dashboard runs at http://localhost:5173*

**Data Seeding (Optional):**
```bash
npm run seed
```
*Populates the database with sample global schools.*

---

## 🌐 Deployment (Render)

This project is optimized for deployment on **Render.com** using the included `render.yaml` Blueprint.

1. Connect your GitHub repo to Render.
2. Select **"Blueprint"** and choose this repository.
3. Render will automatically deploy:
   - **Backend Web Service** (API)
   - **Frontend Web Service** (React Dashboard)

---

## 📂 API Documentation

Once the server is running, navigate to:
`http://localhost:3000/docs`

You can use the Interactive Swagger UI to test all endpoints, including authentication and school management.

---

## 🤝 Contributing
Feel free to fork this project and submit pull requests for any improvements!
