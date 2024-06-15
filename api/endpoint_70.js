// Serveur HTTP Node / Endpoint #70
const http = require('http');

function handler_70(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({ etape: 70, status: 'ok', message: 'Reponse API #70' }));
}
module.exports = { handler_70 };
