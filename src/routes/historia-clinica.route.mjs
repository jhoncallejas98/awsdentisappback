import express from 'express';

import { 
    createHistoriaClinica, 
    getAllHistoriasClinicas, 
    getHistoriaClinicaById, 
    removeHistoriaClinicaById, 
    updateHistoriaClinicaById 
} from '../controller/historia-clinica.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

router.post('/api/historiaClinica', authUser, createHistoriaClinica);
router.get('/api/historiaClinica', authUser, getAllHistoriasClinicas);
router.get('/api/historiaClinica/:id', authUser, getHistoriaClinicaById);
router.delete('/api/historiaClinica/:id', authUser, removeHistoriaClinicaById);
router.patch('/api/historiaClinica/:id', authUser, updateHistoriaClinicaById);

export default router;