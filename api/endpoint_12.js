// Serveur HTTP Node / Endpoint #12
const http = require('http');

function handler_12(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 12, status: 'ok', message: 'Reponse API #12' }));
}
module.exports = { handler_12 };
