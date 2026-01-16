/**
 * SkyLynx Travel - Flight Search Handler
 * Handles the flight search form submission and redirects to results page
 */

document.addEventListener('DOMContentLoaded', function() {
    const flightForm = document.getElementById('flights-form');
    
    if (!flightForm) {
        console.warn('Flight form not found');
        return;
    }

    // Override the form submission
    flightForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const searchBtn = flightForm.querySelector('button[type="submit"]');
        const originalText = searchBtn ? searchBtn.innerHTML : '';
        if (searchBtn) {
            searchBtn.disabled = true;
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        }

        try {
            // Get form data
            const origin = document.getElementById('flight-from').value.trim();
            const destination = document.getElementById('flight-to').value.trim();
            const departureDate = document.getElementById('flight-departure').value;
            const returnDate = document.getElementById('flight-return').value;
            const tripType = document.querySelector('input[name="tripType"]:checked').value;
            const adults = parseInt(document.getElementById('adult-count').textContent) || 1;
            const children = parseInt(document.getElementById('children-count').textContent) || 0;
            const infants = parseInt(document.getElementById('infants-count').textContent) || 0;
            const travelClass = document.getElementById('travel-class').value.toLowerCase();

            // Extract IATA codes if format is "CODE - City"
            const originCode = extractIATACode(origin);
            const destinationCode = extractIATACode(destination);

            // Validate
            if (!originCode || !destinationCode || !departureDate) {
                alert('Please fill in all required fields');
                if (searchBtn) {
                    searchBtn.disabled = false;
                    searchBtn.innerHTML = originalText;
                }
                return;
            }

            // Prepare search params
            const searchParams = {
                origin: originCode,
                destination: destinationCode,
                departureDate: departureDate,
                returnDate: tripType === 'roundtrip' ? returnDate : null,
                adults: adults,
                children: children,
                infants: infants,
                cabinClass: travelClass
            };

            console.log('🔍 Searching with params:', searchParams);

            // Call API
            const result = await searchFlights(searchParams);

            if (result.success && result.offers && result.offers.length > 0) {
                // Store results in sessionStorage
                sessionStorage.setItem('flightSearchResults', JSON.stringify(result));
                sessionStorage.setItem('flightSearchParams', JSON.stringify(searchParams));
                
                // Redirect to results page
                window.location.href = '/flight-results.html';
            } else {
                alert('No flights found for your search. Please try different dates or destinations.');
                if (searchBtn) {
                    searchBtn.disabled = false;
                    searchBtn.innerHTML = originalText;
                }
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Error searching flights. Please try again. Make sure the backend server is running.');
            if (searchBtn) {
                searchBtn.disabled = false;
                searchBtn.innerHTML = originalText;
            }
        }
    });
});

// Helper function to extract IATA code from input
function extractIATACode(input) {
    if (!input) return '';
    
    // If format is "YOW - Ottawa" extract "YOW"
    const match = input.match(/^([A-Z]{3})/);
    if (match) return match[1];
    
    // If it's just the code
    if (/^[A-Z]{3}$/.test(input.toUpperCase())) {
        return input.toUpperCase();
    }
    
    return input.toUpperCase().substring(0, 3);
}
