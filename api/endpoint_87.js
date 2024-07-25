// Serveur HTTP Node / Endpoint #87
const http = require('http');

function handler_87(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 87, status: 'ok', message: 'Reponse API #87' }));
}
module.exports = { handler_87 };
