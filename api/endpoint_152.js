// Serveur HTTP Node / Endpoint #152
const http = require('http');

function handler_152(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 152, status: 'ok', message: 'Reponse API #152' }));
}
module.exports = { handler_152 };
