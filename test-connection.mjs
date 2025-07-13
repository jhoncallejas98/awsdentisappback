import dbConnect from './src/config/mongo.config.mjs';

// Script para probar la conexión a MongoDB Atlas
async function testConnection() {
    console.log('🧪 Probando conexión a MongoDB Atlas...');
    
    try {
        await dbConnect();
        console.log('✅ Conexión exitosa!');
        
        // Mantener la conexión abierta por un momento para ver los logs
        setTimeout(() => {
            console.log('🔌 Cerrando conexión de prueba...');
            process.exit(0);
        }, 3000);
        
    } catch (error) {
        console.error('❌ Error en la prueba de conexión:', error);
        process.exit(1);
    }
}

testConnection(); 