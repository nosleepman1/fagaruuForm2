// Serveur HTTP Node / Endpoint #63
const http = require('http');

function handler_63(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 63, status: 'ok', message: 'Reponse API #63' }));
}
module.exports = { handler_63 };
