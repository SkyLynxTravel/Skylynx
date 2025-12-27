async function searchFlights() {
    // جلب القيم من خانات البحث في موقعك
    const from = document.getElementById('fromInput').value; // تأكد أن ID الخانة صحيح
    const to = document.getElementById('toInput').value;
    const date = document.getElementById('dateInput').value;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Searching for flights...";

    try {
        // الاتصال بالخادم الصغير الذي أنشأناه في Netlify
        const response = await fetch(`/.netlify/functions/get-flights?origin=${from}&destination=${to}&date=${date}`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            resultsDiv.innerHTML = ""; // مسح رسالة التحميل
            data.data.forEach(flight => {
                const price = flight.price.total;
                const currency = flight.price.currency;
                resultsDiv.innerHTML += `
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                        <p>Flight from ${from} to ${to}</p>
                        <p>Price: ${price} ${currency}</p>
                        <button>Book Now</button>
                    </div>
                `;
            });
        } else {
            resultsDiv.innerHTML = "No flights found.";
        }
    } catch (error) {
        resultsDiv.innerHTML = "Error fetching flights. Please try again.";
        console.error(error);
    }
}
