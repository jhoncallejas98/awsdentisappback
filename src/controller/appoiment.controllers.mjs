import appointmentModel from "../schemas/appoiment.schemas.mjs";
import userModel from "../schemas/User.schema.mjs";
import mongoose from "mongoose";

function isValidObjectId(id) {
    return typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/);
}

// Crear una nueva cita
const createAppoiment = async (req, res) => {
    const { cedulaPaciente, cedulaDentista, patient, dentist, date, timeBlock, reason } = req.body;
    
    // Logs detallados para fechas
    console.log('=== CREAR CITA - ANÁLISIS DE FECHAS ===');
    console.log('Fecha recibida del frontend:', date);
    console.log('Tipo de fecha recibida:', typeof date);
    console.log('Fecha como string:', String(date));
    
    if (date) {
        const fechaOriginal = new Date(date);
        console.log('Fecha convertida a Date object:', fechaOriginal);
        console.log('Fecha ISO string:', fechaOriginal.toISOString());
        console.log('Fecha local string:', fechaOriginal.toString());
        console.log('Zona horaria:', fechaOriginal.getTimezoneOffset());
        console.log('Año:', fechaOriginal.getFullYear());
        console.log('Mes:', fechaOriginal.getMonth() + 1);
        console.log('Día:', fechaOriginal.getDate());
        console.log('Hora:', fechaOriginal.getHours());
        console.log('Minutos:', fechaOriginal.getMinutes());
    }
    
    try {
        // Buscar paciente por _id o cédula
        let patientFound;
        if (patient) {
            if (isValidObjectId(patient)) {
                patientFound = await userModel.findOne({ _id: patient, role: 'patient' });
            } else {
                patientFound = await userModel.findOne({ cedula: patient, role: 'patient' });
            }
        } else if (cedulaPaciente) {
            patientFound = await userModel.findOne({ cedula: cedulaPaciente, role: 'patient' });
        }
        if (!patientFound) {
            return res.status(400).json({ msg: "Paciente no encontrado." });
        }
        // Buscar dentista por _id o cédula
        let dentistFound;
        if (dentist) {
            if (isValidObjectId(dentist)) {
                dentistFound = await userModel.findOne({ _id: dentist, role: 'dentist' });
            } else {
                dentistFound = await userModel.findOne({ cedula: dentist, role: 'dentist' });
            }
        } else if (cedulaDentista) {
            dentistFound = await userModel.findOne({ cedula: cedulaDentista, role: 'dentist' });
        }
        if (!dentistFound) {
            return res.status(400).json({ msg: "Dentista no encontrado." });
        }
        
        // Procesar la fecha antes de guardar
        let fechaProcesada = date;
        if (date) {
            // Si la fecha viene como string, convertirla a Date object
            if (typeof date === 'string') {
                fechaProcesada = new Date(date);
                console.log('Fecha procesada para guardar:', fechaProcesada);
                console.log('Fecha procesada ISO:', fechaProcesada.toISOString());
            }
        }
        
        // Verificar si ya existe cita en ese bloque y fecha para ese dentista
        const existingAppoiment = await appointmentModel.findOne({ date: fechaProcesada, timeBlock, dentist: dentistFound._id });
        if (existingAppoiment) {
            return res.status(400).json({ msg: "Ya existe una cita para ese bloque de tiempo." });
        }
        // Crear cita usando _id y cédula
        const newAppoiment = await appointmentModel.create({
            patient: patientFound._id,
            cedulaPaciente: patientFound.cedula,
            dentist: dentistFound._id,
            cedulaDentista: dentistFound.cedula,
            date: fechaProcesada,
            timeBlock,
            reason
        });
        
        console.log('Cita creada exitosamente con fecha:', newAppoiment.date);
        console.log('Cita fecha ISO:', newAppoiment.date.toISOString());
        
        res.status(201).json(newAppoiment);
    } catch (error) {
        console.error('Error al crear cita:', error);
        res.status(500).json({ msg: "Error al crear la cita." });
    }
};

// Obtener todas las citas
const getAppoiment = async (req, res) => {
    try {
        const { dentist, patient, cedulaDentista, cedulaPaciente, date } = req.query;
        let filter = {};
        if (dentist) filter.dentist = dentist;
        if (patient) filter.patient = patient;
        if (cedulaDentista) filter.cedulaDentista = cedulaDentista;
        if (cedulaPaciente) filter.cedulaPaciente = cedulaPaciente;
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }
        const citas = await appointmentModel.find(filter)
            .populate('patient', 'name email cedula')
            .populate('dentist', 'name email cedula');
        res.status(200).json(citas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las citas.' });
    }
};

// Obtener cita por ID
const getAppoimentById = async (req, res) => {
    const appoimentId = req.params.id;

    try {
        const appoiment = await appointmentModel.findById(appoimentId)
            .populate('patient', 'name email')
            .populate('dentist', 'name email speciality');

        if (!appoiment) {
            return res.status(404).json({ msg: 'Cita no encontrada.' });
        }

        res.json(appoiment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la cita por ID." });
    }
};

// Actualizar cita por ID
const updateAppoimentById = async (req, res) => {
    const appoimentId = req.params.id;
    const inputData = req.body;

    try {
        const updatedAppoiment = await appointmentModel.findByIdAndUpdate(appoimentId, inputData, { new: true });
        if (!updatedAppoiment) {
            return res.status(404).json({ msg: 'Cita no encontrada para actualizar.' });
        }
        res.json(updatedAppoiment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la cita." });
    }
};

// Actualizar todas las citas (ejemplo: resetear estado)
const updateAllAppoiment = async (req, res) => {
    try {
        // Ejemplo: actualizar todas las citas a estado 'pendiente'
        const result = await appointmentModel.updateMany({}, { status: 'pendiente' });
        res.json({ msg: "Todas las citas actualizadas a estado 'pendiente'.", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar todas las citas." });
    }
};

// Eliminar cita por ID
const deleteAppoiment = async (req, res) => {
    const appoimentId = req.params.id;

    try {
        const deletedAppoiment = await appointmentModel.findByIdAndDelete(appoimentId);
        if (!deletedAppoiment) {
            return res.status(404).json({ msg: 'Cita no encontrada para eliminar.' });
        }
        res.json({ msg: 'Cita eliminada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la cita." });
    }
};

// Endpoint de prueba para fechas
const testDates = async (req, res) => {
    console.log('=== PRUEBA DE FECHAS ===');
    console.log('Body completo:', req.body);
    console.log('Query params:', req.query);
    
    const { date, fecha, fechaInicio, fechaFin } = req.body;
    
    console.log('Fechas recibidas en body:');
    console.log('- date:', date, 'tipo:', typeof date);
    console.log('- fecha:', fecha, 'tipo:', typeof fecha);
    console.log('- fechaInicio:', fechaInicio, 'tipo:', typeof fechaInicio);
    console.log('- fechaFin:', fechaFin, 'tipo:', typeof fechaFin);
    
    // Procesar cada fecha
    const processedDates = {};
    
    if (date) {
        const originalDate = new Date(date);
        processedDates.date = {
            original: date,
            type: typeof date,
            asDate: originalDate,
            iso: originalDate.toISOString(),
            local: originalDate.toString(),
            timezone: originalDate.getTimezoneOffset(),
            year: originalDate.getFullYear(),
            month: originalDate.getMonth() + 1,
            day: originalDate.getDate(),
            hours: originalDate.getHours(),
            minutes: originalDate.getMinutes()
        };
    }
    
    if (fecha) {
        const originalDate = new Date(fecha);
        processedDates.fecha = {
            original: fecha,
            type: typeof fecha,
            asDate: originalDate,
            iso: originalDate.toISOString(),
            local: originalDate.toString(),
            timezone: originalDate.getTimezoneOffset(),
            year: originalDate.getFullYear(),
            month: originalDate.getMonth() + 1,
            day: originalDate.getDate(),
            hours: originalDate.getHours(),
            minutes: originalDate.getMinutes()
        };
    }
    
    if (fechaInicio) {
        const originalDate = new Date(fechaInicio);
        processedDates.fechaInicio = {
            original: fechaInicio,
            type: typeof fechaInicio,
            asDate: originalDate,
            iso: originalDate.toISOString(),
            local: originalDate.toString(),
            timezone: originalDate.getTimezoneOffset(),
            year: originalDate.getFullYear(),
            month: originalDate.getMonth() + 1,
            day: originalDate.getDate(),
            hours: originalDate.getHours(),
            minutes: originalDate.getMinutes()
        };
    }
    
    if (fechaFin) {
        const originalDate = new Date(fechaFin);
        processedDates.fechaFin = {
            original: fechaFin,
            type: typeof fechaFin,
            asDate: originalDate,
            iso: originalDate.toISOString(),
            local: originalDate.toString(),
            timezone: originalDate.getTimezoneOffset(),
            year: originalDate.getFullYear(),
            month: originalDate.getMonth() + 1,
            day: originalDate.getDate(),
            hours: originalDate.getHours(),
            minutes: originalDate.getMinutes()
        };
    }
    
    res.json({
        message: 'Prueba de fechas completada',
        received: { date, fecha, fechaInicio, fechaFin },
        processed: processedDates,
        serverTime: new Date().toISOString(),
        serverTimezone: new Date().getTimezoneOffset()
    });
};

export {
    createAppoiment,
    getAppoiment,
    getAppoimentById,
    updateAppoimentById,
    updateAllAppoiment, 
    deleteAppoiment,
    testDates
};