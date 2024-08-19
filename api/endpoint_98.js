// Serveur HTTP Node / Endpoint #98
const http = require('http');

function handler_98(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 98, status: 'ok', message: 'Reponse API #98' }));
}
module.exports = { handler_98 };
