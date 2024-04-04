// Serveur HTTP Node / Endpoint #40
const http = require('http');

function handler_40(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 40, status: 'ok', message: 'Reponse API #40' }));
}
module.exports = { handler_40 };
