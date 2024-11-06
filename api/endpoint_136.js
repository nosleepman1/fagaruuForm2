// Serveur HTTP Node / Endpoint #136
const http = require('http');

function handler_136(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 136, status: 'ok', message: 'Reponse API #136' }));
}
module.exports = { handler_136 };
