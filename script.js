// Get elements from the HTML
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchStudent = document.getElementById("searchStudent");

const totalStudents = document.getElementById("totalStudents");
const averageGrade = document.getElementById("averageGrade");
const attendanceRate = document.getElementById("attendanceRate");

// Store students
let students = JSON.parse(localStorage.getItem("students")) || [];

students = students.map(function (student) {
    return {
        name: student.name,
        id: student.id,
        department: student.department,
        courses: student.courses || []
    };
});

saveStudents();


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
    courses: []
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

            <td>${student.courses.length} course(s)</td>

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
}

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

// ====================
// COURSE MANAGEMENT
// ====================

const courseForm = document.getElementById("courseForm");
const courseTableBody = document.getElementById("courseTableBody");

// Store courses
let courses = JSON.parse(localStorage.getItem("courses")) || [];

// ADD COURSE
courseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const courseCode = document.getElementById("courseCode").value;
    const courseName = document.getElementById("courseName").value;
    const courseUnit = document.getElementById("courseUnit").value;

    const course = {
        code: courseCode,
        name: courseName,
        unit: Number(courseUnit)
    };

    courses.push(course);

    saveCourses();
    displayCourses();

    courseForm.reset();
});

// DISPLAY COURSES
function displayCourses() {
    courseTableBody.innerHTML = "";

    courses.forEach(function (course, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.unit}</td>
            <td>
                <button onclick="editCourse(${index})">
                    Edit
                </button>

                <button onclick="deleteCourse(${index})">
                    Delete
                </button>
            </td>
        `;

        courseTableBody.appendChild(row);
    });
}

// DELETE COURSE
function deleteCourse(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this course?"
    );

    if (confirmDelete) {

        courses.splice(index, 1);

        saveCourses();
        displayCourses();
    }
}

// EDIT COURSE
function editCourse(index) {

    const course = courses[index];

    const newName = prompt(
        "Enter course name",
        course.name
    );

    const newUnit = prompt(
        "Enter course unit",
        course.unit
    );

    if (newName !== null && newName.trim() !== "") {
        course.name = newName;
    }

    if (newUnit !== null && newUnit > 0) {
        course.unit = Number(newUnit);
    }

    saveCourses();
    displayCourses();
}

// SAVE COURSES
function saveCourses() {

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );
}

// LOAD COURSES
displayCourses();