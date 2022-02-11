
const Product = require('../models/Product.js')

const getProducts = async (page, orderField, order) => {
    return await Product.paginate({}, { page, sort: { [orderField]: order }, select: { manufacter: 0, __v: 0 } })
}

const findProductById = async (id) => {
    const product = await Product.findById(id).populate('manufacter._id').exec();
    return {
        ...product._doc,
        manufacter: {
            ...product.manufacter._id._doc
        }
    }
}

const findProductByName = async (name, page, orderField, order) => {
    return await Product.paginate({ name: { $regex: name, $options: "i" } }, { page, sort: { [orderField]: order }, select: { manufacter: 0, __v: 0 } })
}

const findProductsByManufacturer = async (manufacterId, page, orderField, order) => {
    return await Product.paginate({ "manufacter._id": manufacterId }, { page, sort: { [orderField]: order }, select: { manufacter: 0, __v: 0 } })
}
const findProductByNameAndManufacturer = async (productName, manufacterId, page, orderField, order) => {
    return await Product.paginate({ name: { $regex: productName, $options: "i" }, "manufacter._id": manufacterId }, { page, sort: { [orderField]: order }, select: { manufacter: 0, __v: 0 } })
}

module.exports = { getProducts, findProductById, findProductByName, findProductsByManufacturer, findProductByNameAndManufacturer };