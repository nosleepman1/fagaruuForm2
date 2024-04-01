// Serveur HTTP Node / Endpoint #37
const http = require('http');

function handler_37(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 37, status: 'ok', message: 'Reponse API #37' }));
}
module.exports = { handler_37 };
