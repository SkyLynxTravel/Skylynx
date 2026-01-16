const { Duffel } = require('@duffel/api');
require('dotenv').config();

// Initialize Duffel client
const duffel = new Duffel({
  token: process.env.DUFFEL_API_TOKEN,
});

// Helper function to search flights
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

    return {
      success: true,
      requestId: offerRequest.data.id,
      offers: offers.data,
    };
  } catch (error) {
    console.error('Error searching flights:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Helper function to get single offer details
async function getOfferDetails(offerId) {
  try {
    const offer = await duffel.offers.get(offerId);
    return {
      success: true,
      offer: offer.data,
    };
  } catch (error) {
    console.error('Error getting offer details:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Helper function to create order (booking)
async function createOrder(orderParams) {
  try {
    const {
      offerId,
      passengers,
      payments,
    } = orderParams;

    const order = await duffel.orders.create({
      selected_offers: [offerId],
      passengers: passengers,
      payments: payments,
      type: 'instant',
    });

    return {
      success: true,
      order: order.data,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Helper function to get order details
async function getOrderDetails(orderId) {
  try {
    const order = await duffel.orders.get(orderId);
    return {
      success: true,
      order: order.data,
    };
  } catch (error) {
    console.error('Error getting order details:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  duffel,
  searchFlights,
  getOfferDetails,
  createOrder,
  getOrderDetails,
};
