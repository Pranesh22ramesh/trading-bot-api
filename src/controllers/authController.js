const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

/**
 * POST /register
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('[register] Error:', error.message);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

/**
 * POST /login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('[login] Error:', error.message);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

module.exports = { register, login };
