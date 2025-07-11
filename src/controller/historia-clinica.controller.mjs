import historiaClinicaModel from "../schemas/historia-clinica.schemas.mjs";
import userModel from "../schemas/User.schema.mjs";

// Crear historia clínica
const createHistoriaClinica = async (req, res) => {
    try {
        const inputData = req.body;
        // Buscar paciente por cédula
        const paciente = await userModel.findOne({ cedula: inputData.cedulaPaciente, role: 'patient' });
        if (!paciente) {
            return res.status(400).json({ msg: 'Paciente no encontrado.' });
        }
        // Verificar si ya existe historia con ese documento
        const historiaExistente = await historiaClinicaModel.findOne({ documentId: inputData.documentId });
        if (historiaExistente) {
            return res.status(400).json({ msg: 'Ya existe una historia clínica registrada para este documento.' });
        }
        // Crear historia clínica usando _id y cédula
        const data = await historiaClinicaModel.create({
            ...inputData,
            patient: paciente._id,
            cedulaPaciente: paciente.cedula
        });
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear la historia clínica.' });
    }
};

// Obtener todas las historias clínicas
const getAllHistoriasClinicas = async (req, res) => {
    try {
        const data = await historiaClinicaModel.find({});

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las historias clínicas." });
    }
};

// Obtener historia clínica por ID
const getHistoriaClinicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await historiaClinicaModel.findById(id);

        if (!data) {
            return res.status(404).json({ msg: "Historia clínica no encontrada." });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la historia clínica." });
    }
};

// Actualizar historia clínica por ID
const updateHistoriaClinicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        const data = await historiaClinicaModel.findByIdAndUpdate(id, inputData, { new: true });

        if (!data) {
            return res.status(404).json({ msg: "Historia clínica no encontrada para actualizar." });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la historia clínica." });
    }
};

// Eliminar historia clínica por ID
const removeHistoriaClinicaById = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await historiaClinicaModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ msg: "Historia clínica no encontrada para eliminar." });
        }

        res.status(200).json({ msg: "Historia clínica eliminada correctamente", data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la historia clínica." });
    }
};

export {
    createHistoriaClinica,
    getAllHistoriasClinicas,
    getHistoriaClinicaById,
    updateHistoriaClinicaById,
    removeHistoriaClinicaById
};