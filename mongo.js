const mongoose = require('mongoose');
const user = 'denis';
const passwd = '1q2w3e4r';
const database = 'theBridgeShop';
const connectionString = `mongodb+srv://${user}:${passwd}@cluster0.panhi.mongodb.net/${database}?retryWrites=true&w=majority`;

//Conexión a mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log('Dabase connected')
    }).catch(err => {
        console.error(err)
    })
