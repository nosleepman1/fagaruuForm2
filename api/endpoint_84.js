// Serveur HTTP Node / Endpoint #84
const http = require('http');

function handler_84(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 84, status: 'ok', message: 'Reponse API #84' }));
}
module.exports = { handler_84 };
