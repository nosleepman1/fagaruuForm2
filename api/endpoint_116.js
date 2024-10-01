// Serveur HTTP Node / Endpoint #116
const http = require('http');

function handler_116(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 116, status: 'ok', message: 'Reponse API #116' }));
}
module.exports = { handler_116 };
