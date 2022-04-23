require("dotenv").config()
const jwt = require("jsonwebtoken")

const parsearToken = (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        const payload = token && jwt.verify(token, process.env.JWT_SECRET)
        
        if(payload)
        req.user = payload
    }
    next()
}

const guardia = (req, res, next) => {
    req.user ? next() : res.status(401).json({ok: false,msg: "Token no válido o inexistente",});
}

// AUTORIZACION DEL TOKEN
const requireAuth = (req, res, next) => {
    try {

        if(!req.headers?.authorization){
            throw new Error('No existe el token')
        }

        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            throw new Error('Formato no valido utilizar Bearer')
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.id = payload.id

        next()
    } catch (error) {
        if (error.message === "jwt malformado") {
            return res.status(401).json({
                ok: false,
                msg: "Formato no válido del Token",
            });
        }
        if (
            error.message === "token invalido" ||
            error.message === "jwt expirado"
        ) {
            return res.status(401).json({
                ok: false,
                msg: "Token no válido",
            });
        }
        return res.status(401).json({
            ok: false,
            msg: error.message,
        });
    }
}

module.exports = {
    requireAuth,
    parsearToken,
    guardia
}