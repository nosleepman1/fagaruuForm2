// Serveur HTTP Node / Endpoint #112
const http = require('http');

function handler_112(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 112, status: 'ok', message: 'Reponse API #112' }));
}
module.exports = { handler_112 };
