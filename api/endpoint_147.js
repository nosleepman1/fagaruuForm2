// Serveur HTTP Node / Endpoint #147
const http = require('http');

function handler_147(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 147, status: 'ok', message: 'Reponse API #147' }));
}
module.exports = { handler_147 };
