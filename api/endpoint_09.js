// Serveur HTTP Node / Endpoint #9
const http = require('http');

function handler_9(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 9, status: 'ok', message: 'Reponse API #9' }));
}
module.exports = { handler_9 };
