// Serveur HTTP Node / Endpoint #42
const http = require('http');

function handler_42(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 42, status: 'ok', message: 'Reponse API #42' }));
}
module.exports = { handler_42 };
