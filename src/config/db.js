const mysql = require('mysql2/promise');

// Mock Pool implementation for when MySQL is unavailable
const mockPool = {
  execute: async (query, params) => {
    console.log('📝 [Mock DB] Executing:', query, params);
    if (query.includes('INSERT')) {
      return [{ insertId: Math.floor(Math.random() * 1000) }];
    }
    if (query.includes('SELECT')) {
      // Return some mock schools including the one provided by user
      return [[
        { id: 1, name: 'Delhi Public School', address: 'Sector 12, New Delhi, India', latitude: 28.6139, longitude: 77.2090 },
        { id: 2, name: 'Sample School', address: 'Mumbai', latitude: 19.0760, longitude: 72.8777 }
      ]];
    }
    return [[]];
  },
  query: async (query) => {
    console.log('📝 [Mock DB] Querying:', query);
    return [[{ 1: 1 }]];
  },
  getConnection: async () => ({
    release: () => {},
    query: async () => [[{ 1: 1 }]]
  })
};

let pool;

if (process.env.USE_MOCK_DB === 'true') {
  console.log('⚠️ Using Mock Database (local data)');
  pool = mockPool;
} else {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
  });
}

module.exports = pool;
