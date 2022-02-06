require('./mongo.js'); //PRIMERO IMPORTAMOS PARA LA CONEXIÓN Y LUEGO LAS NOTAS
const Product = require('./models/Product.js') //DEVUELVE EL MODELO NOTE
const Manufacter = require('./models/Manufacter.js') //DEVUELVE EL MODELO NOTE
const { manufacters, products } = require('./resources/mockDB.js')

console.log("ENTRAMOS EN ENDPOINT")
//Llenamos coleccion fabricantes
manufacters.forEach(manufacter => {
    const newManufacter = new Manufacter({
        name: manufacter.name,
        cif:  manufacter.cif, 
        address: manufacter.address
    })
    newManufacter.save().then(savedManufacter => {
        console.log(savedManufacter)
    }).catch(err => console.error(err));
});

products.forEach(product => {
    const newProduct = new Product({
        name: product.name,
        relevance: Math.floor(Math.random() * (6 - 1) + 1), 
        price: product.price,
        manufacter: product.manufacter
    })
    newProduct.save().then(savedProduct => {
        console.log(savedProduct)
    }).catch(err => console.error(err));
});
