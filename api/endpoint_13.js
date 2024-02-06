// Serveur HTTP Node / Endpoint #13
const http = require('http');

function handler_13(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 13, status: 'ok', message: 'Reponse API #13' }));
}
module.exports = { handler_13 };
