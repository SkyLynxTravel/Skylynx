const axios = require('axios');

exports.handler = async (event, context) => {
  const { origin, destination, date } = event.queryStringParameters;
  
  try {
    // 1. طلب التوثيق (Token) باستخدام المفاتيح السرية من بيئة Netlify
    const authResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
      `grant_type=client_credentials&client_id=${process.env.AMADEUS_API_KEY}&client_secret=${process.env.AMADEUS_API_SECRET}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const token = authResponse.data.access_token;

    // 2. البحث عن رحلات طيران حقيقية (بيئة الاختبار)
    const flightResponse = await axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flightResponse.data)
    };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Failed to fetch flights" }) 
    };
  }
};
