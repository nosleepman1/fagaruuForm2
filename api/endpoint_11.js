// Serveur HTTP Node / Endpoint #11
const http = require('http');

function handler_11(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 11, status: 'ok', message: 'Reponse API #11' }));
}
module.exports = { handler_11 };
