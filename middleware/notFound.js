module.exports = (request, response) => { //MIDDLEWARE 404 SI NO ENTRA A NINGUN ENDPOINT:
    response.status(404).json({ error: 'Not found' }).end();
}