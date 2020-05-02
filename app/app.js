const express = require('express');
require('dotenv').config();

const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(routers);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Aplikasi jalan di port ${port}`);
});
