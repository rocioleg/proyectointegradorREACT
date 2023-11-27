//recibe el token y verif
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send("falta token");
    } else{
        try{
            //decodificar le token
            const deco = jwt.verify(token,'llave');
            //aca se registra la actividad del usuario

        } catch(err){
            return res.status(401).send("token invalido");
        }
    }
    return next();
};

module.exports = verifyToken;