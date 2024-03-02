// Serveur HTTP Node / Endpoint #26
const http = require('http');

function handler_26(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 26, status: 'ok', message: 'Reponse API #26' }));
}
module.exports = { handler_26 };
