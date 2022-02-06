const { model, Schema } = require('mongoose');
//Creamos esquema
const productSchema = new Schema( {
    name: String,
    relevance: Number, 
    price: Number,
    manufacter: String
});
//Creamos modelo
const Product = model('Product', productSchema);

//Modificamos como debe transformar el toJSON del Schema
/*Delete no es buena práctica en este caso no hay problema porque modificamos 
el objeto que vamos a devolver no mutamos los datos de la bbdd*/
productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id; 
        delete returnedObject.__v;
    }
})
module.exports = Product;