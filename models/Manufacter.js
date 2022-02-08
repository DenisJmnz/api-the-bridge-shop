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

//Creamos modelo
const Manufacter = model('Manufacter', manufacterSchema);

module.exports = Manufacter;