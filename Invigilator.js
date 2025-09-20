const mongoose = require('mongoose');


const InvigilatorSchema = new mongoose.Schema({
name: { type: String, required: true },
empId: { type: String, required: true, unique: true },
department: { type: String },
contact: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('Invigilator', InvigilatorSchema);