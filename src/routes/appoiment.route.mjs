// Importaciones necesarias
import { Router } from "express";
import {
    createAppoiment,
    deleteAppoiment,
    getAppoiment,
    updateAllAppoiment,
    getAppoimentById,
    updateAppoimentById,
    testDates
} from "../controller/appoiment.controllers.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";
import { handleDates } from "../middlewares/date-handler.middleware.mjs";

const router = Router(); // Instancia del router de Express

// Definición de rutas para la entidad "Appoiment"
router.get('/api/appoiment', authUser, handleDates, getAppoiment); // Obtener todas las citas
router.post('/api/appoiment', authUser, handleDates, createAppoiment); // Crear una cita
router.put('/api/appoiment', authUser, handleDates, updateAllAppoiment); // Actualizar todas las citas
router.delete('/api/appoiment', authUser, deleteAppoiment); // Eliminar todas las citas
router.get('/api/appoiment/:id', authUser, getAppoimentById); // Obtener una cita por ID
router.patch('/api/appoiment/:id', authUser, handleDates, updateAppoimentById); // Actualizar una cita por ID

// Ruta de prueba para fechas
router.post('/api/test-dates', authUser, handleDates, testDates);

export default router;