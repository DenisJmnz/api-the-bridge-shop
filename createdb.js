require('./mongo.js');
const Product = require('./models/Product.js');
const Manufacter = require('./models/Manufacter.js');
const { manufacters, products } = require('./resources/mockDB.js');
const routerProducts = require('./routes/products.js');
const routerManufacters = require('./routes/manufacters.js');
const express = require('express');
const app = express();
const docs = [];

const createdb = async (resquest, response) => {
    await Product.deleteMany({});
    await Manufacter.deleteMany({});

    const newManufacters = await Manufacter.insertMany(manufacters);
    const newProducts = products.map((product) => {
        const manufacter = newManufacters.filter((manufacter) => manufacter.cif === product.manufacter)[0];
        const { _id, name } = manufacter;
        return {
            ...product,
            relevance: Math.floor(Math.random() * (6 - 1)) + 1,
            manufacter: { _id, name }
        }
    })
    await Product.insertMany(newProducts);
};

createdb();
