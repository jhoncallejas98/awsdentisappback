import express from 'express';

import { 
    createHistoriaClinica, 
    getAllHistoriasClinicas, 
    getHistoriaClinicaById, 
    removeHistoriaClinicaById, 
    updateHistoriaClinicaById 
} from '../controller/historia-clinica.controller.mjs';

const router = express.Router();

router.post('/api/historiaClinica', createHistoriaClinica);
router.get('/api/historiaClinica', getAllHistoriasClinicas);
router.get('/api/historiaClinica/:id', getHistoriaClinicaById);
router.delete('/api/historiaClinica/:id', removeHistoriaClinicaById);
router.patch('/api/historiaClinica/:id', updateHistoriaClinicaById);

export default router;