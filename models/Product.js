const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//Creamos esquema
const productSchema = new Schema( {
    name: String,
    relevance: Number, 
    price: Number,
    manufacter: String
});

//Añadimos plugin al esquema para poder realizar paginacion
productSchema.plugin(mongoosePaginate);

//Modificamos como debe transformar el toJSON del Schema
productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id; 
        delete returnedObject.__v;
    }
})

//Creamos modelo
const Product = model('Product', productSchema);

module.exports = Product;