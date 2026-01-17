// هذا الملف يخفي API Key
export default async function handler(req, res) {
    const DUFFEL_KEY = process.env.DUFFEL_API_KEY;
    
    const response = await fetch('https://api.duffel.com/air/offer_requests', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${DUFFEL_KEY}`,
            'Duffel-Version': 'v1',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                slices: [{
                    origin: req.body.origin,
                    destination: req.body.destination,
                    departure_date: req.body.date
                }],
                passengers: [{ type: 'adult' }]
            }
        })
    });
    
    const data = await response.json();
    res.json(data.data || []);
}