const pool = require('../config/db');
const { getDistance } = require('../utils/distance');

/**
 * POST /addSchool
 */
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: { id: result.insertId, name, address, latitude, longitude },
    });
  } catch (error) {
    console.error('[addSchool] Error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /listSchools
 */
const listSchools = async (req, res) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    const search = req.query.search || '';
    const maxDistance = parseFloat(req.query.max_distance) || Infinity;

    // Fetch schools with optional name search
    const [schools] = await pool.execute(
      'SELECT * FROM schools WHERE name LIKE ?',
      [`%${search}%`]
    );

    const schoolsWithDistance = schools
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          getDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
        ),
      }))
      .filter(s => s.distance_km <= maxDistance)
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error('[listSchools] Error:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * GET /school/:id
 */
const getSchoolById = async (req, res) => {
  try {
    const [schools] = await pool.execute('SELECT * FROM schools WHERE id = ?', [req.params.id]);
    if (schools.length === 0) {
      return res.status(404).json({ success: false, message: 'School not found' });
    }
    res.status(200).json({ success: true, data: schools[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * PUT /school/:id
 */
const updateSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const [result] = await pool.execute(
      'UPDATE schools SET name = ?, address = ?, latitude = ?, longitude = ? WHERE id = ?',
      [name, address, latitude, longitude, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'School not found' });
    }

    res.status(200).json({ success: true, message: 'School updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

/**
 * DELETE /school/:id
 */
const deleteSchool = async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM schools WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'School not found' });
    }
    res.status(200).json({ success: true, message: 'School deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};

module.exports = { addSchool, listSchools, getSchoolById, updateSchool, deleteSchool };
