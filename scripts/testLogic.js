const { getDistance } = require('../src/utils/distance');

// Mock data: A few schools with their coordinates
const schools = [
  { name: 'School A', latitude: 28.6139, longitude: 77.2090 }, // Delhi (0 km from user in test 1)
  { name: 'School B', latitude: 19.0760, longitude: 72.8777 }, // Mumbai (~1100 km)
  { name: 'School C', latitude: 13.0827, longitude: 80.2707 }, // Chennai (~1700 km)
];

// Test User Location: Delhi
const userLat = 28.6139;
const userLon = 77.2090;

console.log('🧪 Starting Logic Test for School Management API...\n');

// 1. Test Distance Calculation
console.log('--- Step 1: Testing Distance Calculation ---');
schools.forEach(school => {
  const dist = getDistance(userLat, userLon, school.latitude, school.longitude);
  console.log(`Distance to ${school.name}: ${dist.toFixed(2)} km`);
});

// 2. Test Sorting Logic
console.log('\n--- Step 2: Testing Sorting Logic ---');
const sortedSchools = schools
  .map(school => ({
    ...school,
    distance_km: parseFloat(getDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2))
  }))
  .sort((a, b) => a.distance_km - b.distance_km);

console.log('Sorted Results (Closest First):');
sortedSchools.forEach((s, i) => {
  console.log(`${i + 1}. ${s.name} - ${s.distance_km} km`);
});

// 3. Validation Check (Expected Result: School A should be first)
if (sortedSchools[0].name === 'School A' && sortedSchools[1].name === 'School B') {
  console.log('\n✅ Logic Test PASSED: Schools are correctly calculated and sorted by proximity!');
} else {
  console.log('\n❌ Logic Test FAILED: Sorting or calculation error.');
  process.exit(1);
}
