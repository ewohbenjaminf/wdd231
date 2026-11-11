
/* W03 Chamber Home Page JavaScript */

// Port Harcourt, Rivers State, Nigeria
const WEATHER_LOCATION = {
    latitude: 4.8156,
    longitude: 7.0498
};

// Replace with your personal OpenWeatherMap API key.
const API_KEY = "de7eca77ca598c592afaedec169e9732";

// HTML elements
const spotlightContainer = document.querySelector("#spotlight-container");
const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast-container");

// Footer information
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Load company spotlights
async function loadSpotlights() {
    try {
        const response = await fetch("members.json");

        if (!response.ok) {
            throw new Error("Unable to load chamber members.");
        }

        const data = await response.json();

        // Select only Gold and Silver members.
        const eligibleMembers = data.members.filter((member) =>
            ["gold", "silver"].includes(
                member.membershipLevel.toLowerCase()
            )
        );

        // Randomly shuffle eligible members.
        const shuffledMembers = eligibleMembers.sort(
            () => Math.random() - 0.5
        );

        // Display two or three members, depending on availability.
        const selectedMembers = shuffledMembers.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach((member) => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const image = document.createElement("img");
            image.src = `../${member.image}`;
            image.alt = `${member.name} company logo`;
            image.loading = "lazy";

            const heading = document.createElement("h3");
            heading.textContent = member.name;

            const membership = document.createElement("p");
            membership.classList.add("membership-level");
            membership.textContent =
                `${member.membershipLevel} Member`;

            const address = document.createElement("p");
            address.textContent = `Address: ${member.address}`;

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${member.phone}`;

            const website = document.createElement("a");
            website.href = member.website;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";

            card.append(
                image,
                heading,
                membership,
                phone,
                address,
                website
            );

            spotlightContainer.appendChild(card);
        });

        if (selectedMembers.length < 2) {
            spotlightContainer.textContent =
                "Not enough Gold or Silver members available.";
        }

    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightContainer.textContent =
            "Company spotlights are currently unavailable.";
    }
}

// Load current weather and three-day forecast.
async function loadWeather() {
    try {
        if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
            throw new Error("Please add your OpenWeatherMap API key.");
        }

        const { latitude, longitude } = WEATHER_LOCATION;

        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentURL),
                fetch(forecastURL)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather information.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        // Display current temperature and description.
        const temperature = Math.round(currentData.main.temp);
        const description =
            currentData.weather[0].description;

        const icon = currentData.weather[0].icon;

        currentWeather.innerHTML = `
            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="80"
                height="80"
            >
            <div>
                <p class="current-temperature">${temperature}°C</p>
                <p>${description}</p>
            </div>
        `;

        // Select one forecast for each of the next three days.
        const today = new Date();

        const dailyForecasts = [];

        for (let day = 1; day <= 3; day++) {
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + day);

            const dateString = targetDate.toLocaleDateString(
                "en-CA",
                { timeZone: "Africa/Lagos" }
            );

            const dayForecasts = forecastData.list.filter(
                (item) => {
                    const forecastDate = new Date(item.dt * 1000);

                    const forecastDateString =
                        forecastDate.toLocaleDateString(
                            "en-CA",
                            { timeZone: "Africa/Lagos" }
                        );

                    return forecastDateString === dateString;
                }
            );

            if (dayForecasts.length > 0) {
                // Choose the forecast closest to midday.
                const middayForecast = dayForecasts.reduce(
                    (closest, item) => {
                        const itemHour = new Date(
                            item.dt * 1000
                        ).getUTCHours();

                        const closestHour = new Date(
                            closest.dt * 1000
                        ).getUTCHours();

                        return Math.abs(itemHour - 11) <
                            Math.abs(closestHour - 11)
                            ? item
                            : closest;
                    }
                );

                dailyForecasts.push(middayForecast);
            }
        }

        forecastContainer.innerHTML = "";

        dailyForecasts.forEach((day) => {
            const date = new Date(day.dt * 1000);

            const dayName = date.toLocaleDateString(
                "en-NG",
                {
                    weekday: "short",
                    timeZone: "Africa/Lagos"
                }
            );

            const dayTemperature = Math.round(day.main.temp);
            const dayDescription = day.weather[0].description;
            const dayIcon = day.weather[0].icon;

            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-day");

            forecastCard.innerHTML = `
                <h3>${dayName}</h3>
                <img
                    src="https://openweathermap.org/img/wn/${dayIcon}.png"
                    alt="${dayDescription}"
                    width="45"
                    height="45"
                >
                <p>${dayTemperature}°C</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });

        if (dailyForecasts.length < 3) {
            forecastContainer.insertAdjacentHTML(
                "beforeend",
                "<p>Some forecast information is unavailable.</p>"
            );
        }

    } catch (error) {
        console.error("Weather error:", error);

        currentWeather.textContent =
            "Weather information is temporarily unavailable.";

        forecastContainer.textContent =
            "Three-day forecast unavailable.";
    }
}

// Run both features when the page loads.
loadSpotlights();
loadWeather();

