import appointmentModel from "../schemas/appoiment.schemas.mjs";
import userModel from "../schemas/User.schema.mjs";

// Crear una nueva cita
const createAppoiment = async (req, res) => {
    const { patient, dentist, date, timeBlock, reason } = req.body;
    // const patientFound = await userModel.findOne({ _id: patient, role: 'patiente' });
    // const newAppoiment =  await appointmentModel.create({ patient, dentist, date, timeBlock, reason })


    // res.json(newAppoiment)
    try {
        // Verificar que el paciente exista
        const patientFound = await userModel.findOne({ _id: patient, role: 'patient' });
        if (!patientFound) {
            return res.status(400).json({ msg: "Paciente no encontrado." });
        }

        // Verificar que el dentista exista
        const dentistFound = await userModel.findOne({ _id: dentist, role: 'dentist' });
        if (!dentistFound) {
            return res.status(400).json({ msg: "Dentista no encontrado." });
        }

        // Verificar si ya existe cita en ese bloque y fecha para ese dentista
        const existingAppoiment = await appointmentModel.findOne({ date, timeBlock, dentist });
        if (existingAppoiment) {
            return res.status(400).json({ msg: "Ya existe una cita para ese bloque de tiempo." });
        }

        // Crear cita
        const newAppoiment = await appointmentModel.create({ patient, dentist, date, timeBlock, reason });
        res.status(201).json(newAppoiment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la cita." });
    }
};

// Obtener todas las citas
const getAppoiment = async (req, res) => {
    try {
        const appoiments = await appointmentModel.find({})
            .populate('patient', 'name email')
            .populate('dentist', 'name email speciality');

        res.status(200).json(appoiments);
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

export {
    createAppoiment,
    getAppoiment,
    getAppoimentById,
    updateAppoimentById,
    updateAllAppoiment, 
    deleteAppoiment
};