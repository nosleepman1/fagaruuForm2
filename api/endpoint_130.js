// Serveur HTTP Node / Endpoint #130
const http = require('http');

function handler_130(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 130, status: 'ok', message: 'Reponse API #130' }));
}
module.exports = { handler_130 };
