// Simple test file to verify Duffel connection
// Run: node test.js

require('dotenv').config();
const { searchFlights } = require('./duffel-config');

async function testDuffelConnection() {
  console.log('🧪 Testing Duffel API Connection...\n');

  const searchParams = {
    origin: 'YOW',        // Ottawa
    destination: 'YYZ',   // Toronto
    departureDate: '2026-03-15',
    returnDate: '2026-03-20',
    adults: 1,
    cabinClass: 'economy'
  };

  console.log('📍 Search Parameters:');
  console.log(JSON.stringify(searchParams, null, 2));
  console.log('\n🔍 Searching for flights...\n');

  try {
    const result = await searchFlights(searchParams);

    if (result.success) {
      console.log('✅ SUCCESS! Connection to Duffel is working!');
      console.log(`📊 Found ${result.offers.length} offers`);
      
      if (result.offers.length > 0) {
        const firstOffer = result.offers[0];
        console.log('\n💡 Sample Offer:');
        console.log(`   ID: ${firstOffer.id}`);
        console.log(`   Price: ${firstOffer.total_amount} ${firstOffer.total_currency}`);
        console.log(`   Airline: ${firstOffer.owner.name}`);
      }
    } else {
      console.error('❌ ERROR:', result.error);
    }
  } catch (error) {
    console.error('❌ EXCEPTION:', error.message);
  }
}

testDuffelConnection();