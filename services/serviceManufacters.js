const Manufacter = require('../models/Manufacter.js');
const getManufacters = async () => {
    return await Manufacter.find({}).exec();
}

module.exports = getManufacters;