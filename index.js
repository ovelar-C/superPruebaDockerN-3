const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./src/middlewares/logger')

require('dotenv').config();
require('./src/config/db');

app.use(cors());
app.use(logger);
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server port in ${PORT}`);
})
app.use(
    '/api/usuarios',
    require('./src/routes/usuarioRoute')
);

module.exports = app;



