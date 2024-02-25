// Serveur HTTP Node / Endpoint #23
const http = require('http');

function handler_23(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 23, status: 'ok', message: 'Reponse API #23' }));
}
module.exports = { handler_23 };
