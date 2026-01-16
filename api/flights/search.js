// Flight Search Endpoint
const { Duffel } = require('@duffel/api');

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

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
    } = req.body;

    // Validate required fields
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: origin, destination, departureDate'
      });
    }

    // Initialize Duffel client
    const duffel = new Duffel({
      token: process.env.DUFFEL_API_TOKEN,
    });

    // Create offer request
    const offerRequest = await duffel.offerRequests.create({
      slices: returnDate ? [
        {
          origin: origin,
          destination: destination,
          departure_date: departureDate,
        },
        {
          origin: destination,
          destination: origin,
          departure_date: returnDate,
        }
      ] : [
        {
          origin: origin,
          destination: destination,
          departure_date: departureDate,
        }
      ],
      passengers: [
        ...Array(adults).fill({ type: 'adult' }),
        ...Array(children).fill({ type: 'child' }),
        ...Array(infants).fill({ type: 'infant_without_seat' })
      ],
      cabin_class: cabinClass,
    });

    // Get offers
    const offers = await duffel.offers.list({
      offer_request_id: offerRequest.data.id,
      sort: 'total_amount',
    });

    res.status(200).json({
      success: true,
      requestId: offerRequest.data.id,
      offers: offers.data,
    });

  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
