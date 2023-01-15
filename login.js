    let users = {};
    if(localStorage.getItem("users")){
    users = JSON.parse(localStorage.getItem("users"));
    }

    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Sign up successful!");
    });

    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(users[email] === password){
        alert('You are logged in')
    } else {
        alert('Invalid email or password !')
    }
    });