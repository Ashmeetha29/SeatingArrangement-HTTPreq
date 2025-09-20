const express = require('express');
const router = express.Router();
const Invigilator = require('../models/Invigilator');


router.get('/', async (req, res) => res.json(await Invigilator.find().sort({ name: 1 })));
router.get('/:id', async (req, res) => {
const inv = await Invigilator.findById(req.params.id);
if (!inv) return res.status(404).send('Invigilator not found');
res.json(inv);
});
router.post('/', async (req, res) => {
const inv = new Invigilator(req.body);
await inv.save();
res.status(201).json(inv);
});
router.put('/:id', async (req, res) => {
const inv = await Invigilator.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!inv) return res.status(404).send('Invigilator not found');
res.json(inv);
});
router.delete('/:id', async (req, res) => {
const inv = await Invigilator.findByIdAndDelete(req.params.id);
if (!inv) return res.status(404).send('Invigilator not found');
res.json(inv);
});


module.exports = router;