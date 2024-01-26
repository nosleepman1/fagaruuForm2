// Serveur HTTP Node / Endpoint #8
const http = require('http');

function handler_8(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 8, status: 'ok', message: 'Reponse API #8' }));
}
module.exports = { handler_8 };
