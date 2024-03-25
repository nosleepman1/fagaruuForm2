// Serveur HTTP Node / Endpoint #36
const http = require('http');

function handler_36(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 36, status: 'ok', message: 'Reponse API #36' }));
}
module.exports = { handler_36 };
