
// Set the current year in the footer
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

// Get the membership application form
const applicationForm = document.querySelector(".join-form");

// Get the hidden timestamp field
const timestampField = document.querySelector("#timestamp");

// Set the date and time when the page loads
timestampField.value = new Date().toISOString();

// Update the date and time immediately before submission
applicationForm.addEventListener("submit", function () {
    timestampField.value = new Date().toISOString();
});
