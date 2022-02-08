
const Product = require('../models/Product.js') //DEVUELVE EL MODELO Product

const getProducts = async (page, orderField, order) => {
    return await Product.paginate({}, { page, sort: { [orderField]: order } })
}

const findProductById = async (id) => {
    const product= await Product.findById(id).populate('manufacter._id').exec();
    return{
        ...product._doc,
        manufacter:{
            ...product.manufacter._id._doc
        }
    }
}

const findProductByName = async (name, page, orderField, order) => {
    return await Product.paginate({ name: { $regex: name, $options: "i" } }, { page, sort: { [orderField]: order } })
}

const findProductsByManufacturer = async (name, page, orderField, order) => {
    return await Product.paginate({ "manufacter.name": { $regex: name, $options: "i" } }, { page, sort: { [orderField]: order } })
}

module.exports = { getProducts, findProductById, findProductByName, findProductsByManufacturer };