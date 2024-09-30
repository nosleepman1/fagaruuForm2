// Serveur HTTP Node / Endpoint #113
const http = require('http');

function handler_113(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 113, status: 'ok', message: 'Reponse API #113' }));
}
module.exports = { handler_113 };
