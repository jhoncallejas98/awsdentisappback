import express from "express";
import { createDiponibilidad, getAllDisponibilidad, updatedisponibilidadById } from "../controller/disponibilidad.controller.mjs";
import { authUser } from "../middlewares/auth-user.middleware.mjs";


const router = express.Router();

//define las rutas para la entidad disponibilidad
router.post("/api/disponibilidad", authUser,  createDiponibilidad );
router.get("/api/disponibilidad", authUser,  getAllDisponibilidad );
router.patch("/api/disponibilidad", authUser, updatedisponibilidadById)


export default router;

