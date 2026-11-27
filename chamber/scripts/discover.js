
import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");


function displayDiscoverItems(items) {
    discoverGrid.innerHTML = `
        ${items.map(item => `
            <article class="discover-card">
                <figure>
                    <img src="${item.image}"
                         alt="${item.imageAlt}"
                         loading="lazy"
                         width="400"
                         height="300">
                </figure>
                <div class="discover-card-content">
                    <h2>${item.name}</h2>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <a href="${item.link}" target="_blank"
                       rel="noopener noreferrer">View Location</a>
                </div>
            </article>
        `).join("")}
    `;
}

function displayVisitMessage() {
    const lastVisit = Number(localStorage.getItem("discoverLastVisit"));
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us help you discover Port Harcourt.";
    } else {
        const days = Math.floor(
            (currentVisit - lastVisit) / 86400000
        );

        if (days < 1) {
            visitMessage.textContent =
                "Back so soon! Great to see you again.";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem("discoverLastVisit", currentVisit);
}

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    `Last Modified: ${document.lastModified}`;

displayDiscoverItems(discoverItems);
displayVisitMessage();
