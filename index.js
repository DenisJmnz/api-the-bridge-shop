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


app.get('/api/products', (request, response) => {
  Product.find({}).then(products => {
    response.json(products);
  })
}); 

app.get('/api/products/:search', (request, response) => {
  
  const { search } = request.params;
  let result = [];
  Product.find({}).then(products => {
    result = products.filter(product => product.name.includes(search))
    response.json(result);
  })
  console.log(result);
  //  Product.find({ name: new RegExp(`^${search}$`,'i')}).then(products => {
  //   response.json(products);
  // })
}); 

app.get('/api/manufacters', (request, response) => {
  Manufacter.find({}).then(products => {
    response.json(products);
  })
}); 

app.get('/api/manufacters/:id', (request, response, next) => {
  const { id } = request.params;
  Manufacter.findById(id).then(manufacter => { //TIENE QUE LLEGAR FORMATO VÁLIDO DE OBJECTID
    if(manufacter) {
      response.json(manufacter);
    } else {
      response.status(404).end();
    }
  }).catch( err => {
    //HACEMOS NEXT PARA MANDAR EL ERROR AL SIGUIENTE ENDPOINT QUE LO COJA
    next(err); //AÑADIMOS NEXT PARA QUE VAYA AL SIGUIENTE MIDDLEWARE
    // console.log(err);
    // response.status(400).end(); //IMPORTANTE EL END
  })
});

//MIDDLEWARE PARA ERRORES
app.use(handleError);

//MIDDLEWARE 404 SI NO ENTRA A NINGUN ENDPOINT:
app.use(notFound);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
