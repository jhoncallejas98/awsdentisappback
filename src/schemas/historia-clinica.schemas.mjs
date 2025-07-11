import mongoose from "mongoose";

const historiaClinicaSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cedulaPaciente: {
        type: String,
        required: true
    },
    documentId: { type: String, required: true },
    birthDate: { type: Date, required: true },
    age: { type: Number, required: true },
    email: { type: String },
    gender: {
        type: String,
        enum: ["masculino", "femenino", "otro"],
        required: true
    },
    ethnicGroup: { type: String },
    bloodType: { type: String },
    covidIsolation: { type: Boolean, required: true },
    consultReason: { type: String },
    diseaseHistory: { type: String },
    personalHistory: { type: String },
    currentMeds: { type: String },
    familyHistory: { type: String },
    oralHygiene: { type: String },
    intraoralExam: { type: String },
    otherFindings: { type: String },
    companionName: { type: String },
    companionId: { type: String },
    companionRelation: { type: String },
    isGuardian: { type: Boolean, required: true },
    guardianName: { type: String },
    guardianId: { type: String },
    guardianPhone: { type: String }
}, { timestamps: true, versionKey: false });

const historiaClinicaModel = mongoose.model("historiasClinicas", historiaClinicaSchema);
export default historiaClinicaModel;