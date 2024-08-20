// Serveur HTTP Node / Endpoint #99
const http = require('http');

function handler_99(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 99, status: 'ok', message: 'Reponse API #99' }));
}
module.exports = { handler_99 };
