// Middleware para manejar fechas y evitar problemas de zona horaria
const handleDates = (req, res, next) => {
    console.log('=== MIDDLEWARE DE MANEJO DE FECHAS ===');
    
    // Función para procesar una fecha
    const processDate = (dateValue, fieldName) => {
        if (!dateValue) return dateValue;
        
        console.log(`${fieldName} - Valor original:`, dateValue);
        console.log(`${fieldName} - Tipo:`, typeof dateValue);
        
        // Si ya es un objeto Date, devolverlo tal como está
        if (dateValue instanceof Date) {
            console.log(`${fieldName} - Ya es Date object:`, dateValue);
            return dateValue;
        }
        
        // Si es string, convertir a Date
        if (typeof dateValue === 'string') {
            const processedDate = new Date(dateValue);
            console.log(`${fieldName} - Convertido a Date:`, processedDate);
            console.log(`${fieldName} - ISO string:`, processedDate.toISOString());
            console.log(`${fieldName} - Local string:`, processedDate.toString());
            return processedDate;
        }
        
        // Si es número (timestamp), convertir a Date
        if (typeof dateValue === 'number') {
            const processedDate = new Date(dateValue);
            console.log(`${fieldName} - Convertido de timestamp:`, processedDate);
            return processedDate;
        }
        
        console.log(`${fieldName} - Tipo no reconocido, devolviendo original:`, dateValue);
        return dateValue;
    };
    
    // Procesar fechas en el body
    if (req.body) {
        const dateFields = ['date', 'fecha', 'fechaInicio', 'fechaFin', 'birthDate'];
        
        dateFields.forEach(field => {
            if (req.body[field]) {
                req.body[field] = processDate(req.body[field], field);
            }
        });
    }
    
    // Procesar fechas en query params
    if (req.query) {
        const dateFields = ['date', 'fecha', 'fechaInicio', 'fechaFin'];
        
        dateFields.forEach(field => {
            if (req.query[field]) {
                req.query[field] = processDate(req.query[field], `query.${field}`);
            }
        });
    }
    
    console.log('=== FIN MIDDLEWARE DE FECHAS ===');
    next();
};

export { handleDates }; 