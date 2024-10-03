// Serveur HTTP Node / Endpoint #117
const http = require('http');

function handler_117(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 117, status: 'ok', message: 'Reponse API #117' }));
}
module.exports = { handler_117 };
