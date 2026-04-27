const courseInput = document.querySelector("input[type='text']");
const gradeSelect = document.querySelector("select");
const creditInput = document.querySelector("input[type='number']");
const addButton = document.getElementById("addBtn");
const tableBody = document.querySelector("tbody");
const gpaDisplay = document.querySelector("h2");
const gpaValue = document.getElementById("gpaValue");
const totalCreditsDisplay = document.getElementById("totalCredits");
const totalPointsDisplay = document.getElementById("totalPoints");
const gpaClass = document.getElementById("gpaClass");


let courses = [];

function getPoints(grade) {
  if (grade === "A") return 4.0;
  if (grade === "B") return 3.0;
  if (grade === "C") return 2.0;
  if (grade === "D") return 1.0;
  return 0.0;
}

addButton.addEventListener("click", function () {

  const courseName = courseInput.value;
  const grade = gradeSelect.value;
  const credit = Number(creditInput.value);

  if (!courseName || !credit || grade === "Select Grade") {
    alert("Please fill all fields");
    return;
  }

  const points = getPoints(grade) * credit;

  const newCourse = {
    name: courseName,
    grade: grade,
    credit: credit,
    points: points
  };

  courses.push(newCourse);
  localStorage.setItem("courses", JSON.stringify(courses));

  updateTable();
  calculateGPA();

  courseInput.value = "";
  gradeSelect.value = "Select Grade";
  creditInput.value = "";
});

 function updateTable() {
  tableBody.innerHTML = "";

  courses.forEach(course => {
    tableBody.innerHTML += `
      <tr>
        <td>${course.name}</td>
        <td>${course.grade}</td>
        <td>${course.credit}</td>
        <td>${course.points}</td>
      </tr>
    `;
  });
}
function calculateGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    totalPoints += course.points;
    totalCredits += course.credit;
  });

  let gpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;

  gpaDisplay.innerText = "Final GPA: " + gpa.toFixed(2);
  totalCreditsDisplay.innerText = totalCredits;
  totalPointsDisplay.innerText = totalPoints;

  // GPA classification
let classification = "";

if (gpa >= 3.5) {
  classification = "First Class";
} else if (gpa >= 3.0) {
  classification = "Second Class Upper";
} else if (gpa >= 2.0) {
  classification = "Second Class Lower";
} else if (gpa >= 1.0) {
  classification = "Third Class";
} else {
  classification = "Fail";
}

gpaClass.innerText = classification;

}
function updateTable() {
  tableBody.innerHTML = "";

  courses.forEach((course, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${course.name}</td>
        <td>${course.grade}</td>
        <td>${course.credit}</td>
        <td>${course.points}</td>
        <td><button onclick="deleteCourse(${index})">Delete</button></td>
      </tr>
    `;
  });
}
wwindow.deleteCourse = function(index) {
  courses.splice(index, 1);

  localStorage.setItem("courses", JSON.stringify(courses));

  updateTable();
  calculateGPA();


  window.onload = function() {
  const savedCourses = JSON.parse(localStorage.getItem("courses"));

  if (savedCourses) {
    courses = savedCourses;
    updateTable();
    calculateGPA();
  }
};
};