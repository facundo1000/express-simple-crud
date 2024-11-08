const { Router } = require('express');
const { getUsers, addUser, updateUserById, getUserById, getUsersActive, deleteUserSoftById, deleteUserHardById } = require('../controllers/usersControllers');
const { fieldValidator } = require('../middleware/fieldValidator');
const { check } = require('express-validator');
const { validateJWT } = require('../middleware/validateJWT');
const router = Router();

router.use(validateJWT);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    User:
 *     type: object
 *     required:
 *      - name
 *      - email
 *      - password
 *     properties:
 *       id:
 *          type: string
 *          description: The auto-generated id of the user.
 *       name:
 *          type: string
 *          description: The user's name.
 *       email:
 *          type: string
 *          description: The user's email.
 *       password:
 *          type: string
 *          description: The user's password.
 *       active:
 *         type: boolean
 *         description: The user's register status.
 *     example:
 *      id: asdas-12312-asd-123
 *      name: Lionel Messi
 *      email: patata@emilio.com
 *      password: $2a$15$eGHjBBeZHLO3hze4pHXlretNhj1YZRunoKbuA3Ha0l9bMCgMnS7OS
 *      active: true
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /api/users/all-users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: [ ]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/users:
 *   get:
 *     summary: Lists all ACTIVE users
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the users that are active
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * 
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 * 

 *   put:
 *    summary: Update a user by the id
 *    tags: [Users]
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Soft remove the user by id
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */

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