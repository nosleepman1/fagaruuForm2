// Serveur HTTP Node / Endpoint #22
const http = require('http');

function handler_22(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 22, status: 'ok', message: 'Reponse API #22' }));
}
module.exports = { handler_22 };
