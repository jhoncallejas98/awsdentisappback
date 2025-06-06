import { verifyToken } from '../helpers/jwt.helper.mjs';

const authUser = (req, res, next) => {
    const token = req.header('X-Token'); // extraemos el token de la cabecera
    if (!token) {
        return res.json({msg: "Error al obtener el token"})
    }
    //verificamos el token
    const payload = verifyToken(token);
    delete payload.iat;
    delete payload.exp;


    // crear una propiuedad en elonjeto request de express y guardar el payload x
    req.authUser = payload;
    console.log(payload)
    next();
}

export {
    authUser
}