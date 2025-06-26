import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI??"mongodb://localhost:27017/db-dentisapp";
// define una funcion asincrona para definir la configuracion del ODM Mongoose para usar MongoDB
async function dbConnect() {
    try {
<<<<<<< HEAD
        await mongoose.connect(process.env.dbConnect ??"mongodb://localhost:27017/db-dentisapp", {}); // conectamis la base de datos y retorna la promesa
=======
        await mongoose.connect(MONGODB_URI, {}); // conectamis la base de datos y retorna la promesa
>>>>>>> e1a00966dda4babb1bb4c618f0f311a626555782
            console.log('Base de datos conectada correctamente')
            // await mongoose.connect(process.env.URL_MODELO_MONGO ??"mongodb://localhost:27017/db-dentisapp", {}); // conectamis la base de datos y retorna la promesa
            // console.log('Base de datos conectada correctamente')
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