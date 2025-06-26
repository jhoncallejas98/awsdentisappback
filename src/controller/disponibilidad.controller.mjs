import disponibilidadModel from "../schemas/disponibilidad.schemas.mjs";
import userModel from "../schemas/User.schema.mjs";

// Crear disponibilidad
const createDisponibilidad = async (req, res) => {
    const { dentist, diaSemana, bloque, activo } = req.body;

    try {
        // Validar si el odontólogo existe y es rol dentist
        const odontologo = await userModel.findOne({ _id: dentist, role: 'dentist' });
        if (!odontologo) {
            return res.status(400).json({ msg: "Odontólogo no válido o no encontrado." });
        }

        // Validar si ya existe disponibilidad para ese odontólogo, día y bloque
        const disponibilidadExistente = await disponibilidadModel.findOne({ dentist, diaSemana, bloque });
        if (disponibilidadExistente) {
            return res.status(400).json({ msg: "Ya existe esta disponibilidad para el odontólogo." });
        }

        const nuevaDisponibilidad = await disponibilidadModel.create({ dentist, diaSemana, bloque, activo });
        res.status(201).json(nuevaDisponibilidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear disponibilidad." });
    }
};

// Obtener todas las disponibilidades
const getAllDisponibilidad = async (req, res) => {
    try {
        const data = await disponibilidadModel.find({})
            .populate('odontologoId', 'name email speciality');
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener disponibilidades." });
    }
};

// Actualizar disponibilidad por ID
const updateDisponibilidadById = async (req, res) => {
    const disponibilidadId = req.params.id;
    const inputData = req.body;

    try {
        const updatedDisponibilidad = await disponibilidadModel.findByIdAndUpdate(disponibilidadId, inputData, { new: true });
        if (!updatedDisponibilidad) {
            return res.status(404).json({ msg: 'Disponibilidad no encontrada para actualizar.' });
        }
        res.json(updatedDisponibilidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la disponibilidad." });
    }
};

// Eliminar disponibilidad por ID (opcional)
const deleteDisponibilidadById = async (req, res) => {
    const disponibilidadId = req.params.id;

    try {
        const deleted = await disponibilidadModel.findByIdAndDelete(disponibilidadId);
        if (!deleted) {
            return res.status(404).json({ msg: 'Disponibilidad no encontrada para eliminar.' });
        }
        res.json({ msg: 'Disponibilidad eliminada correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar la disponibilidad." });
    }
};

export {
    createDisponibilidad,
    getAllDisponibilidad,
    updateDisponibilidadById,
    deleteDisponibilidadById
};