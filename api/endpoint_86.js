// Serveur HTTP Node / Endpoint #86
const http = require('http');

function handler_86(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 86, status: 'ok', message: 'Reponse API #86' }));
}
module.exports = { handler_86 };
