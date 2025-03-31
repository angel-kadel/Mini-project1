// JavaScript for the Frameworks page
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the button and data container
    const loadButton = document.getElementById('loadFrameworks');
    const frameworksContainer = document.getElementById('frameworksData');

    // Add click event listener to the button
    loadButton.addEventListener('click', getFrameworksData);

    // The URL for accessing the JSON data from Express:
    const apiURL = '/api/frameworks';

    // Async function to fetch and display frameworks data
    async function getFrameworksData() {
            // Show loading message
            frameworksContainer.innerHTML = '<div class="loading-placeholder">Loading frameworks data...</div>';
            
        try {
            // Fetch data from our Express API endpoint using Async/Await
            const response = await fetch(apiURL);
            const frameworks = await response.json();
            
            // Clear the loading message
            frameworksContainer.innerHTML = '';
            
            // Loop through each framework and create HTML content
            for (const framework of frameworks) {
                const frameworkCard = document.createElement('div');
                frameworkCard.className = 'framework-card';
                
                // Build features list
                let featuresList = '';
                for (const feature of framework.features) {
                    featuresList += `<li>${feature}</li>`;
                }
                
                // Create HTML content for the framework card
                frameworkCard.innerHTML = `
                    <h3>${framework.name}</h3>
                    <p class="creator">Created by: ${framework.creator} (${framework.releaseYear})</p>
                    <p class="description">${framework.description}</p>
                    <div class="features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${featuresList}
                        </ul>
                </div>
                    <p><strong>Popularity:</strong> ${framework.popularity}</p>
                    <a href="${framework.website}" class="website" target="_blank">Official Website</a>
            `;
                
                // Add the card to the container
                frameworksContainer.appendChild(frameworkCard);
        }
            
            // Change button text after loading
            loadButton.textContent = 'Refresh Frameworks Data';
            
        } catch (error) {
            console.error('Error fetching frameworks data:', error);
            frameworksContainer.innerHTML = `
                <div class="loading-placeholder error">
                    <p>Failed to load frameworks data.</p>
                    <p>Please try again later.</p>
                </div>
            `;
        }
    }
    });
