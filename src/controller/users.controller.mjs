import userModel from "../schemas/User.schema.mjs";
import bcrypt from "bcrypt";

// Crear Usuario
const createUser = async (req, res) => {
    const inputData = req.body;

    try {
        // Verificar si el usuario existe por email
        const userFound = await userModel.findOne({ email: inputData.email });
        if (userFound) {
            return res.status(400).json({ msg: 'El usuario ya existe con este correo.' });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(inputData.password, salt);
        inputData.password = hashPassword;

        // Crear usuario
        const newUser = await userModel.create(inputData);
        res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo crear el usuario.' });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los usuarios.' });
    }
};

const getAllDentist = async (req, res) => {
    try {
        const data = await userModel.find({role: "dentist"})
        res.json( data )
    }
    catch( error ) {
        console.error( error )
        res.json({msg: "no se pudo encontrar los usuarios dentinstas"})
    }
}
// Obtener usuario por ID
const getUsersById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado.' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el usuario.' });
    }
};

// Actualizar usuario por ID
const updateUsersById = async (req, res) => {
    const userId = req.params.id;
    const inputData = req.body;

    try {
        // Si viene password, encriptar nuevamente
        if (inputData.password) {
            const salt = bcrypt.genSaltSync(10);
            inputData.password = bcrypt.hashSync(inputData.password, salt);
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, inputData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ msg: 'Usuario no encontrado para actualizar.' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el usuario.' });
    }
};

// Eliminar usuario por ID
const removeUsersById = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ msg: 'Usuario no encontrado para eliminar.' });
        }
        res.json({ msg: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el usuario.' });
    }
};

export {
    createUser,
    getAllUsers,
    getAllDentist,
    getUsersById,
    updateUsersById,
    removeUsersById
};