// configuraciones globales
// Configuraciones para pasar de desarrollo a produccion de forma transparente

// puerto
process.env.PORT = process.env.PORT || 3000;


// entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// base de datos
// definir la ruta de la bd
let urlDB 

if(process.env.NODE_ENV === 'dev') {
      urlDB = 'mongodb://localhost:27017/cafe'
}else{
      urlDB = process.env.MONGO_URI
      
}

process.env.URLDB = urlDB