require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true, // required to run the whole schema file at once
  });

  try {
    console.log('📖 Reading schema.sql...');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

    console.log('🚀 Initializing database...');
    await connection.query(schema);

    console.log('✅ Database and table initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
  } finally {
    await connection.end();
  }
}

initDB();
