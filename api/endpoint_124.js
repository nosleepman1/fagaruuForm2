// Serveur HTTP Node / Endpoint #124
const http = require('http');

function handler_124(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 124, status: 'ok', message: 'Reponse API #124' }));
}
module.exports = { handler_124 };
