// Serveur HTTP Node / Endpoint #143
const http = require('http');

function handler_143(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 143, status: 'ok', message: 'Reponse API #143' }));
}
module.exports = { handler_143 };
