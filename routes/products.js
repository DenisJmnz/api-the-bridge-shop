const { Router } = require('express');
const router = Router();
const { getProducts } = require('../services/serviceProducts');

router.get('/', async (request, response, next) => {
    const { page } = request.query;
    try {
        const { docs } = await getProducts(page);
        response.json(docs).status(200);
    } catch (err) { next(err) }
});

router.get('/search', async (request, response, next) => {
    const { search, page } = request.query;
    try {
        const { docs } = await getProducts(page);
        const result = docs.filter(product => product.name.includes(search))
        response.json(result).status(200);
    } catch (err) { next(err) }
});

module.exports = router;