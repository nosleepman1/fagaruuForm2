// Serveur HTTP Node / Endpoint #2
const http = require('http');

function handler_2(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 2, status: 'ok', message: 'Reponse API #2' }));
}
module.exports = { handler_2 };
