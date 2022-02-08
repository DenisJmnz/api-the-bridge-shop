require('./mongo.js'); //PRIMERO IMPORTAMOS PARA LA CONEXIÓN Y LUEGO LAS NOTAS
const Product = require('./models/Product.js') //DEVUELVE EL MODELO NOTE
const Manufacter = require('./models/Manufacter.js') //DEVUELVE EL MODELO NOTE
const { manufacters, products } = require('./resources/mockDB.js')
const routerProducts = require('./routes/products.js');
const routerManufacters = require('./routes/manufacters.js');
const express = require('express');
const app = express();
const docs = [];

  //    await Product.deleteMany({});
    //    await Manufacter.deleteMany({});
    
const createdb = async (resquest, response) => {
    await Product.deleteMany({});
    await Manufacter.deleteMany({});
    
    const newManufacters=await Manufacter.insertMany(manufacters);
    const newProducts=products.map((product)=>{
        const manufacter=newManufacters.filter((manufacter)=>manufacter.cif===product.manufacter)[0];
        const{_id,name}= manufacter;
        return{
            ...product,
            manufacter:{_id,name}
        }
    })
    await Product.insertMany(newProducts);
};

createdb();
