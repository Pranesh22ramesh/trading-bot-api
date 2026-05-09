const { Router } = require('express');
const { addSchool, listSchools } = require('../controllers/schoolController');
const { addSchoolRules, listSchoolsRules } = require('../middleware/validate');
const { validate } = require('../middleware/handleValidation');

const router = Router();

// POST /addSchool — validate body, then create school
router.post('/addSchool', addSchoolRules, validate, addSchool);

// GET /listSchools — validate query params, then return sorted list
router.get('/listSchools', listSchoolsRules, validate, listSchools);

module.exports = router;
