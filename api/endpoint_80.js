// Serveur HTTP Node / Endpoint #80
const http = require('http');

function handler_80(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 80, status: 'ok', message: 'Reponse API #80' }));
}
module.exports = { handler_80 };
