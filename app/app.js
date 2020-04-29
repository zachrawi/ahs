const express = require('express');

const {User, Product} = require('./models');

const app = express();

app.get('/user', async (req, res) => {
    await User.create({
        name: 'Eris',
        email: 'eristemena@ngoprekweb.com',
        password: 'jakarta123'
    });

    res.send('User dibuat');
});

app.get('/product', async (req, res) => {
    const user = await User.findByPk(2);

    await Product.create({
        user_id: user.id,
        name: 'Product 1',
        price: 300000,
    });

    res.send('Product dibuat');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Aplikasi jalan di port ${port}`);
});
