// Serveur HTTP Node / Endpoint #35
const http = require('http');

function handler_35(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 35, status: 'ok', message: 'Reponse API #35' }));
}
module.exports = { handler_35 };
