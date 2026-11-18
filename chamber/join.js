
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
// Membership dialog functionality
const membershipLinks = document.querySelectorAll(".membership-card a");

membershipLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const dialogId = link.getAttribute("href").replace("#", "") + "-dialog";
        const dialog = document.getElementById(dialogId);

        if (dialog) {
            dialog.showModal();
        }
    });
});

// Close membership dialogs
const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});