// Serveur HTTP Node / Endpoint #3
const http = require('http');

function handler_3(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 3, status: 'ok', message: 'Reponse API #3' }));
}
module.exports = { handler_3 };
