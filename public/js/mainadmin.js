// Check if the admin is logged in (JWT token exists)
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/mainpage"; // Redirect to login if token is missing
  }
}

// Function to fetch and display all users
async function getAllUsers() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:1500/registers", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    const data = await response.json();

    if (response.ok) {
      let usersHTML = "<h2>All Users</h2><ul>";
      data.forEach((user) => {
        usersHTML += `<li>${user.username} - Role: ${user.role}</li>`;
      });
      usersHTML += "</ul>";
      document.getElementById("users-list").innerHTML = usersHTML;
    } else {
      document.getElementById(
        "users-list"
      ).innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    document.getElementById("users-list").innerHTML =
      "<p>Error: Unable to fetch users.</p>";
  }
}

// Function to log out
function logout() {
  localStorage.removeItem("token"); // Remove JWT token
  window.location.href = "/adminpage"; // Redirect to login page
}

// Run checkAuth on page load
checkAuth();
