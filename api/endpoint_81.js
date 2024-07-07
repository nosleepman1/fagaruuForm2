// Serveur HTTP Node / Endpoint #81
const http = require('http');

function handler_81(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 81, status: 'ok', message: 'Reponse API #81' }));
}
module.exports = { handler_81 };
