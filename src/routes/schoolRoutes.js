const { Router } = require('express');
const {
  addSchool,
  listSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require('../controllers/schoolController');
const { addSchoolRules, listSchoolsRules } = require('../middleware/validate');
const { validate } = require('../middleware/handleValidation');
const { protect } = require('../middleware/auth');

const router = Router();

// Public routes

/**
 * @swagger
 * /listSchools:
 *   get:
 *     summary: List all schools sorted by proximity
 *     tags: [Schools]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema: { type: number }
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema: { type: number }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by school name
 *       - in: query
 *         name: max_distance
 *         schema: { type: number }
 *         description: Filter by max distance in km
 *     responses:
 *       200: { description: Success }
 */
router.get('/listSchools', listSchoolsRules, validate, listSchools);

/**
 * @swagger
 * /school/{id}:
 *   get:
 *     summary: Get school by ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Success }
 */
router.get('/school/:id', getSchoolById);

// Protected Admin routes

/**
 * @swagger
 * /addSchool:
 *   post:
 *     summary: Add a new school
 *     tags: [Schools]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, address, latitude, longitude]
 *             properties:
 *               name: { type: string }
 *               address: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *     responses:
 *       201: { description: Created }
 */
router.post('/addSchool', protect, addSchoolRules, validate, addSchool);

/**
 * @swagger
 * /school/{id}:
 *   put:
 *     summary: Update an existing school
 *     tags: [Schools]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               address: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *     responses:
 *       200: { description: Updated }
 */
router.put('/school/:id', protect, addSchoolRules, validate, updateSchool);

/**
 * @swagger
 * /school/{id}:
 *   delete:
 *     summary: Delete a school
 *     tags: [Schools]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 */
router.delete('/school/:id', protect, deleteSchool);

module.exports = router;
