const express = require('express');
const itemsRoutes = require('./items');

const app = express();
app.use(express.json());
app.use('/items', itemsRoutes);
app.use(express.static('./public'));

module.exports = app;