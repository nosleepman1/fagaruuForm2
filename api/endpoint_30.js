// Serveur HTTP Node / Endpoint #30
const http = require('http');

function handler_30(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 30, status: 'ok', message: 'Reponse API #30' }));
}
module.exports = { handler_30 };
