const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Crud Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger \n" +
                "1- Register a new user or login to create a token \n" +
                "2- Use the token to access the users' list or any other endpoint \n",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Facundo Martinez",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        components: {
            securitySchemes: {
                // bearerAuth: {
                //     type: "http",
                //     scheme: "bearer",
                //     bearerFormat: "JWT",
                //     value: "Bearer <JWT token here>"
                // },
                xTokenAuth: {
                    type: "JWT token",
                    in: "header",
                    name: "x-token",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                },
            },
        },
        security: [
            {
                xTokenAuth: [],
            },
        ],
        servers: [
            {
                url: "https://express-simple-crud.onrender.com",
            },
        ],

    },
    apis: ["./routes/*.js"],
};

module.exports = { options };