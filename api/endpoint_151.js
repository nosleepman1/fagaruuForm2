// Serveur HTTP Node / Endpoint #151
const http = require('http');

function handler_151(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 151, status: 'ok', message: 'Reponse API #151' }));
}
module.exports = { handler_151 };
