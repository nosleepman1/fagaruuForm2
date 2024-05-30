// Serveur HTTP Node / Endpoint #60
const http = require('http');

function handler_60(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 60, status: 'ok', message: 'Reponse API #60' }));
}
module.exports = { handler_60 };
