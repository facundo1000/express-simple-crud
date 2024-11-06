const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bycrypt = require('bcryptjs');

//function that search for every user in the database
const getUsers = async (req, res) => {
    res.json({
        users: await prisma.user.findMany()
    });
};

//function that search for every active user in the database
const getUsersActive = async (req, res) => {
    res.json({
        users: await prisma.user.findMany({
            where: { active: true }
        })
    });
};

// function for adding a user
const addUser = async (req, res) => {

    const { name, email } = req.body;
    let { password } = req.body;
    const salt = bycrypt.genSaltSync(15);
    password = bycrypt.hashSync(password, salt);

    res.status(201).json({
        user: await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        }),
        ok: true,
        message: 'User created successfully'
    });
};

//function that search for a user by id
const getUserById = async (req, res) => {
    const { id } = req.params;
    res.json({
        user: await prisma.user.findUnique({
            where: { id: id }
        })
    });
};


//function that updates a user by id
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    let { password } = req.body;
    const salt = bycrypt.genSaltSync(15);
    password = bycrypt.hashSync(password, salt);

    res.json({
        user: await prisma.user.update({
            where: { id: id },
            data: { name: name, email: email, password: password }
        }),
        message: 'User updated successfully'
    });
};

//function that deletes a user by id
const deleteUserSoftById = async (req, res) => {
    const { id } = req.params;

    res.status(204).json({
        message: 'User deleted successfully',
        user: await prisma.user.update({
            where: { id: id },
            data: { active: false }
        }),
    });
};

//function that deletes a user by id
const deleteUserHardById = async (req, res) => {
    const { id } = req.params;

    res.status(204).json({
        message: 'User deleted successfully',
        user: await prisma.user.delete({
            where: { id: id }
        }),
    });
}

module.exports = {
    getUsers,
    addUser,
    getUserById,
    updateUserById,
    deleteUserSoftById,
    deleteUserHardById,
    getUsersActive
};