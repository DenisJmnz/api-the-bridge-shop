const { Router } = require('express');
const router = Router();
const { getAllManufacters, getManufacter } = require('../services/serviceManufacters.js');

router.get('/', async (request, response, next) => {
    const { page } = request.query;
    try {
        const { docs } = await getAllManufacters(page);
        response.json(docs).status(200);
    } catch (err) { next(err) }
});

router.get('/search', async (request, response, next) => {
    const { cif } = request.query;
    try {
        const { docs } = await getManufacter(cif);
        response.json(docs).status(200);
    } catch (err) { next(err) }
});

module.exports = router;