const pool = require('../config/db');
const { getDistance } = require('../utils/distance');

/**
 * POST /api/addSchool
 * Validates input, inserts a new school record, returns the created school.
 */
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Parameterized query — never use string concatenation with user input
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.error('[addSchool] Error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /api/listSchools?latitude=xx&longitude=yy
 * Returns all schools sorted by distance (km) from the given coordinates.
 */
const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    // Fetch all schools from the database
    const [schools] = await pool.execute('SELECT * FROM schools');

    // Compute distance from user location for each school, round to 2 dp
    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance_km: parseFloat(
        getDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
      ),
    }));

    // Sort ascending by distance — closest school first
    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      user_location: { latitude: userLat, longitude: userLon },
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error('[listSchools] Error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { addSchool, listSchools };
