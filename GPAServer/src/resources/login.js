// Remove the 'popUp' class from the element with the id 'popUp'
document.getElementById("popUp").classList.remove("popUp");

// Add an event listener for the form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form inputs
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Create an object with the username and password
    var data = {
        username: username,
        password: password
    };

    // Make a POST request to the login endpoint
    fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Login successful');
                // Redirect to the GPA calculator page
                window.location.href = 'http://localhost:8082/resources?gpacalc.html';
            } else {
                console.error('Login failed');
                // Handle login failure by displaying a pop-up message
                let popUp = document.getElementById("popUp");
                let message = popUp.querySelector(".message");
                
                // Set the message content
                message.textContent = "Credentials Do Not Match";
                popUp.appendChild(message);
                popUp.style.opacity = 100;
                
                // Remove and reapply the 'popUp' class to restart the animation
                popUp.classList.remove("popUp");
                
                // Force a reflow to restart the animation
                void popUp.offsetWidth;
                
                // Reapply the 'popUp' class
                popUp.classList.add("popUp");
                popUp.style.opacity = 0;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Get elements for toggling between register and login forms
const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.login-link');
const loginLink = document.querySelector('.register-link'); 

// Add event listener for toggling between register and login forms
registerLink.addEventListener("click", () => {
    console.log('Register link clicked'); // Check if this log appears in the console
    wrapper.classList.remove('active');
});
