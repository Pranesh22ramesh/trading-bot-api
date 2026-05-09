const { body, query } = require('express-validator');

// Validation rules for POST /api/addSchool
const addSchoolRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),

  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),

  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
];

// Validation rules for GET /api/listSchools query params
const listSchoolsRules = [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude query param is required'),

  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude query param is required'),
];

module.exports = { addSchoolRules, listSchoolsRules };
