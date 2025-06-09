import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "El nombre del usuario es obligatorio"]        //obligatorio
    },
    email: {
        type:String,
        trim: true,
        lowercase: true,
        unique:[true, "el correo ya fue utilizado"],
        requiered: [true, "El correo del usuario es obligatorio"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "introduce un correo electrónico válido."]
    },
    password: {
        type: String,
        trim: true,
        minLength:[7,"la contraseña debe de tener minimo 7 caracteres"],
        requiered:[true, "la contraseña es obligario"]
    },
    role: {
        type: String,
        enum: ["user" ,"patiente"],
        default: "user"
    },
},{
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model(
    "User",  //define el nombre de la coleccion donde se va a guardar los documentos
    usersSchema
) ;   
export default userModel;


