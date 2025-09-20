// Frontend logic for Exam Management
document.addEventListener("DOMContentLoaded", () => {
  // Tabs switching
  const navButtons = document.querySelectorAll("nav button");
  const tabs = document.querySelectorAll("main .tab");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tabs.forEach(tab => tab.classList.add("hidden"));
      document.getElementById(btn.dataset.tab).classList.remove("hidden");
    });
  });

  // -------- Students --------
  const studentForm = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");

  async function loadStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    studentList.innerHTML = data.map(stu => `
      <div class="card">
        <strong>${stu.name}</strong> (${stu.roll}) - ${stu.class || ""} <br/>
        Marks: ${stu.marks ?? "-"} | Email: ${stu.email ?? "-"}
        <div>
          <button onclick="editStudent('${stu._id}')">Edit</button>
          <button onclick="deleteStudent('${stu._id}')">Delete</button>
        </div>
      </div>
    `).join("");
  }

  studentForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(studentForm));
    const method = studentForm.dataset.id ? "PUT" : "POST";
    const url = studentForm.dataset.id
      ? `/api/students/${studentForm.dataset.id}`
      : "/api/students";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    studentForm.reset();
    studentForm.dataset.id = "";
    loadStudents();
  });

  window.editStudent = async id => {
    const res = await fetch(`/api/students/${id}`);
    const stu = await res.json();
    Object.keys(stu).forEach(k => {
      if (studentForm[k]) studentForm[k].value = stu[k];
    });
    studentForm.dataset.id = id;
  };

  window.deleteStudent = async id => {
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    loadStudents();
  };

  // -------- Invigilators --------
  const invForm = document.getElementById("invForm");
  const invList = document.getElementById("invList");

  async function loadInvigilators() {
    const res = await fetch("/api/invigilators");
    const data = await res.json();
    invList.innerHTML = data.map(inv => `
      <div class="card">
        <strong>${inv.name}</strong> (${inv.empId}) <br/>
        Dept: ${inv.department ?? "-"} | Contact: ${inv.contact ?? "-"}
        <div>
          <button onclick="editInv('${inv._id}')">Edit</button>
          <button onclick="deleteInv('${inv._id}')">Delete</button>
        </div>
      </div>
    `).join("");
  }

  invForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(invForm));
    const method = invForm.dataset.id ? "PUT" : "POST";
    const url = invForm.dataset.id
      ? `/api/invigilators/${invForm.dataset.id}`
      : "/api/invigilators";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    invForm.reset();
    invForm.dataset.id = "";
    loadInvigilators();
  });

  window.editInv = async id => {
    const res = await fetch(`/api/invigilators/${id}`);
    const inv = await res.json();
    Object.keys(inv).forEach(k => {
      if (invForm[k]) invForm[k].value = inv[k];
    });
    invForm.dataset.id = id;
  };

  window.deleteInv = async id => {
    await fetch(`/api/invigilators/${id}`, { method: "DELETE" });
    loadInvigilators();
  };

  // -------- Seating --------
  const seatingList = document.getElementById("seatingList");
  const generateBtn = document.getElementById("generateSeats");
  const clearBtn = document.getElementById("clearSeats");
  const assignInv = document.getElementById("assignInv");

  async function loadSeats() {
    const res = await fetch("/api/seats");
    const data = await res.json();
    seatingList.innerHTML = data.map(seat => `
      <div class="card">
        Room ${seat.room}, Seat: ${seat.seatLabel} <br/>
        Student: ${seat.student ? seat.student.name : "-"} <br/>
        Invigilator: ${seat.invigilator ? seat.invigilator.name : "-"}
      </div>
    `).join("");
  }

  generateBtn.addEventListener("click", async () => {
    const rooms = JSON.parse(document.getElementById("roomsInput").value || "[]");
    await fetch("/api/seats/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rooms, assignInv: assignInv.checked })
    });
    loadSeats();
  });

  clearBtn.addEventListener("click", async () => {
    await fetch("/api/seats", { method: "DELETE" });
    loadSeats();
  });

  // Initial load
  loadStudents();
  loadInvigilators();
  loadSeats();
});
