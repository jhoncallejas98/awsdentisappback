import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,    // El odontólogo debe ser un usuario con rol 'paciente'
        ref: 'Patient',
        required: [true, 'El ID del paciente es obligatorio para la cita.'],
        unique: true,
    },
    odontologist: {
        type: mongoose.Schema.Types.ObjectId,    // El odontólogo debe ser un usuario con rol 'odontologo'
        ref: 'User',
        required: [true, 'El ID del odontólogo es obligatorio para la cita.'],
    },
    date: {
        type: Date,
        required: [true, 'La fecha de la cita es obligatoria.'],
        // Puedes agregar validación para fechas futuras si es necesario, por ejemplo:
        // validate: {
        //     validator: function(v) {
        //         return v && v.getTime() >= Date.now();
        //     },
        //     message: 'La fecha de la cita no puede ser en el pasado.'
        // }
    },
    startTime: { // Hora de inicio de la cita (por ejemplo, '10:00')
        type: String,
        required: [true, 'La hora de inicio de la cita es obligatoria.'],
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'El formato de la hora de inicio debe ser HH:MM (ej. 09:00).']
    },
    endTime: { // Hora de fin de la cita (por ejemplo, '10:30')
        type: String,
        required: [true, 'La hora de finalización de la cita es obligatoria.'],
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'El formato de la hora de finalización debe ser HH:MM (ej. 10:30).']    
    },
    reason: { // Motivo de la cita
        type: String,
        trim: true,
        required: [true, 'El motivo de la cita es obligatorio.'],
        minlength: [5, 'El motivo de la cita debe tener al menos 5 caracteres.'],
        maxlength: [200, 'El motivo de la cita no puede exceder los 200 caracteres.']
    },
    status: {
        type: String,
        enum: {
            values: ['pendiente', 'confirmada', 'cancelada', 'completada'],
            message: 'El estado "{VALUE}" no es válido. Los estados permitidos son: pendiente, confirmada, cancelada, completada.'
        },
        default: 'pendiente',
    },
    notes: { // Notas adicionales sobre la cita
        type: String,
        trim: true,
        maxlength: [500, 'Las notas de la cita no pueden exceder los 500 caracteres.']
    }
}, {
    timestamps: true,  // Agrega las propiedades createdAt
    versionKey: false  // contador __v de modificaciones del schema
});

// Corrección: mongoose.Model debe ser mongoose.model
const appointmentModel = mongoose.model(
    'appointments',    // Nombre de la colección a la que voy a asociar
    appointmentSchema  // La estructura de datos a la que lo vamosa vincular
);

export default appointmentModel;