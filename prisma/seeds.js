const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bycrypt = require('bcryptjs');

const salt = bycrypt.genSaltSync(15);

async function main() {
    const alice = await prisma.user.upsert({
        where: { id: 'AEF91DD6-D187-4ED4-8B13-70D2EADDC0F2' },
        update: {},
        create: {
            email: 'fmriver2004@gmail.com',
            name: 'facundo',
            password: bycrypt.hashSync('123456', salt),
        },
    })

    const bob = await prisma.user.upsert({
        where: { id: '6CBB38A5-7C72-42A7-B141-8D8C47EE6D39' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            name: 'Bob',
            password: bycrypt.hashSync('admin', salt),

        },
    })
    console.log({ alice, bob })
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });