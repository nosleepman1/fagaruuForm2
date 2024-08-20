// Serveur HTTP Node / Endpoint #100
const http = require('http');

function handler_100(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 100, status: 'ok', message: 'Reponse API #100' }));
}
module.exports = { handler_100 };
