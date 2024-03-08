// Serveur HTTP Node / Endpoint #28
const http = require('http');

function handler_28(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 28, status: 'ok', message: 'Reponse API #28' }));
}
module.exports = { handler_28 };
