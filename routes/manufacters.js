const { Router } = require('express');
const router = Router();
const getManufacters = require('../services/serviceManufacters.js');

router.get('/', async (request, response, next) => {
    try {
        const docs = await getManufacters();
        console.log(docs);
        response.json(docs).status(200);
    } catch (err) { next(err) }
});

module.exports = router;