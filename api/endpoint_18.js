// Serveur HTTP Node / Endpoint #18
const http = require('http');

function handler_18(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 18, status: 'ok', message: 'Reponse API #18' }));
}
module.exports = { handler_18 };
