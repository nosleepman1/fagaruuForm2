// Serveur HTTP Node / Endpoint #101
const http = require('http');

function handler_101(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 101, status: 'ok', message: 'Reponse API #101' }));
}
module.exports = { handler_101 };
