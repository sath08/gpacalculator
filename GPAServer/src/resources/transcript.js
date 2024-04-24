let numOfCourses = 0;

let borderHeights = [0]
let lineHeight = 50;
let semCount = 0;
let semHeights = [0]
let semUWGrades = []
let semWGrades = []
let semNames = ["Freshman Semester 1", "Freshman Semester 2", "Sophomore Semester 1", "Sophomore Semester 2", "Junior Semester 1", "Junior Semester 2", "Senior Semester 1", "Senior Semester 2"];
let semTextCount = 0;
let semInfo = []; // SEMESTERS -> COURSES -> [COURSE, GRADE, TYPE]

let cumulativeWeightedGpa = 0;
let cumulativeUnweightedGpa = 0;

let numOfCoursesPerSem = [];

for (var i = 0; i < 8; i++) {
    addSemester();
    for (var j = 0; j < 7; j++) {   
        addCourse(i+1);
    }
    document.getElementById("calculator" + (i + 1)).querySelector(".semName").textContent = semNames[i];
}

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
    let courseBox = document.createElement("p");

    let curSem = (semNum-1).toString();
    let index = (numOfCoursesPerSem[semNum-1] - 1).toString();

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

function calculate() {
    let totalGradePoint = 0;
    let totalCourseWeight = 0;
    let numBlanks = 0;
    for (let i = 0; i < numOfCoursesPerSem.length; i++) {
        let semGradePoint = 0;
        let semCourseWeight = 0;
        let semBlanks = 0;
        for (let j = 0; j < numOfCoursesPerSem[i]; j++) {
            grade = document.getElementById("grade" + i + j).textContent;
            type = document.getElementById("type" + i + j).textContent;
            courseName = document.getElementById("course" + i + j).textContent;
            
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
                default:
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

    cumulativeUnweightedGpa = unweightedGpa;
    cumulativeWeightedGpa = weightedGpa;
}

function save() {
    
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

    
    clone.style.visibility = `visible`;
    

    borderHeights.push(160);
    semHeights.push(semHeights[semCount-1] + borderHeights[semCount-1] + 50);
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
    const apiUrl = 'http://localhost:8082/transcript?json';
    fetch(apiUrl)
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
			console.log(data.semesters)
            for (let i = 0; i < data.semesters.length; i++) {
				console.log(i);
                for (let j = 0; j < data.semesters[i].length - 3; j++) {
                    let sem = semNames.indexOf(data.semesters[i][0]);       
                    document.getElementById("course" + sem + j).textContent = data.semesters[i][j+3][0];
                    document.getElementById("grade" + sem + j).textContent = data.semesters[i][j+3][1];
                    document.getElementById("type" + sem + j).textContent = data.semesters[i][j+3][2];
                }
            }
            calculate();
        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });
});