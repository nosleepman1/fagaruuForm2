// Serveur HTTP Node / Endpoint #66
const http = require('http');

function handler_66(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 66, status: 'ok', message: 'Reponse API #66' }));
}
module.exports = { handler_66 };
