const express = require("express");
const Seat = require("../models/SeatAssignment");
const Student = require("../models/Student");
const Invigilator = require("../models/Invigilator");
const router = express.Router();

// GET all seats
router.get("/", async (req, res) => {
  res.json(await Seat.find().populate("student").populate("invigilator"));
});

// POST generate seating
router.post("/generate", async (req, res) => {
  const { rooms, assignInv } = req.body;

  const students = await Student.find();
  const invigilators = await Invigilator.find();

  await Seat.deleteMany({});
  let seats = [];

  let studentIndex = 0;
  let invIndex = 0;

  for (const room of rooms) {
    for (let r = 1; r <= room.rows; r++) {
      for (let c = 1; c <= room.cols; c++) {
        if (studentIndex >= students.length) break;
        const seatLabel = `${r}-${c}`;
        const student = students[studentIndex++];
        const invigilator = assignInv ? invigilators[invIndex++ % invigilators.length] : null;

        const seat = new Seat({
          room: room.name,
          seatLabel,
          student: student._id,
          invigilator: invigilator ? invigilator._id : null,
        });
        await seat.save();
        seats.push(seat);
      }
    }
  }

  res.status(201).json(await Seat.find().populate("student").populate("invigilator"));
});

// DELETE all seats
router.delete("/", async (req, res) => {
  await Seat.deleteMany({});
  res.send("All seats cleared");
});

module.exports = router;
