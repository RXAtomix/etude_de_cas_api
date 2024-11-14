const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

module.exports = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            throw "Token non fourni";
        }

        const decoded = jwt.verify(token, config.secretJwtToken);

        // Rechercher l'utilisateur dans la base de données avec une promesse
        User.findById(decoded.userId)
            .then((user) => {
                if (!user) {
                    throw "Utilisateur non trouvé";
                }

                // Passer toutes les informations de l'utilisateur dans req
                req.user = user;
                next();
            })
            .catch((err) => {
                next(new UnauthorizedError(err));
            });
    } catch (message) {
        next(new UnauthorizedError(message));
    }
};
