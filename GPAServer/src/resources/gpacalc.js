// Initializes all variables

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

// Hides the popUp element
document.getElementById("popUp").classList.remove("popUp");

// Initializes more variables
let cumulativeWeightedGpa = 0;
let cumulativeUnweightedGpa = 0;

let numOfCoursesPerSem = [];

// Adds a semester to start
addSemester();

// This function adds a course to the semester specified by the parameter, "semNum".
// It will add an input box for the course name, two dropdowns for the grade and type of the course, and a delete btn to delete the course later.
function addCourse(semNum) {
	// border is set to be the entire semester border/element
	let border = document.getElementById("calculator" + semNum);
	// Adds an empty array of three elements, representing the course name, grade, and type of the course that is added
	// This is added to the semInfo array which contains each semester and their courses and other information about the semester
	semInfo[semNum-1].push([0, 0, 0])
	
	// Loops through each semester below the semester and changes the height since the additional course takes up space
	for (var i = semNum + 1; i <= semCount; i++) {
		let curBorder = document.getElementById("calculator" + i);
		semHeights[i] += lineHeight;
		curBorder.style.top = `${semHeights[i]}px`;
	}
	
	// Changes the height of the semester to which the course was added
	borderHeights[semNum] += lineHeight;
	// Makes the border height change
	border.style.height = `${borderHeights[semNum]}px`;
	// Increments the number of courses for later use
	numOfCourses++;
	numOfCoursesPerSem[semNum-1]++;
	
	// Sets the  var courseBox to be a new input element to  which  the  user can add their course name
	let courseBox = document.createElement("input");
	
	// Add event listener to validate input for class name
	courseBox.addEventListener('input', function (event) {
	    const inputValue = event.target.value;
	    // Use a regular expression to check if the input contains only letters
	    if (!/^[a-zA-Z0-9\s]+$/.test(inputValue)) {
	        // If non-letter characters are entered, remove them
	        event.target.value = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
	    }
	})
	
	// Creates a new variable curSem to be the current semester index - 1 to account for arrays starting at index 0
	let curSem = (semNum-1).toString();
	// Creates the variable index to hold the position the coursebox is in.
	let index = (numOfCoursesPerSem[semNum-1] - 1).toString();
	
	// Sets the id of the coursebox to be unique, telling the position of the box so it can be accessed later in the code
	courseBox.id = "course" + curSem + index;
	// Sets the placeholder for the box
	courseBox.placeholder = "Enter Course Name...";
	// Makes the calculate() function be called when the coursebox is edited by the user, indicating a change in course name
	courseBox.onchange = function() {calculate()};
	// Sets the max length of the coursebox to be 20 characters
	courseBox.maxLength = "20";
	// Appends the coursebox to the semester
	border.querySelector(".courseNames").appendChild(courseBox);
	
	// creates a select element for the grade dropdown
	let gradeDrop = document.createElement("select");
	// Sets the id of the dropdown to be unique, telling the position of the box so it can be accessed later in the code
	gradeDrop.id = "grade" + curSem + index;
	
	// creates an array to hold the possible grade that a user may input
	let grades = ["A", "B+", "B", "B-", "C+", "C", "C-", "N"];
	// Adds each grade to be an option element with the text of each element in the array
	let option = document.createElement("option");
	option.value = "";
	gradeDrop.add(option);
	grades.forEach(grade=> {
		let option = document.createElement("option");
		option.text = grade;
		gradeDrop.add(option);
	});
	let temp = gradeDrop;
	// lets the  gradechanged function be called  when  the  grade is changed by the user
	gradeDrop.onchange = function() {gradeChanged(temp)};
	// adds the grade dropdown to  the semester
	border.querySelector(".grades").appendChild(gradeDrop);
	
	// Creates a select element for the type dropdown
	let typeDrop = document.createElement("select");
	// Sets the id of the type dropdown to be unique, telling the position of the box so it can be accessed later in the code
	typeDrop.id = "type" + curSem + index;
	// creates an array to hold the possible types that a user may input
	let types = ["Regular", "Honors", "AP"];
	// loops through each value of the types array and adds the option to the type dropdown
	types.forEach(type=> {
		let option = document.createElement("option");
		option.text = type;
		typeDrop.add(option);
	});
	// Makes the gradeChanged() function get called whenever the typedrop is changed
	typeDrop.onchange = function() {gradeChanged(temp)};
	// adds the type dropdownn to  the semester.
	border.querySelector(".types").appendChild(typeDrop);
	
	// creates a button element for the delete button
	let delBtn = document.createElement("button");
	// makes the button have an x in the middle
	delBtn.textContent = "X";
	
	// Sets the id of the delete button to be unique, telling the position of the button so it can be accessed later in the code
	delBtn.id = "delete" + curSem + index;
	
	// makes the remove() function be called when the button is clicked
	delBtn.onclick = function() {remove(curSem, index)};
	// adds the delete button to the semester
	border.querySelector(".deletes").appendChild(delBtn);
	// changes the height of the add semester button since adding a course affects its location
	document.getElementById("addSemBtn").style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
}

// This is a function that will remove a give course based on the semester number and index of the course.
function remove(semNum, index) {
	// First, the function removes the course at the given index
	document.getElementById("grade" + semNum + index).remove();
	document.getElementById("course" + semNum + index).remove();
	document.getElementById("type" + semNum + index).remove();
	document.getElementById("delete" + semNum + index).remove();
	// Changes the semInfo array accordingly and delete the course information
	semInfo[semNum].splice(Number(index)+3, 1)
	
	// Loops through each course below the removed course in the semester
	while (index < numOfCoursesPerSem[semNum] - 1) {
		// changes the id of the course to be correct for its new position.
		// the index is now 1 less than before since the button above it has been removed
		index++;
		let i = index-1;
		let curSem = semNum;
		let x = document.getElementById("delete" + curSem + index);
		document.getElementById("grade" + curSem + index).id = "grade" + curSem + i;
		document.getElementById("course" + curSem + index).id = "course" + curSem + i;
		document.getElementById("type" + curSem + index).id = "type" + curSem + i;
		x.id = "delete" + curSem + i;
		// Changes the index that must be removed when the delete button is pressed
		x.onclick = function() {remove(curSem, i)};
	}
	// change the number of courses accordingly (-1)
	numOfCoursesPerSem[semNum]--;
	
	numOfCourses--;
	// Makes the semester number a number rather than a string so that string concatentation does not occur
	semNum = Number(semNum);
	// gets the semester container for the semester below
	let border = document.getElementById("calculator" + (semNum + 1));
	
	// lowers the height of the below semester
	borderHeights[semNum + 1] -= lineHeight;
	border.style.height = `${borderHeights[semNum + 1]}px`;
	document.getElementById("addSemBtn").style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
	// Loops through all the other below semesters and lowers their heights
	for (var i = semNum + 2; i <= semCount; i++) {
		let curBorder = document.getElementById("calculator" + i);
		semHeights[i] -= lineHeight;
		curBorder.style.top = `${semHeights[i]}px`;
	}
	// refreshes the gpa trough the calculate function
	calculate();
}

// This function calculates the users gpa forall the semesters added, and displays it on the web page
function calculate() {
	// initializes the grade point and course weight vars
	let totalGradePoint = 0;
	let totalCourseWeight = 0;
	// This var stores the number of blank courses that the user did not put anything in, allowing for these couses to be ignored in calculations.
	let numBlanks = 0;
	curNumBlanks = 0;
	// Loops through every semester
	for (let i = 0; i < numOfCoursesPerSem.length; i++) {
		// initializes local variables for the calculation
		let semGradePoint = 0;
		let semCourseWeight = 0;
		let semBlanks = 0;
		// Loops through every course in every semester
		for (let j = 0; j < numOfCoursesPerSem[i]; j++) {
			// gets the grade, type, and course name for each course
			grade = document.getElementById("grade" + i + j).value;
			type = document.getElementById("type" + i + j).value;
			courseName = document.getElementById("course" + i + j).value;
			
			// makes the number of blanks 1 if the course name is blank
			if (courseName ==  "") {
				curNumBlanks = 1;
			}
			// sets the semInfo for the course according to the current values
			semInfo[i][j + 3][0] = courseName;
			semInfo[i][j + 3][1] = grade;
			semInfo[i][j + 3][2] = type;
			
			// this switch statement convers the grade to a grade point, following a standard grade to grade point conversion table
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
				// if the grade is blank, the number of blanks is incremented
				semBlanks++;
				break;
			}
			// Makes sure the grade isn't blank before adding to the semester's course weight
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
				}
			}
		}
		
		
		// calculates the unweighted gpa and stores it in the semUWGrades array (rounds to 2 places)
		semUWGrades[i] = (semGradePoint / (numOfCoursesPerSem[i] - semBlanks)).toFixed(2);
		// calculates the weighted gpa and stores it in the semWGrades array (rounds to 2 places)
		semWGrades[i] = ((semGradePoint + semCourseWeight) / (numOfCoursesPerSem[i] - semBlanks)).toFixed(2);
		// increases the total grade point, course weight, numblanks, and curNumBlanks for the cumulative gpa
		totalGradePoint += semGradePoint;
		totalCourseWeight += semCourseWeight;
		numBlanks += semBlanks;
		curNumBlanks += numBlanks;
		// Instead of having the gpa as undefined, this if makes it 0.00
		if (!(semUWGrades[i] >= 0)) {
			semUWGrades[i] = "0.00";
			semWGrades[i] = "0.00";
		}
		// hanges the semInfo based on the new calculation
		semInfo[i][1] = semUWGrades[i];
		semInfo[i][2] = semWGrades[i];
	}
	// calculates the unweighted and weighted gpa (cumulative)
	let unweightedGpa = (totalGradePoint / (numOfCourses - numBlanks)).toFixed(2);
	let weightedGpa =  ((totalGradePoint + totalCourseWeight) / (numOfCourses - numBlanks)).toFixed(2);
	// Instead of having the gpa as undefined, this if makes it 0.00
	if (!(unweightedGpa >= 0)) {
		unweightedGpa = "0.00";
		weightedGpa = "0.00";
	}
	// Loops through every semester
	for (let i = 0; i < semUWGrades.length; i++) {
		// gets the current semester text
		let semGpa = document.getElementById("semester" + i);
		// checks if the current semester text is there
		if (semGpa == null) {
			// if not, a new h2 element is created with the correct textcontent/innerHTML
			let semGpas = document.createElement("h2");
			if (semNames[i] != "") {
				semGpas.innerHTML = "<pre>" + semNames[i] + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
			} else {
				semGpas.innerHTML = "<pre>Semester " + (i+1) + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
			}
			// makes the id based on the semester it represents
			semGpas.id = "semester" + i;
			// Adds the h2 element to the semesterGrades div
			let semGrades = document.getElementById("semesterGrades");
			semGrades.appendChild(semGpas);
			semTextCount++;
		} else {
			// changes the innerHTML of the existing semester text
			if (semNames[i] != "") {
				semGpa.innerHTML = "<pre>" + semNames[i] + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
			} else {
				semGpa.innerHTML = "<pre>Semester " + (i+1) + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
			}
		}
	}
	
	// changes the cumulative weighted & unweighted GPA displayed based on the new calculations
	document.getElementById("unweightedGpa").textContent = "Cumulative Unweighted GPA: " + unweightedGpa;
	document.getElementById("weightedGpa").textContent = "Cumulative Weighted GPA: " + weightedGpa;
	
	cumulativeUnweightedGpa = unweightedGpa;
	cumulativeWeightedGpa = weightedGpa;
}
// This function saves the current information to the four year plan
function save() {
	// refreshes the GPAs by calling calculate()
	calculate();
	let error = "";
	let good = true;
	// These next few lines check whether the inputted information by the is valid
	// This for loop loops through every semester and checks if there are 7 courses added
	for (let i = 0; i < semInfo.length; i++) {
		if (semInfo[i].length != 10) {
			good = false;
			error = ("Not Correct Length");
		}
	}
	
	// This if statement checks whether there are more than 8 semester (the limit)
	
	if (semInfo.length > 8) {
		good = false;
		error = ("Too Many Semesters");
	}
	// This if statement checks whether there are any blanks in the inputs
	if (curNumBlanks != 0) {
		good = false;
		error = ("Some Information Has Been Left Blank")
	}
	
	// This loop checks whether there are duplicate semesters or if there is no semester selected
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
	// if any of the requirements are not met, the data is saved for use in the 4 year plan
	if (good) {
		const courseData = {
			"identifier" : "123325",
			"cumulativeWeightedGpa": cumulativeWeightedGpa,
			"cumulativeUnweightedGpa": cumulativeUnweightedGpa,
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
	// if the data is successfully saved, then a popup message appears to tell the user that it saved.
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
} else {
	
	// If not successfully saved, a popup message appears, telling the user that it did not save and why
	
	let popUp = document.getElementById("popUp")
	let message = popUp.querySelector(".message");
	
	message.textContent = "DID NOT SAVE: " + error;
	
	popUp.appendChild(message);
	popUp.style.opacity = 100;
	
	// Removes class
	popUp.classList.remove("popUp");
	
	// Force a reflow
	void popUp.offsetWidth;
	
	// Reapply the class to restart the animation
	popUp.classList.add("popUp");
	popUp.style.opacity = 0;
}

}

// Adds a semester to the list
function addSemester() {
	// increments the semester count
	// changes the arrays accordingly
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
	
	// Clones the template calculator and changes the id
	let clone = template.cloneNode(true);
	clone.id = "calculator" + semCount;
	
	// Changes the delete semester button's onclick function
	let deleteSemesterBtn = clone.querySelector(".deleteSemesterBtn");
	deleteSemesterBtn.onclick = function() {deleteSemester(curSem)}
	
	// changes the visibility of the clone and changes the onclick function of the addcourse
	clone.style.visibility = `visible`;
	let addCourseBtn = clone.querySelector(".addCourseBtn");
	let curSem = semCount;
	addCourseBtn.onclick = function() {addCourse(curSem)};
	
	// changes the borderHeight and semHeights arrays accordingly
	borderHeights.push(160);
	semHeights.push(semHeights[semCount-1] + borderHeights[semCount-1] + 130);
	clone.style.top = `${semHeights[semCount]}px`;
	// moves the add semester button with an animation
	let addSemBtn = document.getElementById("addSemBtn");
	addSemBtn.style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
	if (semCount > 1) {
		addSemBtn.classList.add('semBtnMove');
		
		// Remove the class after the animation is done (adjust the timeout according to your animation duration)
		setTimeout(function() {
			addSemBtn.classList.remove('semBtnMove');
		}, 1000);
		
	}
	
	// Append the cloned element to the tables container
	document.getElementById("tables").appendChild(clone);
	
	
	// adds two courses to the semester by default
	addCourse(semCount);
	addCourse(semCount);
}

// This function is called whenever the semester name is changed by the user
// it changes the semester text/gpa based on the new semester name
function semNameChange() {
	// loops through every semester grade
	for (let i = 0; i < semUWGrades.length; i++) {
		// gets the new semester name
		semNames[i] = document.getElementById("calculator" + (i+1)).querySelector(".semName").value;
		// checks if the semester name is not blank and isn't over the semester text count
		if (semNames[i] != "" && i < semTextCount) {
			// if the name meets these requirements, then the semester text is changed based on the new semester name
			let semGpa = document.getElementById("semester" + (i));
			semGpa.innerHTML = "<pre>" + semNames[i] + "\n     Unweighted: " + semUWGrades[i] + "\n     Weighted: " + semWGrades[i] + "</pre>";
		}
		semInfo[i][0] = semNames[i];
	}
	
}

// This function is called by a dropdown and removes the blank value in a dropdown if a value is chosen
// making sure that the user can't click on the blank value after choosing an option
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

// This function deletes the semester of index semNum
function deleteSemester(semNum) {
	// The semester container is removed first and the semester count is decremented
	document.getElementById("calculator" + semNum).remove();
	semCount--;
	
	// the number of courses variables are all modified according to the deletion
	// of the semester. Also, the gpas and grades are modified accordingly as well.
	numOfCourses -= numOfCoursesPerSem[semNum-1];
	
	numOfCoursesPerSem.splice(semNum-1, 1);
	semUWGrades.splice(semNum-1, 1);
	semWGrades.splice(semNum-1, 1);
	semNames.splice(semNum-1, 1);
	semInfo.splice(semNum-1, 1);
	
	
	let addSemBtn = document.getElementById("addSemBtn");
	
	borderHeights.splice(semNum, 1);
	semHeights.splice(semNum, 1);
	// loops through all the semesters
	for (var i = semNum; i < semHeights.length; i++) {
		// changes the semester height and id
		semHeights[i] = semHeights[i-1] + borderHeights[i-1] + 130;
		let calc = document.getElementById("calculator" + (i + 1))
		calc.style.top = `${semHeights[i]}px`;
		calc.id = "calculator" + i;
		// loops through all the courses in the semester
		for (var j = 0; j < numOfCoursesPerSem[i-1]; j++) {
			// modifies the ids of all the grades, types, course names, and delete buttons
			// modifies the onclick function of the delete buttons as well
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
		
		// changes the onclick function for the addcourse button
		let addCourseBtn = calc.querySelector(".addCourseBtn");
		let curSem = i;
		addCourseBtn.onclick = function() {addCourse(curSem)};
		
		// changes the onclick function for the delete semester button
		let deleteSemesterBtn = calc.querySelector(".deleteSemesterBtn");
		deleteSemesterBtn.onclick = function() {deleteSemester(curSem)}
	}
	// removes the semester gpa text and refreshes the gpas by calling the calculate function
	// decrements the semester text count
	let semText = document.getElementById("semester" + (semCount));
	console.log(semCount);
	if (semText != null) {
		semText.remove();
		calculate();
		semTextCount--;
	}
	// changes the height of the add semester button
	addSemBtn.style.top = `${semHeights[semCount] + borderHeights[semCount] + 115}px`;
}
