import mongoose from "mongoose";
// define una funcion asincrona para definir la configuracion del ODM Mongoose para usar MongoDB
async function dbConnect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/db-dentisapp', {}); // conectamis la base de datos y retorna la promesa
            console.log('Base de datos conectada correctamente')
    } catch (error) {
        console.log(error);
        console.error('Error al conectarse a la base de datos')
    }

}

// mongoose.connect('mongodb://127.0.0.51:27017/db-dentisapp')
//     .then(() => {console.log('Conected!')})
//     .catch(()=> {
//         console.log('Error')
//     });

export default dbConnect;