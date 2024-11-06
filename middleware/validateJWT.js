const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    const header = req.header("x-token");

    if (!header) {
        return res.status(401).json({
            message: 'There is no token in the request'
        });
    }

    try {
        const { uid, name } = jwt.verify(header, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Invalid token'
        });
    }
    next();
};

module.exports = {
    validateJWT
};