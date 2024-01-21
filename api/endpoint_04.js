// Serveur HTTP Node / Endpoint #4
const http = require('http');

function handler_4(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 4, status: 'ok', message: 'Reponse API #4' }));
}
module.exports = { handler_4 };
