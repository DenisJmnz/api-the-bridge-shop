const { Router } = require('express');
const router = Router();
const { getProducts, findProductById, findProductByName, findProductsByManufacturer, findProductByNameAndManufacturer } = require('../services/serviceProducts');

router.get('/', async (request, response, next) => {
    let pageN, orderField, order, productName, manufacterId;
    ({ pageN, orderField, order, productName, manufacterId } = request.query);
    let result;

    //Realizaremos consulta en funcion de los params querys
    try {
        pageN = pageN || 1;
        orderField = orderField || 1;
        order = order || 1;
        
        if (productName && !manufacterId) {
            result = await findProductByName(productName, pageN, orderField, order);
        }
        if (!productName && manufacterId) {
            result = await findProductsByManufacturer(manufacterId, pageN, orderField, order)
        }
        if (!productName && !manufacterId) {
            result = await getProducts(pageN, orderField, order);
        }
        if (productName && manufacterId) {
            result = await findProductByNameAndManufacturer(productName,manufacterId, pageN, orderField, order);
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