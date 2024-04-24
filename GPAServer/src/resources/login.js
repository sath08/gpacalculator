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
                // Handle login failure
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.login-link');
const loginLink = document.querySelector('.register-link'); 


registerLink.addEventListener("click", () => {
    console.log('Register link clicked'); // Check if this log appears in the console
    wrapper.classList.remove('active');
});