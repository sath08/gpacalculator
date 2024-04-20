let numOfCourses = 0;

let borderHeights = [0]
let lineHeight = 50;
let semCount = 0;
let semHeights = [-150]

numOfCoursesPerSem = [0];

resize();
addSemester();

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("menuContent");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}

window.addEventListener("resize", function(){resize()});

function resize() {
    
}

function addCourse(semNum) {
    let border = document.getElementById("calculator" + semNum);
    
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
    console.log(borderHeights);
    borderHeights[semNum + 1] -= lineHeight;
    console.log(borderHeights);
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
    for (let i = 0; i < numOfCoursesPerSem.length; i++) {
        for (let j = 0; j < numOfCoursesPerSem[i]; j++) {
            grade = document.getElementById("grade" + i + j).value;
            type = document.getElementById("type" + i + j).value;
    
            switch (grade) {
                case "A":
                totalGradePoint += 4.0;
                    break;
                case "B+":
                    totalGradePoint += 3.3;
                    break;
                case "B":
                    totalGradePoint += 3.0;
                    break;
                case "B-":
                    totalGradePoint += 2.7;
                    break;
                case "C+":
                    totalGradePoint += 2.3;
                    break;
                case "C":
                    totalGradePoint += 2.0;
                    break;
                case "C-":
                    totalGradePoint += 1.7;
                    break;
                case "D+":
                    totalGradePoint += 1.3;
                    break;
                case "D":
                    totalGradePoint += 1.0;
                case "N":
                    totalGradePoint += 0.0;
                    break;
                case "":
                    totalGradePoint += 0.0;
                    numBlanks++;
                    break;
            }
    
            switch (type) {
                // AP level course, adds 1 onto grade score
                case "AP":
                    totalCourseWeight += 1.0;
                    break;
                // Honors level course, adds 0.5 onto grade score
                case "Honors":
                    totalCourseWeight += 0.5;
                    break;
                // Regular level x`course, does not add to grade score, only for non STEM schools
                case "Regular":
                    totalCourseWeight += 0.0;
                    break;
                // Elective course, does not add to grade score, only for STEM school
            }
        }
    }
    
    let unweightedGpa = (totalGradePoint / (numOfCourses - numBlanks)).toFixed(2);
    let weightedGpa =  ((totalGradePoint + totalCourseWeight) / (numOfCourses - numBlanks)).toFixed(2);
    
    if (!(unweightedGpa >= 0)) {
        unweightedGpa = "0.00";
        weightedGpa = "0.00";
    }

    document.getElementById("unweightedGpa").textContent = "Cumulative Unweighted GPA: " + unweightedGpa;
    document.getElementById("weightedGpa").textContent = "Cumulative Weighted GPA: " + weightedGpa;

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
    semHeights.push(semHeights[semCount-1] + borderHeights[semCount-1] + 150);
    clone.style.top = `${semHeights[semCount]}px`;

    document.getElementById("addSemBtn").style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
    
    // Append the cloned element to the container
    document.getElementById("tables").appendChild(clone);

    addCourse(semCount);
    addCourse(semCount);
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
