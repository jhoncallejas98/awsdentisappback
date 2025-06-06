import mongoose from "mongoose";

const formulacionMedicaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
  citaId: {type: String}, // FK a Cita
  odontologoId: {type: String}, // FK a Usuario
    fecha: {type: Date},
    medicamento: {type: String},
    dosis: {type: String},
  frecuencia: {type: String}, // Ej: '2 veces al día'
    duracionDias: {type: Number},
    instrucciones: {type: String}
    }
,{
    timestamps: true,
    versionkey: false
});

const formulacionMedicaModel = mongoose.model(
    'formulacion-medicas',
    formulacionMedicaSchema
);

export default formulacionMedicaModel;