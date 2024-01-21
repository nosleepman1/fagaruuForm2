// Serveur HTTP Node / Endpoint #5
const http = require('http');

function handler_5(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 5, status: 'ok', message: 'Reponse API #5' }));
}
module.exports = { handler_5 };
