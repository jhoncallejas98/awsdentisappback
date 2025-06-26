import express from 'express';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

import {
    createFormulacionMedica,
    getAllFormulacionesMedicas,
    getFormulacionMedicaById,
    updateFormulacionMedicaById,
    removeFormulacionMedicaById
} from '../controller/formulacion-medica.controller.mjs';

const router = express.Router();

router.post('/api/formulacionMedica', authUser, createFormulacionMedica);
router.get('/api/formulacionMedica', authUser, getAllFormulacionesMedicas);
router.get('/api/formulacionMedica/:id', authUser, getFormulacionMedicaById);

router.patch('/api/formulacionMedica/:id',authUser, updateFormulacionMedicaById);
router.delete('/api/formulacionMedica/:id',authUser, removeFormulacionMedicaById);


export default router;