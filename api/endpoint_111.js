// Serveur HTTP Node / Endpoint #111
const http = require('http');

function handler_111(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 111, status: 'ok', message: 'Reponse API #111' }));
}
module.exports = { handler_111 };
