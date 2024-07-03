// Serveur HTTP Node / Endpoint #77
const http = require('http');

function handler_77(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 77, status: 'ok', message: 'Reponse API #77' }));
}
module.exports = { handler_77 };
