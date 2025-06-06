import appointmentModel from "../schemas/appoiment.schemas.mjs";


const createAppoiment =  async (req, res)=> {
    const inputData = req.body;
    //controla las excepciones de la consulta.
    try {
        // antes de registrar verificar si es usuario existe
        const patienteFound = await appointmentModel.findOne({patient: inputData.patient});
        if (patienteFound){
            return res.status(404).json({msg: "el usuario ya existe"})
        }


        // paso 2: registrar al usarui
        const registeredAppoiment =  await appointmentModel.create(inputData);
        console.log(registeredAppoiment);
        res.status(201).json(registeredAppoiment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({"msg": 'Error al registrar la cita'});
    }


}


const getAppoiment = async (req, res)=> {
    try {
        const data = await appointmentModel.find({})
        res.status(201).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'error no se pudo obtener el listado de usuarios'})
    }






}


// const updateAppoiment  =(req, res)=> {
//     res.send( 'Actualizacion de las citas')
// }


const updateAllAppoiment = (req, res)=> {
    res.send( 'Actualizacion total de todas las citas')
}


const deleteAppoiment =  (req, res)=> {
    const appoimentId = req.params.id;
    appointmentModel.findByIdAndDelete(appoimentId)
        .then((deletedAppoiment) => {
            if (!deletedAppoiment) {
                return res.status(404).json({ msg: 'No se encontró la cita para eliminar' });
            }
            res.json({ msg: 'Cita eliminada exitosamente' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ msg: "Error al eliminar la cita" });
        });
}




const getAppoimentById = async (req, res) => {
    try {
        const appoimentId = req.params.id;
        const data = await appointmentModel.findById(appoimentId);


        if (!data) {
            return res.status(404).json({ msg: 'No se encontró la cita' });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener la cita por id" });
    }
}


const updateAppoimentById = async (req, res) => {
    try {
        const appoimentId = req.params.id;
        const inputData = req.body;


        const updatedAppoiment = await appointmentModel.findByIdAndUpdate(appoimentId, inputData, { new: true });


        if (!updatedAppoiment) {
            return res.status(404).json({ msg: 'No se encontró la cita para actualizar' });
        }
        res.json(updatedAppoiment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la cita por id" });
    }
}


// esta exportando las funcionalidas de este archvio usando el export
export {
    createAppoiment,
    getAppoiment,
    updateAllAppoiment,
    deleteAppoiment,
    getAppoimentById,
    updateAppoimentById // <-- esta sí existe
}

