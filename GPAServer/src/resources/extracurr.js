let numOfCourses = 0;

let borderHeights = [0]
let lineHeight = 50;
let semCount = 0;
let semHeights = [-20]
let semUWGrades = []
let semWGrades = []
let semNames = ["Sports", "Clubs", "Volunteering", "Leadership"];
let semTextCount = 0;

let semInfo = [[], [], [], []]; // GROUP -> EC -> (Course, curState, goalState, progress)

let cumulativeWeightedGpa = 0;
let cumulativeUnweightedGpa = 0;

document.getElementById("popUp").classList.remove("popUp");

let numOfCoursesPerSem = [];

for (var i = 0; i < 4; i++) {
    addSemester();
    //for (var j = 0; j < 4; j++) {   
    //    addCourse(i+1);
    //}
    document.getElementById("calculator" + (i + 1)).querySelector(".semName").textContent = semNames[i];
}

calculate();
function addCourse(semNum) {
    let border = document.getElementById("calculator" + semNum);
    console.log(semNum-1);
    semInfo[semNum-1].push(["", "", "", ""])

    for (var i = semNum + 1; i <= semCount; i++) {
        let curBorder = document.getElementById("calculator" + i);
        semHeights[i] += lineHeight;
        curBorder.style.top = `${semHeights[i]}px`;
    }
    
    borderHeights[semNum] += lineHeight;
    border.style.height = `${borderHeights[semNum]}px`;
    numOfCourses++;

    let curSem = (semNum-1).toString();
    let index = (numOfCoursesPerSem[semNum-1]).toString();

    numOfCoursesPerSem[semNum-1]++;


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
    
    
    progresses.forEach(progType=> {
        let option = document.createElement("option");
        option.text = progType;
        progress.add(option);
    });
    progress.id = "progress" + curSem + index;
    progress.onchange = function() {calculate()};
    border.querySelector(".progresses").appendChild(progress);
}

function calculate() {
    let groups = document.getElementById("groups");
    let statuses = document.getElementById("statuses");
    while (groups.firstChild) {
        groups.removeChild(groups.firstChild);
    }
    while (statuses.firstChild) {
        statuses.removeChild(statuses.firstChild);
    }
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

function save() {
    calculate();
    console.log(semInfo[0]);
    const courseData = {
        "identifier" : "123325",
        "Sports": semInfo[0],
        "Clubs": semInfo[1],
        "Volunteering": semInfo[2],
        "Leadership": semInfo[3],
    };
    const jsonData = JSON.stringify(courseData);
    console.log(jsonData);
    fetch('http://localhost:8082/extracurr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Succesos:', data);
        // Optionally, perform any actions after successful submission
      })
      .catch(error => {
        console.error('Error:', error);
        // Optionally, handle errors here
      });
    let popUp = document.getElementById("popUp")
    let message = popUp.querySelector(".message");

    message.textContent = "SAVED SUCCESFULLY!";
    popUp.appendChild(message);
    popUp.style.opacity = 100;

    popUp.classList.remove("popUp");

    // Force a reflow
    void popUp.offsetWidth;

    // Reapply the class to restart the animation
    popUp.classList.add("popUp");
    popUp.style.opacity = 0;
}

function addSemester() {
    semCount++;
    numOfCoursesPerSem.push(0);
        
    let template = document.getElementById("calculator");

    // Clone the template
    let clone = template.cloneNode(true);
    clone.id = "calculator" + semCount;

    
    clone.style.visibility = `visible`;

    let addCourseBtn = clone.querySelector(".addCourseBtn");
    let curSem = semCount;
    addCourseBtn.onclick = function() {addCourse(curSem)};


    borderHeights.push(160);
    semHeights.push(semHeights[semCount-1] + borderHeights[semCount-1] + 90);
    clone.style.top = `${semHeights[semCount]}px`;

    // Append the cloned element to the container
    document.getElementById("tables").appendChild(clone);

}


function gradeChanged(select) {
    // Get the selected value
    var selectedValue = select.value;
    
    // Find the blank option
    var blankOption = select.querySelector('option[value=""]');

    // Disable the blank option if a selection has been made
    if (selectedValue !== "") {
        blankOption.hidden = true;
        calculate();
    }
}

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

