
const Product = require('../models/Product.js') //DEVUELVE EL MODELO Product

const getProducts = async (page) => {
    return await Product.paginate( {}, { page }) 
}

const findProduct = async (search, page) => {
    return await Product.paginate( {}, { page }) 
}

module.exports = { getProducts };