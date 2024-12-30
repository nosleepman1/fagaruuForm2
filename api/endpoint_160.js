// Serveur HTTP Node / Endpoint #160
const http = require('http');

function handler_160(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 160, status: 'ok', message: 'Reponse API #160' }));
}
module.exports = { handler_160 };
