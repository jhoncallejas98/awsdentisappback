import express from "express";
import { 
    createDisponibilidad, 
    getAllDisponibilidad, 
    updateDisponibilidadById 
} from "../controller/disponibilidad.controller.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";

const router = express.Router();

// Definición de rutas para la entidad "Disponibilidad"
router.post("/api/disponibilidad", authUser, createDisponibilidad); // Crear
router.get("/api/disponibilidad", authUser, getAllDisponibilidad); // Leer
router.patch("/api/disponibilidad/:id", authUser, updateDisponibilidadById); // Actualizar por ID

export default router;