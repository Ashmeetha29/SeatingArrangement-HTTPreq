const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
name: { type: String, required: true },
roll: { type: String, required: true, unique: true },
class: { type: String },
marks: { type: Number, default: 0 },
email: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('Student', StudentSchema);