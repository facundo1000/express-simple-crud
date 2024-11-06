const { Router } = require('express');
const { userLogin, registerUser, revalidateToken } = require('../controllers/authController');
const { fieldValidator } = require('../middleware/fieldValidator');
const { validateJWT } = require('../middleware/validateJWT');
const { check } = require('express-validator');
const router = Router();

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