// Serveur HTTP Node / Endpoint #106
const http = require('http');

function handler_106(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 106, status: 'ok', message: 'Reponse API #106' }));
}
module.exports = { handler_106 };
