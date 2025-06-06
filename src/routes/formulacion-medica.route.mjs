import express from 'express';

import {
    createFormulacionMedica,
    getAllFormulacionesMedicas,
    getFormulacionMedicaById,
    updateFormulacionMedicaById,
    removeFormulacionMedicaById
} from '../controller/formulacion-medica.controller.mjs';

const router = express.Router();

router.post('/api/formulacionMedica', createFormulacionMedica);
router.get('/api/formulacionMedica', getAllFormulacionesMedicas);
router.get('/api/formulacionMedica/:id', getFormulacionMedicaById);
router.patch('/api/formulacionMedica/:id', updateFormulacionMedicaById);
router.delete('/api/formulacionMedica/:id', removeFormulacionMedicaById);

export default router;