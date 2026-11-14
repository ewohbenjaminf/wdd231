const directoryContainer = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business members.");
        }

        const data = await response.json();

        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading members:", error);
        directoryContainer.innerHTML =
            "<p>Business directory is currently unavailable.</p>";
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = "";
    document.querySelector("#directory-status").textContent = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <p>Membership: ${
    member.membershipLevel === 3
        ? "Gold"
        : member.membershipLevel === 2
        ? "Silver"
        : "Member"
}</p>
        `;

        directoryContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    directoryContainer.classList.add("directory-grid");
    directoryContainer.classList.remove("directory-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
    directoryContainer.classList.add("directory-list");
    directoryContainer.classList.remove("directory-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    `Last Modified: ${document.lastModified}`;

getMembers();