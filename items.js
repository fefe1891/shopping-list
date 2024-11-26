const express = require('express');
const itemsDb = require('./fakeDb');
const router = new express.Router();

router.get('/', async function (req, res) {
    const items = await itemsDb.readDb();
    res.json(items);
});

router.post('/', async function (req, res) {
    let newItem = { name: req.body.name, price: req.body.price };
    await itemsDb.addItem(newItem);
    res.json({ added: newItem });
});

router.get('/:name', async function (req, res) {
    let foundItem = await itemsDb.getItem(req.params.name);
    res.json(foundItem);
});

router.patch('/:name', async function (req, res) {
    let updatedItem = { name: req.body.name, price: req.body.price };
    await itemsDb.updateItem(req.params.name, updatedItem);
    res.json({ updated: updatedItem });
});

router.delete('/:name', async function (req, res) {
    await itemsDb.deleteItem(req.params.name);
    res.json({ message: 'Deleted' });
});

module.exports = router;