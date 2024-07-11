// Serveur HTTP Node / Endpoint #83
const http = require('http');

function handler_83(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 83, status: 'ok', message: 'Reponse API #83' }));
}
module.exports = { handler_83 };
