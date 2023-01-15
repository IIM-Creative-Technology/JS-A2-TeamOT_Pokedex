    let users = {};
    if(localStorage.getItem("users")){
    users = JSON.parse(localStorage.getItem("users"));
    }

    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    users[email] = {username:username,password:password};
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Sign up successful!");
    });


    
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(users[email] && users[email].username === username && users[email].password === password){
        console.log("Logged in successfully!");
    } else {
        console.log("Invalid username, email or password!");
    }
});