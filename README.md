Exam Management App — Students, Seating & Invigilation

What this provides

Full-stack sample app (Node.js + Express + MongoDB) with a single-file frontend (HTML/CSS/JS) served from Express.

RESTful API endpoints for Students, Invigilators and SeatAssignments (CRUD). Follows HTTP method semantics: GET, POST, PUT, PATCH, DELETE.

Frontend UI to add / edit / delete / view students & invigilators, create seating arrangement and auto-assign invigilation duty.

Pleasant, formal color palette (no loud gradients).

Project structure (what I'll provide below)
exam-management-app/
├─ package.json
├─ server.js
├─ models/
│  ├─ Student.js
│  ├─ Invigilator.js
│  └─ SeatAssignment.js
├─ routes/
│  ├─ students.js
│  ├─ invigilators.js
│  └─ seats.js
└─ public/
   ├─ index.html
   ├─ styles.css
   └─ app.js
Quick setup

Install MongoDB and run it locally (or use MongoDB Atlas). Default connection uses mongodb://localhost:27017/examdb.

In project folder: npm install.

Start server: node server.js (or nodemon server.js).

Open http://localhost:3000.
