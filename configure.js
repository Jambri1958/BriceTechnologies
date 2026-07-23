/**
 * Configure Page JavaScript
 * Handles search functionality and filter interactions
 */

const API_BASE_URL = 'https://bricetech.com/api'; // Update to your backend API URL

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    console.log("Configure page loaded successfully.");
});

/**
 * Setup event listeners for search and filters
 */
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Search button click
    searchBtn.addEventListener('click', performSearch);

    // Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Perform search via backend API
 */
async function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a search query');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error('Search error:', error);
        displayErrorMessage('Failed to perform search. Please try again.');
    }
}

/**
 * Display search results
 * @param {Array} results - Array of result objects
 */
function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsList = document.getElementById('resultsList');

    // Clear previous results
    resultsList.innerHTML = '';

    if (!results || results.length === 0) {
        resultsList.innerHTML = '<div class="no-results">No results found. Try a different search.</div>';
    } else {
        results.forEach(result => {
            const resultItem = createResultElement(result);
            resultsList.appendChild(resultItem);
        });
    }

    // Show results container
    resultsContainer.classList.remove('hidden');
}

/**
 * Create a result element
 * @param {Object} result - Result object
 * @returns {HTMLElement} Result item element
 */
function createResultElement(result) {
    const div = document.createElement('div');
    div.className = 'result-item';

    let detailsHTML = '';
    if (result.specs) {
        detailsHTML = Object.entries(result.specs)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br>');
    }

    div.innerHTML = `
        <div class="result-item-name">${result.name || 'Unknown System'}</div>
        ${detailsHTML ? `<div class="result-item-details">${detailsHTML}</div>` : ''}
    `;

    return div;
}

/**
 * Display error message
 * @param {string} message - Error message
 */
function displayErrorMessage(message) {
    const resultsList = document.getElementById('resultsList');
    const resultsContainer = document.getElementById('resultsContainer');

    resultsList.innerHTML = `<div class="no-results">${message}</div>`;
    resultsContainer.classList.remove('hidden');
}