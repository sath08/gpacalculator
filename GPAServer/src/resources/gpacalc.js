let websiteHeight = 70;

let numOfCourses = 0;

let borderHeights = [0]
let lineHeight = 50;
let semCount = 0;
let semHeights = [websiteHeight - 100]
let semUWGrades = []
let semWGrades = []
let semNames = [];
let semTextCount = 0;
let semInfo = []; // SEMESTERS -> COURSES -> [COURSE, GRADE, TYPE]

let curNumBlanks = 0;


document.getElementById("popUp").classList.remove("popUp");

let cumulativeWeightedGpa = 0;
let cumulativeUnweightedGpa = 0;

let numOfCoursesPerSem = [];

addSemester();

function addCourse(semNum) {
    
    let border = document.getElementById("calculator" + semNum);
    semInfo[semNum-1].push([0, 0, 0])

    for (var i = semNum + 1; i <= semCount; i++) {
        let curBorder = document.getElementById("calculator" + i);
        semHeights[i] += lineHeight;
        curBorder.style.top = `${semHeights[i]}px`;
    }
    
    borderHeights[semNum] += lineHeight;
    border.style.height = `${borderHeights[semNum]}px`;
    numOfCourses++;
    numOfCoursesPerSem[semNum-1]++;
    let courseBox = document.createElement("input");

    let curSem = (semNum-1).toString();
    let index = (numOfCoursesPerSem[semNum-1] - 1).toString();

    courseBox.id = "course" + curSem + index;
    courseBox.placeholder = "Enter Course Name...";
    courseBox.onchange = function() {calculate()};
    courseBox.maxLength = "30";
    border.querySelector(".courseNames").appendChild(courseBox);


    let gradeDrop = document.createElement("select");
    gradeDrop.id = "grade" + curSem + index;

    let grades = ["A", "B+", "B", "B-", "C+", "C", "C-", "N"];
    let option = document.createElement("option");
    option.value = "";
    gradeDrop.add(option);
    grades.forEach(grade=> {
        let option = document.createElement("option");
        option.text = grade;
        gradeDrop.add(option);
    });
    let temp = gradeDrop;
    gradeDrop.onchange = function() {gradeChanged(temp)};
    border.querySelector(".grades").appendChild(gradeDrop);


    let typeDrop = document.createElement("select");
    typeDrop.id = "type" + curSem + index;

    let types = ["Regular", "Honors", "AP"];
    types.forEach(type=> {
        let option = document.createElement("option");
        option.text = type;
        typeDrop.add(option);
    });
    typeDrop.onchange = function() {gradeChanged(temp)};
    border.querySelector(".types").appendChild(typeDrop);


    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    
    delBtn.id = "delete" + curSem + index;
    
    delBtn.onclick = function() {remove(curSem, index)};
    border.querySelector(".deletes").appendChild(delBtn);
    document.getElementById("addSemBtn").style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
}

function remove(semNum, index) {
    
    document.getElementById("grade" + semNum + index).remove();
    document.getElementById("course" + semNum + index).remove();
    document.getElementById("type" + semNum + index).remove();
    document.getElementById("delete" + semNum + index).remove();
    semInfo[semNum].splice(Number(index)+3, 1)

    while (index < numOfCoursesPerSem[semNum] - 1) {
        index++;
        let i = index-1;
        let curSem = semNum;
        let x = document.getElementById("delete" + curSem + index);
        document.getElementById("grade" + curSem + index).id = "grade" + curSem + i;
        document.getElementById("course" + curSem + index).id = "course" + curSem + i;
        document.getElementById("type" + curSem + index).id = "type" + curSem + i;
        x.id = "delete" + curSem + i;
        x.onclick = function() {remove(curSem, i)};
    }
    numOfCoursesPerSem[semNum]--;

    numOfCourses--;
    semNum = Number(semNum);
    let border = document.getElementById("calculator" + (semNum + 1));
    
    borderHeights[semNum + 1] -= lineHeight;
    border.style.height = `${borderHeights[semNum + 1]}px`;
    document.getElementById("addSemBtn").style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;

    for (var i = semNum + 2; i <= semCount; i++) {
        let curBorder = document.getElementById("calculator" + i);
        semHeights[i] -= lineHeight;
        curBorder.style.top = `${semHeights[i]}px`;
    }

    calculate();
}

function calculate() {
    let totalGradePoint = 0;
    let totalCourseWeight = 0;
    let numBlanks = 0;
    curNumBlanks = 0;
    for (let i = 0; i < numOfCoursesPerSem.length; i++) {
        let semGradePoint = 0;
        let semCourseWeight = 0;
        let semBlanks = 0;
        for (let j = 0; j < numOfCoursesPerSem[i]; j++) {
            grade = document.getElementById("grade" + i + j).value;
            type = document.getElementById("type" + i + j).value;
            courseName = document.getElementById("course" + i + j).value;
            
            if (courseName ==  "") {
                curNumBlanks = 1;
            }
            semInfo[i][j + 3][0] = courseName;
            semInfo[i][j + 3][1] = grade;
            semInfo[i][j + 3][2] = type;
            

            switch (grade) {
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
                case "":
                    semGradePoint += 0.0;
                    semBlanks++;
                    break;
            }
            if (grade != "") {
                switch (type) {
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

        

        semUWGrades[i] = (semGradePoint / (numOfCoursesPerSem[i] - semBlanks)).toFixed(2);
        
        semWGrades[i] = ((semGradePoint + semCourseWeight) / (numOfCoursesPerSem[i] - semBlanks)).toFixed(2);
        totalGradePoint += semGradePoint;
        totalCourseWeight += semCourseWeight;
        numBlanks += semBlanks;
        curNumBlanks += numBlanks;
        if (!(semUWGrades[i] >= 0)) {
            semUWGrades[i] = "0.00";
            semWGrades[i] = "0.00";
        }
        semInfo[i][1] = semUWGrades[i];
        semInfo[i][2] = semWGrades[i];
    }
    
    let unweightedGpa = (totalGradePoint / (numOfCourses - numBlanks)).toFixed(2);
    let weightedGpa =  ((totalGradePoint + totalCourseWeight) / (numOfCourses - numBlanks)).toFixed(2);
    
    if (!(unweightedGpa >= 0)) {
        unweightedGpa = "0.00";
        weightedGpa = "0.00";
    }

    for (let i = 0; i < semUWGrades.length; i++) {
        let semGpa = document.getElementById("semester" + i);
        if (semGpa == null) {
            let semGpas = document.createElement("h2");
            if (semNames[i] != "") {
                semGpas.innerHTML = "<pre>" + semNames[i] + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
            } else {
                semGpas.innerHTML = "<pre>Semester " + (i+1) + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
            }            
            semGpas.id = "semester" + i;
            let semGrades = document.getElementById("semesterGrades");
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

    cumulativeUnweightedGpa = unweightedGpa;
    cumulativeWeightedGpa = weightedGpa;
}

function save() {
    calculate();
    let error = "";
    let good = true;
    for (let i = 0; i < semInfo.length; i++) {
        if (semInfo[i].length != 10) {
            good = false;
            error = ("Not Correct Length");
        }
    }

    if (semInfo.length > 8) {
        good = false;
        error = ("Too Many Semesters");
    }

    if (curNumBlanks != 0) {
        good = false;
        error = ("Some Information Has Been Left Blank")
    }

    for (let i = 0; i < semInfo.length; i++) {
        for (let j = 0; j < semInfo.length; j++) {
            if (semInfo[i][0] == semInfo[j][0] && i != j) {
                good = false;
                error = "Duplicate Semesters";
            }
        }
        if (semInfo[i][0] == "Choose Semester" || semInfo[i][0] == "") {
            error = "No Semester Selected"
            good = false;
        }
    }

    if (good) {
        const courseData = {
            "identifier" : "123325",
            "cumulative_weighted_gpa": cumulativeWeightedGpa,
            "cumulative_unweighted_gpa": cumulativeUnweightedGpa,
            "semesters": semInfo,
        };
        const jsonData = JSON.stringify(courseData);
        console.log(jsonData);
        fetch('http://localhost:8082/gpacalculator', {
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
    } else {
        
        
        
        let popUp = document.getElementById("popUp")
        let message = popUp.querySelector(".message");

        message.textContent = "DID NOT SAVE: " + error;

        popUp.appendChild(message);
        popUp.style.opacity = 100;

        popUp.classList.remove("popUp");

        // Force a reflow
        void popUp.offsetWidth;

        // Reapply the class to restart the animation
        popUp.classList.add("popUp");
        popUp.style.opacity = 0;
    }
    
}

function addSemester() {
    semCount++;
    semInfo.push([]);
    numOfCoursesPerSem.push(0);
    semUWGrades.push(0.0);
    semWGrades.push(0.0);
    semNames.push("");
    semInfo[semCount-1].unshift(0.0);
    semInfo[semCount-1].unshift(0.0);
    semInfo[semCount-1].unshift("");
    
    let template = document.getElementById("calculator");

    // Clone the template
    let clone = template.cloneNode(true);
    clone.id = "calculator" + semCount;

    let deleteSemesterBtn = clone.querySelector(".deleteSemesterBtn");
    deleteSemesterBtn.onclick = function() {deleteSemester(curSem)}
    
    clone.style.visibility = `visible`;
    let addCourseBtn = clone.querySelector(".addCourseBtn");
    let curSem = semCount;
    addCourseBtn.onclick = function() {addCourse(curSem)};

    borderHeights.push(160);
    semHeights.push(semHeights[semCount-1] + borderHeights[semCount-1] + 130);
    clone.style.top = `${semHeights[semCount]}px`;

    let addSemBtn = document.getElementById("addSemBtn");
    addSemBtn.style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
    if (semCount > 1) {
        addSemBtn.classList.add('semBtnMove');
    
        // Remove the class after the animation is done (adjust the timeout according to your animation duration)
        setTimeout(function() {
            addSemBtn.classList.remove('semBtnMove');
        }, 1000);
        
    }
    
    // Append the cloned element to the container
    document.getElementById("tables").appendChild(clone);

    addCourse(semCount);
    addCourse(semCount);
}

function semNameChange() {
    
    for (let i = 0; i < semUWGrades.length; i++) {
        semNames[i] = document.getElementById("calculator" + (i+1)).querySelector(".semName").value;
        if (semNames[i] != "" && i < semTextCount) {
            let semGpa = document.getElementById("semester" + (i));
            semGpa.innerHTML = "<pre>" + semNames[i] + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
        }
        semInfo[i][0] = semNames[i];
    }
    
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

function deleteSemester(semNum) {
    console.log(semNum);
    document.getElementById("calculator" + semNum).remove();
    semCount--;

    numOfCourses -= numOfCoursesPerSem[semNum-1];

    numOfCoursesPerSem.splice(semNum-1, 1);
    semUWGrades.splice(semNum-1, 1);
    semWGrades.splice(semNum-1, 1);
    semNames.splice(semNum-1, 1);
    semInfo.splice(semNum-1, 1);

    let addSemBtn = document.getElementById("addSemBtn");

    borderHeights.splice(semNum, 1);
    semHeights.splice(semNum, 1);

    for (var i = semNum; i < semHeights.length; i++) {
        semHeights[i] = semHeights[i-1] + borderHeights[i-1] + 130;
        let calc = document.getElementById("calculator" + (i + 1))
        calc.style.top = `${semHeights[i]}px`;
        calc.id = "calculator" + i;
        console.log(i);
        console.log(numOfCoursesPerSem);
        for (var j = 0; j < numOfCoursesPerSem[i-1]; j++) {
            let grade = document.getElementById("grade" + (i) + j);
            grade.id = "grade" + (i-1) + j;
            let type = document.getElementById("type" + (i) + j);
            type.id = "type" + (i-1) + j;
            let courseName = document.getElementById("course" + (i) + j);
            courseName.id = "course" + (i-1) + j;
            let del = document.getElementById("delete" + i + j);
            del.id = "delete" + (i-1) + j;
            del.onclick = function() {remove(i-1, j)};
        }
        
        let addCourseBtn = calc.querySelector(".addCourseBtn");
        let curSem = i;
        addCourseBtn.onclick = function() {addCourse(curSem)};

        let deleteSemesterBtn = calc.querySelector(".deleteSemesterBtn");
        deleteSemesterBtn.onclick = function() {deleteSemester(curSem)}

        console.log(calc)
        console.log(semHeights[i]);
    }
    let semText = document.getElementById("semester" + (semCount));
    console.log(semCount);
    if (semText != null) {
        semText.remove();
        calculate();
        semTextCount--;
    }
    addSemBtn.style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;

    console.log(semHeights);
}