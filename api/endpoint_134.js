// Serveur HTTP Node / Endpoint #134
const http = require('http');

function handler_134(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 134, status: 'ok', message: 'Reponse API #134' }));
}
module.exports = { handler_134 };
