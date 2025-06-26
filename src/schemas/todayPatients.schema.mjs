import mongoose from "mongoose";

const todayPatientsSchema = new mongoose.Schema({
    dentist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    patients: [{
        patient: { // Paciente de la cita
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        documentId: { // Cedula o ID
            type: String,
            required: true
        },
        fullName: { // Nombre completo
            type: String,
            required: true
        },
        timeBlock: { // Hora cita (bloque)
            type: String,
            required: true
        },
        status: { // Estado para badge de color
            type: String,
            enum: ['asistio', 'pendiente', 'cancelada'],
            default: 'pendiente'
        }
    }]
}, { timestamps: true, versionKey: false });

const todayPatientsModel = mongoose.model('todayPatients', todayPatientsSchema);
export default todayPatientsModel;
