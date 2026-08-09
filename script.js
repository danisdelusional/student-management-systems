// Get elements from the HTML
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchStudent = document.getElementById("searchStudent");

const totalStudents = document.getElementById("totalStudents");
const averageGrade = document.getElementById("averageGrade");
const attendanceRate = document.getElementById("attendanceRate");

// Store students
let students = JSON.parse(localStorage.getItem("students")) || [];


// ADD STUDENT
studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value;
    const id = document.getElementById("studentId").value;
    const department = document.getElementById("department").value;

    const student = {
        name: name,
        id: id,
        department: department,
        grade: 0,
        attendance: 0
    };

    students.push(student);

saveStudents();

displayStudents();

    

    studentForm.reset();
});


// DISPLAY STUDENTS
function displayStudents(list = students) {

    studentTable.innerHTML = "";

    list.forEach(function (student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>

            <td>${student.id}</td>

            <td>${student.department}</td>

            <td>${student.grade}%</td>

            <td>${student.attendance}%</td>

            <td>
                <button onclick="editStudent(${index})">
                    Edit
                </button>

                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        studentTable.appendChild(row);
    });

    updateDashboard();
}


// DELETE STUDENT
function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students.splice(index, 1);

         saveStudents();

        displayStudents();
    }
}


// EDIT STUDENT
function editStudent(index) {

    const student = students[index];

    const newGrade = prompt(
        "Enter student's grade (%)",
        student.grade
    );

    const newAttendance = prompt(
        "Enter attendance (%)",
        student.attendance
    );

    if (newGrade !== null) {
        student.grade = Number(newGrade);
    }

    if (newAttendance !== null) {
        student.attendance = Number(newAttendance);
    }

    saveStudents();
    
    displayStudents();
}


// SEARCH STUDENTS
searchStudent.addEventListener("input", function () {

    const searchValue = searchStudent.value.toLowerCase();

    const filteredStudents = students.filter(function (student) {

        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.id.toLowerCase().includes(searchValue) ||
            student.department.toLowerCase().includes(searchValue)
        );

    });

    displayStudents(filteredStudents);
});


// UPDATE DASHBOARD
function updateDashboard() {

    totalStudents.textContent = students.length;

    if (students.length === 0) {

        averageGrade.textContent = "0%";
        attendanceRate.textContent = "0%";

        return;
    }

    let totalGrades = 0;
    let totalAttendance = 0;

    students.forEach(function (student) {

        totalGrades += student.grade;
        totalAttendance += student.attendance;

    });

    const average = totalGrades / students.length;
    const attendance = totalAttendance / students.length;

    averageGrade.textContent =
        Math.round(average) + "%";

    attendanceRate.textContent =
        Math.round(attendance) + "%";
}function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}
displayStudents();