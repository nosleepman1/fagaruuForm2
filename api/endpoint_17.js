// Serveur HTTP Node / Endpoint #17
const http = require('http');

function handler_17(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 17, status: 'ok', message: 'Reponse API #17' }));
}
module.exports = { handler_17 };
