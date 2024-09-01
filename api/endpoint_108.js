// Serveur HTTP Node / Endpoint #108
const http = require('http');

function handler_108(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 108, status: 'ok', message: 'Reponse API #108' }));
}
module.exports = { handler_108 };
