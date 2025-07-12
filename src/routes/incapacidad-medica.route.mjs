import express from 'express';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

import {
    createIncapacidadMedica,
    getAllIncapacidadesMedicas,
    getIncapacidadMedicaById,
    updateIncapacidadMedicaById,
    removeIncapacidadMedicaById,
    testIncapacidadMedica
} from '../controller/incapacidad-medica.controller.mjs';

const router = express.Router();

// Rutas de incapacidades médicas con autenticación
router.post('/api/incapacidadMedica', authUser, createIncapacidadMedica);
router.get('/api/incapacidadMedica', authUser, getAllIncapacidadesMedicas);

// Ruta de prueba (debe ir antes de las rutas con parámetros)
router.get('/api/incapacidadMedica/test', authUser, testIncapacidadMedica);

router.get('/api/incapacidadMedica/:id', authUser, getIncapacidadMedicaById);
router.patch('/api/incapacidadMedica/:id', authUser, updateIncapacidadMedicaById);
router.delete('/api/incapacidadMedica/:id', authUser, removeIncapacidadMedicaById);

export default router; 