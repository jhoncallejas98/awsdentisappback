import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cedulaPaciente: {
        type: String,
        required: true
    },
    dentist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cedulaDentista: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        // required: true 
        default: Date.now
    },
    timeBlock: { 
        type: String,
        enum: [
            '08:00', '08:20', '08:40', '09:00', '09:20', '09:40', '10:00', '10:20', '10:40',
            '11:00', '11:20', '11:40', '12:00', '12:20', '12:40', '13:00', '13:20', '13:40',
            '14:00', '14:20', '14:40', '15:00', '15:20', '15:40', '16:00', '16:20', '16:40',
            '17:00', '17:20', '17:40'
        ],
        required: [true, 'El bloque de tiempo es obligatorio.']
    },
    reason: { type: String, required: true },
    notes: { type: String },
    status:{
        type: String,
        enum: ["pendiente", "confirmada", "cancelada"],
        default: "pendiente"
    },
}, { timestamps: true, versionKey: false });

const appointmentModel = mongoose.model('appointments', appointmentSchema);
export default appointmentModel;