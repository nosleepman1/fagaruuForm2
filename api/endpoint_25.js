// Serveur HTTP Node / Endpoint #25
const http = require('http');

function handler_25(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 25, status: 'ok', message: 'Reponse API #25' }));
}
module.exports = { handler_25 };
