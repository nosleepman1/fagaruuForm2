// Serveur HTTP Node / Endpoint #140
const http = require('http');

function handler_140(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 140, status: 'ok', message: 'Reponse API #140' }));
}
module.exports = { handler_140 };
