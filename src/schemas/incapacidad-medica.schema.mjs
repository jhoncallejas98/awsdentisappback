import mongoose from "mongoose";

const incapacidadMedicaSchema = new mongoose.Schema({
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
    fechaInicio: {
        type: Date,
        required: [true, "La fecha de inicio es obligatoria"]
    },
    fechaFin: {
        type: Date,
        required: [true, "La fecha de fin es obligatoria"]
    },
    diasIncapacidad: {
        type: Number,
        required: [true, "El número de días de incapacidad es obligatorio"]
    },
    motivo: {
        type: String,
        required: [true, "El motivo de la incapacidad es obligatorio"]
    },
    diagnostico: {
        type: String,
        required: [true, "El diagnóstico es obligatorio"]
    },
    tratamiento: {
        type: String,
        required: [true, "El tratamiento es obligatorio"]
    },
    observaciones: {
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false });

const incapacidadMedicaModel = mongoose.model('incapacidadesMedicas', incapacidadMedicaSchema);
export default incapacidadMedicaModel; 