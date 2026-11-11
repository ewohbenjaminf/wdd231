
// Retrieve submitted form information from the URL
const params = new URLSearchParams(window.location.search);

// Display the submitted information safely
document.querySelector("#first-name").textContent =
    params.get("firstName") || "Not provided";

document.querySelector("#last-name").textContent =
    params.get("lastName") || "Not provided";

document.querySelector("#organizational-title").textContent =
    params.get("organizationalTitle") || "Not provided";

document.querySelector("#email").textContent =
    params.get("email") || "Not provided";

document.querySelector("#phone").textContent =
    params.get("phone") || "Not provided";

document.querySelector("#organization").textContent =
    params.get("organization") || "Not provided";

document.querySelector("#description").textContent =
    params.get("description") || "Not provided";

document.querySelector("#membership").textContent =
    params.get("membership") || "Not provided";

// Display the application date and time
const submittedDate = params.get("timestamp");

document.querySelector("#timestamp").textContent = submittedDate
    ? new Date(submittedDate).toLocaleString()
    : "Not available";

// Update the footer year
document.querySelector("#current-year").textContent =
    new Date().getFullYear();
