require('./mongo.js'); //PRIMERO IMPORTAMOS PARA LA CONEXIÓN Y LUEGO LAS NOTAS
const express = require('express');
const cors = require('cors');
const app = express();
const notFound = require('./middleware/notFound.js');
const handleError = require('./middleware/handleError.js');
const routerProducts = require('./routes/products.js');
const routerManufacters = require('./routes/manufacters.js');

app.use(cors());
app.use(express.json());

app.use('/api/products', routerProducts);

app.get('/api/manufacters', routerManufacters);

//MIDDLEWARE PARA ERRORES
app.use(handleError);

//MIDDLEWARE 404 SI NO ENTRA A NINGUN ENDPOINT:
app.use(notFound);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
