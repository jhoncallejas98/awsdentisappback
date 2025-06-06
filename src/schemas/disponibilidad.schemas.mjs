import mongoose from "mongoose";

//define la estructura de datos del docukmento

const disponibilidadSchema = new mongoose.Schema({
    odontologoId: {
        type: String,
        required: true
    },
    diaSemana: {
        type: String,                            // 0 = Domingo ... 6 = Sábado
        required: [true, "es obligatorio el dia de la semana"]
    },
    horaInicio: {
        type: String,                            // formato 'HH:mm'
        required: [true, "es obligatorio que se ponga la hora de inicio"]
    },
    horaFin: {
        type: String,                            // formato 'HH:mm'
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps:true,
    versionKey: false
});
//define el modelo y vincula la estrutura de datos a una coleccion 
const disponibilidadModel = mongoose.model(
    " disponibilidad ",                   //nombre de la coleccion
    disponibilidadSchema                  //nombre de la estructura de datos
);


export default disponibilidadModel;