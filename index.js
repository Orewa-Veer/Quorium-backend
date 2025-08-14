import express from "express";
import { createServer } from "http";
import validatingStudent from "./middleware/validatingStudent.js";
const app = express();
const server = createServer(app);
app.use(express.json());
let students = [];
let stats = {};
(async () => {
  const res = await fetch("https://dummyjson.com/users").catch((err) =>
    console.error("Failed to load students", err)
  );
  const data = await res.json();
  students = data.users;
})();
app.get("/students", (req, res) => {
  return res.json(students);
});
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((stu) => stu.id === id);
  if (!student) return res.status(404).json({ error: "No student found " });
  return res.json(student);
});
app.post("/students", validatingStudent, (req, res) => {
  const id = (students.at(-1)?.id || 0) + 1;
  const newStudent = { id: id, ...req.body };
  students.push(newStudent);
  return res.json({ status: "added" });
});
app.get("/dashboard/stats", (req, res) => {
  const totalStudents = students.length;
  stats.totalStudents = totalStudents;
  let totalAge = 0;
  for (const student of students) {
    totalAge += student.age;
  }
  const avgAge = totalStudents ? Math.floor(totalAge / totalStudents) : 0;
  stats.avgAge = avgAge;
  const male = students.filter((s) => s.gender === "male").length;
  const female = students.filter((s) => s.gender === "female").length;
  stats.genderDistribution = {
    male,
    female,
  };

  return res.json(stats);
});
app.use((err, req, res, next) => {
  //   console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
