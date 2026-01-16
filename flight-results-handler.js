/**
 * SkyLynx Travel - Flight Results Handler
 * Displays flight search results from Duffel API
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get results from sessionStorage
    const resultsData = sessionStorage.getItem('flightSearchResults');
    const searchParams = sessionStorage.getItem('flightSearchParams');

    if (!resultsData) {
        showError('No search results found. Please search for flights first.');
        return;
    }

    try {
        const results = JSON.parse(resultsData);
        const params = JSON.parse(searchParams);
        
        displaySearchSummary(params);
        displayFlightResults(results.offers);
    } catch (error) {
        console.error('Error loading results:', error);
        showError('Error loading flight results. Please try searching again.');
    }
});

// Display search summary
function displaySearchSummary(params) {
    const summaryContainer = document.querySelector('.search-summary');
    if (!summaryContainer) return;

    const { origin, destination, departureDate, returnDate, adults, children, infants } = params;
    const totalPassengers = adults + children + infants;

    summaryContainer.innerHTML = `
        <div class="summary-item">
            <i class="fas fa-plane-departure"></i>
            <div>
                <div class="summary-label">Route</div>
                <div class="summary-value">${origin} → ${destination}</div>
            </div>
        </div>
        <div class="summary-item">
            <i class="fas fa-calendar"></i>
            <div>
                <div class="summary-label">Dates</div>
                <div class="summary-value">${formatDisplayDate(departureDate)}${returnDate ? ' - ' + formatDisplayDate(returnDate) : ''}</div>
            </div>
        </div>
        <div class="summary-item">
            <i class="fas fa-users"></i>
            <div>
                <div class="summary-label">Passengers</div>
                <div class="summary-value">${totalPassengers} ${totalPassengers === 1 ? 'Passenger' : 'Passengers'}</div>
            </div>
        </div>
    `;
}

// Display flight results
function displayFlightResults(offers) {
    const resultsContainer = document.querySelector('.results-list') || document.getElementById('results-list');
    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    if (!offers || offers.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No flights found</div>';
        return;
    }

    resultsContainer.innerHTML = offers.map(offer => createFlightCard(offer)).join('');
}

// Create flight card HTML
function createFlightCard(offer) {
    const { id, slices, total_amount, total_currency, owner } = offer;
    
    // Get first slice (outbound flight)
    const outbound = slices[0];
    const segments = outbound.segments;
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    
    // Calculate stops
    const stops = segments.length - 1;
    const stopsText = stops === 0 ? 'Direct' : `${stops} ${stops === 1 ? 'Stop' : 'Stops'}`;
    
    // Format times
    const departureTime = formatTime(firstSegment.departing_at);
    const arrivalTime = formatTime(lastSegment.arriving_at);
    const duration = formatDuration(outbound.duration);
    
    // Airline info
    const airline = owner.name;
    const airlineLogo = owner.logo_symbol_url || 'https://via.placeholder.com/50';
    
    return `
        <div class="flight-card" data-offer-id="${id}">
            <div class="flight-header">
                <div class="airline-info">
                    <img src="${airlineLogo}" alt="${airline}" class="airline-logo" onerror="this.src='https://via.placeholder.com/50'">
                    <div>
                        <div class="airline-name">${airline}</div>
                        <div class="flight-type">${stopsText}</div>
                    </div>
                </div>
                <div class="flight-price">
                    <div class="price-amount">${formatPrice(total_amount, total_currency)}</div>
                    <div class="price-label">per person</div>
                </div>
            </div>
            
            <div class="flight-details">
                <div class="flight-time">
                    <div class="time-large">${departureTime}</div>
                    <div class="airport-code">${firstSegment.origin.iata_code}</div>
                    <div class="city-name">${firstSegment.origin.city_name || firstSegment.origin.name}</div>
                </div>
                
                <div class="flight-journey">
                    <div class="duration">${duration}</div>
                    <div class="journey-line">
                        <div class="journey-dot"></div>
                        <div class="journey-path"></div>
                        <div class="journey-dot"></div>
                    </div>
                    <div class="stops-info">${stopsText}</div>
                </div>
                
                <div class="flight-time">
                    <div class="time-large">${arrivalTime}</div>
                    <div class="airport-code">${lastSegment.destination.iata_code}</div>
                    <div class="city-name">${lastSegment.destination.city_name || lastSegment.destination.name}</div>
                </div>
            </div>
            
            ${slices.length > 1 ? createReturnFlightHTML(slices[1]) : ''}
            
            <div class="flight-actions">
                <button class="btn-details" onclick="showFlightDetails('${id}')">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="btn-select" onclick="selectFlight('${id}')">
                    <i class="fas fa-check-circle"></i> Select Flight
                </button>
            </div>
        </div>
    `;
}

// Create return flight HTML
function createReturnFlightHTML(returnSlice) {
    const segments = returnSlice.segments;
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];
    const stops = segments.length - 1;
    const stopsText = stops === 0 ? 'Direct' : `${stops} ${stops === 1 ? 'Stop' : 'Stops'}`;
    
    return `
        <div class="return-flight">
            <div class="return-label">
                <i class="fas fa-plane-arrival"></i> Return Flight
            </div>
            <div class="flight-details">
                <div class="flight-time">
                    <div class="time-large">${formatTime(firstSegment.departing_at)}</div>
                    <div class="airport-code">${firstSegment.origin.iata_code}</div>
                </div>
                
                <div class="flight-journey">
                    <div class="duration">${formatDuration(returnSlice.duration)}</div>
                    <div class="journey-line">
                        <div class="journey-dot"></div>
                        <div class="journey-path"></div>
                        <div class="journey-dot"></div>
                    </div>
                    <div class="stops-info">${stopsText}</div>
                </div>
                
                <div class="flight-time">
                    <div class="time-large">${formatTime(lastSegment.arriving_at)}</div>
                    <div class="airport-code">${lastSegment.destination.iata_code}</div>
                </div>
            </div>
        </div>
    `;
}

// Show error message
function showError(message) {
    const resultsContainer = document.querySelector('.results-list') || document.getElementById('results-list');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="window.location.href='/'">Back to Home</button>
            </div>
        `;
    }
}

// Format time from ISO string
function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// Format display date
function formatDisplayDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Format duration (from duffel-api.js)
function formatDuration(isoDuration) {
    if (!isoDuration) return 'N/A';
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return isoDuration;
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;
    return 'N/A';
}

// Format price (from duffel-api.js)
function formatPrice(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Show flight details (placeholder)
function showFlightDetails(offerId) {
    alert(`Flight details for offer: ${offerId}\n\nThis feature will show detailed information about stops, baggage, and amenities.`);
}

// Select flight (placeholder)
function selectFlight(offerId) {
    alert(`Selected flight: ${offerId}\n\nThis will proceed to passenger information and payment.`);
    // TODO: Implement booking flow
}
