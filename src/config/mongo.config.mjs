import mongoose from "mongoose";

// define una funcion asincrona para definir la configuracion del ODM Mongoose para usar MongoDB
async function dbConnect() {
    try {
        // URL de MongoDB Atlas
        const mongoUrl = process.env.DB_URL_ATLAS || "mongodb+srv://jcallejasv:lB9uCPcsSo4TT0zz@dentisapp.uqfkne5.mongodb.net/?retryWrites=true&w=majority&appName=dentisapp";
        
        // URL local como fallback
        const localUrl = "mongodb://localhost:27017/db-dentisapp";
        
        // Usar la URL de Atlas por defecto, o la variable de entorno si está definida
        const connectionUrl = process.env.NODE_ENV === 'production' ? mongoUrl : (process.env.DB_URL_LOCAL || mongoUrl);
        
        console.log('Intentando conectar a MongoDB...');
        console.log('URL de conexión:', connectionUrl.replace(/\/\/.*@/, '//***:***@')); // Ocultar credenciales en logs
        
        await mongoose.connect(connectionUrl, {
            // Opciones de conexión actualizadas para MongoDB Atlas
            maxPoolSize: 10, // Máximo número de conexiones en el pool
            serverSelectionTimeoutMS: 5000, // Timeout para selección de servidor
            socketTimeoutMS: 45000, // Timeout para operaciones de socket
            // Opciones removidas: bufferMaxEntries y bufferCommands ya no son soportadas
        });

        console.log('✅ Base de datos MongoDB Atlas conectada correctamente');
        console.log('📊 Base de datos:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Puerto:', mongoose.connection.port);
        
    } catch (error) {
        console.error('❌ Error al conectarse a la base de datos:');
        console.error('Detalles del error:', error.message);
        
        // Intentar conectar a la base de datos local como fallback
        try {
            console.log('🔄 Intentando conectar a base de datos local como fallback...');
            await mongoose.connect("mongodb://localhost:27017/db-dentisapp", {});
            console.log('✅ Base de datos local conectada como fallback');
        } catch (localError) {
            console.error('❌ Error al conectar a base de datos local:', localError.message);
            process.exit(1); // Salir del proceso si no se puede conectar a ninguna base de datos
        }
    }
}

export default dbConnect;