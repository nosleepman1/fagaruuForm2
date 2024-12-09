// Serveur HTTP Node / Endpoint #150
const http = require('http');

function handler_150(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 150, status: 'ok', message: 'Reponse API #150' }));
}
module.exports = { handler_150 };
