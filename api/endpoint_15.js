// Serveur HTTP Node / Endpoint #15
const http = require('http');

function handler_15(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 15, status: 'ok', message: 'Reponse API #15' }));
}
module.exports = { handler_15 };
