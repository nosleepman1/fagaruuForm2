// Serveur HTTP Node / Endpoint #62
const http = require('http');

function handler_62(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 62, status: 'ok', message: 'Reponse API #62' }));
}
module.exports = { handler_62 };
