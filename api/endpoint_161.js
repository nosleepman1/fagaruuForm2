// Serveur HTTP Node / Endpoint #161
const http = require('http');

function handler_161(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 161, status: 'ok', message: 'Reponse API #161' }));
}
module.exports = { handler_161 };
