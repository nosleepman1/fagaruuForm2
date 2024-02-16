// Serveur HTTP Node / Endpoint #20
const http = require('http');

function handler_20(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 20, status: 'ok', message: 'Reponse API #20' }));
}
module.exports = { handler_20 };
