require('./mongo.js'); //PRIMERO IMPORTAMOS PARA LA CONEXIÓN Y LUEGO LAS NOTAS
const Product = require('./models/Product.js') //DEVUELVE EL MODELO Product
const Manufacter = require('./models/Manufacter.js') //DEVUELVE EL MODELO MANUFACTER
const notFound = require('./middleware/notFound.js') //DEVUELVE EL MODELO Product
const express = require('express');
const app = express();
const cors = require('cors');
const handleError  = require('./middleware/handleError.js');

app.use(cors());
app.use(express.json());

app.get('/api/products/:page', (request, response) => {
  const { page } = request.params || 0;
  Product.paginate( {}, { page }).then(products => {
     response.json(products);
  })
}); 

app.get('/api/products/:search/:page', (request, response) => {
  const { search, page } = request.params;
  let result = [];
  Product.paginate( {}, { page }).then( data => {
    const docs = data.docs;
    result = docs.filter(product => product.name.includes(search))
    if(result.length) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  }).catch( err => next(err))
  //  Product.find({ name: new RegExp(`^${search}$`,'i')}).then(products => {
  //   response.json(products);
  // })
}); 

app.get('/api/manufacters', (request, response) => {
  Manufacter.find({}).then(products => {
    response.json(products);
  })
}); 

app.get('/api/manufacters/:cif', (request, response, next) => {
  const { cif } = request.params;
  Manufacter.find({ cif }).then(manufacter => { //TIENE QUE LLEGAR FORMATO VÁLIDO DE OBJECTID
    if(manufacter) {
      response.json(manufacter);
    } else {
      response.status(404).end();
    }
  }).catch( err => next(err))
});

//MIDDLEWARE PARA ERRORES
app.use(handleError);

//MIDDLEWARE 404 SI NO ENTRA A NINGUN ENDPOINT:
app.use(notFound);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
