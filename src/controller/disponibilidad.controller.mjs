import { json } from "express";
import disponibilidadModel from "../schemas/disponibilidad.schemas.mjs";

const createDiponibilidad = async (req, res) => {
    const inputData = req.body;
    try {
        const disponibilidadFound = await disponibilidadModel.findOne();
        if (disponibilidadFound) {
            return res.status(404).json({ msg: "el usuario ya existe :)" })
        }

        const data = await disponibilidadModel.create(inputData);

        res.status(201).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "error no se pudo registrar" })

    }
}

const getAllDisponibilidad = async (req, res) => {
    try {
        const data = await disponibilidadModel.find({});
        res.status(200).json(data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "no se pudo obtener resultado de usuarios" })
    }

}

const updatedisponibilidadById = (req, res) => {
    const disponibilidadId = res.params.id;
    const inputData = res.body;
    disponibilidadModel.findByIdAndUpdate(disponibilidadId, inputData)
    res.json(data)
}
//exponer cada funcionalidad definida en este archivo
export {
    createDiponibilidad,
    getAllDisponibilidad,
    updatedisponibilidadById
}
