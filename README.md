# School Management API

A production-ready REST API for managing schools with geolocation-based distance sorting using the Haversine formula.

---

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MySQL 8+ (via `mysql2/promise` connection pool)
- **Libraries:** `dotenv`, `express-validator`, `cors`, `helmet`
- **Dev Tools:** `nodemon`

---

## Prerequisites

- Node.js v18 or higher
- MySQL 8 or higher (running locally or remotely)
- npm v9+

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/school-management-api.git
cd school-management-api

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Then open .env and fill in your MySQL credentials

# 4. Initialize the database (run once)
npm run db:init

# 5. Start the development server
npm run dev
```

---

## Environment Variables

| Key           | Description                      | Example            |
|---------------|----------------------------------|--------------------|
| `DB_HOST`     | MySQL host address               | `localhost`        |
| `DB_USER`     | MySQL username                   | `root`             |
| `DB_PASSWORD` | MySQL password                   | `yourpassword`     |
| `DB_NAME`     | Database name                    | `school_management`|
| `PORT`        | Port for the HTTP server         | `3000`             |

---

## API Documentation

### Health Check

**GET** `/`

```json
{
  "message": "School Management API is running 🎓",
  "status": "ok"
}
```

---

### Add School

**POST** `/addSchool`

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 12, New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Success Response — 201 Created:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 12, New Delhi, India",
    "latitude": 28.6139,
    "longitude": 77.2090
  }
}
```

**Validation Error Response — 422:**
```json
{
  "success": false,
  "errors": [
    { "msg": "Name is required", "path": "name", "location": "body" },
    { "msg": "Latitude must be a valid number between -90 and 90", "path": "latitude", "location": "body" }
  ]
}
```

---

### List Schools (sorted by distance)

**GET** `/listSchools?latitude=28.5000&longitude=77.1000`

**Query Parameters:**

| Param       | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| `latitude`  | float  | Yes      | Your current latitude (-90 to 90)    |
| `longitude` | float  | Yes      | Your current longitude (-180 to 180) |

**Success Response — 200 OK:**
```json
{
  "success": true,
  "count": 2,
  "user_location": {
    "latitude": 28.5,
    "longitude": 77.1
  },
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 12, New Delhi",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "created_at": "2024-01-15T10:30:00.000Z",
      "distance_km": 12.43
    },
    {
      "id": 2,
      "name": "Ryan International School",
      "address": "Rohini, New Delhi",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "created_at": "2024-01-15T11:00:00.000Z",
      "distance_km": 22.87
    }
  ]
}
```

**Error Responses:**

| Status | Cause                          |
|--------|--------------------------------|
| `422`  | Invalid or missing query params|
| `500`  | Internal server / DB error     |

---

## Distance Calculation

The API uses the **Haversine formula** to calculate the straight-line distance between two geographic coordinates on Earth's surface. It accounts for Earth's spherical shape by computing the central angle between two points using their latitudes and longitudes, then multiplying by Earth's mean radius (6,371 km). This gives highly accurate distances without requiring expensive map routing.

---

## Deployment

### Railway.app (API)

1. Push your code to a GitHub repository.
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**.
3. Select your repo and set the environment variables in the **Variables** tab.
4. Railway auto-detects Node.js and runs `npm start`.

### PlanetScale (MySQL)

1. Create a free database at [planetscale.com](https://planetscale.com).
2. Create a branch, then use **Connect** to get credentials.
3. Paste the host, user, password, and database name into your Railway environment variables.
4. Run `schema.sql` via the PlanetScale web console or CLI.

---

## Postman Collection

A pre-configured Postman collection is included in the repository: `School_Management_API.postman_collection.json`.

### How to use:
1. Open Postman.
2. Click **Import** and select the `School_Management_API.postman_collection.json` file.
3. The collection includes a `base_url` variable (default: `http://localhost:3000`).
4. You can now test the `Add School` and `List Schools` endpoints directly.

---

### Manual Test Examples (via cURL):

**Add School:**
```bash
curl -X POST http://localhost:3000/addSchool \
     -H "Content-Type: application/json" \
     -d '{"name": "Delhi Public School", "address": "New Delhi", "latitude": 28.61, "longitude": 77.20}'
```

**List Schools:**
```bash
curl "http://localhost:3000/listSchools?latitude=28.5&longitude=77.1"
```

