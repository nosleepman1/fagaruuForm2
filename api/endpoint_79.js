// Serveur HTTP Node / Endpoint #79
const http = require('http');

function handler_79(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 79, status: 'ok', message: 'Reponse API #79' }));
}
module.exports = { handler_79 };
