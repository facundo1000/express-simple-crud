const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Crud Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
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
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                },
            },
        },
        servers: [
            {
                url: "https://express-simple-crud.onrender.com",
            },
        ],

    },
    apis: ["./routes/*.js"],
};

module.exports = { options };