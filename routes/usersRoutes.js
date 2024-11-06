const { Router } = require('express');
const { getUsers, addUser, updateUserById, deleteUserById, getUserById, getUsersActive, deleteUserSoftById, deleteUserHardById } = require('../controllers/usersControllers');
const { fieldValidator } = require('../middleware/fieldValidator');
const { check } = require('express-validator');
const { validateJWT } = require('../middleware/validateJWT');
const router = Router();

router.use(validateJWT);

// Routes
router.get('/all-users', [], getUsers);
router.get('/', [], getUsersActive);
router.get('/:id', [], getUserById);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Better Password is required add at least 1 number and 1 special character').isStrongPassword({ minLength: 6, minNumbers: 1, minSymbols: 1 }),
    fieldValidator], addUser);
router.put('/update/:id', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Better Password is required').isStrongPassword({ minLength: 6, minNumbers: 1, minSymbols: 1 }),
    fieldValidator], updateUserById);
router.delete('/delete/:id', [], deleteUserSoftById);
router.delete('/delete-record/:id', [], deleteUserHardById);


module.exports = router;