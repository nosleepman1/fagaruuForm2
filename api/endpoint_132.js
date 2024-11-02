// Serveur HTTP Node / Endpoint #132
const http = require('http');

function handler_132(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 132, status: 'ok', message: 'Reponse API #132' }));
}
module.exports = { handler_132 };
