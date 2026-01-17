// API Health Check Endpoint
export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    message: 'SkyLynx Travel API is running',
    timestamp: new Date().toISOString()
  });
}
