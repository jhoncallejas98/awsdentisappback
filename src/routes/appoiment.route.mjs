// Importaciones necesarias
import { Router } from "express";
import {
    createAppoiment,
    deleteAppoiment,
    getAppoiment,
    updateAllAppoiment,
    getAppoimentById,
    updateAppoimentById
} from "../controller/appoiment.controllers.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";

const router = Router(); // Instancia del router de Express

// Definición de rutas para la entidad "Appoiment"
router.get('/api/appoiment', getAppoiment); // Obtener todas las citas
router.post('/api/appoiment', createAppoiment); // Crear una cita
router.put('/api/appoiment', authUser, updateAllAppoiment); // Actualizar todas las citas
router.delete('/api/appoiment', authUser, deleteAppoiment); // Eliminar todas las citas
router.get('/api/appoiment/:id', authUser, getAppoimentById); // Obtener una cita por ID
router.patch('/api/appoiment/:id', authUser, updateAppoimentById); // Actualizar una cita por ID

export default router;