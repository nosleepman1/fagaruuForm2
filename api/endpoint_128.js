// Serveur HTTP Node / Endpoint #128
const http = require('http');

function handler_128(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 128, status: 'ok', message: 'Reponse API #128' }));
}
module.exports = { handler_128 };
