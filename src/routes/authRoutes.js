const { Router } = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const { validate } = require('../middleware/handleValidation');

const router = Router();

const authValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201: { description: User registered }
 */
router.post('/register', authValidation, validate, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 */
router.post('/login', authValidation, validate, login);

module.exports = router;
