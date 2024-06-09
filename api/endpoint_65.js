// Serveur HTTP Node / Endpoint #65
const http = require('http');

function handler_65(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 65, status: 'ok', message: 'Reponse API #65' }));
}
module.exports = { handler_65 };
