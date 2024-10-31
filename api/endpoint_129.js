// Serveur HTTP Node / Endpoint #129
const http = require('http');

function handler_129(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 129, status: 'ok', message: 'Reponse API #129' }));
}
module.exports = { handler_129 };
