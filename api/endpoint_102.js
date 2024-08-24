// Serveur HTTP Node / Endpoint #102
const http = require('http');

function handler_102(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 102, status: 'ok', message: 'Reponse API #102' }));
}
module.exports = { handler_102 };
