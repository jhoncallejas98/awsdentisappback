import bcrypt from 'bcrypt';
import userModel from '../schemas/User.schema.mjs';
import { generateToken } from '../helpers/jwt.helper.mjs'; // asegúrate de tener este helper bien configurado

// Iniciar sesión
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const userFound = await userModel.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ msg: 'Usuario no encontrado, por favor regístrese.' });
        }

        // Comparar contraseñas
        const isMatch = bcrypt.compareSync(password, userFound.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Contraseña incorrecta.' });
        }

        // Generar token
        const payload = {
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role
        };

        const token = generateToken(payload);

        // Limpiar datos sensibles
        const userWithoutPassword = userFound.toObject();
        delete userWithoutPassword.password;

        // Responder
        res.json({ token, user: userWithoutPassword });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión.' });
    }
};

// Renovar token
const reNewToken = (req, res) => {
    const payload = req.authUser; // este debe venir de un middleware de verificación de JWT
    const token = generateToken(payload);
    res.json({ token });
};

export { userLogin, reNewToken };