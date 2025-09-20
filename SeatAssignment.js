const mongoose = require('mongoose');


const SeatAssignmentSchema = new mongoose.Schema({
room: { type: String, required: true },
seatNumber: { type: String, required: true },
studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
invigilatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invigilator' }
}, { timestamps: true });


SeatAssignmentSchema.index({ room: 1, seatNumber: 1 }, { unique: true });


module.exports = mongoose.model('SeatAssignment', SeatAssignmentSchema);