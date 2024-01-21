// Serveur HTTP Node / Endpoint #6
const http = require('http');

function handler_6(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 6, status: 'ok', message: 'Reponse API #6' }));
}
module.exports = { handler_6 };
