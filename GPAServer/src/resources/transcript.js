// Initialize variables to store course and semester data
let numOfCourses = 0; // Total number of courses
let borderHeights = [0]; // Heights of each semester border
let lineHeight = 50; // Height of each line representing a course
let semCount = 0; // Total number of semesters
let semHeights = [0]; // Heights of each semester
let semUWGrades = []; // Unweighted grades for each semester
let semWGrades = []; // Weighted grades for each semester
let semNames = ["Freshman Semester 1", "Freshman Semester 2", "Sophomore Semester 1", "Sophomore Semester 2", "Junior Semester 1", "Junior Semester 2", "Senior Semester 1", "Senior Semester 2"]; // Names of each semester
let semTextCount = 0; // Count of text elements for semesters
let semInfo = []; // Information for each semester: [Semester Name, Unweighted GPA, Weighted GPA, [Courses]]

// Initialize variables to store cumulative GPA
let cumulativeWeightedGpa = 0;
let cumulativeUnweightedGpa = 0;

// Array to store the number of courses per semester
let numOfCoursesPerSem = [];

// Initialize semester and courses
for (var i = 0; i < 8; i++) {
    addSemester(); // Add a new semester
    for (var j = 0; j < 7; j++) {
        addCourse(i + 1); // Add courses to the semester
    }
    // Set the semester name for display
    document.getElementById("calculator" + (i + 1)).querySelector(".semName").textContent = semNames[i];
}

// Function to add a course to a semester
function addCourse(semNum) {
    // Get the border element of the current semester
    let border = document.getElementById("calculator" + semNum);
    // Add an empty entry for the course in the semester information array
    semInfo[semNum - 1].push([0, 0, 0]);

    // Adjust heights of subsequent semesters if necessary
    for (var i = semNum + 1; i <= semCount; i++) {
        let curBorder = document.getElementById("calculator" + i);
        semHeights[i] += lineHeight;
        curBorder.style.top = `${semHeights[i]}px`;
    }

    // Update height of the current semester's border
    borderHeights[semNum] += lineHeight;
    border.style.height = `${borderHeights[semNum]}px`;
    // Increment the total number of courses
    numOfCourses++;
    // Increment the number of courses for the current semester
    numOfCoursesPerSem[semNum - 1]++;
    // Create HTML elements to display course information
    let courseBox = document.createElement("p");
    let curSem = (semNum - 1).toString();
    let index = (numOfCoursesPerSem[semNum - 1] - 1).toString();
    courseBox.id = "course" + curSem + index;
    courseBox.textContent = "";
    border.querySelector(".courseNames").appendChild(courseBox);
    let gradeDrop = document.createElement("p");
    gradeDrop.id = "grade" + curSem + index;
    gradeDrop.textContent = "";
    border.querySelector(".grades").appendChild(gradeDrop);
    let typeDrop = document.createElement("p");
    typeDrop.id = "type" + curSem + index;
    typeDrop.textContent = "";
    border.querySelector(".types").appendChild(typeDrop);
}

// Function to calculate GPA
function calculate() {
    // Initialize variables to store total grade points, course weights, and blank entries
    let totalGradePoint = 0;
    let totalCourseWeight = 0;
    let numBlanks = 0;
    // Iterate through each semester
    for (let i = 0; i < numOfCoursesPerSem.length; i++) {
        let semGradePoint = 0;
        let semCourseWeight = 0;
        let semBlanks = 0;
        // Iterate through each course in the semester
        for (let j = 0; j < numOfCoursesPerSem[i]; j++) {
            // Retrieve grade, type, and name of the course
            grade = document.getElementById("grade" + i + j).textContent;
            type = document.getElementById("type" + i + j).textContent;
            courseName = document.getElementById("course" + i + j).textContent;

            // Update semester information with course details
            semInfo[i][j + 3][0] = courseName;
            semInfo[i][j + 3][1] = grade;
            semInfo[i][j + 3][2] = type;
            
            // Calculate grade points based on the grade
            switch (grade) {
                // Case for each possible grade
                case "A":
                semGradePoint += 4.0;
                    break;
                case "B+":
                    semGradePoint += 3.3;
                    break;
                case "B":
                    semGradePoint += 3.0;
                    break;
                case "B-":
                    semGradePoint += 2.7;
                    break;
                case "C+":
                    semGradePoint += 2.3;
                    break;
                case "C":
                    semGradePoint += 2.0;
                    break;
                case "C-":
                    semGradePoint += 1.7;
                    break;
                case "D+":
                    semGradePoint += 1.3;
                    break;
                case "D":
                    semGradePoint += 1.0;
                case "N":
                    semGradePoint += 0.0;
                    break;
                default:
                    semGradePoint += 0.0; 
                    semBlanks++;
                    break;
            }

            // Calculate course weight based on type
            if (grade != "") {
                switch (type) {
                    // Case for different types of courses
                    // AP level course, adds 1 onto grade score
                    case "AP":
                        semCourseWeight += 1.0;
                        break;
                    // Honors level course, adds 0.5 onto grade score
                    case "Honors":
                        semCourseWeight += 0.5;
                        break;
                    // Regular level x`course, does not add to grade score, only for non STEM schools
                    case "Regular":
                        semCourseWeight += 0.0;
                        break;
                    // Elective course, does not add to grade score, only for STEM school
                }
            }
        }

        // Calculate unweighted and weighted GPA for the semester
        semUWGrades[i] = (semGradePoint / (numOfCoursesPerSem[i] - semBlanks)).toFixed(2);
        semWGrades[i] = ((semGradePoint + semCourseWeight) / (numOfCoursesPerSem[i] - semBlanks)).toFixed(2);
        
        // Update total grade points, course weights, and blank entries
        totalGradePoint += semGradePoint;
        totalCourseWeight += semCourseWeight;
        numBlanks += semBlanks;
        
        // Update semester information with calculated GPA
        if (!(semUWGrades[i] >= 0)) {
            semUWGrades[i] = "0.00";
            semWGrades[i] = "0.00";
        }
        semInfo[i][1] = semUWGrades[i];
        semInfo[i][2] = semWGrades[i];
    }
    
    // Calculate cumulative unweighted and weighted GPA
    let unweightedGpa = (totalGradePoint / (numOfCourses - numBlanks)).toFixed(2);
    let weightedGpa =  ((totalGradePoint + totalCourseWeight) / (numOfCourses - numBlanks)).toFixed(2);
    
    // Update display with cumulative GPA
    if (!(unweightedGpa >= 0)) {
        unweightedGpa = "0.00";
        weightedGpa = "0.00";
    }

    for (let i = 0; i < semUWGrades.length; i++) {
        let semGpa = document.getElementById("semester" + i);
        if (semGpa == null) {
            let semGpas = document.createElement("h2");
            let name = document.createElement("h2");
            if (semNames[i] != "") {
				name.innerHTML = "<pre>" + semNames[i] + "</pre>";
				semGpas.style.fontWeight = `500`;
                semGpas.innerHTML = "<pre>     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
            } else {
				name.innerHTML = "<pre>Semester " + (i + 1) + "</pre>";
				name.style.fontWeight = `500`;
				name.style.top = `-40px`;
                semGpas.innerHTML = "<pre>     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
            }            
            semGpas.id = "semester" + i;
            name.id = "semestersssss" + i;
            let semGrades = document.getElementById("semesterGrades");
            semGrades.appendChild(name);
            semGrades.appendChild(semGpas);
            semTextCount++;
        } else {
            if (semNames[i] != "") {
                semGpa.innerHTML = "<pre>" + semNames[i] + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
            } else {
                semGpa.innerHTML = "<pre>Semester " + (i+1) + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
            }
        }
	}
    document.getElementById("unweightedGpa").textContent = "Cumulative Unweighted GPA: " + unweightedGpa;
    document.getElementById("weightedGpa").textContent = "Cumulative Weighted GPA: " + weightedGpa;

    // Store cumulative GPA values
    cumulativeUnweightedGpa = unweightedGpa;
    cumulativeWeightedGpa = weightedGpa;
}

// Function to save course data
function save() {
    // Create JSON object with course data
    const courseData = {
        "identifier": "123325",
        "cumulative_weighted_gpa": cumulativeWeightedGpa,
        "cumulative_unweighted_gpa": cumulativeUnweightedGpa,
        "semesters": semInfo,
    };
    // Convert JSON object to string
    const jsonData = JSON.stringify(courseData);
    // Send POST request to server with course data
    fetch('http://localhost:8082/gpacalculator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Optionally, perform any actions after successful submission
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally, handle errors here
    });
}

// Function to add a new semester
function addSemester() {
    // Increment semester count and initialize arrays
    semCount++;
    semInfo.push([]);
    numOfCoursesPerSem.push(0);
    semUWGrades.push(0.0);
    semWGrades.push(0.0);
    semNames.push("");
    semInfo[semCount - 1].unshift(0.0);
    semInfo[semCount - 1].unshift(0.0);
    semInfo[semCount - 1].unshift("");
    
    // Clone the template for semester
    let template = document.getElementById("calculator");
    let clone = template.cloneNode(true);
    clone.id = "calculator" + semCount;
    clone.style.visibility = `visible`;
    // Update heights for the new semester
    borderHeights.push(160);
    semHeights.push(semHeights[semCount - 1] + borderHeights[semCount - 1] + 50);
    clone.style.top = `${semHeights[semCount]}px`;
    // Append the cloned element to the container
    document.getElementById("tables").appendChild(clone);
}

// Function to handle change in grade selection
function gradeChanged(select) {
    var selectedValue = select.value;
    var blankOption = select.querySelector('option[value=""]');
    if (selectedValue !== "") {
        blankOption.hidden = true;
        calculate();
    }
}

// Fetch and display data when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8082/transcript?json';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Populate the UI with fetched data
            for (let i = 0; i < data.semesters.length; i++) {
                for (let j = 0; j < data.semesters[i].length - 3; j++) {
                    let sem = semNames.indexOf(data.semesters[i][0]);
                    document.getElementById("course" + sem + j).textContent = data.semesters[i][j + 3][0];
                    document.getElementById("grade" + sem + j).textContent = data.semesters[i][j + 3][1];
                    document.getElementById("type" + sem + j).textContent = data.semesters[i][j + 3][2];
                }
            }
            // Calculate GPA based on fetched data
            calculate();
        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });
});
