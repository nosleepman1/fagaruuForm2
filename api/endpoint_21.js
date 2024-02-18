// Serveur HTTP Node / Endpoint #21
const http = require('http');

function handler_21(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 21, status: 'ok', message: 'Reponse API #21' }));
}
module.exports = { handler_21 };
