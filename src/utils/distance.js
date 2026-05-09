/**
 * Haversine Formula
 * Calculates the great-circle distance between two points on a sphere (Earth)
 * given their latitude and longitude in decimal degrees.
 * It accounts for Earth's curvature, making it accurate for geographic distances.
 * Earth's radius used: 6371 km.
 */

// Convert degrees to radians
const toRad = (deg) => (deg * Math.PI) / 180;

/**
 * Returns the distance in kilometres between two geographic coordinates.
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometres
 */
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's mean radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  // Haversine intermediate value
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  // Angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

module.exports = { getDistance };
