const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const studentsRouter = require('./routes/students');
const invigilatorsRouter = require('./routes/invigilators');
const seatsRouter = require('./routes/seats');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/examdb';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error', err));


app.use('/api/students', studentsRouter);
app.use('/api/invigilators', invigilatorsRouter);
app.use('/api/seats', seatsRouter);


// fallback to index.html for any other routes (single page)
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));