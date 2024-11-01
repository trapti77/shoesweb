async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);
      window.location.href = "/admin/dashboard.html"; // Redirect to the dashboard
    } else {
      document.getElementById("error-message").textContent = data.message;
    }
  } catch (error) {
    document.getElementById("error-message").textContent =
      "Error: Unable to login.";
  }
}
