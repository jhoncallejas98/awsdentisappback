import formulacionMedicaModel from "../schemas/formulacion-medica.schema.mjs";
import userModel from "../schemas/User.schema.mjs";

// Crear una formulación médica
const createFormulacionMedica = async (req, res) => {
    try {
        console.log('=== CREAR FÓRMULA MÉDICA ===');
        console.log('Headers recibidos:', req.headers);
        console.log('Token recibido:', req.header('X-Token'));
        console.log('Usuario autenticado:', req.authUser);
        
        const inputData = req.body;
        console.log('Body completo recibido:', JSON.stringify(inputData, null, 2));
        console.log('Campos recibidos:', Object.keys(inputData));
        
        // Logs detallados para fechas
        console.log('=== ANÁLISIS DE FECHAS - FÓRMULA MÉDICA ===');
        console.log('Fecha recibida del frontend:', inputData.fecha);
        console.log('Tipo de fecha recibida:', typeof inputData.fecha);
        console.log('Fecha como string:', String(inputData.fecha));
        
        if (inputData.fecha) {
            const fechaOriginal = new Date(inputData.fecha);
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
        
        // Verificar si req.authUser existe
        if (!req.authUser) {
            console.log('ERROR: req.authUser no existe');
            return res.status(401).json({ msg: 'Usuario no autenticado' });
        }
        
        // Obtener la cédula del dentista desde el token
        const cedulaDentista = req.authUser.cedula;
        console.log('Cédula del dentista desde token:', cedulaDentista);
        
        // Verificar campos requeridos (sin cedulaDentista ya que viene del token)
        const camposRequeridos = ['cedulaPaciente', 'fecha', 'medicamento', 'dosis', 'frecuencia', 'duracionDias'];
        const camposFaltantes = camposRequeridos.filter(campo => !inputData[campo]);
        
        if (camposFaltantes.length > 0) {
            console.log('Campos faltantes:', camposFaltantes);
            return res.status(400).json({ 
                msg: 'Campos requeridos faltantes', 
                camposFaltantes: camposFaltantes 
            });
        }
        
        // Buscar paciente por cédula
        console.log('Buscando paciente con cédula:', inputData.cedulaPaciente);
        const paciente = await userModel.findOne({ cedula: inputData.cedulaPaciente, role: 'patient' });
        if (!paciente) {
            console.log('Paciente no encontrado');
            return res.status(400).json({ msg: 'Paciente no encontrado.' });
        }
        console.log('Paciente encontrado:', paciente._id);
        
        // Buscar dentista por cédula del token
        console.log('Buscando dentista con cédula del token:', cedulaDentista);
        const dentista = await userModel.findOne({ cedula: cedulaDentista, role: 'dentist' });
        if (!dentista) {
            console.log('Dentista no encontrado');
            return res.status(400).json({ msg: 'Dentista no encontrado.' });
        }
        console.log('Dentista encontrado:', dentista._id);
        
        // Procesar la fecha antes de guardar
        let fechaProcesada = inputData.fecha;
        if (inputData.fecha) {
            // Si la fecha viene como string, convertirla a Date object
            if (typeof inputData.fecha === 'string') {
                fechaProcesada = new Date(inputData.fecha);
                console.log('Fecha procesada para guardar:', fechaProcesada);
                console.log('Fecha procesada ISO:', fechaProcesada.toISOString());
            }
        }
        
        // Crear formulación médica usando _id y cédula
        const dataToCreate = {
            ...inputData,
            fecha: fechaProcesada,
            patient: paciente._id,
            cedulaPaciente: paciente.cedula,
            dentist: dentista._id,
            cedulaDentista: cedulaDentista // Usar la cédula del token
        };
        
        console.log('Datos a crear:', JSON.stringify(dataToCreate, null, 2));
        
        const data = await formulacionMedicaModel.create(dataToCreate);
        console.log('Fórmula médica creada exitosamente:', data._id);
        console.log('Fórmula fecha guardada:', data.fecha);
        console.log('Fórmula fecha ISO:', data.fecha.toISOString());
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

// Endpoint de prueba para fórmulas médicas
const testFormulacionMedica = async (req, res) => {
    console.log('=== PRUEBA FÓRMULA MÉDICA ===');
    console.log('Headers:', req.headers);
    console.log('Token:', req.header('X-Token'));
    console.log('Usuario:', req.authUser);
    console.log('Cédula:', req.authUser?.cedula);
    
    res.json({
        msg: 'Prueba fórmula médica exitosa',
        user: req.authUser,
        cedula: req.authUser?.cedula
    });
};

export {
    createFormulacionMedica,
    getAllFormulacionesMedicas,
    getFormulacionMedicaById,
    updateFormulacionMedicaById,
    removeFormulacionMedicaById,
    testFormulacionMedica
};