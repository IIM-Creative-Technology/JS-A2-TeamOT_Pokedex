
    let users = [];
    if(localStorage.getItem("users")){
    users = JSON.parse(localStorage.getItem("users"));
    }

    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    users.push({username:username,email:email,password:password});
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Sign up successful!");
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    });



    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].email)
        if(users[i].email == email && users[i].password == password){
            localStorage.setItem("currentUser", JSON.stringify(users[i]))
            window.location = "index.html"
        }else{
            i++
        }
    }
});