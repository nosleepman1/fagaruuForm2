// Serveur HTTP Node / Endpoint #118
const http = require('http');

function handler_118(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 118, status: 'ok', message: 'Reponse API #118' }));
}
module.exports = { handler_118 };
