import express from "express";
import { createDisponibilidad, getAllDisponibilidad, updateDisponibilidadById, deleteDisponibilidadById } from "../controller/disponibilidad.controller.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";

const router = express.Router();

//define las rutas para la entidad disponibilidad
router.post("/api/disponibilidad",  createDisponibilidad );
router.get("/api/disponibilidad",  getAllDisponibilidad );
router.patch("/api/disponibilidad", updateDisponibilidadById)
router.delete("/api/disponibilidad/:id", deleteDisponibilidadById);


export default router;

