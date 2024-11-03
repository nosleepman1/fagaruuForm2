// Serveur HTTP Node / Endpoint #133
const http = require('http');

function handler_133(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 133, status: 'ok', message: 'Reponse API #133' }));
}
module.exports = { handler_133 };
