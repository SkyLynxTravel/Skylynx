/**
 * SkyLynx Travel - Duffel API Integration
 * This file handles all communication with the backend API
 */

const DUFFEL_API_BASE_URL = 'https://skylynxtravel.com/api';

// Utility function to format dates
function formatDate(date) {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Search for flights using Duffel API
async function searchFlights(searchParams) {
    try {
        const {
            origin,
            destination,
            departureDate,
            returnDate,
            adults = 1,
            children = 0,
            infants = 0,
            cabinClass = 'economy'
        } = searchParams;

        // Validate required fields
        if (!origin || !destination || !departureDate) {
            throw new Error('Missing required fields: origin, destination, or departureDate');
        }

        // Prepare request body
        const requestBody = {
            origin: origin.toUpperCase(),
            destination: destination.toUpperCase(),
            departureDate: formatDate(departureDate),
            returnDate: returnDate ? formatDate(returnDate) : null,
            adults: parseInt(adults),
            children: parseInt(children),
            infants: parseInt(infants),
            cabinClass: cabinClass.toLowerCase()
        };

        console.log('🔍 Searching flights with params:', requestBody);

        // Call backend API
        const response = await fetch(`${DUFFEL_API_BASE_URL}/flights/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to search flights');
        }

        const data = await response.json();
        console.log('✅ Flight search successful:', data);
        
        return data;
    } catch (error) {
        console.error('❌ Error searching flights:', error);
        throw error;
    }
}

// Get details of a specific offer
async function getOfferDetails(offerId) {
    try {
        const response = await fetch(`${DUFFEL_API_BASE_URL}/flights/offer/${offerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get offer details');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('❌ Error getting offer details:', error);
        throw error;
    }
}

// Format flight duration (in ISO 8601 duration format)
function formatDuration(isoDuration) {
    if (!isoDuration) return 'N/A';
    
    // Parse ISO 8601 duration (e.g., "PT2H30M")
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return isoDuration;
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    
    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;
    return 'N/A';
}

// Format price
function formatPrice(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format date and time
function formatDateTime(isoString) {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        searchFlights,
        getOfferDetails,
        formatDuration,
        formatPrice,
        formatDateTime
    };
}
