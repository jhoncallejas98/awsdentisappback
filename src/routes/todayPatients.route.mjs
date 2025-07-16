import { Router } from "express";
import {
    createTodayPatient,
    getAllTodayPatients,
    getTodayPatientById,
    updateTodayPatientById,
    removeTodayPatientById
} from "../controller/todayPatients.controllers.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";

const router = Router();

// Rutas para TodayPatients bajo la ruta base /api/home
router.post("/api/home", authUser, createTodayPatient); // Crear paciente del día
router.get("/api/home", authUser, getAllTodayPatients); // Obtener todos los pacientes de hoy
router.get("/api/home/:id", authUser, getTodayPatientById); // Obtener paciente del día por ID
router.patch("/api/home/:id", authUser, updateTodayPatientById); // Actualizar paciente del día
router.delete("/api/home/:id", authUser, removeTodayPatientById); // Eliminar paciente del día

export default router;