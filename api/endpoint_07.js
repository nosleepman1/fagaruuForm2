// Serveur HTTP Node / Endpoint #7
const http = require('http');

function handler_7(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 7, status: 'ok', message: 'Reponse API #7' }));
}
module.exports = { handler_7 };
