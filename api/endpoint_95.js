// Serveur HTTP Node / Endpoint #95
const http = require('http');

function handler_95(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 95, status: 'ok', message: 'Reponse API #95' }));
}
module.exports = { handler_95 };
