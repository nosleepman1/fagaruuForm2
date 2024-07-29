// Serveur HTTP Node / Endpoint #89
const http = require('http');

function handler_89(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 89, status: 'ok', message: 'Reponse API #89' }));
}
module.exports = { handler_89 };
