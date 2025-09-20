const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// GET all students
router.get('/', async (req, res) => {
const students = await Student.find().sort({ createdAt: -1 });
res.json(students);
});


// GET single
router.get('/:id', async (req, res) => {
const student = await Student.findById(req.params.id);
if (!student) return res.status(404).send('Student not found');
res.json(student);
});


// POST create
router.post('/', async (req, res) => {
const s = new Student(req.body);
await s.save();
res.status(201).json(s);
});


// PUT replace/update
router.put('/:id', async (req, res) => {
const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
if (!student) return res.status(404).send('Student not found');
res.json(student);
});


// PATCH partial update
router.patch('/:id', async (req, res) => {
const student = await Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
if (!student) return res.status(404).send('Student not found');
res.json(student);
});


// DELETE
router.delete('/:id', async (req, res) => {
const student = await Student.findByIdAndDelete(req.params.id);
if (!student) return res.status(404).send('Student not found');
res.json(student);
});


module.exports = router;