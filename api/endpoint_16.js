// Serveur HTTP Node / Endpoint #16
const http = require('http');

function handler_16(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 16, status: 'ok', message: 'Reponse API #16' }));
}
module.exports = { handler_16 };
