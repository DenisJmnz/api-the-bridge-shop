const Manufacter = require('../models/Manufacter.js') //DEVUELVE EL MODELO Product

const getManufacters = async () => {
    return await Manufacter.find({}).exec();
}

module.exports = getManufacters;