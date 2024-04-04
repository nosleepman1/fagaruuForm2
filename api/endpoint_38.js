// Serveur HTTP Node / Endpoint #38
const http = require('http');

function handler_38(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 38, status: 'ok', message: 'Reponse API #38' }));
}
module.exports = { handler_38 };
