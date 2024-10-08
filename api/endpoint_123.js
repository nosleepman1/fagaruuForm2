// Serveur HTTP Node / Endpoint #123
const http = require('http');

function handler_123(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 123, status: 'ok', message: 'Reponse API #123' }));
}
module.exports = { handler_123 };
