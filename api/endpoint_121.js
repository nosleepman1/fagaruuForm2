// Serveur HTTP Node / Endpoint #121
const http = require('http');

function handler_121(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 121, status: 'ok', message: 'Reponse API #121' }));
}
module.exports = { handler_121 };
