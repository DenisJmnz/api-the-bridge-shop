const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//Creamos esquema
const manufacterSchema = new Schema( {
    name: String,
    cif: String, 
    address: String
});

//Añadimos plugin al esquema para poder realizar paginacion
manufacterSchema.plugin(mongoosePaginate);

//Modificamos como debe transformar el toJSON del Schema
manufacterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id; 
        delete returnedObject.__v;
    }
})

//Creamos modelo
const Manufacter = model('Manufacter', manufacterSchema);

module.exports = Manufacter;