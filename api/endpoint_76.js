// Serveur HTTP Node / Endpoint #76
const http = require('http');

function handler_76(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 76, status: 'ok', message: 'Reponse API #76' }));
}
module.exports = { handler_76 };
