import mongoose from "mongoose";

const historiaClinicaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del paciente es obligatorio"],
        trim: true,
    },
    documentId: {
        type: String,
        required: [true, "El documento es obligatorio"],
        trim: true,
    },
    birthDate: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"],
    },
    age: {
        type: Number,
        required: [true, "La edad es obligatoria"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Introduce un correo electrónico válido.",
        ],
    },
    gender: {
        type: String,
        enum: ["masculino", "femenino", "otro"],
        required: [true, "El sexo es obligatorio"],
    },
    ethnicGroup: {
        type: String,
        trim: true,
    },
    bloodType: {
        type: String,
        match: [/^(A|B|AB|O)[+-]$/, "Introduce un tipo de sangre válido"],
    },
    covidIsolation: {
        type: Boolean,
        required: [true, "Este campo es obligatorio"],
    },
    consultReason: {
        type: String,
        trim: true,
    },
    diseaseHistory: {
        type: String,
        trim: true,
    },
    personalHistory: {
        type: String,
        trim: true,
    },
    currentMeds: {
        type: String,
        trim: true,
    },
    familyHistory: {
        type: String,
        trim: true,
    },
    oralHygiene: {
        type: String,
        trim: true,
    },
    intraoralExam: {
        type: String,
        trim: true,
    },
    otherFindings: {
        type: String,
        trim: true,
    },
    companionName: {
        type: String,
        trim: true,
    },
    companionId: {
        type: String,
        trim: true,
    },
    companionRelation: {
        type: String,
        trim: true,
    },
    isGuardian: {
        type: Boolean,
        required: [true, "Debe especificar si es acudiente o responsable"],
    },
    guardianName: {
        type: String,
        trim: true,
    },
    guardianId: {
        type: String,
        trim: true,
    },
    guardianPhone: {
        type: String,
        match: [/^\d{7,15}$/, "Número de teléfono inválido"],
    },
}, {
    timestamps: true,
    versionKey: false,
});

const historiaClinicaModel = mongoose.model("historiaClinica", historiaClinicaSchema);
export default historiaClinicaModel;
