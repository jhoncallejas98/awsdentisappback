import express from "express";
import { createDisponibilidad, getAllDisponibilidad, updateDisponibilidadById } from "../controller/disponibilidad.controller.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";

const router = express.Router();

//define las rutas para la entidad disponibilidad
router.post("/api/disponibilidad",authUser,  createDisponibilidad );
router.get("/api/disponibilidad",authUser,  getAllDisponibilidad );
router.patch("/api/disponibilidad", updateDisponibilidadById)


export default router;

