import bcrypt from 'bcrypt';
import userModel from '../schemas/User.schema.mjs';
import { generateToken } from '../helpers/jwt.helper.mjs';
// autenticación
const userLogin = async (req, res) => {
    // paso 1: obtener los datos del body
    const inputData = req.body;

    try {
        // paso 2: verificar si el usuario existe
        const userFound = await userModel.findOne({ email: inputData.email });
        if (!userFound) {
            return res.status(404).json({ msg: 'Usuario no encontrado, por favor registrese' });
        }

        // paso 3: verificar la contraseña
        const isAuthenticate = bcrypt.compareSync(inputData.password, userFound.password);
        if (!isAuthenticate) {
            return res.status(401).json({ msg: 'Contraseña incorrecta, por favor intente de nuevo' });
        }

        // paso 4: generar token (puedes usar JWT si quieres)
        // por ahora solo devuelve mensaje simple
        const payload = {
            name: userFound.name,
            email: userFound.email,
            role: userFound.role
        };

        const token = generateToken(payload);



        // eliminar datos sensibles antes de enviar la respuesta
        const objUser = userFound.toObject()
        delete objUser.password
        delete objUser.createdAt
        delete objUser.updatedAt

        // respuesta al cliente
        res.json({ token: token, user: objUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al intentar iniciar sesión' });
    }
};

const reNewToken = (req, res) => {
    const payload = req.authUser;
    const token = generateToken(payload);
    res.json({token})

};

export { userLogin, reNewToken };