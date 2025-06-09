import formulacionMedicaModel from "../schemas/formulacion-medica.schema.mjs";

const createFormulacionMedica = async (req, res) => {
    const inputData = req.body;

    try {
        const formulacionExistente = await formulacionMedicaModel.findOne({ id: inputData.id });

        if (formulacionExistente) {
            return res.status(400).json({ msg: "Ya existe una formulación médica con ese ID." });
        }

        const data = await formulacionMedicaModel.create(inputData);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo crear la formulación médica." });
    }
};

const getAllFormulacionesMedicas = async (req, res) => {
    try {
        const data = await formulacionMedicaModel.find({}).populate(['name']);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudieron obtener las formulaciones médicas." });
    }
};

const getFormulacionMedicaById = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await formulacionMedicaModel.findById(id).populate(['name']);

        if (!data) {
            return res.status(404).json({ msg: "La formulación médica no fue encontrada." });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo obtener la formulación médica." });
    }
};

const updateFormulacionMedicaById = async (req, res) => {
    const id = req.params.id;
    const inputData = req.body;

    try {
        const data = await formulacionMedicaModel.findByIdAndUpdate(id, inputData, { new: true });

        if (!data) {
            return res.status(404).json({ msg: "No se encontró la formulación médica para actualizar." });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo actualizar la formulación médica." });
    }
};

const removeFormulacionMedicaById = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await formulacionMedicaModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ msg: "No se encontró la formulación médica para eliminar." });
        }

        res.json({ msg: "Formulación médica eliminada correctamente", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo eliminar la formulación médica." });
    }
};

export {
    createFormulacionMedica,
    getAllFormulacionesMedicas,
    getFormulacionMedicaById,
    updateFormulacionMedicaById,
    removeFormulacionMedicaById
};