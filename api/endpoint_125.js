// Serveur HTTP Node / Endpoint #125
const http = require('http');

function handler_125(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 125, status: 'ok', message: 'Reponse API #125' }));
}
module.exports = { handler_125 };
