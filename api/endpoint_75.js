// Serveur HTTP Node / Endpoint #75
const http = require('http');

function handler_75(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 75, status: 'ok', message: 'Reponse API #75' }));
}
module.exports = { handler_75 };
