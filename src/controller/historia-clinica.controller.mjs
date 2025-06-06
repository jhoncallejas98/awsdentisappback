import historiaClinicaModel from "../schemas/historia-clinica.schemas.mjs";

const createHistoriaClinica = async (req, res) => {
    const inputData = req.body;

    try {
        // Paso 1: Verificar si ya existe una historia clínica para ese documento
        const historiaExistente = await historiaClinicaModel.findOne({
            documentId: inputData.documentId
        });

        if (historiaExistente) {
            return res.status(400).json({ msg: 'Ya existe una historia clínica registrada para este documento.' });
        }

        // Paso 2: Crear la historia clínica
        const data = await historiaClinicaModel.create(inputData);

        // Paso 3: Responder al cliente
        res.status(201).json(data);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error: No se pudo crear la historia clínica.' });
    }
};

const getAllHistoriasClinicas = async (req, res) => {
    try {
        const data = await historiaClinicaModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudieron obtener las historias clínicas." });
    }
};

const getHistoriaClinicaById = async (req, res) => {
    const historiaId = req.params.id;

    try {
        const data = await historiaClinicaModel.findById(historiaId);

        if (!data) {
            return res.status(404).json({ msg: "La historia clínica no fue encontrada." });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo buscar la historia clínica." });
    }
};

const updateHistoriaClinicaById = async (req, res) => {
    const historiaId = req.params.id;
    const inputData = req.body;

    try {
        const data = await historiaClinicaModel.findByIdAndUpdate(historiaId, inputData, { new: true });

        if (!data) {
            return res.status(404).json({ msg: "No se encontró la historia clínica para actualizar." });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo actualizar la historia clínica." });
    }
};

const removeHistoriaClinicaById = async (req, res) => {
    const historiaId = req.params.id;

    try {
        const data = await historiaClinicaModel.findByIdAndDelete(historiaId);

        if (!data) {
            return res.status(404).json({ msg: "No se encontró la historia clínica para eliminar." });
        }

        res.json({ msg: "Historia clínica eliminada correctamente", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error: No se pudo eliminar la historia clínica." });
    }
};

export {
    createHistoriaClinica,
    getAllHistoriasClinicas,
    getHistoriaClinicaById,
    updateHistoriaClinicaById,
    removeHistoriaClinicaById
};
