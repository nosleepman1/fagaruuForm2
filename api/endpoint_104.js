// Serveur HTTP Node / Endpoint #104
const http = require('http');

function handler_104(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 104, status: 'ok', message: 'Reponse API #104' }));
}
module.exports = { handler_104 };
