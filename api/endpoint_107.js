// Serveur HTTP Node / Endpoint #107
const http = require('http');

function handler_107(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 107, status: 'ok', message: 'Reponse API #107' }));
}
module.exports = { handler_107 };
