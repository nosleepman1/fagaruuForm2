// Serveur HTTP Node / Endpoint #103
const http = require('http');

function handler_103(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 103, status: 'ok', message: 'Reponse API #103' }));
}
module.exports = { handler_103 };
