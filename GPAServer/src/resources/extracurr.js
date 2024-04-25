// Initialize variables to store course and semester information
let numOfCourses = 0; // Number of courses
let borderHeights = [0]; // Heights of semester borders
let lineHeight = 50; // Height of each line (course entry)
let semCount = 0; // Number of semesters
let semHeights = [-20]; // Heights of semesters
let semUWGrades = []; // Unweighted grades for semesters
let semWGrades = []; // Weighted grades for semesters
let semNames = ["Sports", "Clubs", "Volunteering", "Leadership"]; // Names of semesters
let semTextCount = 0; // Count of semester texts

// Array to store extracurricular information: GROUP -> EC -> (Course, curState, goalState, progress)
let semInfo = [[], [], [], []];

// Variables to store cumulative GPA values
let cumulativeWeightedGpa = 0;
let cumulativeUnweightedGpa = 0;

// Array to track the number of courses per semester
let numOfCoursesPerSem = [];

// Loop to initialize semesters and set their names
for (var i = 0; i < 4; i++) {
    addSemester();
    document.getElementById("calculator" + (i + 1)).querySelector(".semName").textContent = semNames[i];
}

// Calculate GPA
calculate();

// Function to add a course to a semester
function addCourse(semNum) {
    // Get the border element for the specified semester
    let border = document.getElementById("calculator" + semNum);
    
    // Push an empty array to store course information for the current semester
    semInfo[semNum - 1].push(["", "", "", ""]);

    // Adjust heights of subsequent semesters
    for (var i = semNum + 1; i <= semCount; i++) {
        let curBorder = document.getElementById("calculator" + i);
        semHeights[i] += lineHeight;
        curBorder.style.top = `${semHeights[i]}px`;
    }
    
    // Adjust border height and number of courses
    borderHeights[semNum] += lineHeight;
    border.style.height = `${borderHeights[semNum]}px`;
    numOfCourses++;

    // Create input elements for course information
    let curSem = (semNum - 1).toString();
    let index = (numOfCoursesPerSem[semNum - 1]).toString();
    numOfCoursesPerSem[semNum - 1]++;

    let courseBox = document.createElement("input");
    courseBox.id = "course" + curSem + index;
    courseBox.onchange = function() {calculate()};
    courseBox.maxLength = "8";
    border.querySelector(".courseNames").appendChild(courseBox);

    let curStateBox = document.createElement("input");
    curStateBox.id = "curState" + curSem + index;
    curStateBox.onchange = function() {calculate()};
    border.querySelector(".curStates").appendChild(curStateBox);

    let goalStateBox = document.createElement("input");
    goalStateBox.id = "goalState" + curSem + index;
    goalStateBox.onchange = function() {calculate()};
    border.querySelector(".goalStates").appendChild(goalStateBox);

    let progress = document.createElement("select");
    let progresses = ["", "Need To Start", "Half Done", "Done"];
    
    // Populate progress dropdown
    progresses.forEach(progType => {
        let option = document.createElement("option");
        option.text = progType;
        progress.add(option);
    });
    progress.id = "progress" + curSem + index;
    progress.onchange = function() {calculate()};
    border.querySelector(".progresses").appendChild(progress);
}

// Function to calculate GPA
function calculate() {
    let groups = document.getElementById("groups");
    let statuses = document.getElementById("statuses");

    // Clear previous GPA display
    while (groups.firstChild) {
        groups.removeChild(groups.firstChild);
    }
    while (statuses.firstChild) {
        statuses.removeChild(statuses.firstChild);
    }

    // Loop through semesters and courses to calculate and display GPA
    for (let i = 0; i < numOfCoursesPerSem.length; i++) {
        let semGpas = document.createElement("h2");
        semGpas.innerHTML = "<pre>" + semNames[i] + "</pre>";
        semGpas.id = "semester" + i;
        groups.appendChild(semGpas);

        let blank = document.createElement("h2");
        blank.innerHTML = "<pre> </pre>";
        statuses.appendChild(blank);
        
        for (let j = 0; j < numOfCoursesPerSem[i]; j++) {
            let progress = document.getElementById("progress" + i + j).value;
            let courseName = document.getElementById("course" + i + j).value;
            let curState = document.getElementById("curState" + i + j).value;
            let goalState = document.getElementById("goalState" + i + j).value;

            semInfo[i][j][0] = courseName;
            semInfo[i][j][1] = curState;
            semInfo[i][j][2] = goalState;
            semInfo[i][j][3] = progress;

            if (courseName != "" && progress != "") {
                let progressText = document.createElement("h2");
                let course = document.createElement("h2");

                // Set colors based on progress
                if (progress == "Need To Start") {
                    progressText.style.color = `red`;
                    course.style.color = `red`;
                } else if (progress == "Half Done") {
                    progressText.style.color = `#FFB800`;
                    course.style.color = `#FFB800`;
                } else {
                    progressText.style.color = `green`;
                    course.style.color = `green`;
                }
                course.innerHTML = "<pre>\t" + courseName + "</pre>";
                course.style.fontWeight = 400;
                progressText.style.fontWeight = 400;
                groups.appendChild(course);

                progressText.innerHTML = "<pre>" + progress + "</pre>";
                statuses.appendChild(progressText);                
            }
        }
    }
}

// Function to save course data to server
function save() {
    calculate();

    // Construct JSON data
    const courseData = {
        "identifier" : "123325",
        "Sports": semInfo[0],
        "Clubs": semInfo[1],
        "Volunteering": semInfo[2],
        "Leadership": semInfo[3],
    };
    const jsonData = JSON.stringify(courseData);

    // POST request to server
    fetch('http://localhost:8082/extracurr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Show pop-up message on successful save
        let popUp = document.getElementById("popUp");
        let message = popUp.querySelector(".message");
        message.textContent = "SAVED SUCCESSFULLY!";
        popUp.appendChild(message);
        popUp.style.opacity = 100;
        popUp.classList.remove("popUp");

        // Force a reflow and restart animation
        void popUp.offsetWidth;
        popUp.classList.add("popUp");
        popUp.style.opacity = 0;
      })
      .catch(error => {
        console.error('Error:', error);
        // Optionally, handle errors here
      });
}

// Function to add a new semester section
function addSemester() {
    semCount++;
    numOfCoursesPerSem.push(0);
        
    let template = document.getElementById("calculator");

    // Clone the template
    let clone = template.cloneNode(true);
    clone.id = "calculator" + semCount;
    clone.style.visibility = `visible`;

    // Set onclick event for addCourse button
    let addCourseBtn = clone.querySelector(".addCourseBtn");
    let curSem = semCount;
    addCourseBtn.onclick = function() {addCourse(curSem)};

    // Adjust heights
    borderHeights.push(160);
    semHeights.push(semHeights[semCount - 1] + borderHeights[semCount - 1] + 90);
    clone.style.top = `${semHeights[semCount]}px`;

    // Append the cloned element to the container
    document.getElementById("tables").appendChild(clone);
}

// Event listener for grade selection change
function gradeChanged(select) {
    var selectedValue = select.value;
    var blankOption = select.querySelector('option[value=""]');
    if (selectedValue !== "") {
        blankOption.hidden = true;
        calculate();
    }
}

// Fetch extracurricular data from API when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8082/extracurr';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
			for (let i = 0; i < data.Sports.length; i++) {
                addCourse(1);
                document.getElementById("progress" + 0 + i).value = data.Sports[i][3];
                document.getElementById("goalState" + 0 + i).value = data.Sports[i][2];
                document.getElementById("curState" + 0 + i).value = data.Sports[i][1];
                document.getElementById("course" + 0 + i).value = data.Sports[i][0];
            }
            
            for (let i = 0; i < data.Clubs.length; i++) {
                addCourse(2);
                document.getElementById("progress" + 1 + i).value = data.Clubs[i][3];
                document.getElementById("goalState" + 1 + i).value = data.Clubs[i][2];
                document.getElementById("curState" + 1 + i).value = data.Clubs[i][1];
                document.getElementById("course" + 1 + i).value = data.Clubs[i][0];
            }
            
            for (let i = 0; i < data.Volunteering.length; i++) {
                addCourse(3);
                document.getElementById("progress" + 2 + i).value = data.Volunteering[i][3];
                document.getElementById("goalState" + 2 + i).value = data.Volunteering[i][2];
                document.getElementById("curState" + 2 + i).value = data.Volunteering[i][1];
                document.getElementById("course" + 2 + i).value = data.Volunteering[i][0];
            }
            
            for (let i = 0; i < data.Leadership.length; i++) {
                addCourse(4);
                document.getElementById("progress" + 3 + i).value = data.Leadership[i][3];
                document.getElementById("goalState" + 3 + i).value = data.Leadership[i][2];
                document.getElementById("curState" + 3 + i).value = data.Leadership[i][1];
                document.getElementById("course" + 3 + i).value = data.Leadership[i][0];
            }
            calculate();
        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });
});
