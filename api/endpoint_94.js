// Serveur HTTP Node / Endpoint #94
const http = require('http');

function handler_94(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 94, status: 'ok', message: 'Reponse API #94' }));
}
module.exports = { handler_94 };
