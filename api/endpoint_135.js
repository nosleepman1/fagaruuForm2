// Serveur HTTP Node / Endpoint #135
const http = require('http');

function handler_135(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 135, status: 'ok', message: 'Reponse API #135' }));
}
module.exports = { handler_135 };
