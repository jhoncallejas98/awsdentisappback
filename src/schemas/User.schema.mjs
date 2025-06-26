import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "El correo ya fue utilizado"],
        required: [true, "El correo del usuario es obligatorio"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Introduce un correo electrónico válido."
        ]
    },
    password: {
        type: String,
        trim: true,
        minlength: [7, "La contraseña debe tener mínimo 7 caracteres"],
        required: [true, "La contraseña es obligatoria"]
    },
    role: {
        type: String,
        enum: ["patient", "dentist", "admin"],
        default: "patient"
    },

    // Datos exclusivos para Paciente:
    patientData: {
        documentId: { type: String },
        birthDate: { type: Date },
        age: { type: Number }
    },

    // Datos exclusivos para Odontólogo:
    dentistData: {
        documentId: { type: String },
        specialty: { 
            type: String, 
            enum: [
                "General", 
                "Ortodoncia", 
                "Endodoncia", 
                "Odontopediatría", 
                "Periodoncia", 
                "Cirugía Oral", 
                "Rehabilitación Oral", 
                "Radiología Oral", 
                "Patología Oral", 
                "Estética Dental"
            ],
            default: "General"
        },
        professionalCard: { type: String } // Tarjeta profesional odontólogo
    }
}, {
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model("User", usersSchema);
export default userModel;