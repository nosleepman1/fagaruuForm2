// Serveur HTTP Node / Endpoint #50
const http = require('http');

function handler_50(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 50, status: 'ok', message: 'Reponse API #50' }));
}
module.exports = { handler_50 };
