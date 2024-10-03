// Serveur HTTP Node / Endpoint #119
const http = require('http');

function handler_119(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 119, status: 'ok', message: 'Reponse API #119' }));
}
module.exports = { handler_119 };
