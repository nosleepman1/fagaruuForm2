// Serveur HTTP Node / Endpoint #14
const http = require('http');

function handler_14(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 14, status: 'ok', message: 'Reponse API #14' }));
}
module.exports = { handler_14 };
