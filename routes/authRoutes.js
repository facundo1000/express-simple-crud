const { Router } = require('express');
const { userLogin, registerUser, revalidateToken } = require('../controllers/authController');
const { fieldValidator } = require('../middleware/fieldValidator');
const { validateJWT } = require('../middleware/validateJWT');
const { check } = require('express-validator');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *            type: string
 *            description: The user's email.
 *         password:
 *            type: string
 *            description: The user's password.
 *       example:
 *         email: fmriver2004@gmail.com
 *         password: "123456"
 *      
 *     LoginResponse:
 *       type: object
 *       properties:
 *         ok:
 *          type: boolean
 *          description: If the login was successful
 *         id:
 *          type: string
 *          description: The user's id
 *         name:
 *          type: string
 *          description: The user's name
 *         token:
 *          type: string
 *          description: The JWT token
 *       example:
 *        ok: true
 *        id: asdas-12312-asd-123
 *        name: Lionel Messi
 *        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 * 
 * 
 * 
 *     Register:
 *         type: object
 *         required:
 *           - name
 *           - email
 *           - password
 *         properties:
 *           name:
 *             type: string
 *             description: The user's name.
 *           email:
 *             type: string
 *             description: The user's email.
 *           password:
 *             type: string
 *             description: The user's password.
 *         example:
 *           name: Lionel Messi
 *           email: patata@emilio.com
 *           password: 123abcd
 * 
 *     RenewResponse:
 *        type: object
 *        properties:
 *          ok:
 *           type: boolean
 *           description: If the token was renewed successfully
 *          token:
 *           type: string
 *           description: The new JWT token
 *        example:
 *         ok: true
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c 
 */




/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /api/auth/login:
 *  post:
 *   summary: Login a user
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/Login'

 *   responses:
 *     200:
 *       description: The user has been logged in successfully
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *     400:
 *      description: The email or password are incorrect
 *     500:
 *      description: An error has occurred
 * 
 * /api/auth/register:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: '#/components/schemas/Register'
 *    responses:
 *      200:
 *       description: The user has been registered successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *      400:
 *       description: The email is already in use
 *      500:
 *       description: An error has occurred
 * 
 * /api/auth/renew:
 *  get:
 *   summary: Renew a token
 *   tags: [Auth]
 *   security:
 *   - bearerAuth: []
 *   responses:
 *     200:
 *       description: The token has been renewed successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginResponse'
 *     400:
 *       description: The token is invalid
 */


// Routes
// Login a user
router.post('/login', [
    check('email', 'The email is required').isEmail(), // Check if the email is valid
    check('password', 'The password is required').not().isEmpty(), // Check if the password is not empty
    fieldValidator
], userLogin);

// Register a new user
router.post('/register', [
    check('name', 'The name is required').not().isEmpty(), // Check if the name is not empty
    check('email', 'The email is required').isEmail(), // Check if the email is valid
    check('password', 'The password is required').isLength({ min: 6 }), // Check if the password has at least 6 characters
    fieldValidator
], registerUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;