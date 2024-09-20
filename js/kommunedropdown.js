const urlKommuner = "https://api.dataforsyningen.dk/kommuner";

function fetchKommuner(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Fetch error:", error);
            return [];
        });
}

function actionFetch() {
    const ddKommuner = document.getElementById("ddKommuner");

    fetchKommuner(urlKommuner).then(kommuner => {
        // Clear existing options in case the button is clicked multiple times
        ddKommuner.innerHTML = "";

        // Create and append a default "Select a kommune" option
        const defaultOption = document.createElement("option");
        defaultOption.textContent = "Vælg en kommune";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        ddKommuner.appendChild(defaultOption);

        // Populate the dropdown with the kommuner
        kommuner.forEach(kommune => {
            const option = document.createElement("option");
            option.value = kommune.kode; // Set the value to kommune code
            option.textContent = kommune.navn; // Set the text to kommune name
            ddKommuner.appendChild(option); // Add the option to the dropdown
        });
    }).catch(error => {
        console.error("Error fetching kommuner:", error);
    });
}

// Add an event listener to the button to trigger the fetch when clicked
const pbFetchKommuner = document.getElementById("pbFetchKommuner");
pbFetchKommuner.addEventListener('click', actionFetch);
