const { model, Schema } = require('mongoose');
//Creamos esquema
const manufacterSchema = new Schema( {
    name: String,
    cif: String, 
    address: String
});
//Creamos modelo
const Manufacter = model('Manufacter', manufacterSchema);

//Modificamos como debe transformar el toJSON del Schema
/*Delete no es buena práctica en este caso no hay problema porque modificamos 
el objeto que vamos a devolver no mutamos los datos de la bbdd*/
manufacterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id; 
        delete returnedObject.__v;
    }
})

module.exports = Manufacter;