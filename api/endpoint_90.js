// Serveur HTTP Node / Endpoint #90
const http = require('http');

function handler_90(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 90, status: 'ok', message: 'Reponse API #90' }));
}
module.exports = { handler_90 };
