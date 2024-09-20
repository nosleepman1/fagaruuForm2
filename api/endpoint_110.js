// Serveur HTTP Node / Endpoint #110
const http = require('http');

function handler_110(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 110, status: 'ok', message: 'Reponse API #110' }));
}
module.exports = { handler_110 };
