const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

signupForm.addEventListener("submit", event => {
event.preventDefault();

  // Get the form data
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

  // Save the form data to local storage
localStorage.setItem("email", email);
localStorage.setItem("password", password);

  // check if data is saved or not
const savedEmail = localStorage.getItem("email");
const savedPassword = localStorage.getItem("password");

if (savedEmail && savedPassword) {
    console.log("Sign up successful!");
}
});

loginForm.addEventListener("submit", event => {
event.preventDefault();

  // Get the form data
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

  // Get the data from local storage
const savedEmail = localStorage.getItem("email");
const savedPassword = localStorage.getItem("password");

  // Check if the email and password match
if (email === savedEmail && password === savedPassword) {
    console.log("Logged in successfully!");
} else {
    console.log("Invalid email or password!");
}
});