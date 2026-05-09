require('dotenv').config();
const pool = require('../src/config/db');

const schools = [
  { name: 'Stanford University', address: 'Stanford, CA 94305, USA', latitude: 37.4275, longitude: -122.1697 },
  { name: 'Harvard University', address: 'Cambridge, MA 02138, USA', latitude: 42.3770, longitude: -71.1167 },
  { name: 'Oxford University', address: 'Oxford OX1 2JD, UK', latitude: 51.7548, longitude: -1.2544 },
  { name: 'Delhi Public School', address: 'Sector 12, New Delhi, India', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Mumbai International School', address: 'Bandra West, Mumbai, India', latitude: 19.0596, longitude: 72.8295 }
];

async function seed() {
  console.log('🌱 Seeding sample schools...');
  try {
    for (const school of schools) {
      await pool.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [school.name, school.address, school.latitude, school.longitude]
      );
      console.log(`✅ Added: ${school.name}`);
    }
    console.log('✨ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    process.exit(0);
  }
}

seed();
