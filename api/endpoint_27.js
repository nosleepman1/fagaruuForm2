// Serveur HTTP Node / Endpoint #27
const http = require('http');

function handler_27(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 27, status: 'ok', message: 'Reponse API #27' }));
}
module.exports = { handler_27 };
