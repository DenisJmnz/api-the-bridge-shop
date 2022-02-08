const { Router } = require('express');
const router = Router();
const { getProducts, findProductById, findProductByName, findProductsByManufacturer } = require('../services/serviceProducts');

router.get('/', async (request, response, next) => {
    let pageN, orderField, order, productName, manufacterName;
    ({ pageN, orderField, order, productName, manufacterName } = request.query);
    let result;
    try {
        if (!pageN) {
            pageN = 1;
        }
        //page = page || 1;
        if (!orderField) {
            orderField = "name";
        }
        if (!order) {
            order = 1;
        }
        if (productName && !manufacterName) {
            result = await findProductByName(productName, pageN, orderField, order);
        }
        if (!productName && manufacterName) {
            result = await findProductsByManufacturer(manufacterName, pageN, orderField, order)
        }
        if (!productName && !manufacterName) {
            result = await getProducts(pageN, orderField, order);
        }
        if (productName && manufacterName) {
            next("Invalid request");
        }
        const { docs, totalDocs, page, totalPages, nextPage, prevPage } = result;
        response.json({ docs, totalDocs, page, totalPages, nextPage, prevPage }).status(200);
    } catch (err) { next(err) }
});

router.get('/:id', async (request, response, next) => {
    const { id } = request.params;
    try {
        const docs = await findProductById(id);
        console.log(docs)
        response.json(docs).status(200);
    } catch (err) { next(err) }
});

module.exports = router;