require('dotenv').config();

const app = require('./app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Verify the database connection before accepting traffic
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected');
    connection.release(); // return connection to the pool immediately

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MySQL:', error.message);
    process.exit(1);
  }
})();
