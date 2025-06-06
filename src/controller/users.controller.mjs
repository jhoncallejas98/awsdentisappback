import userModel from "../schemas/User.schema.mjs";
import bcrypt from "bcrypt";

const createUser = async ( req, res ) => {
    const inputData = req.body;

    try {
        // Paso 1: Verificar si el usuario existe
        const userFound = await userModel.findOne({ 
            username: inputData.username,
            email: inputData.email
        });

        if( userFound ) {
            return res.status( 404 ).json({ msg: 'No pudo registrarse por que, el usuario ya existe.' });
        }

        // Paso 2: Encriptar la contrasena
           // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10); // puedes usar 10 rondas como estándar
        console.log('salt:', salt);

        const hashPassword = bcrypt.hashSync(inputData.password, salt);
        console.log('hashPassword:', hashPassword);

        inputData.password = hashPassword;

        // Registrar el usuario
        // Paso 3: Registrar el usuario
        const data = await userModel.create( inputData );

        // Paso 4: Responder al cliente que se registro existosamente
        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear el usuario' });
    }

}

const getAllUsers = async (req, res) => {

    try {
        const data = await userModel.find({})
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "error: no se pudo optener el resultado de productos" })
    }
}

const getUsersById = async (req, res) => {
    const UsersId = req.params.id;
    try {
        const data = await userModel.findById(UsersId);

        if (!data) {
            return res.json({ msg: "el producto no se encuentra resgistrado" })
        }
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "error: no se pudo encontrar el producto" })
    }
}

const removeUsersById = async (req, res) => {
    try {
    const productId = req.params.id;
    const data = await userModel.findByIdAndDelete(productId);
    if (!data) {
        return res.json({ msg: "el producto no se encuentra resgistrado" })
    }

    res.json(data);
    }

    catch (error) {
        console.error(error);
        res.json({ msg: "error: no se pudo encontrar el producto" })
    }
}

const updateUsersById = async (req, res) => {
    try {
    const usersId = req.params.id;
    const inputData = req.body;
    const data = await userModel.findByIdAndUpdate( usersId, inputData, {new:true}  );
    
    res.json( data );
    }
    catch ( error ) {
        console.error( error )
        res.json({msg: "no se pudo actualizar el usuario"})
    }
}

export {
    createUser,
    getAllUsers,
    getUsersById,
    removeUsersById,
    updateUsersById
}