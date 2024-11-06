const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

// Function to log in a user
const userLogin = async (req, res) => {

    const { email: userMail, password } = req.body;

    try {

        let user = await prisma.user.findUniqueOrThrow({ where: { email: userMail } });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        /**
         * compareSync is a method that compares the password entered by the user with the password
         * stored in the database. It returns true if the passwords match, otherwise it returns false.
         */
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id, user.name);

        const { id, name } = user;

        res.status(200).json({
            ok: true,
            id,
            name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator - Error at Login'
        });
    }
};

//Function to register a new user
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        //Se comprueba si el usuario ya existe
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (user) {
            res.status(400).json({
                message: 'User already exists'
            });
        }

        const salt = bcrypt.genSaltSync(15);
        const passwordHash = bcrypt.hashSync(password, salt);

        //Generar el JWT
        const token = await generateJWT(user.id, user.name);

        //Se crea el usuario nuevo
        user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            token: token
        });

        res.status(201).json({
            user,
            message: 'User created successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Please contact the administrator'
        });
    }
};

const revalidateToken = async (req, res) => {

    const { uid, name } = req;

    //Generar el JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    userLogin,
    registerUser,
    revalidateToken
};