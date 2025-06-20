import formulacionMedicaModel from "../schemas/formulacion-medica.schema.mjs";

// Crear una formulación médica
const createFormulacionMedica = async (req, res) => {
    try {
        const inputData = req.body;

        const data = await formulacionMedicaModel.create(inputData);
        res.status(201).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la formulación médica." });
    }
};

// Obtener todas las formulaciones médicas
const getAllFormulacionesMedicas = async (req, res) => {
    try {
        const data = await formulacionMedicaModel.find({})
            .populate('name', 'name email role') // Trae info del usuario relacionado
            .populate('odontologoId', 'name email role'); // Trae info del odontólogo

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener las formulaciones médicas." });
    }
};

// Obtener formulación médica por ID
const getFormulacionMedicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await formulacionMedicaModel.findById(id)
            .populate('name', 'name email role')
            .populate('odontologoId', 'name email role');

        if (!data) {
            return res.status(404).json({ msg: "Formulación médica no encontrada." });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la formulación médica." });
    }
};

// Actualizar formulación médica por ID
const updateFormulacionMedicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        const data = await formulacionMedicaModel.findByIdAndUpdate(id, inputData, { new: true });

        if (!data) {
            return res.status(404).json({ msg: "Formulación médica no encontrada para actualizar." });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la formulación médica." });
    }
};

// Eliminar formulación médica por ID
const removeFormulacionMedicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await formulacionMedicaModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ msg: "Formulación médica no encontrada para eliminar." });
        }

        res.status(200).json({ msg: "Formulación médica eliminada correctamente", data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la formulación médica." });
    }
};

export {
    createFormulacionMedica,
    getAllFormulacionesMedicas,
    getFormulacionMedicaById,
    updateFormulacionMedicaById,
    removeFormulacionMedicaById
};