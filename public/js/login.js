/* var a = document.getElementById("loginBtn");
        var b = document.getElementById("registerBtn");
        var x = document.getElementById("login");
        var y = document.getElementById("register");

        function login() {
            x.style.left = "4px";
            y.style.right = "-520px";
            a.className += " white-btn";
            b.className = "btn";
            x.style.opacity = -3;
            y.style.opacity = -3;
        }

        function register() {
            x.style.left = "-510px";
            y.style.right = "5px";
            a.className = "btn";
            b.className += " white-btn";
            x.style.opacity = 0;
            y.style.opacity = 1;
        }*/
/*var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
  x.style.left = "4px"; // Show the login form
  y.style.right = "-520px"; // Hide the register form
  a.classList.add("white-btn"); // Add white-btn class to login button
  b.classList.remove("white-btn"); // Remove white-btn class from register button
  x.style.opacity = 1; // Make the login form visible
  y.style.opacity = 0; // Hide the register form
}

function register() {
  x.style.left = "-510px"; // Hide the login form
  y.style.right = "5px"; // Show the register form
  a.classList.remove("white-btn"); // Remove white-btn class from login button
  b.classList.add("white-btn"); // Add white-btn class to register button
  x.style.opacity = 0; // Hide the login form
  y.style.opacity = 1; // Make the register form visible
}
*/
var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");

function login() {
  loginForm.style.left = "0";
  loginForm.style.opacity = "1";
  loginForm.style.visibility = "visible";
  registerForm.style.left = "50px";
  registerForm.style.opacity = "0";
  registerForm.style.visibility = "hidden";

  loginBtn.classList.add("white-btn");
  registerBtn.classList.remove("white-btn");
}

function register() {
  loginForm.style.left = "-50px";
  loginForm.style.opacity = "0";
  loginForm.style.visibility = "hidden";

  registerForm.style.left = "0";
  registerForm.style.opacity = "1";
  registerForm.style.visibility = "visible";

  loginBtn.classList.remove("white-btn");
  registerBtn.classList.add("white-btn");
}
