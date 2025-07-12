import incapacidadMedicaModel from "../schemas/incapacidad-medica.schema.mjs";
import userModel from "../schemas/User.schema.mjs";

// Crear una incapacidad médica
const createIncapacidadMedica = async (req, res) => {
    try {
        console.log('=== CREAR INCAPACIDAD MÉDICA ===');
        console.log('Headers recibidos:', req.headers);
        console.log('Token recibido:', req.header('X-Token'));
        console.log('Usuario autenticado:', req.authUser);
        
        const inputData = req.body;
        console.log('Body completo recibido:', JSON.stringify(inputData, null, 2));
        console.log('Campos recibidos:', Object.keys(inputData));
        
        // Logs detallados para fechas
        console.log('=== ANÁLISIS DE FECHAS - INCAPACIDAD MÉDICA ===');
        console.log('Fecha inicio recibida del frontend:', inputData.fechaInicio);
        console.log('Fecha fin recibida del frontend:', inputData.fechaFin);
        console.log('Tipo de fecha inicio:', typeof inputData.fechaInicio);
        console.log('Tipo de fecha fin:', typeof inputData.fechaFin);
        
        if (inputData.fechaInicio) {
            const fechaInicioOriginal = new Date(inputData.fechaInicio);
            console.log('Fecha inicio convertida a Date object:', fechaInicioOriginal);
            console.log('Fecha inicio ISO string:', fechaInicioOriginal.toISOString());
            console.log('Fecha inicio local string:', fechaInicioOriginal.toString());
            console.log('Zona horaria inicio:', fechaInicioOriginal.getTimezoneOffset());
            console.log('Año inicio:', fechaInicioOriginal.getFullYear());
            console.log('Mes inicio:', fechaInicioOriginal.getMonth() + 1);
            console.log('Día inicio:', fechaInicioOriginal.getDate());
        }
        
        if (inputData.fechaFin) {
            const fechaFinOriginal = new Date(inputData.fechaFin);
            console.log('Fecha fin convertida a Date object:', fechaFinOriginal);
            console.log('Fecha fin ISO string:', fechaFinOriginal.toISOString());
            console.log('Fecha fin local string:', fechaFinOriginal.toString());
            console.log('Zona horaria fin:', fechaFinOriginal.getTimezoneOffset());
            console.log('Año fin:', fechaFinOriginal.getFullYear());
            console.log('Mes fin:', fechaFinOriginal.getMonth() + 1);
            console.log('Día fin:', fechaFinOriginal.getDate());
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
        const camposRequeridos = ['cedulaPaciente', 'fechaInicio', 'fechaFin', 'diasIncapacidad', 'motivo', 'diagnostico', 'tratamiento'];
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
        
        // Procesar las fechas antes de guardar
        let fechaInicioProcesada = inputData.fechaInicio;
        let fechaFinProcesada = inputData.fechaFin;
        
        if (inputData.fechaInicio) {
            if (typeof inputData.fechaInicio === 'string') {
                fechaInicioProcesada = new Date(inputData.fechaInicio);
                console.log('Fecha inicio procesada para guardar:', fechaInicioProcesada);
                console.log('Fecha inicio procesada ISO:', fechaInicioProcesada.toISOString());
            }
        }
        
        if (inputData.fechaFin) {
            if (typeof inputData.fechaFin === 'string') {
                fechaFinProcesada = new Date(inputData.fechaFin);
                console.log('Fecha fin procesada para guardar:', fechaFinProcesada);
                console.log('Fecha fin procesada ISO:', fechaFinProcesada.toISOString());
            }
        }
        
        // Crear incapacidad médica usando _id y cédula
        const dataToCreate = {
            ...inputData,
            fechaInicio: fechaInicioProcesada,
            fechaFin: fechaFinProcesada,
            patient: paciente._id,
            cedulaPaciente: paciente.cedula,
            dentist: dentista._id,
            cedulaDentista: cedulaDentista // Usar la cédula del token
        };
        
        console.log('Datos a crear:', JSON.stringify(dataToCreate, null, 2));
        
        const data = await incapacidadMedicaModel.create(dataToCreate);
        console.log('Incapacidad médica creada exitosamente:', data._id);
        console.log('Incapacidad fecha inicio guardada:', data.fechaInicio);
        console.log('Incapacidad fecha fin guardada:', data.fechaFin);
        console.log('Incapacidad fecha inicio ISO:', data.fechaInicio.toISOString());
        console.log('Incapacidad fecha fin ISO:', data.fechaFin.toISOString());
        res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear incapacidad médica:', error);
        res.status(500).json({ msg: "Error al crear la incapacidad médica.", error: error.message });
    }
};

// Obtener todas las incapacidades médicas
const getAllIncapacidadesMedicas = async (req, res) => {
    try {
        // Si no hay parámetros, devolver todas las incapacidades
        if (!req.query.cedulaPaciente && !req.query.cedulaDentista) {
            const todasIncapacidades = await incapacidadMedicaModel.find({}).populate('patient').populate('dentist');
            console.log('Todas las incapacidades:', todasIncapacidades);
            res.json(todasIncapacidades);
            return;
        }
        
        // Si hay parámetros, buscar por filtros específicos
        const { cedulaPaciente, cedulaDentista } = req.query;
        
        console.log('Backend - Query recibido:', { cedulaPaciente, cedulaDentista });
        
        let filter = {};
        if (cedulaPaciente) filter.cedulaPaciente = cedulaPaciente;
        if (cedulaDentista) filter.cedulaDentista = cedulaDentista;
        
        const incapacidades = await incapacidadMedicaModel.find(filter)
            .populate('patient')
            .populate('dentist');
        
        console.log('Backend - Incapacidades encontradas:', incapacidades);
        
        res.json(incapacidades);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener incapacidad médica por ID
const getIncapacidadMedicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await incapacidadMedicaModel.findById(id)
            .populate('patient')
            .populate('dentist');
        if (!data) {
            return res.status(404).json({ msg: "Incapacidad médica no encontrada." });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la incapacidad médica." });
    }
};

// Actualizar incapacidad médica por ID
const updateIncapacidadMedicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;

        const data = await incapacidadMedicaModel.findByIdAndUpdate(id, inputData, { new: true })
            .populate('patient')
            .populate('dentist');

        if (!data) {
            return res.status(404).json({ msg: "Incapacidad médica no encontrada para actualizar." });
        }

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la incapacidad médica." });
    }
};

// Eliminar incapacidad médica por ID
const removeIncapacidadMedicaById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await incapacidadMedicaModel.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({ msg: "Incapacidad médica no encontrada para eliminar." });
        }

        res.status(200).json({ msg: "Incapacidad médica eliminada correctamente", data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la incapacidad médica." });
    }
};

// Endpoint de prueba para incapacidades médicas
const testIncapacidadMedica = async (req, res) => {
    console.log('=== PRUEBA INCAPACIDAD MÉDICA ===');
    console.log('Headers:', req.headers);
    console.log('Token:', req.header('X-Token'));
    console.log('Usuario:', req.authUser);
    console.log('Cédula:', req.authUser?.cedula);
    
    res.json({
        msg: 'Prueba incapacidad médica exitosa',
        user: req.authUser,
        cedula: req.authUser?.cedula
    });
};

export {
    createIncapacidadMedica,
    getAllIncapacidadesMedicas,
    getIncapacidadMedicaById,
    updateIncapacidadMedicaById,
    removeIncapacidadMedicaById,
    testIncapacidadMedica
}; 