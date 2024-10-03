// Serveur HTTP Node / Endpoint #120
const http = require('http');

function handler_120(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 120, status: 'ok', message: 'Reponse API #120' }));
}
module.exports = { handler_120 };
