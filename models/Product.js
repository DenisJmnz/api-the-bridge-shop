const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//Creamos esquema
const productSchema = new Schema({
    name: String,
    price: Number,
    relevance: Number,
    manufacter: {
        _id: { type: Schema.Types.ObjectId, ref: 'Manufacter' }, //DEFINIMOS REFERENCIA A MANUFACTER PASÁNDOLE EL OBJECT ID DEL MANUFACTER PERTINENTE
        name: String
    }
});

//Añadimos plugin al esquema para poder realizar paginacion
productSchema.plugin(mongoosePaginate);

//Modificamos como debe transformar el toJSON del Schema

//Creamos modelo
const Product = model('Product', productSchema);

module.exports = Product;