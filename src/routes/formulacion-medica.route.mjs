import express from 'express';
import { authUser } from '../middlewares/auth-user.middleware.mjs';
import { handleDates } from '../middlewares/date-handler.middleware.mjs';

import {
    createFormulacionMedica,
    getAllFormulacionesMedicas,
    getFormulacionMedicaById,
    updateFormulacionMedicaById,
    removeFormulacionMedicaById,
    testFormulacionMedica
} from '../controller/formulacion-medica.controller.mjs';

const router = express.Router();

router.post('/api/formulacionMedica', authUser, handleDates, createFormulacionMedica);
router.get('/api/formulacionMedica', authUser, getAllFormulacionesMedicas);

// Ruta de prueba (debe ir antes de las rutas con parámetros)
router.get('/api/formulacionMedica/test', authUser, testFormulacionMedica);

router.get('/api/formulacionMedica/:id', authUser, getFormulacionMedicaById);
router.patch('/api/formulacionMedica/:id', authUser, handleDates, updateFormulacionMedicaById);
router.delete('/api/formulacionMedica/:id', authUser, removeFormulacionMedicaById);


export default router;