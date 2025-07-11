import formulacionMedicaModel from "../schemas/formulacion-medica.schema.mjs";
import userModel from "../schemas/User.schema.mjs";

// Crear una formulación médica
const createFormulacionMedica = async (req, res) => {
    try {
        const inputData = req.body;
        
        console.log('=== CREAR FÓRMULA MÉDICA ===');
        console.log('Body completo recibido:', JSON.stringify(inputData, null, 2));
        console.log('Campos recibidos:', Object.keys(inputData));
        
        // Verificar campos requeridos
        const camposRequeridos = ['cedulaPaciente', 'cedulaDentista', 'fecha', 'medicamento', 'dosis', 'frecuencia', 'duracionDias'];
        const camposFaltantes = camposRequeridos.filter(campo => !inputData[campo]);
        
        if (camposFaltantes.length > 0) {
            console.log('Campos faltantes:', camposFaltantes);
            return res.status(400).json({ 
                msg: 'Campos requeridos faltantes', 
                camposFaltantes: camposFaltantes 
            });
        }
        
        // Buscar paciente y dentista por cédula
        console.log('Buscando paciente con cédula:', inputData.cedulaPaciente);
        const paciente = await userModel.findOne({ cedula: inputData.cedulaPaciente, role: 'patient' });
        if (!paciente) {
            console.log('Paciente no encontrado');
            return res.status(400).json({ msg: 'Paciente no encontrado.' });
        }
        console.log('Paciente encontrado:', paciente._id);
        
        console.log('Buscando dentista con cédula:', inputData.cedulaDentista);
        const dentista = await userModel.findOne({ cedula: inputData.cedulaDentista, role: 'dentist' });
        if (!dentista) {
            console.log('Dentista no encontrado');
            return res.status(400).json({ msg: 'Dentista no encontrado.' });
        }
        console.log('Dentista encontrado:', dentista._id);
        
        // Crear formulación médica usando _id y cédula
        const dataToCreate = {
            ...inputData,
            patient: paciente._id,
            cedulaPaciente: paciente.cedula,
            dentist: dentista._id,
            cedulaDentista: dentista.cedula
        };
        
        console.log('Datos a crear:', JSON.stringify(dataToCreate, null, 2));
        
        const data = await formulacionMedicaModel.create(dataToCreate);
        console.log('Fórmula médica creada exitosamente:', data._id);
        res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear fórmula médica:', error);
        res.status(500).json({ msg: "Error al crear la formulación médica.", error: error.message });
    }
};

// Obtener todas las formulaciones médicas
const getAllFormulacionesMedicas = async (req, res) => {
    try {
        const data = await formulacionMedicaModel.find({});
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
        const data = await formulacionMedicaModel.findById(id);
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