// Serveur HTTP Node / Endpoint #149
const http = require('http');

function handler_149(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 149, status: 'ok', message: 'Reponse API #149' }));
}
module.exports = { handler_149 };
