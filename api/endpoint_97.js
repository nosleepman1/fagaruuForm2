// Serveur HTTP Node / Endpoint #97
const http = require('http');

function handler_97(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 97, status: 'ok', message: 'Reponse API #97' }));
}
module.exports = { handler_97 };
