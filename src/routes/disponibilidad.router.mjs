import express from "express";
import { createDiponibilidad, getAllDisponibilidad, updatedisponibilidadById } from "../controller/disponibilidad.controller.mjs";


const router = express.Router();

//define las rutas para la entidad disponibilidad
router.post("/api/disponibilidad",  createDiponibilidad );
router.get("/api/disponibilidad",  getAllDisponibilidad );

router.patch("/api/disponibilidad", updatedisponibilidadById)


export default router;

