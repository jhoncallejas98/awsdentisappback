import todayPatientsModel from "../schemas/todayPatients.Schema.mjs";

// Crear un nuevo paciente de hoy
const createTodayPatient = async (req, res) => {
    try {
        const inputData = req.body;
        const newPatient = await todayPatientsModel.create(inputData);
        res.status(201).json(newPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear paciente de hoy" });
    }
};

// Obtener todos los pacientes de hoy
const getAllTodayPatients = async (req, res) => {
    try {
        const data = await todayPatientsModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener los pacientes de hoy" });
    }
};

// Obtener un paciente de hoy por ID
const getTodayPatientById = async (req, res) => {
    try {
        const id = req.params.id;
        const patient = await todayPatientsModel.findById(id);
        if (!patient) {
            return res.status(404).json({ msg: "Paciente no encontrado" });
        }
        res.json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener paciente de hoy" });
    }
};

// Actualizar un paciente de hoy por ID
const updateTodayPatientById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const updatedPatient = await todayPatientsModel.findByIdAndUpdate(id, inputData, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ msg: "Paciente no encontrado para actualizar" });
        }
        res.json(updatedPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar paciente de hoy" });
    }
};

// Eliminar un paciente de hoy por ID
const removeTodayPatientById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPatient = await todayPatientsModel.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({ msg: "Paciente no encontrado para eliminar" });
        }
        res.json({ msg: "Paciente eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar paciente de hoy" });
    }
};

export {
    createTodayPatient,
    getAllTodayPatients,
    getTodayPatientById,
    updateTodayPatientById,
    removeTodayPatientById
};