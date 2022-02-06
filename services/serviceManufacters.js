
const Manufacter = require('../models/Manufacter.js') //DEVUELVE EL MODELO Product

const getAllManufacters = async (page) => {
    return await Manufacter.paginate( {}, { page }) 
}

const getManufacter = async (search, page) => {
    return await Manufacter.paginate({ cif: search }, { page }) 
}

module.exports = { getAllManufacters, getManufacter };